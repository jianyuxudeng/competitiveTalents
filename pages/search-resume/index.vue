<template>
  <section class="search_resume page_centent">
      <div class="nav-bg"></div>
      <div class="centent">
          <div class="left">
              <a-input-group compact>
                  <a-cascader :defaultValue="[1, 1]" :fieldNames="{label: 'name', value: 'id', children: 'item'}" :options="areas" size="large" class="pos_selsct" @change="onCascader">
                      <template slot="displayRender" slot-scope="{labels}">
                          <span v-for="(label, index) in labels" :key="index">
                              <span v-if="index == 1">{{label}}</span>
                          </span>
                      </template>
                  </a-cascader>
                  <a-input-search class="pos_search" size="large" placeholder="查找简历" @search="onSearch" />
              </a-input-group>
              <div class="search_list">
                  <div>
                      <dl>
                          <dt>工作经验</dt>
                          <dd>
                              <span v-for="(item, index) in workExpress" :key="index" :class="{active: params.workTime == item.id}" @click="handleArea('workTime', item.id)">{{item.labelName}}</span>
                          </dd>
                      </dl>
                      <dl>
                          <dt>学历要求</dt>
                          <dd>
                              <span v-for="item in educationals" :key="item.id" :class="{active: params.qualifications_id == item.id}" @click="handleArea('qualifications_id', item.id)">{{item.labelName}}</span>
                          </dd>
                      </dl>
                      <dl>
                          <dt>薪资要求</dt>
                          <dd>
                              <span v-for="item in jobPrices" :key="item.id" :class="{active: params.price == item.id}" @click="handleArea('price', item.id)">{{item.labelName}}</span>
                          </dd>
                      </dl>
                  </div>
              </div>
              <div class="rows">
                  <div class="rows_li" v-for="item in rows" :key="item.id" @click="goJobDetail(item)">
                    <div class="head">
                        <div class="rows_left">
                            <div class="title"><span>{{item.username}}[{{item.expected_position_name}}]</span>{{item.workTime}}年 / {{item.qualifications_id ? educationals.find(i => i.id == item.qualifications_id).labelName : null}}</div>
                            <div class="list">
                                <div class="li">
                                    <p>{{item.company_name}}</p>
                                </div>
                                <div class="li">
                                    <p>/</p>
                                </div>
                                <div class="li">
                                    <p>{{item.job_type_name}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="rows_right">
                            <div>
                                <p>{{item.expected_salary}}/月</p>
                            </div>
                            <em><img :src="item.logo" alt=""></em>
                        </div>
                    </div>
                    <div class="foot">
                        <div class="btn">
                            <span v-for="(i, index) in item.skills" :key="index">{{i}}</span>
                        </div>
                    </div>
                  </div>
              </div>
              <a-pagination showQuickJumper :defaultCurrent="1" :total="total" @change="onChangePage" />
          </div>
          <div class="right">
              <div><img src="../../assets/images/positions_1.jpg" alt=""></div>
              <div><img src="../../assets/images/positions_2.jpg" alt=""></div>
              <div><img src="../../assets/images/positions_3.jpg" alt=""></div>
          </div>
      </div>
  </section>
</template>

<script>
import "./index.less";
import ajax from '../../plugins/api';
import util from '../../plugins/utils/util';
import area from '../../plugins/utils/area';

export default {
  name: "search-resume",
  async asyncData(){
     return{
     }
  },
  data() {
      return{
          workExpress: [],
          educationals: [], //学历要求
          jobPrices: [],
          params: { //筛选参数
              workTime: null, //工作经验
              qualifications_id: null, //学历要求
              price: null,
              keywords: null, //关键字
              pageNumber: 1,
              pageSize: 10
          },
          total: 0,
          rows: [],
          areas: [],
          areaIds: [1, 1],
          active: 0,
          areaItem: {
              id: '',
              name: ''
          }
      }
  },
  mounted() {
      this.getData();
  },
  methods: {
      init(obj) { //初始化数据
          Object.keys(obj).map(item => {
              this[item] = [
                  {id: null, labelName: '不限'},
                  ...obj[item]
              ]
          });
          this.handleCascader();
      },
      goJobDetail(e) {
          this.$router.push({
              path: 'resume-detail',
              query: {
                  user_id: e.user_id
              }
          })
      },
      onSearch(value) { //关键字筛选
          this.params = Object.assign(this.params, {keywords: value});
          this.searchData();
      },
      onCascader(value) { //省市联动
          this.areaIds = value;
          this.handleCascader();
      },
      handleCascader() {
          let areas = [];
          let provincesId = this.areaIds[0];
          let cityId = this.areaIds[1];
          area.map(ele => {
              areas.push({
                  id: ele.id,
                  name: ele.name,
                  item: ele.items
              });
          });
          this.areas = areas;
          this.handleDIZHI();
      },
      handleDIZHI() { //地址筛选
          let provinces = null;
          let citys = null;
          area.map(item => {
              if(item.id == this.areaIds[0]) {
                  if(item) {
                      provinces = item;
                      item.items.map(i => {
                          if(i.id == this.areaIds[1]) {
                              if(i) {
                                  citys = i;
                              }
                          }
                      })
                  };
              };
          });
          this.params = Object.assign(this.params, {cityId: citys.id});
          this.searchData();
      },
      handleArea(name, val) { //筛选
          this.params = Object.assign(this.params, {[name]: val});
          this.searchData();
      },
      onChangePage(pageNumber) { //分页
          this.params = Object.assign(this.params, {pageNumber});
          this.searchData();
      },
      getData() { //获取数据
          ajax.get('label').then(res => {
              this.init(res.data);
          })
      },
      searchData() {
          let userInfo = util.getStore('userInfo');
          let params = Object.assign(this.params, {
              company_id: userInfo.id
          });
          ajax.get('company/all/resumes', {
              ...params,
              workTime: this.params.workTime ? this.workExpress.find(item => item.id == this.params.workTime).labelName : null,
              price: this.params.price ? this.jobPrices.find(item => item.id == this.params.price).labelName : null
          }).then(res => {
              this.rows = res.data.data || [];
              this.rows.forEach(item => {
                  item.skills = item.skills.split(',') || [];
                  return item;
              });
              this.total = res.data.total;
          })
      }
  }
};
</script>