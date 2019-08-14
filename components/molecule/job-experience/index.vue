<template>
    <section v-if="modelData">
        <a-modal
            :confirmLoading="false"
            :visible="true"
            class="job_experience_model"
            @cancel="handleCancel"
        >
            <div slot="title">{{modelData.title}}</div>
            <div class="page_modal">
                <a-form :form="form" @submit="handleSubmit">
                    <a-form-item>
                        <h4>增加工作经验</h4>
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
                        label=""
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-checkbox
                            v-decorator="[
                                'is_show',
                                {rules: [{ required: false }]}
                            ]"
                        >不希望该企业看到我</a-checkbox>
                    </a-form-item>
                    <a-form-item
                        label="行业标签"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'trades_id',
                            {rules: [{ required: false }]}
                          ]"
                         />
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
                            {rules: [{ required: false }]}
                          ]"
                         />
                    </a-form-item>
                    <a-form-item
                        label="职位类型"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'career_id',
                            {rules: [{ required: false }]}
                          ]"
                         />
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
                            {rules: [{ required: false }]}
                          ]"
                         />
                    </a-form-item>
                    <a-form-item
                        label="在职时间"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-date-picker />
                        <a-date-picker />
                    </a-form-item>
                    <a-form-item
                        label="技能标签"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                         <a-select
                             mode="multiple"
                             :tokenSeparators="[',']"
                             @change="handleSkills"
                             v-decorator="[
                                'skills_ids',
                                {rules: [{ required: false }]}
                             ]"
                         >
                             <a-select-option
                                 v-for="item in labels.skills"
                                 :key="item.id"
                                 :value="item.id"
                             >{{item.labelName}}</a-select-option>
                         </a-select>
                    </a-form-item>
                    <a-form-item
                        label="工作内容"
                        class="start"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-textarea
                          v-decorator="[
                            'content',
                            {rules: [{ required: false }]}
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
          modelData: {},
          labelCol: {span: 3},
          wrapperCol: {span: 21},
          form: this.$form.createForm(this),
          labels: {},
          come_time: null,
          leave_time: null
      }
  },
  watch: {
      modelEdit() {
          this.modelData = this.modelEdit;
      }
  },
  mounted() {
      this.labelDev();
      this.init();
  },
  methods: {
      init() {
      },
      handleSkills(value) {
          if(value.length > 3) {
              value.length = 3;
          };
          let resolvedIndex = [];
          this.labels.skills.forEach((item, index) => {
              if (value.some(value => value.id === item.id)) {
                  console.log(item)
                  resolvedIndex.push(index);
              }
          });
      },
      handleCancel() { //关闭弹窗
          this.modelData = null;
          this.$emit('cancelModel', 'jobExperienceModel');
      },
      handleSubmit (e) { //提交
          e.preventDefault();
          this.form.validateFields((err, values) => {
              if (!err) {
                  if(this.modelData.isEdit) {}else{}
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