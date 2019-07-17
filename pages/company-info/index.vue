<template>
  <section>
    <div class="nav-bg"></div>
    <div class="company_info">
      <a-form :form="form">
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
              <a-input placeholder="请输入公司全称" size="large"></a-input>
            </a-form-item>
            <!-- 公司简称 -->
            <a-form-item
              class="form_item_4" 
              label="公司简称" 
              :label-col="formItemLayout4.labelCol"
              :wrapper-col="formItemLayout4.wrapperCol"
              :colon="false"
            >
              <a-input size="large"></a-input>
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
              <a-select defaultValue="上市公司" size="large">
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
              <a-select defaultValue="50-150人" size="large">
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
                <a-select defaultValue="上海" size="large">
                  <a-select-option value="1">上海</a-select-option>
                </a-select>
                <a-select defaultValue="上海" size="large" class="mar">
                  <a-select-option value="1">上海</a-select-option>
                </a-select>
                <a-select defaultValue="虹口区" size="large">
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
              <a-input size="large"></a-input>
            </a-form-item>
          </div>
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
        formItemLayout6: {
          labelCol: {span: 4},
          wrapperCol: {span: 16}
        },
        formItemLayout4: {
          labelCol: {span: 6},
          wrapperCol: {span: 16}
        }
      }
  },
  mounted() {
  },
  methods: {
  }
};
</script>