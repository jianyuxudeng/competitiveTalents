<template>
  <section>
      <div class="nav-bg"></div>
      <div class="delivery_status">
          <div class="left">
              <div class="title">
                  <a-row type="flex" justify="space-between" align="middle">
                      <span>已投递简历状态</span>
                      <a>
                          刷新
                          <a-icon type="sync" />
                      </a>
                  </a-row>
              </div>
              <div class="nav">
                  <a v-for="(item, index) in navs" :key="index" :class="{active: active == index}" @click="handleNav(index)">{{item}}</a>
              </div>
              <a-collapse>
                  <a-collapse-panel key="1">
                      <template slot="header">
                          <div class="status_item">
                              <a-row type="flex" justify="space-between" align="bottom">
                                  <a-col class="left">
                                      <h4>高校电竞讲师<span>6k-12k/月</span></h4>
                                      <p>腾讯电竞 [ 上海 ]</p>
                                      <p><span>使用简历：</span>在线简历</p>
                                  </a-col>
                                  <a-col class="right">
                                      <p>019-08-35  15:20</p>
                                      <div>
                                          投递成功
                                          <a-icon type="caret-down" />
                                      </div>
                                  </a-col>
                              </a-row>
                          </div>
                      </template>
                      <div class="steps">
                          <dl v-for="(item, index) in steps" :key="index">
                              <dt :class="{active: curre == index}">{{index + 1}}</dt>
                              <dd>{{item}}</dd>
                          </dl>
                      </div>
                      <a-timeline>
                          <a-timeline-item color="#515ffd">
                              <p>2019-08-35  15:20</p>
                              <dl>
                                  <!-- <dt><img src="../../assets/images/positions_img.png" alt=""></dt> -->
                                  <dd>
                                      <h4>简历被标记为邀面试</h4>
                                      <h6>非常荣幸收到您的简历，经过我们评估，您与该位职位符合度很高。我们会在稍后与您电话联系， 邀请您来我司进行面试，请您保持电话畅通。 </h6>
                                      <h6>----腾讯电竞</h6>
                                  </dd>
                              </dl>
                          </a-timeline-item>
                          <a-timeline-item color="#969696">
                              <p>2019-08-35  15:20</p>
                              <dl>
                                  <!-- <dt><img src="../../assets/images/positions_img.png" alt=""></dt> -->
                                  <dd>
                                      <div>腾讯电竞</div>
                                      <div>已成功接收你的简历</div>
                                  </dd>
                              </dl>
                          </a-timeline-item>
                          <a-timeline-item color="#969696">
                              <p>2019-08-35  15:20</p>
                              <dl>
                                  <dd>
                                      <div>腾讯电竞</div>
                                      <div>已成功接收你的简历</div>
                                  </dd>
                              </dl>
                          </a-timeline-item>
                      </a-timeline>
                  </a-collapse-panel>
              </a-collapse>
          </div>
          <div class="right">
              <Interest></Interest>
          </div>
      </div>
  </section>
</template>

<script>
import "./index.less";

export default {
  name: "delivery-status",
  props: [],
  async asyncData(){
     return{

     }
  },
  components: {
    Interest: () => import('../../components/atom/Interest')
  },
  data() {
      return{
          navs: ['投递成功', '被查看', '邀请面试', '不合适'],
          active: 0,
          steps: ['投递成功', '简历被查看', '邀面试'],
          curre: 0
      }
  },
  mounted() {
  },
  methods: {
      handleNav(index) {
          this.active = index;
          if(index > 2) {
              this.curre = 2;
          }else{
              this.curre = index;
          }
      }
  }
};
</script>