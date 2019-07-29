<template>
  <section class="job_release">
      <div class="nav-bg"></div>
      <a-form>
          <div class="centent">
              <a-tabs defaultActiveKey="1" @change="callback">
                  <a-tab-pane tab="社会职位" key="1"></a-tab-pane>
                  <a-tab-pane tab="实习职位" key="2"></a-tab-pane>
              </a-tabs>
              <div class="list">
                  <a-form-item class="left" label="职位名称">
                      <a-input size="large"></a-input>
                  </a-form-item>
                  <a-form-item class="right" label="工作性质">
                      <a-radio-group @change="onChange" v-model="value">
                          <a-radio :value="1">全职</a-radio>
                          <a-radio :value="2">兼职</a-radio>
                          <a-radio :value="3">外包</a-radio>
                      </a-radio-group>
                  </a-form-item>
              </div>
              <div class="list">
                  <a-form-item class="left" label="工作地区">
                      <a-row type="flex" justify="space-between" align="middle">
                          <a-select defaultValue="上海" size="large" class="w159">
                              <a-select-option value="上海">上海</a-select-option>
                          </a-select>
                          <a-select defaultValue="上海" size="large" class="w159">
                              <a-select-option value="上海">上海</a-select-option>
                          </a-select>
                          <a-select defaultValue="上海" size="large" class="w159">
                              <a-select-option value="上海">上海</a-select-option>
                          </a-select>
                      </a-row>
                  </a-form-item>
                  <a-form-item class="right" label="岗位薪资">
                      <a-row type="flex" justify="space-between" align="middle">
                          <a-select defaultValue="月薪" size="large" class="w114">
                              <a-select-option value="月薪">月薪</a-select-option>
                          </a-select>
                          <a-select size="large" class="w184">
                              <a-select-option value="1">10000</a-select-option>
                          </a-select>
                          <a>自定义</a>
                      </a-row>
                  </a-form-item>
              </div>
              <div class="list">
                  <a-form-item class="left" label="工作地址">
                      <a-select defaultValue="1" size="large">
                          <a-select-option value="1">上海市青浦区绝俘路258弄60号（朗诵金融大厦）5层</a-select-option>
                      </a-select>
                  </a-form-item>
                  <a-form-item class="right justify" label="关键词">
                      <a-input size="large" placeholder="输入职位关键词，提高被搜索概率"></a-input>
                  </a-form-item>
              </div>
              <div class="list">
                  <a-form-item class="left" label="技能要求">
                      <a-select defaultValue="1" size="large">
                          <a-select-option value="1">赛事相关经验 / APP设计 / H5制作</a-select-option>
                      </a-select>
                  </a-form-item>
                  <a-form-item class="right" label="所属部门">
                      <a-input size="large" placeholder="输入职位部门"></a-input>
                  </a-form-item>
              </div>
              <div class="list">
                  <a-form-item label="职位描述">
                      <a-textarea size="large" />
                  </a-form-item>
              </div>
              <div class="list">
                  <a-form-item label="职位职责">
                      <a-textarea size="large" :autosize="{minRows: 6}" />
                      <p>0/1000文字</p>
                  </a-form-item>
              </div>
              <div class="list">
                  <a-form-item label="职位要求">
                      <a-textarea size="large" :autosize="{minRows: 6}" />
                      <p>0/1000文字</p>
                  </a-form-item>
              </div>
          </div>
          <a-form-item class="job_release_btn">
              <a-button type="primary">保存</a-button>
          </a-form-item>
      </a-form>
  </section>
</template>

<script>
import "./index.less";

export default {
  name: "job-release",
  async asyncData(){
     return{
     }
  },
  data() {
      return{
          active: 1, //默认类型 1，社会职务   2，实习职位
          value: 1  //工作性质  1，全职  2，兼职  3，外包
      }
  },
  mounted() {
  },
  methods: {
      callback(key) { //类型切换
          this.active = key;
      },
      onChange (e) { //工作性质选择
          console.log('radio checked', e.target.value)
      }
  }
};
</script>