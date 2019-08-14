<template>
  <section class="resume_detail">
      <div class="nav-bg"></div>
      <a-row type="flex" justify="space-between" class="resume">
        <div class="resume_left">
          <div class="centent">
            <!-- 个人信息 -->
            <div class="info">
              <a-row type="flex" justify="space-between" align="top">
                <dl>
                  <dt><img src="../../assets/images/tx.png" alt=""></dt>
                  <dd>
                    <div class="name">{{userDetail.username}}</div>
                    <p>上海银来投资集团 / 设计师</p>
                    <p>7年工作经验 / 大专 / 30岁</p>
                    <div class="tel">
                      <div v-if="userDetail.phone">
                        <a-icon type="tablet" />
                        <span>{{userDetail.phone}}</span>
                      </div>
                      <div v-if="userDetail.email">
                        <a-icon type="mail" />
                        <span>{{userDetail.email}}</span>
                      </div>
                    </div>
                  </dd>
                </dl>
                <a @click="edit('info')" v-if="isEdit">
                  <em><img src="../../assets/images/edit.png" alt=""></em>
                  <span>编辑</span>
                </a>
              </a-row>
            </div>
            <!-- 视频 -->
            <div id="video">
              <div class="title">
                <span>可视化描述</span>
              </div>
              <a-row type="flex" justify="space-between" align="top">
                <div class="video">
                  <video width="100%" height="100%" controls>
                    <source src="movie.mp4" type="video/mp4">
                    <source src="movie.ogg" type="video/ogg">
                    您的浏览器不支持 HTML5 video 标签。
                  </video>
                </div>
                <div class="btn">
                  <a>
                    <em><img src="../../assets/images/edit.png" alt=""></em>
                    <span @click="edit('video')">编辑</span>
                  </a>
                  <a>
                    <em><a-icon type="close-square" /></em>
                    <span>删除</span>
                  </a>
                </div>
              </a-row>
            </div>
            <!-- 工作经历 -->
            <div id="job_experience">
              <div class="title">
                <span>工作经历</span>
                <a>
                  <em><a-icon type="plus-square" /></em>
                  <span @click="add('job-experience')">添加</span>
                </a>
              </div>
              <div class="job_experience">
                <div class="item" v-for="item in experience" :key="item.id">
                  <div class="item_info">
                    <dl>
                      <dt><img src="../../assets/images/company_img.png" alt=""></dt>
                      <dd>
                        <p>上海银来投资集团 / 设计部</p>
                        <span>平面设计师</span>
                      </dd>
                    </dl>
                    <div class="item_btn">
                      <!-- <p>2016.06-至今</p> -->
                      <a>
                        <em><img src="../../assets/images/edit.png" alt=""></em>
                        <span @click="edit('job-experience', item)">编辑</span>
                      </a>
                      <a>
                        <em><a-icon type="close-square" /></em>
                        <span>删除</span>
                      </a>
                    </div>
                  </div>
                  <div class="jobs">
                    <span>网站，APP</span>
                    <span>网站，APP</span>
                  </div>
                  <p>负责集团品牌视觉。</p>
                  <p>包括：</p>
                  <p>1，天成酒业VIS及京东商城整体设计。</p>
                  <p>2，天成酒业VIS及京东商城整体设计。</p>
                </div>
              </div>
            </div>
            <!-- 项目经历 -->
            <div id="project_experience">
              <div class="title">
                <span>项目经历</span>
                <a>
                  <em><a-icon type="plus-square" /></em>
                  <span>添加</span>
                </a>
              </div>
              <div class="project_experience">
                <div class="item">
                  <div class="item_title">
                    <span>天成酒业品牌包装（上海银来投资集团）</span>
                    <p>
                      <span>2016.06-2017.01</span>
                    </p>
                  </div>
                  <p>集团收购江苏天成酒业，重新包装上线。</p>
                  <p>负责项目logo，VI，广告投放，京东天成酒类专营店，手册等设计。</p>
                </div>
              </div>
            </div>
            <!-- 教育经历 -->
            <div id="education_experience">
              <div class="title">
                <span>教育经历</span>
                <a>
                  <em><a-icon type="plus-square" /></em>
                  <span>添加</span>
                </a>
              </div>
              <div class="education_experience">
                <dl>
                  <dt><img src="../../assets/images/company_img.png" alt=""></dt>
                  <dd>
                    <p>上海师范大学</p>
                    <span>大专 / 视觉传达</span>
                  </dd>
                </dl>
                <div>
                  <p>2008-2011</p>
                </div>
              </div>
            </div>
            <!-- 社交主页 -->
            <div id="social_url">
              <div class="title">
                <span>社交主页</span>
                <a>
                  <em><a-icon type="plus-square" /></em>
                  <span>添加</span>
                </a>
              </div>
              <div class="social_url">
                <dl>
                  <dt><img src="../../assets/images/social.png" alt=""></dt>
                  <dd>http://sdefdsfsdfgsdgdfg.com</dd>
                </dl>
                <div class="item_btn">
                  <a>
                    <em><img src="../../assets/images/edit.png" alt=""></em>
                    <span>编辑</span>
                  </a>
                  <a>
                    <em><a-icon type="close-square" /></em>
                    <span>删除</span>
                  </a>
                </div>
              </div>
            </div>
            <!-- 图片作品 -->
            <div id="picture">
              <div class="title">
                <span>图片作品</span>
                <a>
                  <em><a-icon type="plus-square" /></em>
                  <span>添加</span>
                </a>
              </div>
              <div class="picture">
                <div v-for="item in 10" :key="item">
                  <img src="../../assets/images/picture.png" alt="">
                  <a><a-icon type="delete" /></a>
                </div>
              </div>
            </div>
          </div>
          <div class="foot">
            <a>
              <a-icon type="download" />
              <span>把这份简历保存到本地</span>
            </a>
            <p>简历更新时间 2019-07-06 17:48</p>
          </div>
        </div>
        <div class="resume_right">
          <!-- 求职意向 -->
          <div class="job_intention">
            <div class="title">
              <p>求职意向</p>
              <div>
                <a>
                  <em><img src="../../assets/images/edit.png" alt=""></em>
                  <span>编辑</span>
                </a>
              </div>
            </div>
            <p>
              <em><img src="../../assets/images/position.png" alt=""></em>
              <span>平面设计师/主管</span>
            </p>
            <p>
              <em><img src="../../assets/images/isFull.png" alt=""></em>
              <span>全职</span>
            </p>
            <p>
              <em><img src="../../assets/images/address.png" alt=""></em>
              <span>上海</span>
            </p>
            <p>
              <em><img src="../../assets/images/money.png" alt=""></em>
              <span>14k-18k/月</span>
            </p>
            <p>
              <em><img src="../../assets/images/time.png" alt=""></em>
              <span>积极找工作 / 2周以内</span>
            </p>
          </div>
          <!-- 附件简历 -->
          <div class="enclosure">
            <div class="title">
              <p>附件简历</p>
              <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                <a>
                  <em><a-icon type="plus-square" /></em>
                  <span>添加</span>
                </a>
              </a-upload>
            </div>
            <p></p>
          </div>
          <!-- 简历完整度 -->
          <div class="completeness">
            <div class="title">
              <p>简历完整度： 98%</p>
              <a>
                <em><a-icon type="search" /></em>
                <span>简历预览</span>
              </a>
            </div>
            <a-progress :percent="98" :showInfo="false" />
          </div>
          <!-- 导航 -->
          <div class="nav">
            <div v-for="(item, index) in navs" :key="index" :class="{active: active == index}" @click.stop="goItem(index)">
              <a :href="'#' + item.url" :style="{width: active == index ? 'auto' : '100%'}">{{item.name}}</a>
              <div v-if="active == index">
                <div v-if="item.url == 'info'">
                  <a @click.stop="edit('info')">编辑</a>
                </div>
                <div v-else>
                  <a>添加</a>
                  <a>删除</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-row>
      <infoModal :modelEdit="infoModel" @cancelModel="cancelModel" @okModel="okModel"></infoModal>
      <videoModal :modelEdit="videoModel" @cancelModel="cancelModel"></videoModal>
      <jobExperienceModal :modelEdit="jobExperienceModal" @cancelModel="cancelModel" @okModel="okModel"></jobExperienceModal>
  </section>
</template>

<script>
import "./index.less";
import ajax from '../../plugins/api';
import util from '../../plugins/utils/util';

export default {
  name: "resume_detail",
  async asyncData(){
     return{

     }
  },
  components: {
    infoModal: () => import('../../components/molecule/infoModal'),
    videoModal: () => import('../../components/molecule/videoModal'),
    jobExperienceModal: () => import('../../components/molecule/job-experience')
  },
  data() {
      return{
        isEdit: true,
        active: null,
        infoModel: null,
        videoModel: null,
        jobExperienceModal: null,
        navs: [
          {name: '基本信息', url: 'info'},
          {name: '可视化描述', url: 'video'},
          {name: '工作经历', url: 'job_experience'},
          {name: '项目经验', url: 'project_experience'},
          {name: '教育经历', url: 'education_experience'},
          {name: '社交主页', url: 'social_url'},
          {name: '图片作品', url: 'picture'}
        ],
        userDetail: {},
        desVideo: {},
        experience: [],
        user_id: null
      }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let userInfo = util.getStore('userInfo');
      this.isEdit = this.$route.query.isEdit || true;
      this.user_id = this.$route.query.user_id || userInfo.id;
      this.getData();
    },
    goItem(index) { //导航
      this.active = index;
    },
    add(name) { //添加
      switch (name) {
        case 'job-experience':
          this.jobExperienceModal = Object.assign({}, {
            title: '',
            isEdit: false
          });
          break;
      
        default:
          break;
      }
    },
    edit(name, e) { //编辑
      switch (name) {
        case 'info':
          this.infoModel = Object.assign(this.userDetail, {
            title: ''
          });
          break;
        case 'video':
          this.videoModel = Object.assign(this.desVideo, {
            title: '上传可视化描述视频'
          });
          break;
        case 'job-experience':
          this.jobExperienceModal = Object.assign(e, {
            title: '',
            isEdit: true
          });
          break;
        default:
          break;
      };
    },
    cancelModel(name) { //点击弹窗关闭按钮时，清空弹窗数据
      this[name] = {};
    },
    okModel(name) {
      this[name] = {};
      this.getData();
    },
    getData() { //获取数据
      ajax.get('user/resume/detail', {user_id: this.user_id}).then(res => {
        let _data = res.data;
        if(_data) {
          this.userDetail = _data.userDetail[0] || {};
          this.desVideo = _data.desVideo[0] || {};
          this.experience = _data.experience || [];
        }
      })
    }
  }
};
</script>