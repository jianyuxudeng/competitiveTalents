<template>
  <section class="job_detail">
      <div class="nav-bg"></div>
      <div class="detail_head">
        <a-row type="flex" justify="space-between" align="middle">
          <a-col>
            <dl>
              <dt>急聘</dt>
              <dd>
                <div class="title">赛事运营策划</div>
                <div class="jinyan">
                  <span>20k-30k/月</span>
                  经验5年以上 / 本科 / 上海 / 全职
                </div>
                <div class="btn">
                  <span>赛事相关职位</span>
                  <span>APP设计</span>
                  <span>H5制作</span>
                </div>
                <p>
                  <a-icon type="clock-circle" />
                  <span>发布时间 2019-08-35   15:20</span>
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
                <p>1、负责配合广告销售业务拓展，制定行业及客户网络营销策略与典型方案；</p>
                <p>2、挖掘媒体资源，实现内容商业化开发；</p>
              </dd>
            </dl>
            <dl>
              <dt>任职要求</dt>
              <dd>
                <p>1、负责配合广告销售业务拓展，制定行业及客户网络营销策略与典型方案；</p>
                <p>2、挖掘媒体资源，实现内容商业化开发；</p>
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
                <p>上海市青浦区绝俘路258弄60号（朗诵金融大厦）5层</p>
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
                <span>上市公司</span>
              </p>
              <p>
                <em><img src="../../assets/images/user.png" alt=""></em>
                <span>2000人以上</span>
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
      return{}
  },
  mounted() {
  },
  methods: {
  }
};
</script>