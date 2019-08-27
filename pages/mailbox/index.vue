<template>
  <section class="mailbox page_centent">
      <div class="nav-bg"></div>
      <div class="centent">
          <a-tabs defaultActiveKey="1" @change="callbackTab">
              <a-tab-pane tab="按职位查看" key="1"></a-tab-pane>
              <a-tab-pane tab="关注职位" key="2"></a-tab-pane>
              <a-tab-pane tab="近半年简历" key="3"></a-tab-pane>
              <a-tab-pane tab="面试安排" key="4"></a-tab-pane>
          </a-tabs>
          <a-form class="search" :form="form" @submit="handleSubmit">
              <a-form-item label="关键字">
                  <a-input 
                      size="large" 
                      placeholder="请输入"
                      v-decorator="[
                          'keywords',
                          {rules: [{ required: false }]}
                      ]"
                  ></a-input>
              </a-form-item>
              <a-form-item label="居住地">
                  <a-cascader 
                      size="large" 
                      :fieldNames="{label: 'name', value: 'id', children: 'item'}" 
                      :options="citys"
                      @change="onCascader"
                  >
                      <template slot="displayRender" slot-scope="{labels}">
                          <span v-for="(label, index) in labels" :key="index">
                              <span v-if="index == 1">{{label}}</span>
                          </span>
                      </template>
                  </a-cascader>
              </a-form-item>
              <a-form-item label="职位">
                  <a-select 
                      size="large"
                      v-decorator="[
                          'job_id',
                          {rules: [{ required: false }]}
                      ]"
                  >
                      <a-select-option :value="item.id" v-for="(item, index) in jobs" :key="index">{{item.name}}</a-select-option>
                  </a-select>
              </a-form-item>
              <a-form-item>
                  <a-button type="primary" html-type="submit">搜索</a-button>
              </a-form-item>
          </a-form>
          <div class="table_title">
              <a-button type="primary">查看简历</a-button>
              <a-checkbox @change="isContact">合并多投</a-checkbox>
              <a-checkbox @change="isHasSvatar">有照片</a-checkbox>
              <a-select placeholder="简历状态筛选" @change="handleRead">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option :value="0">未查看</a-select-option>
                  <a-select-option :value="1">已查看</a-select-option>
                  <a-select-option :value="2">不合适</a-select-option>
              </a-select>
              <p>
                  <span>共{{total}}条</span>
                  <span>每页10条</span>
              </p>
          </div>
          <a-table 
              :columns="columns" 
              :dataSource="rows" 
              :pagination="false" 
              :rowKey="record => record.id"
          >
              <template slot="follow" slot-scope="is_collect, record">
                  <a-icon type="star" :theme="is_collect ? 'filled' : 'outlined'" @click="() => handleCollect(record)" />
              </template>
              <template slot="username" slot-scope="text, record">
                  <span @click="() => handleItem(record)">{{text}}</span>
              </template>
              <template slot="edit_time" slot-scope="text, record">
                  <span @click="() => handleItem(record)">{{text&&moment(text).format('YYYY-MM-DD')}}</span>
              </template>
              <template slot="send_time" slot-scope="text, record">
                  <span @click="() => handleItem(record)">{{text&&moment(text).format('YYYY-MM-DD')}}</span>
              </template>
          </a-table>
      </div>
      <a-pagination showQuickJumper :defaultCurrent="1" :total="total" @change="onChangePage"></a-pagination>
  </section>
</template>

<script>
import "./index.less";
import ajax from '../../plugins/api';
import util from '../../plugins/utils/util';
import area from '../../plugins/utils/area';
import moment from 'moment';

export default {
  name: "mailbox",
  async asyncData(){
     return{

     }
  },
  data() {
      return{
          form: this.$form.createForm(this),
          columns: [
              {title: '关注', dataIndex: 'is_collect', scopedSlots: { customRender: 'follow' }, width: '6%'},
              {title: '姓名', dataIndex: 'username', scopedSlots: {customRender: 'username'}, width: '10%'},
              {title: '职位名称', dataIndex: 'jobName', width: '10%'},
              {title: '发布城市', dataIndex: 'city', width: '10%'},
              {title: '匹配度', dataIndex: 'compatibility', width: '7%'},
              {title: '年龄', dataIndex: 'age', width: '6%'},
              {title: '年限', dataIndex: 'workTime'},
              {title: '联系电话', dataIndex: 'phone', width: '10%'},
              {title: '简历更新时间', dataIndex: 'edit_time',scopedSlots: { customRender: 'edit_time' }},
              {title: '投递时间', dataIndex: 'send_time',scopedSlots: { customRender: 'send_time' }}
          ],
          rows: [],
          total: 0,
          params: {
              company_id: '',
              job_id: '',
              keywords: null,
              order_careers: 1,
              pageNumber: 1,
              pageSize: 10
          },
          jobs: [],
          citys: []
      }
  },
  mounted() {
      this.init();
      this.getData();
      this.jobsData();
  },
  methods: {
      moment,
      format: util.format,
      init() {
          area.map(ele => {
              this.citys.push({
                  id: ele.id,
                  name: ele.name,
                  item: ele.items
              });
          });
      },
      callbackTab(index) {
          let obj = {};
          switch (index) {
              case '1':
                  obj = Object.assign(obj, {
                      order_careers: 1,
                      is_collect: null,
                      order_time: null,
                      is_interview: null
                  });
                  break;
              case '2':
                  obj = Object.assign(obj, {
                      order_careers: null,
                      is_collect: 1,
                      order_time: null,
                      is_interview: null
                  });
                  break;
              case '3':
                  obj = Object.assign(obj, {
                      order_careers: null,
                      is_collect: null,
                      order_time: 1,
                      is_interview: null
                  });
                  break;
              case '4':
                  obj = Object.assign(obj, {
                      order_careers: null,
                      is_collect: null,
                      order_time: null,
                      is_interview: 1
                  });
                  break;
              default:
                  break;
          };
          this.params = Object.assign(this.params, obj);
          this.getData();
      },
      onCascader(value) {
          this.params = Object.assign(this.params, {
              cityId: value[value.length - 1]
          });
      },
      isHasSvatar(e) { //有照片
          this.params = Object.assign(this.params, {
              hasSvatar: e.target.checked ? 1 : null
          });
          this.getData();
      },
      handleRead(value) { //简历状态
          this.params = Object.assign(this.params, {is_read: value});
          this.getData();
      },
      isContact(e) {
          this.params = Object.assign(this.params, {
              is_contact: e.target.checked ? 1 : null
          });
          this.getData();
      },
      handleItem(record) { //点击列表里的每一行
          this.$router.push({
                path: 'resume-detail',
                query: {
                //   isEdit: false,
                    id: record.id,
                    user_id: record.user_id
                }
            })
      },
      handleCollect(record) {
          ajax.put('company/resumes', {
              id: record.id,
              is_collect: !record.is_collect
          }).then(res => {
              if(res.retcode == 0) {
                  this.getData();
              }
          })
      },
      onChangePage(pageNumber) { //分页
          this.params = Object.assign(this.params, {pageNumber});
          this.getData();
      },
      handleSubmit(e) { //搜索提交
          e.preventDefault();
          this.form.validateFields((err, values) => {
              if (!err) {
                  this.params = Object.assign(this.params, values);
                  this.getData();
              }
          });
      },
      jobsData() { //获取职位下拉列表
          let userInfo = util.getStore('userInfo');
          ajax.get('company/jobs/list', {user_id: userInfo.id}).then(res => {
              this.jobs = [{id: '', name: '全部'}, ...res.data] || [];
          })
      },
      getData() {
          let userInfo = util.getStore('userInfo');
          let params = Object.assign(this.params, {company_id: userInfo.id});
          ajax.get('company/resumes', params).then(res => {
              this.rows = res.data.list || [];
              this.rows.map(item => {
                  if(item.send_time) item.send_time = this.format(item.send_time);
                  if(item.edit_time) item.edit_time = this.format(item.edit_time);
                  if(item.city&&item.city!='null'){
                      item.city = JSON.parse(item.city).name;
                  }else{
                      item.city='';
                  }
              });
              this.total = res.data.total;
          })
      }
  }
};
</script>