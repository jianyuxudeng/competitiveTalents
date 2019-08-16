<template>
  <section id="resume_detail" class="resume_detail">
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
                    <p>{{experience.length > 0 ? experience[0].company_name : null}} / {{experience.length > 0 ? experience[0].career_name : null}}</p>
                    <p>{{userDetail.workTimeLen}}工作经验 / {{education.length > 0 ? education[0].qualifications : null}} / {{userDetail.birthLen}}岁</p>
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
                <a @click="edit('info')" v-if="isEdit && isShow">
                  <em><img src="../../assets/images/edit.png" alt=""></em>
                  <span>编辑</span>
                </a>
              </a-row>
            </div>
            <!-- 视频 -->
            <div id="video">
              <div class="title">
                <span>可视化描述</span>
                <a v-if="isEdit  && isShow" @click="add('video')">
                  <em><a-icon type="plus-square" /></em>
                  <span>添加</span>
                </a>
              </div>
              <a-row type="flex" justify="space-between" align="top" v-if="Object.keys(desVideo).length > 0">
                <div class="video">
                  <video width="100%" height="100%" controls>
                    <source :src="desVideo.video_link" type="video/mp4">
                    <source :src="desVideo.video_link" type="video/ogg">
                    您的浏览器不支持 HTML5 video 标签。
                  </video>
                </div>
                <div v-if="isEdit  && isShow" class="btn">
                  <a>
                    <em><img src="../../assets/images/edit.png" alt=""></em>
                    <span @click="edit('video')">编辑</span>
                  </a>
                  <a>
                    <em><a-icon type="close-square" /></em>
                    <span @click="del('video', item.id)">删除</span>
                  </a>
                </div>
              </a-row>
            </div>
            <!-- 工作经历 -->
            <div id="job_experience">
              <div class="title">
                <span>工作经历</span>
                <a v-if="isEdit  && isShow">
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
                        <p>{{item.company_name}} / {{item.department}}</p>
                        <span>{{item.career_name}}</span>
                      </dd>
                    </dl>
                    <div class="item_btn">
                      <p>
                        {{item.come_time ? formatMouth(item.come_time) : item.come_time}}
                        -
                        {{item.leave_time ? formatMouth(item.leave_time) : item.leave_time}}
                      </p>
                      <a v-if="isEdit  && isShow">
                        <em><img src="../../assets/images/edit.png" alt=""></em>
                        <span @click="edit('job-experience', item)">编辑</span>
                      </a>
                      <a v-if="isEdit  && isShow">
                        <em><a-icon type="close-square" /></em>
                        <span @click="del('experience', item.id)">删除</span>
                      </a>
                    </div>
                  </div>
                  <div class="jobs">
                    <span v-for="(i, index) in item.skillsName" :key="index">{{i}}</span>
                  </div>
                  <p>{{item.content}}</p>
                </div>
              </div>
            </div>
            <!-- 项目经历 -->
            <div id="projectExpress">
              <div class="title">
                <span>项目经历</span>
                <a v-if="isEdit  && isShow" @click="add('projectExpress')">
                  <em><a-icon type="plus-square" /></em>
                  <span>添加</span>
                </a>
              </div>
              <div class="project_experience">
                <div class="item" v-for="item in projectExpress" :key="item.id">
                  <div class="item_title">
                    <span>{{item.project_name}}（{{item.company_name}}）</span>
                    <div class="item_btn">
                      <p>
                        {{item.begin_time ? formatMouth(item.begin_time) : item.begin_time}}
                        -
                        {{item.end_time ? formatMouth(item.end_time) : item.end_time}}
                      </p>
                      <a v-if="isEdit  && isShow">
                        <em><img src="../../assets/images/edit.png" alt=""></em>
                        <span @click="edit('projectExpress', item)">编辑</span>
                      </a>
                      <a v-if="isEdit  && isShow">
                        <em><a-icon type="close-square" /></em>
                        <span @click="del('projectExpress', item.id)">删除</span>
                      </a>
                    </div>
                  </div>
                  <p>{{item.project_des}}</p>
                  <p>{{item.achievement}}</p>
                </div>
              </div>
            </div>
            <!-- 教育经历 -->
            <div id="education">
              <div class="title">
                <span>教育经历</span>
                <a v-if="isEdit && isShow" @click="add('education')">
                  <em><a-icon type="plus-square" /></em>
                  <span>添加</span>
                </a>
              </div>
              <div class="education_experience" v-for="item in education" :key="item.id">
                <dl>
                  <dt><img src="../../assets/images/company_img.png" alt=""></dt>
                  <dd>
                    <p>{{item.school_name}}</p>
                    <span>{{item.qualifications}} / {{item.major}}</span>
                  </dd>
                </dl>
                <div class="item_btn">
                  <p>
                    {{item.start_time ? formatMouth(item.start_time) : item.start_time}}
                    -
                    {{item.end_time ? formatMouth(item.end_time) : item.end_time}}
                  </p>
                  <a v-if="isEdit && isShow">
                    <em><img src="../../assets/images/edit.png" alt=""></em>
                    <span @click="edit('education', item)">编辑</span>
                  </a>
                  <a v-if="isEdit && isShow">
                    <em><a-icon type="close-square" /></em>
                    <span @click="del('education', item.id)">删除</span>
                  </a>
                </div>
              </div>
            </div>
            <!-- 社交主页 -->
            <div id="social">
              <div class="title">
                <span>社交主页</span>
                <a v-if="isEdit && isShow" @click="add('social')">
                  <em><a-icon type="plus-square" /></em>
                  <span>添加</span>
                </a>
              </div>
              <div class="social_url" v-for="item in social" :key="item.id">
                <dl>
                  <dt><img src="../../assets/images/social.png" alt=""></dt>
                  <dd>{{item.social_link}}</dd>
                </dl>
                <div v-if="isEdit && isShow" class="item_btn">
                  <a @click="edit('social', item)">
                    <em><img src="../../assets/images/edit.png" alt=""></em>
                    <span>编辑</span>
                  </a>
                  <a @click="del('social', item.id)">
                    <em><a-icon type="close-square" /></em>
                    <span>删除</span>
                  </a>
                </div>
              </div>
            </div>
            <!-- 图片作品 -->
            <div id="collection">
              <div class="title">
                <span>图片作品</span>
                <a v-if="isEdit && isShow" @click="add('collection')">
                  <em><a-icon type="plus-square" /></em>
                  <span>添加</span>
                </a>
              </div>
              <div class="picture">
                <div v-for="item in collection" :key="item.id">
                  <img :src="item.collection_link" alt="">
                  <a v-if="isEdit && isShow" @click="del('collection', item.id)"><a-icon type="delete" /></a>
                </div>
              </div>
            </div>
          </div>
          <div class="foot">
            <a v-if="isShow" @click="download">
              <a-icon type="download" />
              <span>把这份简历保存到本地</span>
            </a>
            <p>简历更新时间 2019-07-06 17:48</p>
          </div>
          <div class="foot flexCenter" v-if="!isEdit && isShow">
            <a-button v-if="!sendStatus.is_interview&&sendStatus.is_read!=2" @click="addMace" type="primary">邀请面试</a-button>
            <a-button v-if="sendStatus.is_interview&&sendStatus.is_read!=2" disabled type="primary">已邀请</a-button>
            <a-button v-if="sendStatus.is_read!=2" @click="notNeed">不适合</a-button>
            <span v-if="sendStatus.is_read==2">不适合</span>
          </div>
        </div>
        <div class="resume_right">
          <!-- 求职意向 -->
          <div class="job_intention">
            <div class="title">
              <p>求职意向</p>
              <div>
                <a v-if="isEdit && isShow" @click="edit('objective', objective)">
                  <em><img src="../../assets/images/edit.png" alt=""></em>
                  <span>编辑</span>
                </a>
              </div>
            </div>
            <p>
              <em><img src="../../assets/images/position.png" alt=""></em>
              <span>{{objective.expected_position_name}}/{{objective.job_type_name}}</span>
            </p>
            <p>
              <em><img src="../../assets/images/address.png" alt=""></em>
              <span>{{objective.city && objective.city != 'null' ? JSON.parse(objective.city).cityName : objective.cityName}}</span>
            </p>
            <p>
              <em><img src="../../assets/images/money.png" alt=""></em>
              <span>{{objective.expected_salary}}/月</span>
            </p>
            <p>
              <em><img src="../../assets/images/time.png" alt=""></em>
              <span>{{objective.now_status}} / {{objective.work_time}}</span>
            </p>
          </div>
          <!-- 附件简历 -->
          <div class="enclosure">
            <div class="title">
              <p>附件简历</p>
              <a v-if="isEdit && isShow" @click="add('annexResumes')">
                <em><a-icon type="plus-square" /></em>
                <span>添加</span>
              </a>
            </div>
            <p v-for="item in annexResumes" :key="item.id">
              <span>{{item.resume_link}}</span>
              <a v-if="isEdit && isShow" @click="del('annexResumes', item.id)"><a-icon type="delete" /></a>
            </p>
          </div>
          <!-- 简历完整度 -->
          <div class="completeness">
            <div class="title">
              <p>简历完整度： {{process}}%</p>
              <a @click="showResumes">
                <em><a-icon type="search" /></em>
                <span>简历预览</span>
              </a>
            </div>
            <a-progress :percent="process" :showInfo="false" />
          </div>
          <!-- 导航 -->
          <div class="nav">
            <div v-for="(item, index) in navs" :key="index" :class="{active: active == index}" @click.stop="goItem(index)">
              <a :href="'#' + item.url" :style="{width: active == index ? 'auto' : '100%'}">{{item.name}}</a>
              <div v-if="active == index">
                <div v-if="item.url == 'info'">
                  <a v-if="isEdit && isShow" @click.stop="edit('info')">编辑</a>
                </div>
                <div v-else>
                  <a v-if="isEdit && isShow" @click="add(item.url)">添加</a>
                  <a v-if="isEdit && isShow" @click="del(item.url)">删除</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-row>
      <infoModal :modelEdit="infoModel" @cancelModel="cancelModel" @okModel="okModel"></infoModal>
      <videoModal :modelEdit="videoModel" @cancelModel="cancelModel"></videoModal>
      <jobExperienceModal :modelEdit="jobExperienceModal" @cancelModel="cancelModel" @okModel="okModel"></jobExperienceModal>
      <projectExpressModal :modelEdit="projectExpressModal" @cancelModel="cancelModel" @okModel="okModel"></projectExpressModal>
      <educationModal :modelEdit="educationModal" @cancelModel="cancelModel" @okModel="okModel"></educationModal>
      <socialModal :modelEdit="socialModal" @cancelModel="cancelModel" @okModel="okModel"></socialModal>
      <collectionModal :modelEdit="collectionModal" @cancelModel="cancelModel" @okModel="okModel"></collectionModal>
      <objectiveModal :modelEdit="objectiveModal" @cancelModel="cancelModel" @okModel="okModel"></objectiveModal>
      <annexResumesModal :modelEdit="annexResumesModal" @cancelModel="cancelModel" @okModel="okModel"></annexResumesModal>
      <a-modal
            :confirmLoading="false"
            :visible="showResumesVis"
            class='resumesImg'
            @cancel="handleCancel"
      >
        <img v-if="resumesImg" :src="resumesImg" />
      </a-modal>
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
    jobExperienceModal: () => import('../../components/molecule/job-experience'),
    projectExpressModal: () => import('../../components/molecule/projectExpressModal'),
    educationModal: () => import('../../components/molecule/educationModal'),
    socialModal: () => import('../../components/molecule/socialModal'),
    collectionModal: () => import('../../components/molecule/collectionModal'),
    objectiveModal: () => import('../../components/molecule/objectiveModal'),
    annexResumesModal: () => import('../../components/molecule/annexResumesModal')
  },
  data() {
      return{
        isEdit: false,
        isShow: true,
        active: null,
        infoModel: null,
        videoModel: null,
        jobExperienceModal: null,
        projectExpressModal: null,
        educationModal: null,
        socialModal: null,
        collectionModal: null,
        objectiveModal: null,
        annexResumesModal: null,
        navs: [
          {name: '基本信息', url: 'info'},
          {name: '可视化描述', url: 'video'},
          {name: '工作经历', url: 'job_experience'},
          {name: '项目经验', url: 'projectExpress'},
          {name: '教育经历', url: 'education'},
          {name: '社交主页', url: 'social'},
          {name: '图片作品', url: 'collection'}
        ],
        userDetail: {},
        desVideo: {},
        experience: [],
        projectExpress: [],
        education: [],
        sendStatus:{},
        social: [],
        collection: [],
        objective: {},
        annexResumes: [],
        user_id: null,
        process: 0,
        showResumesVis:false,
        resumesImg:null
      }
  },
  mounted() {
    this.init();
  },
  methods: {
    formatMouth: util.formatMouth,
    init() {
      let userInfo = util.getStore('userInfo');
      this.isEdit = userInfo.id == this.$route.query.user_id && userInfo.type==2;
      if(!this.$route.query.user_id && userInfo.type==2){
         this.isEdit = true;
      }
      this.user_id = this.$route.query.user_id || userInfo.id;
      this.getData();
    },
    goItem(index) { //导航
      this.active = index;
    },
    addMace(){
      ajax.put('company/resumes',{
        id:this.$route.query.id,
        is_interview:1
      }).then(res => {
        if(res.retcode == 0) {
          this.getData();
        }
      })
    },
    notNeed(){
        ajax.put('company/resumes',{
          id:this.$route.query.id,
          is_read:2
        }).then(res => {
          if(res.retcode == 0) {
            this.getData();
          }
        })
    },
    handleCancel(){
      this.showResumesVis =false;
    },
    showResumes(){
        let canvas2 = document.createElement("canvas");
        let w = parseInt(document.querySelector("#resume_detail").clientWidth);
        let h = parseInt(document.querySelector("#resume_detail").clientHeight);
        //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
        this.isShow = false;
        canvas2.width = w * 2;
        canvas2.height = h * 2;
        canvas2.style.width = w + "px";
        canvas2.style.height = h + "px";
        //可以按照自己的需求，对context的参数修改,translate指的是偏移量   
        let context = canvas2.getContext("2d");
        context.scale(2,2);
        setTimeout(()=>{
          html2canvas(document.querySelector("#resume_detail"),{
            taintTest: false,
            allowTaint:true,
            userCORS: true,
            canvas:canvas2,
            y:0,
            x:0
          }).then(canvas => {
              this.resumesImg = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
              this.showResumesVis =true;
              this.isShow = true;
          });
        },30)
       
    },
    download(){
        // $("#resume_detail").wordExport();
        let canvas2 = document.createElement("canvas");
        let w = parseInt(document.querySelector("#resume_detail").clientWidth);
        let h = parseInt(document.querySelector("#resume_detail").clientHeight);
        //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
        canvas2.width = w * 2;
        canvas2.height = h * 2;
        canvas2.style.width = w + "px";
        canvas2.style.height = h + "px";
        this.isShow = false;
        //可以按照自己的需求，对context的参数修改,translate指的是偏移量   
        let context = canvas2.getContext("2d");
        context.scale(2,2);
        setTimeout(()=>{
          html2canvas(document.querySelector("#resume_detail"),{
            taintTest: false,
            allowTaint:true,
            userCORS: true,
            canvas:canvas2,
            y:0,
            x:0
          }).then(canvas => {
                const imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                const a = document.createElement('a');
                a.href = imgUri;
                a.click();
                this.isShow = true;
          });
        },30)
    },
    add(name) { //添加
      switch (name) {
        case 'video':
          this.videoModel = Object.assign({}, {
            title: '上传可视化描述视频',
            isEdit: false
          });
          break;
        case 'job-experience':
          this.jobExperienceModal = Object.assign({}, {
            title: '',
            isEdit: false
          });
          break;
        case 'projectExpress':
          this.projectExpressModal = Object.assign({}, {
            title: '',
            isEdit: false
          });
          break;
        case 'education':
          this.educationModal = Object.assign({}, {
            title: '',
            isEdit: false
          });
          break;
        case 'social':
          this.socialModal = Object.assign({}, {
            title: '',
            isEdit: false
          });
          break;
        case 'collection':
          this.collectionModal = Object.assign({}, {
            title: '作品集上传',
            isEdit: false
          });
          break;
        case 'annexResumes':
          this.annexResumesModal = Object.assign({}, {
            title: '上传附件简历',
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
            title: '上传可视化描述视频',
            isEdit: true
          });
          break;
        case 'job-experience':
          this.jobExperienceModal = Object.assign(e, {
            title: '',
            isEdit: true
          });
          break;
        case 'projectExpress':
          this.projectExpressModal = Object.assign(e, {
            title: '',
            isEdit: true
          });
          break;
        case 'education':
          this.educationModal = Object.assign(e, {
            title: '',
            isEdit: true
          });
          break;
        case 'social':
          this.socialModal = Object.assign(e, {
            title: '',
            isEdit: true
          });
          break;
        case 'objective':
          this.objectiveModal = Object.assign(e, {
            title: '',
            isEdit: true
          });
          break;
        default:
          break;
      };
    },
    del(url, id) {
      let _url = 'user/' + url + '/' + id;
      ajax.delete(_url).then(res => {
        if(res.retcode == 0) {
          this.getData();
        }
      })
    },
    cancelModel(name) { //点击弹窗关闭按钮时，清空弹窗数据
      this[name] = null;
    },
    okModel(name) {
      this[name] = null;
      this.getData();
    },
    getData() { //获取数据
      let query={
        user_id: this.user_id
      }
      if(this.$route.query.id){
        query.id = this.$route.query.id;
      }
      ajax.get('user/resume/detail', query).then(res => {
        let _data = res.data;
        if(_data) {
          this.userDetail = _data.userDetail[0] || {};
          this.desVideo = _data.desVideo[0] || {};
          this.experience = _data.experience || [];
          this.projectExpress = _data.projectExpress || [];
          this.education = _data.education || [];
          this.social = _data.social || [];
          this.collection = _data.collection || [];
          this.objective = _data.objective[0] || {};
          this.process = parseFloat(_data.process) || 0;
          this.experience.map(item => {
            if(item.skills) item.skillsName = item.skills.split(',');
          });
          if(_data.sendStatus){
          this.sendStatus = _data.sendStatus[0]||{};
            if(this.sendStatus.is_read==0){
              ajax.put('company/resumes',{
                id:this.$route.query.id,
                is_read:1
              })
            }
          }
        }
      })
    },
    getAnnexResumes() {
      ajax.get('user/annexResumes/list', {user_id: this.user_id}).then(res => {
        if(res.retcode == 0) {
          if(res.data.length > 0) {
            res.data.map(item => {
              this.annexResumes.push(item.resume_link);
            })
          }
        };
      })
    }
  }
};
</script>