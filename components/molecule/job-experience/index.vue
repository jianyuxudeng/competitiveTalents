<template>
    <section v-if="modelData">
        <a-modal
            :confirmLoading="false"
            :maskClosable="false"
            :visible="true"
            class="job_experience_model"
            @cancel="handleCancel"
        >
            <div slot="title">{{modelData.title}}</div>
            <div class="page_modal">
                <a-form :form="form" @submit="handleSubmit">
                    <a-form-item>
                        <h4>增加工作经历</h4>
                    </a-form-item>
                    <a-form-item
                        label="公司名称"
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
                        label=" "
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-checkbox
                            :checked="is_show"
                            @change="is_show = !is_show"
                            v-decorator="[
                                'is_show',
                                {
                                    initialValue: is_show,
                                    rules: [{ required: false }]
                                }
                            ]"
                        >不希望该企业看到我</a-checkbox>
                    </a-form-item>
                    <a-form-item
                        label="行业标签"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-select
                          v-decorator="[
                            'trades_id',
                            {
                                initialValue: modelData.trades_id ? Number(modelData.trades_id) || '0' : null,
                                rules: [{ required: false }]
                            }
                          ]"
                         >
                             <a-select-option
                                 v-for="item in labels.trades"
                                 :key="item.id"
                                 :value="item.id"
                             >{{item.labelName}}</a-select-option>
                             <a-select-option value="0">非电竞行业</a-select-option>
                         </a-select>
                    </a-form-item>
                    <a-form-item
                        label="所属部门"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'department',
                            {
                                initialValue: modelData.department,
                                rules: [{ required: false }]
                            }
                          ]"
                         />
                    </a-form-item>
                    <a-form-item
                        label="职位类型"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-select
                          v-decorator="[
                            'career_id',
                            {
                                initialValue: modelData.career_id ? Number(modelData.career_id) : null,
                                rules: [{ required: false }]
                            }
                          ]"
                         >
                             <a-select-option
                                 v-for="item in labels.jobTypes"
                                 :key="item.id"
                                 :value="item.id"
                             >{{item.labelName}}</a-select-option>
                         </a-select>
                    </a-form-item>
                    <a-form-item
                        label="职位名称"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'career_name',
                            {
                                initialValue: modelData.career_name,
                                rules: [{ required: false }]
                            }
                          ]"
                         />
                    </a-form-item>
                    <a-form-item
                        label="在职时间"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-date-picker :defaultValue="moment(come_time, dateFormat)" @change="comeTime" />
                        <a-date-picker :defaultValue="moment(leave_time, dateFormat)" @change="leaveTime" />
                    </a-form-item>
                    <a-form-item
                        label="技能标签"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                         <a-select
                             mode="tags"
                             :tokenSeparators="[',']"
                             @change="handleSkills"
                             v-decorator="[
                                'skills',
                                {
                                    initialValue: modelData.skills ? modelData.skills.split(',') : [],
                                    rules: [{ required: false }]
                                }
                             ]"
                         >
                             <a-select-option
                                 v-for="item in labels.skills"
                                 :key="item.id"
                                 :value="item.labelName"
                             >{{item.labelName}}</a-select-option>
                         </a-select>
                    </a-form-item>
                    <a-form-item
                        label="税前月薪"
                        :colon="false"
                    >
                        <a-input
                          v-decorator="[
                            'salary',
                            {
                                initialValue: modelData.salary,
                                rules: [{ required: false }]
                            }
                          ]"
                         />
                    </a-form-item>
                    <a-form-item
                        label="工作内容"
                        class="start"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-textarea
                          placeholder="为保护个人隐私，请不要填写手机号、微信、QQ等联系方式；"
                          v-decorator="[
                            'content',
                            {
                                initialValue: modelData.content,
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
          labels: {},
          come_time: null,
          leave_time: null,
          is_show: false
      }
  },
  watch: {
      modelEdit() {
          this.modelData = this.modelEdit;
          this.come_time = util.formatDate(new Date());
          this.leave_time = util.formatDate(new Date());
          if(this.modelEdit) {
              if(this.modelEdit.come_time) this.come_time = util.formatDate(this.modelEdit.come_time);
              if(this.modelEdit.leave_time) this.leave_time = util.formatDate(this.modelEdit.leave_time);
              this.is_show = this.modelEdit.is_show == 0;
          }
      }
  },
  mounted() {
      this.labelDev();
  },
  methods: {
      moment,
      handleSkills(value) {
          if(value.length > 3) {
              value.length = 3;
          };
      },
      comeTime(date, dateString) {
          this.come_time = dateString;
      },
      leaveTime(date, dateString) {
          this.leave_time = dateString;
      },
      handleCancel() { //关闭弹窗
          this.modelData = null;
          this.come_time = null;
          this.leave_time = null;
          this.is_show = false;
          this.$emit('cancelModel', 'jobExperienceModal');
      },
      handleSubmit (e) { //提交
          e.preventDefault();
          this.form.validateFields((err, values) => {
              if (!err) {
                  let userInfo = util.getStore('userInfo');
                  let _trades_name = null;
                  let _career_type = null;
                  if(values.trades_id == '0') {
                      _trades_name = '非电竞行业';
                  }else{
                      this.labels.trades.map(item => {
                          if(item.id == values.trades_id) {
                              _trades_name = item.labelName;
                          }
                      })
                  };
                  this.labels.jobTypes.map(item => {
                      if(item.id == values.career_id) {
                          _career_type = item.labelName;
                      }
                  })
                  let params = Object.assign({}, {
                      ...values,
                      skills: `${values.skills}`,
                      come_time: this.come_time,
                      leave_time: this.leave_time,
                      is_show: values.is_show ? 0 : 1,
                      user_id: userInfo.id,
                      id: this.modelEdit.id || null,
                      trades_name: _trades_name,
                      career_type: _career_type
                  });
                  if(this.modelData.isEdit) {
                      ajax.put('user/experience', params).then(res => {
                          if(res.retcode == 0) {
                              this.modelData = null;
                              this.come_time = null;
                              this.leave_time = null;
                              this.is_show = false;
                              this.$emit('okModel', 'jobExperienceModel');
                          }
                      })
                  }else{
                      ajax.post('user/experience', params).then(res => {
                          if(res.retcode == 0) {
                              this.modelData = null;
                              this.come_time = null;
                              this.leave_time = null;
                              this.is_show = false;
                              this.$emit('okModel', 'jobExperienceModel');
                          }
                      })
                  }
              }
          });
      },
      labelDev() { //获取全部label
          ajax.get('label').then(res => {
              if(res.retcode == 0) {
                  this.labels = res.data || {};
              }
          })
      }
  }
};
</script>