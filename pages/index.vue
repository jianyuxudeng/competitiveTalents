<template>
  <section class="container">
    <!-- banner -->
    <div class="banner">
      <a-carousel arrows dotsClass="slick-dots slick-thumb">
        <div
          slot="prevArrow" 
          class="custom-slick-arrow"
          style="left: 1.9rem; zIndex: 1"
        >
          <a-icon type="left" :style="{color: '#3199ff'}" />
        </div>
        <div
          slot="nextArrow" 
          class="custom-slick-arrow"
          style="right: 1.9rem"
        >
          <a-icon type="right" :style="{color: '#3199ff'}" />
        </div>
        <div v-for="(item, index) in banners" :key="index"><img :src="item.img" alt=""></div>
      </a-carousel>
    </div>
    <!-- freeker -->
    <div class="services freeker" v-if="!userInfo || userInfo.type == 2">
      <Title :title="freeker.title" :titleEn="freeker.titleEn"></Title>
      <div class="freeker_search">
        <a-input-search
            @search="onSearch"
        />
      </div>
      <div class="freeker_conten">
        <Services className="freeker" :list="freeker.list"></Services>
      </div>
    </div>
    <!-- infoEnterprise -->
    <div class="services enterprise" v-if="userInfo && userInfo.type == 3">
      <Title :title="infoEnterprise.title" :titleEn="infoEnterprise.titleEn"></Title>
      <div class="enterprise_conten">
        <Services className="enterprise" :list="infoEnterprise.list" @servicesItem="handleInfoEnterprise"></Services>
      </div>
    </div>
    <!-- enterprise -->
    <div class="services enterprise" v-if="!userInfo">
      <Title :title="enterprise.title" :titleEn="enterprise.titleEn"></Title>
      <div class="enterprise_conten">
        <Services className="enterprise" :list="enterprise.list" @servicesItem="handleEnterprise"></Services>
      </div>
    </div>
    <!-- recommend -->
    <div class="services demands">
      <Title 
        :title="userInfo ? recommend.title : demands.title" 
        :titleEn="userInfo ? recommend.titleEn : demands.titleEn"
      ></Title>
      <div class="demands_conten">
        <Demands :userInfo="userInfo"></Demands>
      </div>
      <div class="btn"><a @click="onMore">MORE +</a></div>
    </div>
    <!-- information -->
    <div class="services information">
      <Title :title="information.title" :titleEn="information.titleEn"></Title>
      <ul>
        <li>
          <Information :list="information.dynamic" title="行业动态"></Information>
        </li>
        <li>
          <Information :list="information.answers" title="行业问答"></Information>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import "./index.less";
import util from '../plugins/utils/util';

export default {
  name: "home",
  components: {
    Title: () => import('../components/atom/Title'),
    Services: () => import('../components/molecule/services'),
    Demands: () => import('../components/molecule/demands'),
    Information: () => import('../components/molecule/information')
  },
  async asyncData(){
     return{
       //banner
       banners: [
         {
           img: require('../assets/images/banner.jpg'),
           title: ''
         },
         {
           img: require('../assets/images/banner.jpg'),
           title: ''
         },
         {
           img: require('../assets/images/banner.jpg'),
           title: ''
         }
       ],
       //freeker
       freeker: {
         title: '个人电竞职客服务',
         titleEn: 'FREEKER SERVICES',
         list: [
           {img: require('../assets/images/freeker1.png'), text: '赛事相关职位'},
           {img: require('../assets/images/freeker2.png'), text: '电竞俱乐部'},
           {img: require('../assets/images/freeker3.png'), text: '媒体及内容制作'},
           {img: require('../assets/images/freeker4.png'), text: '直播及艺人相关'},
           {img: require('../assets/images/freeker5.png'), text: '电竞衍生领域'}
         ]
       },
       //infoEnterprise
       infoEnterprise: {
         title: '企业电竞服务',
         titleEn: 'ENTERPRISE SERVIVES',
         list: [
           {img: require('../assets/images/enterprise1.png'), text: '职位发布'},
           {img: require('../assets/images/release.png'), text: '职位管理'},
           {img: require('../assets/images/inbox.png'), text: '收件箱'},
         ]
       },
       //enterprise
       enterprise: {
         title: '企业电竞服务',
         titleEn: 'ENTERPRISE SERVIVES',
         list: [
           {img: require('../assets/images/enterprise1.png'), text: '发布全职职位'},
           {img: require('../assets/images/enterprise2.png'), text: '发布兼职职位'},
           {img: require('../assets/images/enterprise3.png'), text: '发布任务外包'},
           {img: require('../assets/images/enterprise4.png'), text: '查看收到简历'},
           {img: require('../assets/images/enterprise5.png'), text: '协会就业联盟'}
         ]
       },
       //demands 1:全职 2:兼职 3:外包
       demands: {
         title: '最新用人需求',
         titleEn: 'THE LATEST DEMANDS'
       },
       recommend: {
         title: '推荐新人简历',
         titleEn: 'NEW RESUMES'
       },
       //information
       information: {
         title: '行业资讯',
         titleEn: 'INDUSTRY INFORMATION',
         dynamic: [
           {text: '学习电子竞技行业新知识，关注电学习电子竞技行业新知识，关注电学习电子竞技行业新知识，关注电学习电子竞技行业新知识，关注电', times: '2019-06-27'},
           {text: '学习电子竞技行业新知识，关注电.......', times: '2019-06-27'},
           {text: '学习电子竞技行业新知识，关注电.......', times: '2019-06-27'}
         ],
         answers: [
           {text: '学习电子竞技行业新知识，关注电.......', times: '2019-06-27'},
           {text: '学习电子竞技行业新知识，关注电.......', times: '2019-06-27'},
           {text: '学习电子竞技行业新知识，关注电.......', times: '2019-06-27'}
         ]
       },
       userInfo: null
     }
  },
  data() {
  
  },
  mounted() {
    this.init();
  },
  methods: {
    init() { //初始化
      this.userInfo = util.getStore('userInfo') || null;
    },
    onSearch(value) { //搜索
      console.log(value)
    },
    onMore() { //点击MORE按钮
      console.log(111)
    },
    handleInfoEnterprise(e) {
      if(this.userInfo) {
        this.$router.push({
          path: '/login'
        })
      }
    },
    handleEnterprise(e) {
      if(this.userInfo) {
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
};
</script>