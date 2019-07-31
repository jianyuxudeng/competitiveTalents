<template>
  <section class="mailbox">
      <div class="nav-bg"></div>
      <div class="centent">
          <a-tabs defaultActiveKey="1" @change="callbackTab">
              <a-tab-pane tab="按职位查看" key="1"></a-tab-pane>
              <a-tab-pane tab="关注职位" key="2"></a-tab-pane>
              <a-tab-pane tab="近半年简历" key="3"></a-tab-pane>
              <a-tab-pane tab="面试安排" key="4"></a-tab-pane>
          </a-tabs>
          <a-form class="search">
              <a-form-item label="关键字">
                  <a-input size="large" placeholder="请输入"></a-input>
              </a-form-item>
              <a-form-item label="居住地">
                  <a-select size="large">
                      <a-select-option value="">111</a-select-option>
                  </a-select>
              </a-form-item>
              <a-form-item label="职位">
                  <a-select size="large">
                      <a-select-option value="">222</a-select-option>
                  </a-select>
              </a-form-item>
              <a-form-item>
                  <a-button type="primary">搜索</a-button>
              </a-form-item>
          </a-form>
          <div class="table_title">
              <a-button type="primary">查看简历</a-button>
              <a-checkbox>合并多投</a-checkbox>
              <a-checkbox>有照片</a-checkbox>
              <a-select placeholder="简历状态筛选">
                  <a-select-option value="">1111</a-select-option>
              </a-select>
              <p>
                  <span>共2258条</span>
                  <span>每页50条</span>
              </p>
          </div>
          <a-table :columns="columns" :dataSource="rows" :pagination="false">
              <template slot="follow" slot-scope="follow">
                  <a-icon type="star" :theme="follow ? 'filled' : 'outlined'" />
              </template>
          </a-table>
      </div>
      <a-pagination showQuickJumper :defaultCurrent="1" :total="rows.length"></a-pagination>
  </section>
</template>

<script>
import "./index.less";

export default {
  name: "mailbox",
  async asyncData(){
     return{

     }
  },
  data() {
      return{
          columns: [
              {title: '关注', dataIndex: 'follow', scopedSlots: { customRender: 'follow' }},
              {title: '姓名', dataIndex: 'name'},
              {title: '职位名称', dataIndex: 'jobName'},
              {title: '发布城市', dataIndex: 'city'},
              {title: '匹配度', dataIndex: 'degree'},
              {title: '年龄', dataIndex: 'age'},
              {title: '年限', dataIndex: 'years'},
              {title: '联系电话', dataIndex: 'tel'},
              {title: '简历更新时间', dataIndex: 'resumeTime'},
              {title: '投递时间', dataIndex: 'deliveryTime'}
          ],
          rows: [
              {
                  key: '1', 
                  follow: true,
                  name: '张三', 
                  jobName: '电竞内容后期制作', 
                  city: '上海', 
                  degree: '80%', 
                  age: '28', 
                  years: '6年',
                  tel: '13821756871',
                  resumeTime: '2019-07-02',
                  deliveryTime: '2019-07-03'
              },
              {
                  key: '2', 
                  follow: false,
                  name: '张三', 
                  jobName: '电竞内容后期制作', 
                  city: '上海', 
                  degree: '80%', 
                  age: '28', 
                  years: '6年',
                  tel: '13821756871',
                  resumeTime: '2019-07-02',
                  deliveryTime: '2019-07-03'
              }
          ]
      }
  },
  mounted() {
  },
  methods: {
      callbackTab(key) {}
  }
};
</script>