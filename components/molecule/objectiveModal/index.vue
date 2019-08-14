<template>
    <section v-if="modelData">
        <a-modal
            :confirmLoading="false"
            :visible="true"
            class="objective_model"
            @cancel="handleCancel"
        >
            <div slot="title">{{modelData.title}}</div>
            <div class="page_modal">
                <a-form :form="form" @submit="handleSubmit">
                    <a-form-item>
                        <h4>修改求职意向</h4>
                    </a-form-item>
                    <a-form-item
                        label="期望职位"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-select
                          v-decorator="[
                            'expected_position',
                            {
                                initialValue: modelData.expected_position,
                                rules: [{ required: false }]
                            }
                          ]"
                        >
                            <a-select-option v-for="item in 10" :key="item" :value="item">{{item}}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item
                        label="职位类型"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-select
                          v-decorator="[
                            'job_type',
                            {
                                initialValue: modelData.job_type,
                                rules: [{ required: false }]
                            }
                          ]"
                        >
                            <a-select-option v-for="item in 10" :key="item" :value="item">{{item}}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item
                        label="所在城市"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    </a-form-item>
                    <a-form-item
                        label="期望薪资"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-select
                          v-decorator="[
                            'expected_salary',
                            {
                                initialValue: modelData.expected_salary,
                                rules: [{ required: false }]
                            }
                          ]"
                        >
                            <a-select-option v-for="item in labels.jobPrices" :key="item.id" :value="item.labelName">{{item.labelName}}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item
                        label="目前状态"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'now_status',
                            {
                                initialValue: modelData.now_status,
                                rules: [{ required: false }]
                            }
                          ]"
                         />
                    </a-form-item>
                    <a-form-item
                        label="到岗时间"
                        :colon="false"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-input
                          v-decorator="[
                            'work_time',
                            {
                                initialValue: modelData.work_time,
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
          labels: {}
      }
  },
  watch: {
      modelEdit() {
          this.modelData = this.modelEdit;
      }
  },
  mounted() {
      this.labelDev();
  },
  methods: {
      handleCancel() { //关闭弹窗
          this.modelData = null;
          this.$emit('cancelModel', 'objectiveModal');
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
                  ajax.put('user/objective', params).then(res => {
                      if(res.retcode == 0) {
                          this.modelData = null;
                          this.$emit('okModel', 'objectiveModal');
                      }
                  })
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