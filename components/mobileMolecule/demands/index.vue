<template>
  <section class="demands_page">
      <ul>
          <li v-for="(item, index) in listCope" :key="index" @click="onClick(item)">
              <div class="demands_top">
                  <div class="demands_text size" v-if="userInfo && userInfo.type == 3">
                      <div>
                          <p>{{item.username}} <span>[{{item.expected_position_name}}]</span></p>
                      </div>
                      <div>
                          <span>{{item.expected_salary}}</span>
                      </div>
                  </div>
                  <div class="demands_text" v-else>
                      <div>
                          <p>{{item.companyName}}</p>
                          <p>
                              {{item.workExperience ? labels.workExpress.find(i => i.id == item.workExperience).labelName : null}}
                              /
                              {{item.educational ? labels.educationals.find(i => i.id == item.educational).labelName : null}}
                          </p>
                      </div>
                      <div>
                          <span v-if="item.sendTime">[{{moment(item.sendTime).format('HH:mm')}}发布]</span>
                          <span>{{item.jobPrice}}/月</span>
                      </div>
                  </div>
                  <div class="resume_text" v-if="userInfo && userInfo.type == 3">
                      <span>求职期望：{{item.city&&JSON.parse(item.city).cityName}}</span>
                      <span>工作经历：{{item.workTime}}年</span>
                  </div>
                  <div class="demands_btn">
                      <span :class="item.className">{{item.typeName || item.job_type_name}}</span>
                      <span v-for="(i, index) in item.skills" :key="index">{{i}}</span>
                  </div>
              </div>
              <dl v-if="userInfo && userInfo.type == 3">
                  <dd>增任职单位：{{item.company_name}}</dd>
              </dl>
              <dl v-else>
                  <dt><img :src="item.logo" alt=""></dt>
                  <dd>
                      <p>{{item.companyName}}</p>
                      <p>
                          {{item.trade ? labels.trades.find(i => i.id == item.trade).labelName : null}}
                          /
                          {{item.capitalize ? labels.capitalizes.find(i => i.id == item.capitalize).labelName : null}}
                          /
                          {{item.companyRegion&&JSON.parse(item.companyRegion).cityName}}
                      </p>
                  </dd>
              </dl>
          </li>
      </ul>
  </section>
</template>

<script>
import "./index.less";
import ajax from '../../../plugins/api';
import util from '../../../plugins/utils/util';
import moment from 'moment';

export default {
  name: "demands",
  props: ['userInfo'],
  async asyncData(){
     return{

     };
  },
  data() {
      return{
          listCope: [],
          labels: {},
          util: util
      }
  },
  watch: {
      userInfo() {
          this.init();
      }
  },
  mounted() {
      this.getLabelData();
  },
  methods: {
      moment,
      init() { //初始化
          this.listCope = [];
          if(this.userInfo && this.userInfo.type == 3) {
              this.getDataInfo(this.userInfo.id);
          }else{
              this.getData();
          };
      },
      onClick(e) { //点击每个item
          this.$emit('goJobDetail', e);
      },
      handleState(arr=[]) {
          if(arr.length > 0) {
              arr.map(item => {
                if(item.skills) item.skills = item.skills.split(',') || [];
                switch (item.typeName || item.job_type_name) {
                    case '全职':
                        item.className = 'blue';
                        break;
                    case '兼职':
                        item.className = 'orange';
                        break;
                    case '外包':
                        item.className = 'green';
                        break;
                    default:
                        break;
                };
                return item;
            });
          }
      },
      getData() { //未登录获取推荐职位
          ajax.get('jobs/home').then(res => {
              this.listCope = res.data || [];
              this.handleState(this.listCope);
          })
      },
      getDataInfo(id) { //企业登录获取推荐简历
          ajax.get('company/home/resumes', {company_id: id}).then(res => {
              this.listCope = res.data || [];
              this.handleState(this.listCope);
          })
      },
      getLabelData() {
          ajax.get('label').then(res => {
              this.labels = res.data || null;
              this.init();
          })
      }
  }
};
</script>