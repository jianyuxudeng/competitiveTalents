<template>
    <section v-if="modelData">
        <a-modal
            :confirmLoading="false"
            :maskClosable="false"
            :visible="true"
            class="project_express_model"
            @cancel="handleCancel"
        >
            <div slot="title">{{modelData.title}}</div>
            <div class="page_modal">
                <a-form :form="form" @submit="handleSubmit">
                    <a-form-item>
                        <h4>增加项目经历</h4>
                    </a-form-item>
                    <a-form-item
                        label="项目名称"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'project_name',
                            {
                                initialValue: modelData.project_name,
                                rules: [{ required: false }]
                            }
                          ]"
                        />
                    </a-form-item>
                    <a-form-item
                        label="关联公司"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'company_name',
                            {
                                initialValue: modelData.company_name,
                                rules: [{ required: false }]
                            }
                          ]"
                        />
                    </a-form-item>
                    <a-form-item
                        label="项目周期"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-date-picker :defaultValue="moment(begin_time, dateFormat)" @change="beginTime" />
                        <a-date-picker :defaultValue="moment(end_time, dateFormat)" @change="endTime" />
                    </a-form-item>
                    <a-form-item
                        label="项目链接"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'project_link',
                            {
                                initialValue: modelData.project_link,
                                rules: [{ required: false }]
                            }
                          ]"
                        />
                    </a-form-item>
                    <a-form-item
                        label="项目描述"
                        class="start"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-textarea
                          v-decorator="[
                            'project_des',
                            {
                                initialValue: modelData.project_des,
                                rules: [{ required: false }]
                            }
                          ]"
                         />
                    </a-form-item>
                    <a-form-item
                        label="你的成就"
                        class="start"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-textarea
                          v-decorator="[
                            'achievement',
                            {
                                initialValue: modelData.achievement,
                                rules: [{ required: false }]
                            }
                          ]"
                         />
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
          begin_time: null,
          end_time: null,
      }
  },
  watch: {
      modelEdit() {
          this.modelData = this.modelEdit;
          this.begin_time = util.formatDate(new Date());
          this.end_time = util.formatDate(new Date());
          if(this.modelEdit) {
              if(this.modelEdit.begin_time) this.begin_time = util.formatDate(this.modelEdit.begin_time);
              if(this.modelEdit.end_time) this.end_time = util.formatDate(this.modelEdit.end_time);
          }
      }
  },
  mounted() {
  },
  methods: {
      moment,
      beginTime(date, dateString) {
          this.begin_time = dateString;
      },
      endTime(date, dateString) {
          this.end_time = dateString;
      },
      handleCancel() { //关闭弹窗
          this.modelData = null;
          this.$emit('cancelModel', 'projectExpressModal');
      },
      handleSubmit (e) { //提交
          e.preventDefault();
          this.form.validateFields((err, values) => {
              if (!err) {
                  let userInfo = util.getStore('userInfo');
                  let params = Object.assign({}, {
                      ...values,
                      begin_time: this.begin_time,
                      end_time: this.end_time,
                      user_id: userInfo.id,
                      id: this.modelEdit.id || null
                  });
                  if(this.modelData.isEdit) {
                      ajax.put('user/projectExpress', params).then(res => {
                          if(res.retcode == 0) {
                              this.modelData = null;
                              this.$emit('okModel', 'projectExpressModal');
                          }
                      })
                  }else{
                      ajax.post('user/projectExpress', params).then(res => {
                          if(res.retcode == 0) {
                              this.modelData = null;
                              this.$emit('okModel', 'projectExpressModal');
                          }
                      })
                  }
              }
          });
      }
  }
};
</script>