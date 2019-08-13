<template>
  <section class="job_detail">
      <div class="nav-bg"></div>
      <div class="detail_head">
        <a-row type="flex" justify="space-between" align="middle">
          <a-col>
            <dl>
              <dt v-if="params.is_worry == 1">急聘</dt>
              <dd>
                <div class="title">{{params.careersName}}</div>
                <div class="jinyan">
                  <span>{{params.jobPrice}}/月</span>
                  {{params.workExperience}} / {{params.educational}} / {{params.region}} / 全职
                </div>
                <div class="btn">
                  <span v-for="(item, index) in params.skills" :key="index">{{item}}</span>
                </div>
                <p>
                  <a-icon type="clock-circle" />
                  <span>发布时间 {{params.sendTime}}</span>
                </p>
              </dd>
            </dl>
          </a-col>
          <a-col>
            <a-button class="back" size="large">
              <a-icon type="star" />
              <span>收藏</span>
            </a-button>
            <a-button type="primary" size="large">投递简历</a-button>
          </a-col>
        </a-row>
      </div>
      <div class="centent">
        <a-row type="flex" justify="space-between" align="top">
          <div class="left">
            <div class="title">
              <em><img src="../../assets/images/describe.png" alt=""></em>
              <span>职位描述</span>
            </div>
            <dl>
              <dt>岗位职责</dt>
              <dd>
                <p>{{params.duties}}</p>
              </dd>
            </dl>
            <dl>
              <dt>任职要求</dt>
              <dd>
                <p>{{params.request}}</p>
              </dd>
            </dl>
            <div class="title">
              <em><img src="../../assets/images/introduce.png" alt=""></em>
              <span>公司介绍</span>
            </div>
            <div class="introduce">竞域（上海）教育科技有限公司于2018年09月29日成立。法定代表人张尔承,公司经营范围包括：教育科技领域内的技术开发、技术转让、技术咨询、技术服务，设计、制作、代理、发布各类广告，体育赛事活动策划</div>
            <dl>
              <dt>工作地址</dt>
              <dd>
                <p>{{params.address}}</p>
              </dd>
            </dl>
          </div>
          <div class="right">
            <div class="one">
              <dl>
                <dt><img src="../../assets/images/positions_img.png" alt=""></dt>
                <dd>腾讯电竞</dd>
              </dl>
              <p>
                <a-icon type="appstore" theme="filled" />
                <span>电子竞技</span>
              </p>
              <p>
                <a-icon type="pay-circle" theme="filled" />
                <span>{{params.capitalize}}</span>
              </p>
              <p>
                <em><img src="../../assets/images/user.png" alt=""></em>
                <span>{{params.companySize}}</span>
              </p>
              <p>
                <em><img src="../../assets/images/esports.png" alt=""></em>
                <span>esports.qq.com</span>
              </p>
            </div>
            <Interest></Interest>
          </div>
        </a-row>
      </div>
  </section>
</template>

<script>
import "./index.less";
import ajax from '../../plugins/api';
import util from '../../plugins/utils/util';

export default {
  name: "job_detail",
  async asyncData(){
     return{

     }
  },
  components: {
    Interest: () => import('../../components/atom/Interest')
  },
  data() {
      return{
        params: {},
        labels: {}
      }
  },
  mounted() {
    this.labelDev();
  },
  methods: {
      labelDev() {
          ajax.get('label').then(res => {
              if(res.retcode == 0) {
                  this.labels = res.data || {};
                  this.devData();
              }
          });
      },
      devData() {
          let userInfo = util.getStore('userInfo');
          let _id = this.$route.query.id;
          ajax.get('jobs/detail', {
              user_id: userInfo.id,
              job_id: _id
          }).then(res => {
            if(res.retcode == 0) {
              this.params = res.data.jobDetali[0] || {};
              if(this.params.region) {
                this.params = Object.assign(this.params, {region: JSON.parse(this.params.region).cityName});
              };
              if(this.params.skills) {
                this.params = Object.assign(this.params, {
                  skills: this.params.skills.split(',')
                })
              };
              if(this.params.sendTime) this.params.sendTime = util.format(this.params.sendTime);
              this.labels.workExpress.map(item => {
                if(item.id == this.params.workExperience) {
                  this.params = Object.assign(this.params, {workExperience: item.labelName});
                }
              });
              this.labels.educationals.map(item => {
                if(item.id == this.params.educational) {
                  this.params = Object.assign(this.params, {educational: item.labelName});
                }
              });
              this.labels.jobTypes.map(item => {
                if(item.id == this.params.type) {
                  this.params = Object.assign(this.params, {type: item.labelName});
                }
              });
              this.labels.companySizes.map(item => {
                if(item.id == this.params.companySize) {
                  this.params = Object.assign(this.params, {companySize: item.labelName});
                }
              });
              this.labels.capitalizes.map(item => {
                if(item.id == this.params.capitalize) {
                  this.params = Object.assign(this.params, {capitalize: item.labelName});
                }
              })
            }
          })
      }
  }
};
</script>