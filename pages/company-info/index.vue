<template>
  <section class="page_centent">
    <div class="nav-bg"></div>
    <div class="company_info">
      <a-form :form="form" @submit="handleSubmit">
        <div class="company_info_form">
          <div class="title">公司基本信息</div>
          <div class="form_centen">
            <!-- 公司名称 -->
            <a-form-item
              class="form_item_6" 
              label="公司名称" 
              :label-col="formItemLayout6.labelCol"
              :wrapper-col="formItemLayout6.wrapperCol"
              :colon="false"
              :required="true"
            >
              <a-input 
                placeholder="请输入公司全称" 
                size="large"
                :maxLength="10"
                v-decorator="[
                  'name',
                  {
                    initialValue: params.name,
                    rules: [{ required: true, message: '请输入公司名称' }]
                  }
                ]"
              ></a-input>
            </a-form-item>
            <!-- 公司简称 -->
            <a-form-item
              class="form_item_4" 
              label="公司简称" 
              :label-col="formItemLayout4.labelCol"
              :wrapper-col="formItemLayout4.wrapperCol"
              :colon="false"
            >
              <a-input 
                size="large"
                :maxLength="10"
                v-decorator="[
                  'abbreviation',
                  {
                    initialValue: params.abbreviation,
                    rules: [{ required: false, message: '' }]
                  }
                ]"
              ></a-input>
            </a-form-item>
            <!-- 公司类型 -->
            <a-form-item
              class="form_item_6" 
              label="公司类型" 
              :label-col="formItemLayout6.labelCol"
              :wrapper-col="formItemLayout6.wrapperCol"
              :colon="false"
              :required="true"
            >
              <a-select 
                size="large"
                v-decorator="[
                  'type',
                  {
                    initialValue: params.type,
                    rules: [{ required: true, message: '请选择公司类型' }]
                  }
                ]"
              >
                <a-select-option
                    v-for="item in capitalizes"
                    :key="item.id"
                    :value="item.id"
                >{{item.labelName}}</a-select-option>
              </a-select>
            </a-form-item>
            <!-- 公司规模 -->
            <a-form-item
              class="form_item_4" 
              label="公司规模" 
              :label-col="formItemLayout4.labelCol"
              :wrapper-col="formItemLayout4.wrapperCol"
              :colon="false"
              :required="true"
            >
              <a-select 
                size="large"
                v-decorator="[
                  'size',
                  {
                    initialValue: params.size,
                    rules: [{ required: true, message: '请选择公司规模' }]
                  }
                ]"
              >
                <a-select-option
                    v-for="item in companySizes"
                    :key="item.id"
                    :value="item.id + ''"
                >{{item.labelName}}</a-select-option>
              </a-select>
            </a-form-item>
            <!-- 所在地区 -->
            <a-form-item
              class="form_item_6" 
              label="所在地区" 
              :label-col="formItemLayout6.labelCol"
              :wrapper-col="formItemLayout6.wrapperCol"
              :colon="false"
              :required="true"
            >
              <div class="flex">
                <a-select 
                  size="large"
                  v-decorator="[
                    'region',
                    {
                      initialValue: provincesId,
                      rules: [{ required: true, message: '请选择省份' }]
                    }
                  ]"
                  @change="province"
                >
                  <a-select-option
                      v-for="item in provinces"
                      :key="item.id"
                      :value="item.id"
                  >{{item.name}}</a-select-option>
                </a-select>
                <a-select 
                  size="large" 
                  class="mar"
                  v-model="city"
                  @change="onCity"
                >
                  <a-select-option
                      v-for="item in citys"
                      :key="item.id"
                  >{{item.name}}</a-select-option>
                </a-select>
                <a-select
                  size="large"
                  v-model="area"
                  @change="onArea"
                >
                  <a-select-option
                      v-for="item in areas"
                      :key="item.id"
                  >{{item.name}}</a-select-option>
                </a-select>
              </div>
            </a-form-item>
            <!-- 公司官网 -->
            <a-form-item
              class="form_item_4" 
              label="公司官网" 
              :label-col="formItemLayout4.labelCol"
              :wrapper-col="formItemLayout4.wrapperCol"
              :colon="false"
            >
              <a-input 
                size="large"
                :maxLength="30"
                v-decorator="[
                  'website',
                  {
                    initialValue: params.website,
                    rules: [{ required: false, message: '' }]
                  }
                ]"
              ></a-input>
            </a-form-item>
            <!-- 公司地址 -->
            <a-form-item
              class="form_item_6" 
              label="公司地址" 
              :label-col="formItemLayout6.labelCol"
              :wrapper-col="formItemLayout6.wrapperCol"
              :colon="false"
              :required="true"
            >
              <a-input 
                size="large"
                :maxLength="30" 
                v-decorator="[
                  'address',
                  {
                    initialValue: params.address,
                    rules: [{ required: true, message: '请输入公司地址' }]
                  }
                ]"
              ></a-input>
            </a-form-item>
            <!-- 公司邮箱 -->
            <a-form-item
              class="form_item_4" 
              label="公司邮箱" 
              :label-col="formItemLayout4.labelCol"
              :wrapper-col="formItemLayout4.wrapperCol"
              :colon="false"
            >
              <a-input 
                size="large"
                :maxLength="20"
                v-decorator="[
                  'email',
                  {
                    initialValue: params.email,
                    rules: [{ required: false, message: '' }]
                  }
                ]"
              ></a-input>
            </a-form-item>
          </div>
          <div class="title">公司其他信息</div>
          <div class="form_flex">
            <!-- 公司简介 -->
            <a-form-item
              label="公司简介" 
              :label-col="{span: 2}"
              :wrapper-col="{span: 21}"
              :colon="false"
              :required="true"
            >
              <a-textarea 
                size="large" 
                :autosize="{ minRows: 6, maxRows: 10 }"
                :maxLength="1000"
                v-decorator="[
                  'des',
                  {
                    initialValue: params.des,
                    rules: [{ required: true, message: '请输入公司简介' }]
                  }
                ]"
              ></a-textarea>
              <p>0/1000文字</p>
            </a-form-item>
            <!-- 公司LOGO -->
            <a-form-item 
              label="公司LOGO" 
              :label-col="{span: 2}"
              :colon="false"
            >
              <div class="item_flex item_logo">
                <a-upload name="file" 
                  :multiple="true" 
                  listType="picture-card"
                  :fileList="logoFileList"
                  :action="upLoadUrl"
                  :supportServerRender="true"
                  :withCredentials="true"
                  v-decorator="['logo', {
                    valuePropName: 'logoFileList',
                    getValueFromEvent: normFile
                  }]"
                  @change="logoChange"
                >
                  <a-button type="primary">选择上传图片</a-button>
                </a-upload>
              </div>
            </a-form-item>
            <!-- 公司图片 -->
            <a-form-item 
              label="公司图片" 
              :label-col="{span: 2}"
              :colon="false"
            >
              <div class="item_flex item_company">
                <a-upload name="files" 
                  :multiple="true" 
                  listType="picture-card"
                  :fileList="companyFileList"
                  :action="upLoadUrl"
                  :withCredentials="true"
                  v-decorator="['imgList', {
                    valuePropName: 'companyFileList',
                    getValueFromEvent: normFile
                  }]"
                  @change="companyChange"
                >
                  <a-button type="primary">选择上传图片</a-button>
                </a-upload>
              </div>
            </a-form-item>
          </div>
        </div>
        <!-- 提交按钮 -->
        <div class="submit">
            <a-button
              type="primary"
              html-type="submit"
            >
              保存
            </a-button>
        </div>
      </a-form>
    </div>
  </section>
</template>

<script>
import "./index.less";
import ajax from '../../plugins/api';
import util from '../../plugins/utils/util';
import area from '../../plugins/utils/area';

export default {
  name: "company-info",
  async asyncData(){
     return{

     }
  },
  data() {
      return{
        form: this.$form.createForm(this),
        formItemLayout6: { //栅格60%
          labelCol: {span: 4},
          wrapperCol: {span: 16}
        },
        formItemLayout4: { //栅格40%
          labelCol: {span: 6},
          wrapperCol: {span: 16}
        },
        logoFileList: [], //logo图片列表
        companyFileList: [], //公司图片列表
        capitalizes: [],
        companySizes: [],
        params: {},
        upLoadUrl: null,
        provinces: [],
        provincesId: null,
        citys: [],
        areas: [],
        city: null,
        area: null,
        region: {}
      }
  },
  mounted() {
    this.init();
    this.labelData();
    this.devData();
  },
  methods: {
    init() {
      this.upLoadUrl = util.upLoadUrl;
      this.provinces = area;
    },
    //提交时上传图片处理
    normFile(e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
    //公司logo图片上传
    logoChange({ file, fileList }) {
      let newList = [...fileList];
      newList = newList.slice(-1);
      newList = newList.map((v) => {
        if (v.response) {
          v.url = v.response.url;
        }
        return v;
      });
      this.logoFileList = newList;
    },
    //公司图片上传
    companyChange({ file, fileList }) {
      let newList = [...fileList];
      newList = newList.slice(-6);
      newList = newList.map((v) => {
        if (v.response) {
          v.url = v.response.url;
        }
        return v;
      });
      this.companyFileList = newList;
    },
    province(value) {
      this.provinces.map(item => {
        if(item.id == value) {
          this.citys = item.items;
          this.city = item.items[0].id;
          this.areas = item.items[0].items;
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
      });
    },
    onCity(value) {
      this.citys.map(item => {
        if(item.id == value) {
          this.areas = item.items;
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
    onArea(value) {
      this.areas.map(item => {
          if(item.id == value) {
              this.region = Object.assign(this.region, {area: item.id, areaName: item.name});
          }
      })
    },
    //提交表单
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let userInfo = util.getStore('userInfo');
          let _imgList = [];
          let _logo = '';
          this.companyFileList.map(item => {
            _imgList.push(item.url || item.response.data.imageList[0]);
          });
          this.logoFileList.map(item => {
            _logo = item.url || item.response.data.imageList[0];
          });
          let params = Object.assign({}, values, {
            region: JSON.stringify(this.region),
            id: this.params.id,
            user_id: userInfo.id,
            logo: _logo,
            imgList: _imgList.length > 0 ? _imgList.join(',') : null
          });
          ajax.post('company', params).then(res => {
            if(res.retcode == 0) {
              this.$message.success(res.msg);
              this.devData();
            }
          })
        }
      });
    },
    labelData() {
      ajax.get('label').then(res => {
        if(res.retcode == 0) {
          this.capitalizes = res.data.capitalizes || [];
          this.companySizes = res.data.companySizes || [];
        }
      })
    },
    devData() {
      let userInfo = util.getStore('userInfo');
      ajax.get('company', {user_id: userInfo.id}).then(res => {
        if(res.retcode == 0) {
          this.params = res.data[0] || {};
          if(this.params.region) {
            let _region = JSON.parse(this.params.region);
            if(_region.provincesId) {
              this.provincesId = _region.provincesId;
              this.province(_region.provincesId);
            };
            if(_region.cityId) {
              this.city = _region.cityId;
              this.onCity(_region.cityId);
            };
            if(_region.area) {
              this.area = _region.area;
              this.onArea(_region.area);
            };
          };
          if(this.params.logo) {
            let _logoFileList = this.params.logo.split(',');
            this.logoFileList = [];
            _logoFileList.map(item => {
              this.logoFileList.push({
                uid: '-0',
                name: 'xxx.png',
                status: 'done',
                url: item
              });
            })
          };
          if(this.params.imgList) {
            let _companyFileList = this.params.imgList.split(',');
            this.companyFileList = [];
            _companyFileList.map((item, index) => {
              this.companyFileList.push({
                uid: -index + '',
                name: 'yyy.png',
                status: 'done',
                url: item
              });
            })
          }
        }
      })
    }
  }
};
</script>