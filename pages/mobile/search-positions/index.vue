<template>
  <section class="search_positions page_centent">
      <div class="nav-bg"></div>
      <div class="banner">
          <img src="../../../assets/images/mobile/positions_banner.jpg" alt="">
          <div class="banner_cent">
              <a-upload 
                  name="file" 
                  :multiple="true" 
                  :fileList="fileList"
                  :action="uploadUrl"
                  :supportServerRender="true"
                  :withCredentials="true"
                  :beforeUpload="beforeUpload"
                  @change="handleFile"
              >
                  <a-button>立即上传</a-button>
              </a-upload>
          </div>
      </div>
      <div class="centent">
          <div class="left">
              <a-input-group compact>
                  <a-input-search class="pos_search" size="large" placeholder="查找工作请输入技能、项目名称或职位" @search="onSearch" />
              </a-input-group>
              <div class="search_list">
                  <a-cascader :allowClear="false" :defaultValue="[1, 1]" :fieldNames="{label: 'name', value: 'id', children: 'item'}" :options="areas" size="large" class="pos_selsct" @change="onCascader">
                      <template slot="displayRender" slot-scope="{labels}">
                          <span v-for="(label, index) in labels" :key="index">
                              <span v-if="index == 1">{{label}}</span>
                          </span>
                      </template>
                      <a-icon slot="suffixIcon" type="caret-down" class="search_list_icon" />
                  </a-cascader>
                  <a-select placeholder="工作性质" @change="onJobTypes">
                      <a-icon slot="suffixIcon" type="caret-down" class="search_list_icon" />
                      <a-select-option v-for="item in jobTypes" :key="item.id" :value="item.id">{{item.labelName}}</a-select-option>
                  </a-select>
                  <a-select placeholder="月薪" @change="onJobPrices">
                      <a-icon slot="suffixIcon" type="caret-down" class="search_list_icon" />
                      <a-select-option v-for="item in jobPrices" :key="item.id" :value="item.id">{{item.labelName}}</a-select-option>
                  </a-select>
                  <div class="showModel" @click="handleShowModel">
                      <span>更多</span>
                      <a-icon type="caret-down" class="search_list_icon" />
                  </div>
              </div>
              <div class="rows">
                  <div class="rows_li" v-for="item in rows" :key="item.id" @click="goJobDetail(item)">
                    <div class="head">
                        <span v-if="item.is_worry == 1">急<br />聘</span>
                        <div class="rows_left">
                            <div class="title">
                                <span>
                                    {{item.name}}
                                    <p>{{item.workExperience ? workExpress.find(i => i.id == item.workExperience).labelName : null}} / {{item.educational ? educationals.find(i => i.id == item.educational).labelName : null}}</p>
                                </span>
                                <span class="title_right">
                                    <p>[{{item.sendTime ? moment().diff(moment(item.sendTime),'days')>0? moment().diff(moment(item.sendTime),'days')+'天前':moment().diff(moment(item.sendTime),'hours')+'小时前' : null}}发布]</p>
                                    <span>{{item.jobPrice}}/月</span>
                                </span>
                            </div>
                            <div class="list">
                                <div class="btn">
                                    <span :class="item.typeClassName">{{item.typeName}}</span>
                                    <span v-for="(i, index) in item.skills" :key="index">{{i}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="rows_right">
                            <em><img :src="item.logo" alt=""></em>
                            <div>
                                <p>{{item.companyName}}</p>
                                <p>{{item.trade ? trades.find(i => i.id == item.trade).labelName : null}}/{{item.capitalize ? capitalizes.find(i => i.id == item.capitalize).labelName : null}}/{{item.companyRegion&&JSON.parse(item.companyRegion).cityName}}</p>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
              <a-pagination showQuickJumper :defaultCurrent="1" :total="total" @change="onChangePage" />
          </div>
          <!-- <div class="right">
              <div><img src="../../../assets/images/positions_1.jpg" alt=""></div>
              <div><router-link to='/resume-detail'><img src="../../../assets/images/positions_2.jpg" alt=""></router-link></div>
              <div><img src="../../../assets/images/positions_3.jpg" alt=""></div>
          </div> -->
          <a-modal
            :confirmLoading="false"
            :maskClosable="false"
            :visible="showModel"
            class="seletModel"
            @cancel="showModel = false"
            @ok="handleSearch"
          >
            <div class="seletModel_centent">
                <!-- <dl>
                    <dt>排序方式</dt>
                    <dd>
                        <span v-for="(item, index) in sortingList" :key="index" :class="{active: params.sorting == index}">{{item}}</span>
                    </dd>
                </dl> -->
                <dl>
                    <dt>行政区</dt>
                    <dd>
                        <span v-for="(item, index) in regionList" :key="item.id" :class="{active: active == index}" @click="handleRegion(item, index)">{{item.name}}</span>
                    </dd>
                </dl>
                <dl>
                    <dt>工作经验</dt>
                    <dd>
                        <span v-for="item in workExpress" :key="item.id" :class="{active: params.workExperience == item.id}" @click="handleArea('workExperience', item.id)">{{item.labelName}}</span>
                    </dd>
                </dl>
                <dl>
                    <dt>学历要求</dt>
                    <dd>
                        <span v-for="item in educationals" :key="item.id" :class="{active: params.educational == item.id}" @click="handleArea('educational', item.id)">{{item.labelName}}</span>
                    </dd>
                </dl>
                <dl>
                    <dt>融资阶段</dt>
                    <dd>
                        <span v-for="item in capitalizes" :key="item.id" :class="{active: params.capitalize == item.id}" @click="handleArea('capitalize', item.id)">{{item.labelName}}</span>
                    </dd>
                </dl>
                <dl>
                    <dt>公司规模</dt>
                    <dd>
                        <span v-for="item in companySizes" :key="item.id" :class="{active: params.companySize == item.id}" @click="handleArea('companySize', item.id)">{{item.labelName}}</span>
                    </dd>
                </dl>
                <dl>
                    <dt>行业领域</dt>
                    <dd>
                        <span v-for="item in trades" :key="item.id" :class="{active: params.trade == item.id}" @click="handleArea('trade', item.id)">{{item.labelName}}</span>
                    </dd>
                </dl>
            </div>
          </a-modal>
      </div>
  </section>
</template>

<script>
import "./index.less";
import ajax from '../../../plugins/api';
import util from '../../../plugins/utils/util';
import area from '../../../plugins/utils/area';
import moment from 'moment';

export default {
  name: "search-positions",
  async asyncData(){
     return{
     }
  },
  data() {
      return{
          fileList: [], //上传文件列表
          regionList: [], //地区
          workExpress: [], //工作经验
          educationals: [], //学历要求
          capitalizes: [], //融资阶段
          companySizes: [], //公司规模
          trades: [], //行业领域
          jobPrices: [], //月薪列表
          jobTypes: [], //工作性质
          sortingList: ['默认', '最新发布'], //排序方式
          params: { //筛选参数
              region: '', //地区
              workExperience: '', //工作经验
              educational: '', //学历要求
              capitalize: '', //融资阶段
              companySize: '', //公司规模
              trade: '', //行业领域
              sorting: null, //排序方式
              jobPrice: null, //月薪
              jobType: null, //职位类型
              keywords: null, //关键字
              pageNumber: 1,
              pageSize: 10
          },
          total: 0,
          rows: [],
          label: null,
          areas: [],
          areaIds: [1, 1],
          active: 0,
          areaItem: {
              id: '',
              name: ''
          },
          uploadUrl: util.upLoadUrl,
          isZip: true,
          showModel: false
      }
  },
  mounted() {
      this.getData();
  },
  methods: {
      moment,
      formatTime: util.formatTime,
      init(obj) { //初始化数据
          this.regionList = [ //地区
              {id: null, name: '不限'},
              ...this.regionList
          ];
          Object.keys(obj).map(item => {
              this[item] = [
                  {id: '', labelName: '不限'},
                  ...obj[item]
              ]
          });
          this.handleCascader();
      },
      handleFile(info) { //上传简历
          let fileList = [...info.fileList];
          fileList = fileList.slice(-1);
          fileList = fileList.map((file) => {
              if (file.response) {
                  file.url = file.response.url;
              };
              return file;
          });
          this.fileList = this.isZip ? fileList : [];
      },
      beforeUpload(file) { //上传格式设置
          const isZip = file.type === util.uploadType.excel;
          if (!isZip) {
              this.isZip = false;
              this.$message.warning('上传文件格式不正确！');
          };
          return isZip;
      },
      handleShowModel() {
          this.showModel = true;
      },
      goJobDetail(e) {
          this.$router.push({
              path: 'job-detail',
              query: {
                  id: e.id
              }
          })
      },
      handleSearch() {
          this.showModel = false;
          this.searchData();
      },
      onSearch(value) { //关键字筛选
          this.params = Object.assign(this.params, {keywords: value});
          this.searchData();
      },
      onJobPrices(value) { //月薪筛选
          this.params = Object.assign(this.params, {jobPrice: value});
          this.searchData();
      },
      onJobTypes(value) {
          this.params = Object.assign(this.params, {jobType: value});
          this.searchData();
      },
      onCascader(value) { //省市联动
          this.areaIds = value;
          this.handleCascader();
      },
      handleRegion(e, index) { //地区筛选
          this.active = index;
          this.areaItem = Object.assign(this.areaItem, e);
          this.handleCascader();
      },
      handleCascader() {
          let areas = [];
          let provincesId = this.areaIds[0];
          let cityId = this.areaIds[1];
          let regionList = [];
          area.map(ele => {
              areas.push({
                  id: ele.id,
                  name: ele.name,
                  item: ele.items
              });
              if(ele.id == provincesId) {
                  ele.items.map(i => {
                      if(i.id == cityId) {
                          regionList = [{id: '', name: '不限', cityId: ''}, ...i.items];
                      }
                  })
              }
          });
          this.areas = areas;
          this.regionList = regionList;
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
          this.params = Object.assign(this.params, {region: {
              provincesId: provinces&&provinces.id, 
              provincesName: provinces&&provinces.name,
              cityId: citys&&citys.id,
              cityName: citys&&citys.name,
              area: this.areaItem&&this.areaItem.id,
              areaName: this.areaItem&&this.areaItem.name
          }});
          this.searchData();
      },
      handleArea(name, val) { //筛选
          this.params = Object.assign(this.params, {[name]: val});
        //   this.searchData();
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
          let params = Object.assign(this.params, {is_on: 1});
          ajax.get('jobs', {
              ...params
          }).then(res => {
              this.rows = res.data.list || [];
              this.rows.forEach(item => {
                  item.skills = item.skills?item.skills.split(',') : [];
                  item.sendTime = item.sendTime&&moment(item.sendTime).format('YYYY-MM-DD HH:mm'); //util.format(item.sendTime);
                  switch (item.typeName) {
                      case '全职':
                          item.typeClassName = 'blur';
                          break;
                      case '兼职':
                          item.typeClassName = 'yellor';
                          break;
                      case '外包':
                          item.typeClassName = 'green';
                          break;
                      default:
                          break;
                  }
                  return item;
              });
              this.total = res.data.total;
          })
      }
  }
};
</script>