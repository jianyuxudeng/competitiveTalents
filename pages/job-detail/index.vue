<template>
  <section class="job_detail page_centent">
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
          <a-col v-if="userInfo&&userInfo.type == 2">
            <a-button class="back" size="large" @click="(collectionPosition(!params.collect))">
              <a-icon type="star" />
              <span v-if="!params.collect">收藏</span>
              <span v-else>取消收藏</span>
            </a-button>
            <a-button type="primary" size="large" :disabled="!sendAgain" @click="handleModel">投递简历</a-button>
          </a-col>
          <a-col v-if="userInfo&&userInfo.type == 3">
            <a-button type="primary" size="large" @click="placement(params.id)">置顶</a-button>
            <a-button type="primary" size="large" @click="modify(params.id)">修改职位</a-button>
            <a-button type="primary" size="large" @click="offline(params.id, params.is_on)">{{params.is_on == 0 ? '上线职位' : '下线职位'}}</a-button>
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
            <div class="introduce">{{params.canpanyDes}}</div>
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
                <dt><img :src="params.logo" alt=""></dt>
                <dd>{{params.companyName}}</dd>
              </dl>
              <p>
                <a-icon type="appstore" theme="filled" />
                <span>{{params.trade}}</span>
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
                <span>{{params.website}}</span>
              </p>
            </div>
            <Interest></Interest>
          </div>
        </a-row>
      </div>
      <a-modal
            title="投递简历"
            :confirmLoading="false"
            :maskClosable="false"
            :visible="isModalShow"
            class="jobDModal"
            @cancel="handleCancel"
        >
            <div class="w100">
                <p>请选择你要投递的简历</p>
                <div class="radio">
                    <a-radio-group v-model="value" class="w100">
                        <a-row type="flex" justify="space-between" align="middle">
                            <a-col>
                                <a-radio :style="radioStyle" :value="0">
                                    在线简历
                                    <span class="blue">迪丽热巴的简历</span>
                                </a-radio>
                            </a-col>
                            <a-col>
                                <a-row type="flex" justify="end" align="middle">
                                    <!-- <a>预览</a>
                                    <em></em> -->
                                    <a @click="modifyResume">修改</a>
                                </a-row>
                            </a-col>
                        </a-row>
                        <a-row 
                            type="flex" 
                            justify="space-between" 
                            align="middle"
                            v-for="item in modelRow"
                            :key="item.id"
                        >
                            <a-col>
                                <a-radio :style="radioStyle" :value="1">
                                    附件简历
                                    <span class="blue">迪丽热巴的简历.wrod</span>
                                </a-radio>
                            </a-col>
                            <a-col>
                                <a-row type="flex" justify="end" align="middle">
                                    <a>下载</a>
                                </a-row>
                            </a-col>
                        </a-row>
                    </a-radio-group>
                </div>
                <p>上传附件简历</p>
            </div>
            <div slot="footer">
                <a-button type="primary" @click="handleresume">确认投递简历</a-button>
            </div>
        </a-modal>
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
        labels: {},
        sendAgain: true,
        isModalShow: false,
        modelRow: [],
        value: 0,
        userInfo: {},
        radioStyle: {
            display: 'block',
            height: '.3rem',
            lineHeight: '.3rem',
            fontSize: '.16rem'
        }
      }
  },
  watch: {
    $route() {
      this.devData();
    }
  },
  mounted() {
    this.labelDev();
  },
  methods: {
      offline(id, is_on) {
        let _obj = {
            id: id,
            is_on: is_on == 0 ? 1 : 0
        };
        this.handleModify(_obj);
      },
      placement(id) {
          let _obj = {
              id: id,
              top: true
          };
          this.handleModify(_obj);
      },
      handleModify(obj={}) { //置顶，下线职位
          ajax.put('jobs', obj).then(res => {
              if(res.retcode == 0) {
                  this.devData();
                  this.$message.success(res.msg);
              }
          });
      },
      modify(id) {
        this.$router.push({
            path: 'job-release',
            query: {
                id: id
            }
        })
      },
      modifyResume() {
        this.$router.push({
          path: 'resume-detail'
        })
      },
      collectionPosition(collect) { //收藏职位
        let userInfo = util.getStore('userInfo');
        if(!userInfo){
            this.$router.push('/login');
            return;
        }
        let _id = this.$route.query.id;
        if(collect){
            ajax.post('user/collectionPosition', {
              user_id: userInfo.id,
              position_id: _id
            }).then(res => {
              if(res.retcode == 0) {
                this.$message.success(res.msg);
                this.devData();
              }
          })
        }else{
            ajax.delete('user/collectionPosition', {
              user_id: userInfo.id,
              position_id: _id
            }).then(res => {
              if(res.retcode == 0) {
                this.$message.success(res.msg);
                this.devData();
              }
            })
        }
      },
      handleCancel() { //关闭弹窗
          this.isModalShow = false;
      },
      handleModel(e) { //显示弹窗
          let userInfo = util.getStore('userInfo');
          if(!userInfo){
            this.$router.push('/login');
            return;
          }
          ajax.get('user/annexResumes/list', {
              user_id: userInfo.id
          }).then(res => {
              if(res.retcode == 0) {
                  this.ModelRow = res.data || [];
                  this.isModalShow = true;
              }
          })
      },
      handleresume() {
        let userInfo = util.getStore('userInfo');
        let _id = this.$route.query.id;
        ajax.post('user/sendResumes', {
              user_id: userInfo.id,
              job_id: this.params.id,
              company_id: this.params.user_id,
              resumes_type: this.value
        }).then(res => {
              if(res.retcode == 0) {
                  this.isModalShow = false;
                  this.devData();
                  this.$message.success(res.msg);
              }
        })
      },
      labelDev() {
          let userInfo = util.getStore('userInfo');
          this.userInfo = userInfo;
          ajax.get('label').then(res => {
              if(res.retcode == 0) {
                  this.labels = res.data || {};
                  this.devData();
              }
          });
      },
      devData() {
          let userInfo = util.getStore('userInfo');
          // if(!userInfo){
          //   return;
          // }
          let _id = this.$route.query.id;
          let query = {
             job_id: _id
          }
          if(userInfo){
            query.user_id = userInfo.id;
          }
          ajax.get('jobs/detail', query).then(res => {
            if(res.retcode == 0) {
              console.log(res.data)
              this.params = res.data.jobDetail || {};
              this.sendAgain = res.data.sendAgain;
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
              });
              this.labels.trades.map(item => {
                if(item.id = this.params.trade) {
                  this.params = Object.assign(this.params, {trade: item.labelName});
                }
              });
              console.log( this.params,9999)
            }
          })
      }
  }
};
</script>