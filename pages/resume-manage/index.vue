<template>
    <section>
        <div class="nav-bg"></div>
        <div class="resume_manage">
            <div class="head">
                <!-- title -->
                <div class="head_title">
                    <span>职位管理</span>
                    <a-button type="primary" @click="add"><span>+</span>发布新职位</a-button>
                </div>
                <!-- search -->
                <div class="search">
                    <a-form :form="form" @submit="handleSearch">
                        <div class="search_input">
                            <a-form-item
                                label="所属部门"
                                :colon="false"
                                :label-col="{span: 9}"
                                :wrapper-col="{span: 12}"
                            >
                                <a-input v-decorator="['depatment']" placeholder="全部部门"></a-input>
                            </a-form-item>
                            <a-form-item
                                label="关键字"
                                :colon="false"
                                :label-col="{span: 5}"
                                :wrapper-col="{span: 14}"
                            >
                                <a-input v-decorator="['keywords']" placeholder="职位名称/发布地址"></a-input>
                            </a-form-item>
                        </div>
                        <div class="search_btn">
                            <a-button
                                type="primary"
                                html-type="submit"
                            >
                                搜索
                            </a-button>
                            <a-button
                                html-type="submit"
                                @click="handleReset"
                            >
                                重置
                            </a-button>
                        </div>
                    </a-form>
                </div>
                <!-- 职位筛选tab -->
                <!-- <div class="nav">
                    <div class="nav_tab">
                        <a v-for="(item, index) in tabs" :key="index" :class="{active: active==index}" @click="tabItem(index)">
                            <p>{{item.text}}</p>
                            <span>{{item.num}}</span>
                        </a>
                    </div>
                    <a-select defaultValue="20" @change="showSizeChange">
                        <a-select-option 
                            v-for="(item, index) in pagination.pageSizeOptions" 
                            :value="item"
                            :key="index"
                        >每页{{item}}条</a-select-option>
                    </a-select>
                </div> -->
            </div>
            <!-- table表格 -->
            <div class="table">
                <a-table 
                    :columns="columns" 
                    :dataSource="rows" 
                    :pagination="pagination"
                    :rowKey="record => record.id"
                    @change="handleTableChange"
                >
                    <template slot="name" slot-scope="text, record">
                        <span @click="() => handleItem(record)">{{text}}</span>
                    </template>
                    <template slot="operation" slot-scope="text, record">
                        <div class="operation">
                            <span @click="() => placement(record)">职位置顶</span>
                            <!-- <span>职位刷新</span>
                            <span>职位推荐</span> -->
                        </div>
                    </template>
                    <template slot="operationBtn" slot-scope="text, record">
                        <div class="operation_btn">
                            <span @click="() => modify(record)">修改职位</span>
                            <span @click="() => offline(record)">下线职位</span>
                        </div>
                    </template>
                </a-table>
            </div>
        </div>
    </section>
</template>

<script>
import "./index.less";
import ajax from '../../plugins/api';
import util from '../../plugins/utils/util';
export default {
  name: "resume-manage",
  data() {
    return {
        form: this.$form.createForm(this),
        tabs: [ //职位筛选tab
            {text: '在线职位', num: 6},
            {text: '未上线职位', num: 1},
            {text: '已下线职位', num: 20},
            {text: '审核中职位', num: 5},
            {text: '未通过职位', num: 2}
        ],
        active: 0, //职位筛选tab高亮
        columns: [ //table表头
            {
                title: '职位名称', 
                dataIndex: 'name',
                scopedSlots: { customRender: 'name' }
            },
            {title: '发布日期', dataIndex: 'sendTime'},
            {title: '截至日期', dataIndex: 'deadTime'},
            {title: '所属部门', dataIndex: 'depatment'},
            {title: '发布地点', dataIndex: 'regionName'},
            {title: '投递', dataIndex: 'resumes'},
            {
                title: '操作', 
                dataIndex: 'operation', 
                colSpan: 2,
                width: '1.8rem',
                scopedSlots: { customRender: 'operation' }
            },
            {
                title: '操作', 
                dataIndex: 'operationBtn', 
                colSpan: 0,
                width: '1rem',
                scopedSlots: { customRender: 'operationBtn' }
            }
        ],
        rows: [], //列表数据
        rowSelection: {}, //select选项
        pagination: { //自定义分页
            total: 0, //数据总数
            pageSize: 10, // 默认每页显示数量
            pageSizeOptions: ['10', '20', '50', '100'], // 每页数量选项
            hideOnSinglePage: true, //只有一页时是否隐藏分页器
            showQuickJumper: true, //是否可以快速跳转至某页
            showSizeChanger: false, // 是否可以改变 pageSize
            onShowSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示
            //showTotal: total => `${total}`, //显示总数据
            itemRender: (current, type, originalElement) => {
                if (type === 'prev') {
                    return <a-button>上一页</a-button>;
                } else if (type === 'next') {
                    return <a-button>下一页</a-button>;
                };
                return originalElement;
            }
        },
        params: {
            depatment: null,
            keywords: null,
            pageSize: 10,
            pageNumber: 1
        }
    };
  },
  async asyncData() {
   
  },
  mounted() {
      this.init();
  },
  methods: {
      init() { //初始化数据
          this.devData();
      },
      showSizeChange(val) { //选择每页条数后重新渲染数据
          this.pagination = Object.assign(this.pagination, {pageSize: Number(val)});
          this.params = Object.assign(this.params, {pageSize: Number(val)});
          this.init();
      },
      handleTableChange(pagination, filters, sorter) {
          this.params = Object.assign(this.params, {
              pageNumber: pagination.current
          });
          this.init();
      },
      //重置搜索
      handleReset() {
          this.form.resetFields();
      },
      //搜索
      handleSearch(e) {
          e.preventDefault();
          this.form.validateFields((error, value) => {
              if(!error) {
                  this.params = Object.assign(this.params, value);
                  this.init();
              }
          })
      },
      //职位筛选tab
      tabItem(index) {
          this.active = index;
      },
      //点击tabel里的每一项
      handleItem(record) {
          this.$router.push({
              path: 'job-detail',
              query: {
                  id: record.careers_id
              }
          })
      },
      //置顶
      placement(record) {
          let _obj = {
              id: record.careers_id,
              top: true
          };
          this.handleModify(_obj);
      },
      //下线
      offline(record) {
          let _obj = {
              id: record.careers_id,
              is_on: 0
          };
          this.handleModify(_obj);
      },
      handleModify(obj={}) { //置顶，下线职位
          ajax.put('jobs', obj).then(res => {
              if(res.retcode == 0) {
                  this.init();
              }
          });
      },
      add() { //添加新职位
          this.$router.push({
              path: 'job-release'
          })
      },
      modify(record) { //修改职位
          this.$router.push({
              path: 'job-release',
              query: {
                  id: record.careers_id
              }
          })
      },
      //获取数据
      devData() {
          let _params = this.params;
          ajax.get('jobs', _params).then(res => {
              if(res.retcode == 0) {
                  this.rows = res.data.list || [];
                  this.rows.map(item => {
                      if(item.sendTime) item.sendTime = util.format(item.sendTime);
                      if(item.deadTime) item.deadTime = util.format(item.deadTime);
                      if(item.region) item.regionName = JSON.parse(item.region).cityName || null;
                      return item;
                  });
                  this.pagination = Object.assign(this.pagination, {total: res.data.total});
              }
          });
      }
  }
};
</script>
