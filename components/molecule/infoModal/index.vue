<template>
    <section v-if="modelData">
        <a-modal
            :confirmLoading="false"
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
                            {rules: [{ required: false }]}
                          ]"
                         />
                    </a-form-item>
                    <a-form-item
                        label="生日"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-select 
                          class="w48"
                          v-decorator="[
                            'birth',
                            {rules: [{ required: false }]}
                          ]"
                        >
                            <a-select-option value="1987">1987年</a-select-option>
                        </a-select>
                        <a-select class="w48">
                            <a-select-option :value="item" v-for="item in 12" :key="item">{{item < 10 ? '0' + item : item}}</a-select-option>
                        </a-select>
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
                                initialValue: '1',
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
                        <a-select
                          v-decorator="[
                            'city',
                            {rules: [{ required: false }]}
                          ]"
                        >
                            <a-select-option value="1987">1987年</a-select-option>
                        </a-select>
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
                            {rules: [{ required: false }]}
                          ]"
                         />
                    </a-form-item>
                    <a-form-item
                        label="当前身份"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-radio-group
                          v-decorator="[
                            'indenty',
                            {
                                initialValue: '0',
                                rules: [{ required: false }]
                            }
                          ]"
                        >
                            <a-radio value="0">非学生</a-radio>
                            <a-radio value="1">学生</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item
                        label="工作时间"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-select
                          v-decorator="[
                            'workTime',
                            {rules: [{ required: false }]}
                          ]"
                        >
                            <a-select-option value="1987">1987年</a-select-option>
                        </a-select>
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
import ajax from '../../../plugins/api';
import util from '../../../plugins/utils/util';

export default {
  name: "Modal",
  props: ['modelEdit'],
  async asyncData(){
     return{

     }
  },
  data() {
      return{
          modelData: null,
          labelCol: {span: 3},
          wrapperCol: {span: 21},
          form: this.$form.createForm(this)
      }
  },
  watch: {
      modelEdit() {
          this.modelData = this.modelEdit;
      }
  },
  mounted() {
  },
  methods: {
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
                  ajax.post('user/detail', _data).then(res => {
                      if(res.retcode == 0) {
                          this.modelData = null;
                          this.$emit('cancelModel', 'infoModel');
                      }
                  })
              }
          });
      }
  }
};
</script>