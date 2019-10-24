<template>
  <section>
      <div class="letter">
          <a-form :form="form" @submit="handleSubmit">
              <div class="company_info_form">
                    <a-form-item
                        label="信件名称" 
                        :colon="false"
                        :required="true"
                    >
                        <a-input 
                            size="large"
                            :maxLength="10"
                            v-decorator="[
                                'title',
                                {
                                    initialValue: params.title,
                                    rules: [{ required: true, message: '请输入信件名称' }]
                                }
                            ]"
                        ><span slot="suffix">0/10文字</span></a-input>
                    </a-form-item>
                    <a-form-item
                        label="信件内容" 
                        :colon="false"
                        :required="true"
                    >
                        <a-textarea 
                            size="large" 
                            :autosize="{ minRows: 20, maxRows: 50 }"
                            :maxLength="1000"
                            v-decorator="[
                            'content',
                            {
                                initialValue: params.content,
                                rules: [{ required: true, message: '请输入信件内容' }]
                            }
                            ]"
                        ></a-textarea>
                        <p>0/1000文字</p>
                    </a-form-item>
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
import ajax from '../../../plugins/api';
import util from '../../../plugins/utils/util';
export default {
  data() {
      return{
          form: this.$form.createForm(this),
          params: {
              title: '',
              content: ''
          }
      }
  },
  mounted() {
      this.devData();
  },
  methods: {
      handleSubmit(e) {
          e.preventDefault();
          this.form.validateFields((err, values) => {
              if (!err) {
                  let userInfo = util.getStore('userInfo');
                  ajax.post('set-message-model', {
                      ...values,
                      user_id: userInfo.id
                  }).then(res => {
                      if(res.retcode == 0) {
                          this.$message.success(res.msg);
                          this.devData();
                      }
                  })
              }
          })
      },
      devData() {
          let userInfo = util.getStore('userInfo');
          ajax.get('set-message-model', {user_id: userInfo.id}).then(res => {
              if(res.retcode == 0) {
                  this.params = Object.assign(this.params, res.data);
              }else{
                  this.$message.warning(res.msg);
              }
          })
      }
  }
};
</script>