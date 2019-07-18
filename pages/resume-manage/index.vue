<template>
    <section>
        <div class="nav-bg"></div>
        <div class="resume_manage">
            <div class="head">
                <!-- title -->
                <div class="head_title">
                    <span>职位管理</span>
                    <a-button type="primary"><span>+</span>发布新职位</a-button>
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
                                <a-input v-decorator="['department']" placeholder="全部部门"></a-input>
                            </a-form-item>
                            <a-form-item
                                label="关键字"
                                :colon="false"
                                :label-col="{span: 5}"
                                :wrapper-col="{span: 14}"
                            >
                                <a-input v-decorator="['keyword']" placeholder="职位名称/发布地址"></a-input>
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
                <div class="nav">
                    <div class="nav_tab">
                        <a v-for="(item, index) in tabs" :key="index" :class="{active: active==index}" @click="tabItem(index)">
                            <p>{{item.text}}</p>
                            <span>{{item.num}}</span>
                        </a>
                    </div>
                    <a-select defaultValue="1">
                        <a-select-option value="1">每页20条</a-select-option>
                    </a-select>
                </div>
            </div>
            <!-- table表格 -->
            <div class="table">
                <a-table :columns="columns" :dataSource="rows" :rowSelection="rowSelection"></a-table>
            </div>
        </div>
    </section>
</template>

<script>
import "./index.less";
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
            {title: '职位名称', dataIndex: 'name'},
            {title: '发布日期', dataIndex: 'stateTime'},
            {title: '截至日期', dataIndex: 'endTime'},
            {title: '所属部门', dataIndex: 'department'},
            {title: '发布地点', dataIndex: 'place'},
            {title: '投递', dataIndex: 'delivery'},
            {title: '操作', dataIndex: ''}
        ],
        rows: [
            {
                key: 1, 
                name: '电竞内容后期制作', 
                stateTime: '2019-06-26', 
                endTime: '2019-07-26', 
                department: '上海电竞委员活动有限公司', 
                place: '上海', 
                delivery: '54'
            }
        ],
        rowSelection: {}
    };
  },
  async asyncData() {
   
  },
  created() {
  
  },
  mounted() {
   
  },
  watch: {
   
  },
  props: {
    
  },
  methods: {
      //重置搜索
      handleReset() {
          this.form.resetFields();
      },
      //搜索
      handleSearch(e) {
          e.preventDefault();
          this.form.validateFields((error, value) => {
              if(!error) {
                  console.log(value)
              }
          })
      },
      //职位筛选tab
      tabItem(index) {
          this.active = index;
      }
  }
};
</script>
