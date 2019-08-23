<template>
    <section v-if="modelData">
        <a-modal
            :confirmLoading="false"
            :maskClosable="false"
            :visible="true"
            class="education_model"
            @cancel="handleCancel"
        >
            <div slot="title">{{modelData.title}}</div>
            <div class="page_modal">
                <a-form :form="form" @submit="handleSubmit">
                    <a-form-item>
                        <h4>增加教育经验</h4>
                    </a-form-item>
                    <a-form-item
                        label="学校名称"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'school_name',
                            {
                                initialValue: modelData.school_name,
                                rules: [{ required: false }]
                            }
                          ]"
                        />
                    </a-form-item>
                    <a-form-item
                        label="在校时间"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-date-picker :defaultValue="moment(start_time, dateFormat)" @change="beginTime" />
                        <a-date-picker :defaultValue="moment(end_time, dateFormat)" @change="endTime" />
                    </a-form-item>
                    <a-form-item
                        label="学历"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-select
                          v-decorator="[
                            'qualifications_id',
                            {
                                initialValue: modelData.qualifications_id ? Number(modelData.qualifications_id) : modelData.qualifications_id,
                                rules: [{ required: false }]
                            }
                          ]"
                        >
                            <a-select-option
                              v-for="item in labels.educationals"
                              :key="item.id"
                              :value="item.id"
                            >{{item.labelName}}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item
                        label="专业名称"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'major',
                            {
                                initialValue: modelData.major,
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
          start_time: null,
          end_time: null,
          labels: {}
      }
  },
  watch: {
      modelEdit() {
          this.modelData = this.modelEdit;
          this.start_time = util.formatDate(new Date());
          this.end_time = util.formatDate(new Date());
          if(this.modelEdit) {
              if(this.modelEdit.start_time) this.start_time = util.formatDate(this.modelEdit.start_time);
              if(this.modelEdit.end_time) this.end_time = util.formatDate(this.modelEdit.end_time);
          }
      }
  },
  mounted() {
      this.labelDev();
  },
  methods: {
      moment,
      beginTime(date, dateString) {
          this.start_time = dateString;
      },
      endTime(date, dateString) {
          this.end_time = dateString;
      },
      handleCancel() { //关闭弹窗
          this.modelData = null;
          this.$emit('cancelModel', 'educationModal');
      },
      handleSubmit (e) { //提交
          e.preventDefault();
          this.form.validateFields((err, values) => {
              if (!err) {
                  let userInfo = util.getStore('userInfo');
                  let params = Object.assign({}, {
                      ...values,
                      start_time: this.start_time,
                      end_time: this.end_time,
                      user_id: userInfo.id,
                      id: this.modelEdit.id || null,
                      qualifications: values.qualifications_id ? this.labels.educationals.find(item => item.id == values.qualifications_id).labelName : null
                  });
                  if(this.modelData.isEdit) {
                      ajax.put('user/education', params).then(res => {
                          if(res.retcode == 0) {
                              this.modelData = null;
                              this.$emit('okModel', 'educationModal');
                          }
                      })
                  }else{
                      ajax.post('user/education', params).then(res => {
                          if(res.retcode == 0) {
                              this.modelData = null;
                              this.$emit('okModel', 'educationModal');
                          }
                      })
                  }
              }
          });
      },
      labelDev() {
          ajax.get('label').then(res => {
              if(res.retcode == 0) {
                  this.labels = res.data || {};
              }
          })
      }
  }
};
</script>