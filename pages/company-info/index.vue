<template>
  <section>
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
                  {rules: [{ required: true, message: '请输入公司名称' }]}
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
                  {rules: [{ required: false, message: '' }]}
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
                    initialValue: '1',
                    rules: [{ required: true, message: '请选择公司类型' }]
                  }
                ]"
              >
                <a-select-option value="1">上市公司</a-select-option>
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
                  'scale',
                  {
                    initialValue: '1',
                    rules: [{ required: true, message: '请选择公司规模' }]
                  }
                ]"
              >
                <a-select-option value="1">50-150人</a-select-option>
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
                    'province',
                    {
                      initialValue: '1',
                      rules: [{ required: true, message: '请选择省份' }]
                    }
                  ]"
                >
                  <a-select-option value="1">上海</a-select-option>
                </a-select>
                <a-select 
                  size="large" 
                  class="mar"
                  defaultValue="1"
                >
                  <a-select-option value="1">上海</a-select-option>
                </a-select>
                <a-select
                  size="large"
                  defaultValue="1"
                >
                  <a-select-option value="1">虹口区</a-select-option>
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
                  'webpackAddress',
                  {rules: [{ required: false, message: '' }]}
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
                    initialValue: '上海市青浦区绝俘路258弄60号（朗诵金融大厦）5层',
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
                  'mailbox',
                  {rules: [{ required: false, message: '' }]}
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
                :maxLength="100"
                v-decorator="[
                  'synopsis',
                  {rules: [{ required: true, message: '请输入公司简介' }]}
                ]"
              ></a-textarea>
              <p>0/100文字</p>
            </a-form-item>
            <!-- 公司LOGO -->
            <a-form-item 
              label="公司LOGO" 
              :label-col="{span: 2}"
              :colon="false"
            >
              <div class="item_flex item_logo">
                <a-upload name="file" 
                  :multiple="false" 
                  listType="picture-card"
                  :fileList="logoFileList"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  v-decorator="['logeImg', {
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
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  v-decorator="['companyImg', {
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
        companyFileList: [] //公司图片列表
      }
  },
  mounted() {
  },
  methods: {
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
    //提交表单
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
        }
      });
    }
  }
};
</script>