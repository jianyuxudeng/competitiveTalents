<template>
    <section v-if="modelData">
        <a-modal
            :confirmLoading="false"
            :maskClosable="false"
            :visible="true"
            class="socia_model"
            @cancel="handleCancel"
        >
            <div slot="title">{{modelData.title}}</div>
            <div class="page_modal">
                <a-form :form="form" @submit="handleSubmit">
                    <a-form-item>
                        <h4>添加社交主页</h4>
                    </a-form-item>
                    <a-form-item
                        label=""
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'social_link',
                            {
                                initialValue: modelData.social_link,
                                rules: [{ required: false }]
                            }
                          ]"
                        />
                    </a-form-item>
                    <a-form-item
                        label=""
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <p>请添加能突出你个人专业能力示例的主页</p>
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
          form: this.$form.createForm(this),
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
          this.$emit('cancelModel', 'socialModal');
      },
      handleSubmit (e) { //提交
          e.preventDefault();
          this.form.validateFields((err, values) => {
              if (!err) {
                  let userInfo = util.getStore('userInfo');
                  let params = Object.assign({}, {
                      ...values,
                      user_id: userInfo.id,
                      id: this.modelEdit.id || null,
                  });
                  if(this.modelData.isEdit) {
                      ajax.put('user/social', params).then(res => {
                          if(res.retcode == 0) {
                              this.modelData = null;
                              this.$emit('okModel', 'socialModal');
                          }
                      })
                  }else{
                      ajax.post('user/social', params).then(res => {
                          if(res.retcode == 0) {
                              this.modelData = null;
                              this.$emit('okModel', 'socialModal');
                          }
                      })
                  }
              }
          });
      }
  }
};
</script>