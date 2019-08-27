<template>
    <section v-if="modelData">
        <a-modal
            :confirmLoading="false"
            :maskClosable="false"
            :visible="true"
            class="infoModel"
            @cancel="handleCancel"
        >
            <div slot="title">{{modelData.title}}</div>
            <div class="page_modal">
                <a-form :form="form" @submit="handleSubmit">
                    <a-form-item>
                        <h4>基本信息</h4>
                    </a-form-item>
                    <a-form-item
                        label="姓名"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'username',
                            {
                                initialValue: modelData.username?modelData.username:'',
                                rules: [{ required: false }]
                            }
                          ]"
                         />
                    </a-form-item>
                    <a-form-item
                        label="生日"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-date-picker :defaultValue="modelData.birth&&moment(modelData.birth, dateFormat)" @change="handleBirth" />
                    </a-form-item>
                    <a-form-item
                        label="性别"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-radio-group
                          v-decorator="[
                            'sex',
                            {
                                initialValue: modelData.sex?modelData.sex + '':'',
                                rules: [{ required: false }]
                            }
                          ]"
                        >
                            <a-radio value="1">男</a-radio>
                            <a-radio value="2">女</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item
                        label="所在城市"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-cascader
                          :fieldNames="{label: 'name', value: 'id', children: 'item'}"
                          :options="areas"
                          :defaultValue="cityArr"
                          @change="onCascader"
                          placeholder="请选择城市"
                        >
                            <template slot="displayRender" slot-scope="{labels}">
                                <span v-for="(label, index) in labels" :key="index">
                                    <span v-if="index == 1">{{label}}</span>
                                </span>
                            </template>
                        </a-cascader>
                    </a-form-item>
                    <a-form-item
                        label="手机号码"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'phone',
                            {
                                initialValue: modelData.phone?modelData.phone:'',
                                rules: [{ required: false }]
                            }
                          ]"
                         />
                    </a-form-item>
                    <a-form-item
                        label="求职状态"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-select
                          v-decorator="[
                            'indenty',
                            {
                                initialValue: modelData.indenty?modelData.indenty + '':'',
                                rules: [{ required: false }]
                            }
                          ]"
                        >
                            <a-select-option value="1">离职-随时到岗</a-select-option>
                            <a-select-option value="2">在职-月内到岗</a-select-option>
                            <a-select-option value="3">在职-考虑机会</a-select-option>
                            <a-select-option value="4">在校学生</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item
                        label="工作时间"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-date-picker :defaultValue="modelData.workTime&&moment(modelData.workTime, dateFormat)" @change="handleWorkTime" />
                    </a-form-item>
                    <a-form-item label="1" :label-col="labelCol" class="btn">
                        <a-button type="primary" html-type="submit">保存</a-button>
                    </a-form-item>
                </a-form>
            </div>
            <div slot="footer"></div>
        </a-modal>
    </section>
</template>

<script>
import "./index.less";
import moment from 'moment';
import ajax from '../../../plugins/api';
import util from '../../../plugins/utils/util';
import area from '../../../plugins/utils/area';

export default {
  name: "Modal",
  props: ['modelEdit'],
  async asyncData(){
     return{

     }
  },
  data() {
      return{
          dateFormat: 'YYYY-MM-DD',
          modelData: null,
          labelCol: {span: 3},
          wrapperCol: {span: 21},
          form: this.$form.createForm(this),
          labels: {},
          areas: [],
          city: null,
          birth: null,
          workTime: null,
          citys: {},
          cityArr: []
      }
  },
  watch: {
      modelEdit() {
          this.modelData = this.modelEdit;
          if(this.modelData && this.modelData.city) {
              this.citys = JSON.parse(this.modelData.city);
              let cityArr = this.citys?this.findParentById(this.areas, this.citys.id, 'id', 'item'):[];
              this.cityArr = this.citys?[...cityArr, this.citys.id]:[];
          };
      }
  },
  mounted() {
      this.labelDev();
      this.init();
  },
  methods: {
      moment,
      init() {
          area.map(item => { //获取地址列表
              this.areas.push({
                  id: item.id,
                  name: item.name,
                  item: item.items
              })
          });
      },
      handleBirth(date, dateString) { //生日
          this.birth = dateString;
      },
      handleWorkTime(date, dateString) { //工作时间
          this.workTime = dateString;
      },
      onCascader(value) { //地址
          let _city = Object.assign({}, {
              id: value[1]
          });
          this.areas.map(item => {
              if(item.id == value[0]) {
                  item.item.map(i => {
                      if(i.id == value[1]) {
                          this.city = Object.assign(_city, {
                              name: i.name
                          })
                      }
                  })
              }
          })
      },
      handleCancel() { //关闭弹窗
          this.modelData = null;
          this.$emit('cancelModel', 'infoModel');
      },
      handleSubmit (e) { //提交
          e.preventDefault();
          this.form.validateFields((err, values) => {
              if (!err) {
                  let userInfo = util.getStore('userInfo');
                  let _data = Object.assign(values, {
                      user_id: userInfo.id
                  });
                  if(this.city){
                      _data.city = JSON.stringify(this.city);
                  }
                  if(this.workTime){
                      _data.workTime = this.workTime;
                  }
                  if(this.birth){
                      _data.birth = this.birth;
                  }
                  _data&&Object.keys(_data).map(item=>{
                      if(!_data[item]||_data[item]==undefined||_data[item]=='undefined'){
                          delete _data[item];
                      }
                  })
                  ajax.post('user/detail', _data).then(res => {
                      if(res.retcode == 0) {
                          this.modelData = null;
                          this.$emit('okModel', 'infoModel');
                      }
                  })
              }
          });
      },
      labelDev() {
          ajax.get('label').then(res => {
              if(res.retcode == 0) {
                  this.labels = res.data || {};
              }
          })
      },
      //通过子集值查询父级值
      findParentById(arr, path, type, pArr, needInfo) { //arr:要匹配的数组，path:要匹配的值， type:根据什么字段匹配， pArr:子集数组属性名， needInfo:自定义返回值
          let parentIds = [], index = 0, names = [],
              hasParentId = function loop(arr, index) {
                  return arr.some(item => {
                      if(item[type] == path && item.sort) {
                          parentIds = parentIds.slice(0, index);
                          names = names.splice(0, index);
                          return true;
                      }else if(Array.isArray(item[pArr])) {
                          parentIds[index] = item[type];
                          names[index] = item;
                          return loop(item[pArr], index+1);
                      };
                      return false;
                  })
              }(arr, index);
          if(needInfo) {
              return hasParentId ? {
                  parentIds,
                  names
              } : {
                  parentIds: [],
                  names: []
              };
          };
          return hasParentId ? parentIds : [];
      }
  }
};
</script>