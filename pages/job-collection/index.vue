<template>
    <section>
        <div class="nav-bg"></div>
        <div class="collection">
            <a-row type="flex" justify="space-between" align="top">
                <div class="left">
                    <div class="title">
                        <a-row type="flex" justify="space-between" align="middle">
                            <span>我收藏的职位</span>
                        </a-row>
                    </div>
                    <div class="list">
                        <div class="item" v-for="(item, index) in rows" :key="index">
                            <dl>
                                <dt><img :src="item.logo" alt=""></dt>
                                <dd>
                                    <h4>{{item.careersName}} <span>{{item.jobPrice}}/月</span></h4>
                                    <p>{{item.companyName}}</p>
                                    <span>{{item.trade}}/{{item.capitalize}}/{{item.region.cityName}}/{{item.type}}</span>
                                </dd>
                            </dl>
                            <div class="btn">
                                <p>发布时间 <span>{{item.sendTime}}</span></p>
                                <div>
                                    <a @click="collectionPosition(item)">取消收藏</a>
                                    <em></em>
                                    <a @click="handleModel(item)">投简历</a>
                                    <!-- <span>已下线</span> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <Interest></Interest>
                </div>
            </a-row>
        </div>
        <a-modal
            title="投递简历"
            :confirmLoading="false"
            :visible="isModalShow"
            class="collectionModal"
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
                                    <a>预览</a>
                                    <em></em>
                                    <a>修改</a>
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
  name: "job-collection",
  async asyncData(){
     return{

     }
  },
  components: {
    Interest: () => import('../../components/atom/Interest')
  },
  data() {
      return{
          isModalShow: false,
          value: null,
          radioStyle: {
              display: 'block',
              height: '.3rem',
              lineHeight: '.3rem',
              fontSize: '.16rem'
          },
          labels: {},
          rows: [],
          modelRow: [],
          userInfo: {}
      }
  },
  mounted() {
      this.labelDev();
      this.init();
  },
  methods: {
      init() {
          this.userInfo = util.getStore('userInfo');
      },
      handleCancel() { //关闭弹窗
          this.isModalShow = false;
      },
      handleModel(e) { //显示弹窗
          ajax.get('user/annexResumes/list', {
              user_id: this.userInfo.id
          }).then(res => {
              if(res.retcode == 0) {
                  this.ModelRow = res.data || [];
                  this.isModalShow = true;
              }
          })
      },
      handleresume() {
          ajax.post('user/sendResumes', {
              user_id: this.userInfo.id,
              job_id: this.pamars.id,
              company_id: this.pamars.user_id,
              resumes_type: this.value
          }).then(res => {
              if(res.retcode == 0) {
                  this.isModalShow = false;
                  this.devData();
              }
          })
      },
      collectionPosition(e) {
          ajax.delete('user/collectionPosition', {
              user_id: e.user_id,
              position_id: e.id
          }).then(res => {
              if(res.retcode == 0) {
                  this.devData();
              }
          })
      },
      labelDev() {
          ajax.get('label').then(res => {
              if(res.retcode == 0) {
                  this.labels = res.data || {};
                  this.devData();
              }
          })
      },
      devData() {
          let userInfo = util.getStore('userInfo');
          ajax.get('user/collectionPosition/list', {user_id: userInfo.id}).then(res => {
              if(res.retcode == 0) {
                  this.rows = res.data || [];
                  this.rows.map(item => {
                      item.capitalize = item.capitalize ? this.labels.capitalizes.find(i => i.id == item.capitalize).labelName : null;
                      item.region = item.region ? JSON.parse(item.region) : null;
                      item.type = item.type ? this.labels.jobTypes.find(i => i.id == item.type).labelName : null;
                      item.trade = item.trade ? this.labels.trades.find(i => i.id == item.trade).labelName : null;
                      item.sendTime = util.format(item.sendTime);
                  })
              }
          })
      }
  }
};
</script>