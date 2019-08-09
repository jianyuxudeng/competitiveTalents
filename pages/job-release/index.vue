<template>
  <section class="job_release">
      <div class="nav-bg"></div>
      <a-form :form="form" @submit="handleSubmit">
          <div class="centent">
              <a-tabs defaultActiveKey="1" @change="callback">
                  <a-tab-pane tab="社会职位" key="1"></a-tab-pane>
                  <a-tab-pane tab="实习职位" key="2"></a-tab-pane>
              </a-tabs>
              <div class="list">
                  <a-form-item class="left" label="职位名称">
                      <a-cascader 
                          :fieldNames="{label: 'name', value: 'id', children: 'children'}" 
                          :options="careers"
                          size="large" 
                          v-decorator="[
                              'careers_id',
                              {rules: [{ required: true, message: '请选择职位' }]}
                          ]"
                      />
                  </a-form-item>
                  <a-form-item class="right" label="工作性质">
                      <a-radio-group
                          v-decorator="[
                              'type',
                              {rules: [{ required: true, message: '请选择工作性质' }]}
                          ]"
                      >
                          <a-radio :value="item.id" v-for="item in labels.jobTypes" :key="item.id">{{item.labelName}}</a-radio>
                      </a-radio-group>
                  </a-form-item>
              </div>
              <div class="list">
                  <a-form-item class="left" label="工作地区">
                      <a-row type="flex" justify="space-between" align="middle">
                          <a-select 
                              size="large" 
                              class="w159" 
                              @change="handleProvinces"
                              v-decorator="[
                                  'region',
                                  {rules: [{ required: true, message: '请选择工作地区' }]}
                              ]"
                          >
                              <a-select-option
                                  v-for="item in provincesList"
                                  :key="item.id"
                                  :value="item.id"
                              >{{item.name}}</a-select-option>
                          </a-select>
                          <a-select size="large" class="w159" v-model="city" @change="handleCity">
                              <a-select-option
                                  v-for="item in cityList"
                                  :key="item.id"
                                  :value="item.id"
                              >{{item.name}}</a-select-option>
                          </a-select>
                          <a-select size="large" class="w159" v-model="area" @change="handleArea">
                              <a-select-option
                                  v-for="item in areaList"
                                  :key="item.id"
                                  :value="item.id"
                              >{{item.name}}</a-select-option>
                          </a-select>
                      </a-row>
                  </a-form-item>
                  <a-form-item class="right" label="岗位薪资">
                      <a-row type="flex" justify="space-between" align="middle">
                          <a-select 
                              size="large" 
                              class="w114"
                              v-decorator="[
                                  'careerPrice',
                                  {rules: [{ required: true, message: '请选择薪资类型' }]}
                              ]"
                          >
                              <a-select-option
                                  v-for="item in labels.careerPrices"
                                  :key="item.id"
                                  :value="item.labelName"
                              >{{item.labelName}}</a-select-option>
                          </a-select>
                          <a-select size="large" class="w184" @change="handleJobPrice" v-if="isTrue">
                              <a-select-option
                                  v-for="item in labels.jobPrices"
                                  :key="item.id"
                                  :value="item.labelName"
                              >{{item.labelName}}</a-select-option>
                          </a-select>
                          <a-input size="large" class="w184" v-model="jobPrice" v-else></a-input>
                          <a 
                              @click="() => {
                                  isTrue = false;
                                  jobPrice = null;
                              }"
                          >自定义</a>
                      </a-row>
                  </a-form-item>
              </div>
              <div class="list">
                  <a-form-item class="left" label="工作地址">
                      <a-input
                          size="large"
                          v-decorator="[
                              'address',
                              {rules: [{ required: true, message: '请输入工作地址' }]}
                          ]"
                      ></a-input>
                  </a-form-item>
                  <a-form-item class="right justify" label="关键词">
                      <a-input 
                          size="large" 
                          placeholder="输入职位关键词，提高被搜索概率"
                          v-decorator="[
                              'keywords',
                              {rules: [{ required: true, message: '请输入关键词' }]}
                          ]"
                      ></a-input>
                  </a-form-item>
              </div>
              <div class="list">
                  <a-form-item class="left" label="技能要求">
                      <a-select 
                          size="large"
                          mode="multiple"
                          :tokenSeparators="[',']"
                          v-decorator="[
                              'skills',
                              {rules: [{ required: true, message: '请选择技能要求' }]}
                          ]"
                      >
                          <a-select-option
                              v-for="item in labels.skills"
                              :key="item.id"
                              :value="item.labelName"
                          >{{item.labelName}}</a-select-option>
                      </a-select>
                  </a-form-item>
                  <a-form-item class="right" label="所属部门">
                      <a-input 
                          size="large" 
                          placeholder="输入职位部门"
                          v-decorator="[
                              'depatment',
                              {rules: [{ required: true, message: '请输入所属部门' }]}
                          ]"
                      ></a-input>
                  </a-form-item>
              </div>
              <div class="list">
                  <a-form-item label="职位描述">
                      <a-textarea 
                          size="large"
                          v-decorator="[
                              'des',
                              {rules: [{ required: true, message: '请输入职位描述' }]}
                          ]"
                      />
                  </a-form-item>
              </div>
              <div class="list">
                  <a-form-item label="职位职责">
                      <a-textarea 
                          size="large" 
                          :autosize="{minRows: 6}" 
                          v-decorator="[
                              'duties',
                              {rules: [{ required: true, message: '请输入职位职责' }]}
                          ]"
                      />
                      <p>0/1000文字</p>
                  </a-form-item>
              </div>
              <div class="list">
                  <a-form-item label="职位要求">
                      <a-textarea 
                          size="large" 
                          :autosize="{minRows: 6}" 
                          v-decorator="[
                              'request',
                              {rules: [{ required: true, message: '请输入职位要求' }]}
                          ]"
                      />
                      <p>0/1000文字</p>
                  </a-form-item>
              </div>
          </div>
          <a-form-item class="job_release_btn">
              <a-button type="primary" html-type="submit">保存</a-button>
          </a-form-item>
      </a-form>
  </section>
</template>

<script>
import "./index.less";
import ajax from '../../plugins/api';
import util from '../../plugins/utils/util';
import area from '../../plugins/utils/area';

export default {
  name: "job-release",
  async asyncData(){
     return{
     }
  },
  data() {
      return{
          form: this.$form.createForm(this),
          careers: [],
          labels: [],
          provincesList: [],
          cityList: [],
          city: null,
          areaList: [],
          area: null,
          region: {},
          jobPrice: null,
          isTrue: true,
          active: 1 //默认类型 1，社会职务   2，实习职位
      }
  },
  mounted() {
      this.init();
  },
  methods: {
      init() { //初始化
          this.provincesList = area;
          this.getCareers();
      },
      callback(key) { //类型切换
          this.active = key;
      },
      handleProvinces(value) { //省市联动
          area.map(item => {
              if(item.id == value) {
                  this.cityList = item.items;
                  this.city = item.items[0].id;
                  this.areaList = item.items[0].items;
                  this.area = item.items[0].items[0].id;
                  this.region = Object.assign({}, {
                      provincesId: item.id, 
                      provincesName: item.name,
                      cityId: item.items[0].id,
                      cityName: item.items[0].name,
                      area: item.items[0].items[0].id,
                      areaName: item.items[0].items[0].name
                  });
              }
          })
      },
      handleCity(value) { //市区联动
          this.cityList.map(item => {
              if(item.id == value) {
                  this.areaList = item.items;
                  this.area = item.items[0].id;
                  this.region = Object.assign(this.region, {
                      cityId: item.id, 
                      cityName: item.name,
                      area: item.items[0].id,
                      areaName: item.items[0].name
                  });
              }
          })
      },
      handleArea(value) { //区选择
          this.areaList.map(item => {
              if(item.id == value) {
                  this.region = Object.assign(this.region, {area: item.id, areaName: item.name});
              }
          })
      },
      handleJobPrice(value) {
          this.jobPrice = value;
      },
      handleSubmit (e) { //提交
          e.preventDefault();
          this.form.validateFields((err, values) => {
              if (!err) {
                  let userInfo = util.getStore('userInfo');
                  let params = Object.assign(values, {
                      careers_id: values.careers_id[values.careers_id.length-1],
                      user_id: userInfo.id,
                      region: JSON.stringify(this.region),
                      jobPrice: this.jobPrice,
                      skills: `${values.skills}`
                  });
                  ajax.post('jobs', params).then(res => {});
                  console.log(params)
              }
          });
      },
      getCareers() {
          ajax.get('careers').then(res => {
              this.careers = res.data || [];
          });
          ajax.get('label').then(res => {
              this.labels = res.data || {}
          })
      }
  }
};
</script>