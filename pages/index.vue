<template>
  <section class="container">
    <!-- banner -->
    <div class="banner">
      <a-carousel arrows dotsClass="slick-dots slick-thumb">
        <div
          slot="prevArrow" 
          slot-scope="props"
          class="custom-slick-arrow"
          style="left: 1.9rem; zIndex: 1"
        >
          <a-icon type="left" :style="{color: '#3199ff'}" />
        </div>
        <div
          slot="nextArrow" 
          slot-scope="props"
          class="custom-slick-arrow"
          style="right: 1.9rem"
        >
          <a-icon type="right" :style="{color: '#3199ff'}" />
        </div>
        <div v-for="(item, index) in banners" :key="index"><img :src="item.img" alt=""></div>
      </a-carousel>
    </div>
    <!-- freeker -->
    <div class="services freeker">
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
    <!-- enterprise -->
    <div class="services enterprise">
      <Title :title="enterprise.title" :titleEn="enterprise.titleEn"></Title>
      <div class="enterprise_conten">
        <Services className="enterprise" :list="enterprise.list"></Services>
      </div>
    </div>
    <!-- demands -->
    <div class="services demands">
      <Title :title="demands.title" :titleEn="demands.titleEn"></Title>
      <div class="demands_conten">
        <Demands :list="demands.list"></Demands>
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
import Title from "../components/atom/Title/Title";
import Services from "../components/molecule/services/services";
import Demands from "../components/molecule/demands/demands";
import Information from "../components/molecule/information/information";

export default {
  name: "home",
  components: {
    Title,
    Services,
    Demands,
    Information
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
         titleEn: 'THE LATEST DEMANDS',
         list: [
           {
             title: '电竞内容后期制作',
             ner: '经验不限 / 大专',
             times: '[21:35发布]',
             nub: '20k-30k/月',
             state: '1',
             jin: '赛事相关经验',
             she: 'APP设计',
             zhi: 'H5制作',
             tx: require('../assets/images/demands.png'),
             xuexiao: '上海市对外经贸进修学院',
             zhuanye: '教育领域/不需要融资/上海'
           },
           {
             title: '电竞内容后期制作',
             ner: '经验不限 / 大专',
             times: '[21:35发布]',
             nub: '20k-30k/月',
             state: '2',
             jin: '赛事相关经验',
             she: 'APP设计',
             zhi: 'H5制作',
             tx: require('../assets/images/demands.png'),
             xuexiao: '上海市对外经贸进修学院',
             zhuanye: '教育领域/不需要融资/上海'
           },
           {
             title: '电竞内容后期制作',
             ner: '经验不限 / 大专',
             times: '[21:35发布]',
             nub: '20k-30k/月',
             state: '3',
             jin: '赛事相关经验',
             she: 'APP设计',
             zhi: 'H5制作',
             tx: require('../assets/images/demands.png'),
             xuexiao: '上海市对外经贸进修学院',
             zhuanye: '教育领域/不需要融资/上海'
           }
         ]
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
       }
     }
  },
  data() {
  
  },
  mounted() {
  },
  methods: {
    onSearch(value) { //搜索
      console.log(value)
    },
    onMore() { //点击MORE按钮
      console.log(111)
    }
  }
};
</script>