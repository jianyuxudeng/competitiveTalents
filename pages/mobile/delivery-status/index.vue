<template>
  <section class="page_centent">
      <div class="nav-bg"></div>
      <div class="delivery_status">
          <div class="left">
              <div class="title">
                  <a-row type="flex" justify="space-between" align="middle">
                      <span>已投递简历状态</span>
                      <a @click="refresh">
                          刷新
                          <a-icon type="sync" />
                      </a>
                  </a-row>
              </div>
              <div class="nav">
                  <a v-for="(item, index) in navs" :key="index" :class="{active: active == index}" @click="handleNav(index)">
                      {{item}}
                      <ul v-if="isTrue && index == 3">
                          <li v-for="i in interviews" :key="i.index" @click.stop="handleInterviews(i.index)">{{i.name}}</li>
                      </ul>
                  </a>
              </div>
              <a-collapse v-for="item in list" :key="item.id">
                  <a-collapse-panel key="1">
                      <template slot="header">
                          <div class="status_item">
                              <a-row type="flex" justify="space-between" align="bottom">
                                  <a-col class="status_item_left">
                                      <h4>{{item.careersName}}<span>{{item.jobPrice}}/月</span></h4>
                                      <p>{{item.companyName}}</p>
                                      <p><span>使用简历：</span>在线简历</p>
                                  </a-col>
                                  <a-col class="status_item_right">
                                        <div class="right_btn" v-if="item.status == 0">
                                            <a-button type="primary" size="small" @click.stop="modify(item, 1)">接受面试</a-button>
                                            <a-button size="small" @click.stop="modify(item, 2)">拒绝面试</a-button>
                                        </div>
                                        <div class="right_text">
                                            <p>{{item.send_time ? format(item.send_time) : item.send_time}}</p>
                                            <div>
                                                {{item.activeName}}
                                                <a-icon type="caret-down" />
                                            </div>
                                        </div>
                                    </a-col>
                              </a-row>
                          </div>
                      </template>
                      <div class="steps">
                          <dl v-for="(i, index) in item.steps" :key="index">
                              <dt :class="{active: item.isIndex == index}">{{index + 1}}</dt>
                              <dd>{{i}}</dd>
                          </dl>
                      </div>
                      <a-timeline>
                          <a-timeline-item v-if="item.is_read == 2 && active == 4">
                              <p>{{format(item.unsuited_time)}}</p>
                              <dl>
                                  <dd>
                                      <h4>简历被标记为不合适</h4>
                                      <h6>非常荣幸收到您的简历，经过我们评估，您与该位职位不符合。感谢您投递我们公司。</h6>
                                      <h6>----{{item.companyName}}</h6>
                                  </dd>
                              </dl>
                          </a-timeline-item>
                          <a-timeline-item v-if="item.isShow && active == 3">
                              <p>{{format(item.unsuited_time)}}</p>
                              <dl>
                                  <dd>
                                      <h4>简历被标记为邀面试</h4>
                                      <h6>非常荣幸收到您的简历，经过我们评估，您与该位职位符合度很高。我们会在稍后与用人部门继续
协商，尽快确认是否给您发送面试邀请，请您关注后续状态。</h6>
                                      <h6>----{{item.companyName}}</h6>
                                  </dd>
                              </dl>
                          </a-timeline-item>
                          <a-timeline-item v-if="item.isShow && active > 1">
                              <p>{{format(item.intention_time)}}</p>
                              <dl>
                                  <dd>
                                      <h4>简历被标记为有意向</h4>
                                      <h6>非常荣幸收到您的简历，经过我们评估，您与该位职位符合度很高。我们会在稍后与用人部门继续
协商，尽快确认是否给您发送面试邀请，请您关注后续状态。</h6>
                                      <h6>----{{item.companyName}}</h6>
                                  </dd>
                              </dl>
                          </a-timeline-item>
                          <a-timeline-item v-if="item.read_time">
                              <p>{{format(item.read_time)}}</p>
                              <dl>
                                  <dt><img :src="item.logo" alt=""></dt>
                                  <dd>
                                      <div>{{item.companyName}}</div>
                                      <div>查看了你的简历</div>
                                  </dd>
                              </dl>
                          </a-timeline-item>
                          <a-timeline-item>
                              <p>{{format(item.send_time)}}</p>
                              <dl>
                                  <dt><img :src="item.logo" alt=""></dt>
                                  <dd>
                                      <div>{{item.companyName}}</div>
                                      <div>已成功接收你的简历</div>
                                  </dd>
                              </dl>
                          </a-timeline-item>
                      </a-timeline>
                  </a-collapse-panel>
              </a-collapse>
          </div>
          <div class="right">
              <Interest className="mobile_job_detail"></Interest>
          </div>
      </div>
  </section>
</template>

<script>
import "./index.less";
import ajax from '../../../plugins/api';
import util from '../../../plugins/utils/util';

export default {
  name: "delivery-status",
  props: [],
  async asyncData(){
     return{

     }
  },
  components: {
    Interest: () => import('../../../components/atom/Interest')
  },
  data() {
      return{
          navs: ['投递成功', '被查看', '有意向', '邀请面试', '不合适'],
          active: 0,
          rows: [],
          list: [],
          interviews: [
              {name: '全部', index: 0},
              {name: '待确认', index: 1},
              {name: '已接受', index: 2},
              {name: '已拒绝', index: 3}
          ],
          isTrue: false
      }
  },
  mounted() {
      this.devData();
  },
  methods: {
      format: util.format,
      modify(e, index) {
          ajax.put('company/resumes', {
              id: e.id,
              status: index
          }).then(res => {
              if(res.retcode == 0) {
                  this.devData();
              }
          })
      },
      handleNav(index) {
          this.active = index;
          let _list = [];
          if(index != 3) this.isTrue = false;
          switch (index) {
              case 0:
                  this.rows.map(item => {
                      item.steps = ['投递成功', '简历被查看', '有意向', '邀面试'];
                      item.isIndex = 0;
                      item.activeName = '投递成功';
                      if(item.is_read == '0') {
                          _list.push(item);
                      }
                  });
                  this.list = _list;
                  break;
              case 1:
                  this.rows.map(item => {
                      item.steps = ['投递成功', '简历被查看', '有意向', '邀面试'];
                      item.isIndex = 1;
                      item.activeName = '简历被查看';
                      if(item.is_read == '1') {
                          _list.push(item);
                      }
                  });
                  this.list = _list;
                  break;
              case 2:
                  this.rows.map(item => {
                      item.steps = ['投递成功', '简历被查看', '有意向', '邀面试'];
                      item.isIndex = 2;
                      item.activeName = '有意向';
                      if(item.is_read != 2) item.isShow = true;
                      if(item.is_interview == '2' && item.is_read != 2) {
                          _list.push(item);
                      }
                  });
                  this.list = _list;
                  break;
              case 3:
                  this.isTrue = !this.isTrue;
                  break;
              case 4:
                  this.rows.map(item => {
                      item.steps = ['投递成功', '简历被查看', '有意向', '不合适'];
                      item.isIndex = 3;
                      item.activeName = '不合适';
                      item.isShow = true;
                      if(item.is_read == '2') {
                          _list.push(item);
                      }
                  });
                  this.list = _list;
                  break;
              default:
                  break;
          }
      },
      handleInterviews(index) {
          this.isTrue = false;
          let _list = [];
          switch (index) {
              case 0:
                  this.rows.map(item => {
                      item.steps = ['投递成功', '简历被查看', '有意向', '邀面试'];
                      item.isIndex = 3;
                      item.activeName = '邀面试';
                      if(item.is_read != 2) item.isShow = true;
                      if(item.is_interview == '1' && item.is_read != 2) {
                          _list.push(item);
                      }
                  });
                  this.list = _list;
                  break;
              case 1:
                  this.rows.map(item => {
                      item.steps = ['投递成功', '简历被查看', '有意向', '邀面试'];
                      item.isIndex = 3;
                      item.activeName = '待确认';
                      if(item.is_read != 2) item.isShow = true;
                      if(item.is_interview == '1' && item.status == '0' && item.is_read != 2) {
                          _list.push(item);
                      }
                  });
                  this.list = _list;
                  break;
              case 2:
                  this.rows.map(item => {
                      item.steps = ['投递成功', '简历被查看', '有意向', '邀面试'];
                      item.isIndex = 3;
                      item.activeName = '已接受';
                      if(item.is_read != 2) item.isShow = true;
                      if(item.is_interview == '1' && item.status == '1' && item.is_read != 2) {
                          _list.push(item);
                      }
                  });
                  this.list = _list;
                  break;
              case 3:
                  this.rows.map(item => {
                      item.steps = ['投递成功', '简历被查看', '有意向', '邀面试'];
                      item.isIndex = 3;
                      item.activeName = '已拒绝';
                      if(item.is_read != 2) item.isShow = true;
                      if(item.is_interview == '1' && item.status == '2' && item.is_read != 2) {
                          _list.push(item);
                      }
                  });
                  this.list = _list;
                  break;
          
              default:
                  break;
          };
      },
      refresh() {
          this.devData();
      },
      devData() {
          let userInfo = util.getStore('userInfo');
          this.row = [];
          ajax.get('user/resumes/list', {
              user_id: userInfo.id
          }).then(res => {
              if(res.retcode == 0) {
                  this.rows = res.data || [];
                  this.handleNav(this.active);
              }
          })
      }
  }
};
</script>