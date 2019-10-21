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
                                'letterName',
                                {
                                    initialValue: params.letterName,
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
                            'letterText',
                            {
                                initialValue: params.letterText,
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

export default {
  data() {
      return{
          form: this.$form.createForm(this),
          params: {
              letterName: '',
              letterText: ''
          }
      }
  },
  mounted() {
  },
  methods: {
      handleSubmit(e) {
          e.preventDefault();
          this.form.validateFields((err, values) => {
              if (!err) {
                  console.log(values)
              }
          })
      }
  }
};
</script>