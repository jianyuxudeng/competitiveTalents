<template>
  <section v-if="modelData">
    <a-modal
      :confirmLoading="false"
      :maskClosable="false"
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
          <a-form-item label="期望职位" :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-cascader
              :fieldNames="{label: 'name', value: 'id', children: 'children'}"
              :options="careers"
              :defaultValue="careersArr"
              @change="onCareersArr"
            >
              <template slot="displayRender" slot-scope="{labels}">
                <span v-for="(label, index) in labels" :key="index">
                  <span v-if="index == (labels.length - 1)">{{label}}</span>
                </span>
              </template>
            </a-cascader>
          </a-form-item>
          <a-form-item label="职位类型" :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              @change="handleJobTypeName"
              v-decorator="[
								'job_type',
								{
										initialValue: modelData.job_type ? modelData.job_type*1 : modelData.job_type,
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
          <a-form-item label="期望工作地点" :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-cascader
              :fieldNames="{label: 'name', value: 'id', children: 'item'}"
              :options="areas"
              :defaultValue="cityArr"
              @change="onCascader"
            >
              <template slot="displayRender" slot-scope="{labels}">
                <span v-for="(label, index) in labels" :key="index">
                  <span v-if="index == 1">{{label}}</span>
                </span>
              </template>
            </a-cascader>
          </a-form-item>
          <a-form-item label="期望薪资" :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              v-decorator="[
								'expected_salary_start',
								{
										initialValue: expected_salary_start,
										rules: [{ required: false }],
										getValueFromEvent:getSalaryStart
								}
							]"
            >
              <a-select-option 
                v-for="item in 100"
                :key="item"
                :value="item<100 ? item+'k':item+'k以上'"
							>
								{{item?(item<100 ? item+'k':item+'k以上'):''}}</a-select-option>
						</a-select>
					  <span style="margin:0 4px;"></span>
						<a-select
              v-decorator="[
								'expected_salary_end',
								{
										initialValue: expected_salary_end,
										rules: [{ required: false }]
								}
							]"
            >
              <a-select-option 
                v-for="item in 100"
								v-if="item>startSalary"
                :key="item"
                :value="item<100 ? item+'k':item+'k以上'"
							>
								{{startSalary!=100?item?(item<100 ? item+'k':item+'k以上'):'':'--'}}</a-select-option>
							</a-select>
            </a-select>
          </a-form-item>
          <a-form-item label="目前状态" :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              v-decorator="[
                'now_status',
                {
                    initialValue: modelData.now_status,
                    rules: [{ required: false }]
                }
             ]"
            >
              <a-select-option value="积极找工作">积极找工作</a-select-option>
              <a-select-option value="随便看看">随便看看</a-select-option>
              <a-select-option value="暂时不换工作">暂时不换工作</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="到岗时间" :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              v-decorator="[
								'work_time',
								{
									initialValue: modelData.work_time,
									rules: [{ required: false }]
								}
							]"
            >
              <a-select-option value="随时">随时</a-select-option>
              <a-select-option value="2周以内">2周以内</a-select-option>
              <a-select-option value="2周-1个月">2周 - 1个月</a-select-option>
							<a-select-option value="1-3个月">1 - 3个月</a-select-option>
							<a-select-option value="3个月以上">3个月以上</a-select-option>
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
import ajax from "../../../plugins/api";
import util from "../../../plugins/utils/util";
import area from "../../../plugins/utils/area";

export default {
  name: "Modal",
  props: ["modelEdit"],
  async asyncData() {
    return {};
  },
  data() {
    return {
      modelData: null,
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      form: this.$form.createForm(this),
      labels: {},
      areas: [],
      city: null,
      citys: {},
      cityArr: [],
      careers: [],
      careersArr: [],
			params: {},
			startSalary:0,
			expected_salary_start:'1k',
			expected_salary_end:'2k'
    };
  },
  watch: {
    modelEdit() {
			this.modelData = this.modelEdit;
			if(!this.modelData){
				return;
			}
			this.expected_salary_start  =  this.modelData&&this.modelData.expected_salary&&this.modelData.expected_salary.indexOf('-')>-1?this.modelData.expected_salary.split('-')[0]:this.modelData.expected_salary;
			this.expected_salary_start = this.expected_salary_start||'1k';
			this.expected_salary_end  =  this.modelData&&this.modelData.expected_salary&&this.modelData.expected_salary.indexOf('-')>-1&&this.modelData.expected_salary.split('-')[1];
			this.expected_salary_end = this.expected_salary_start.split('k')[0]==100?'--':this.expected_salary_end;
      if (
        this.modelData &&
        this.modelData.city &&
        this.modelData.city != "null"
      ) {
        this.city = JSON.parse(this.modelData.city);
        this.citys = JSON.parse(this.modelData.city);
        let cityArr = this.findParentById(
          this.areas,
          this.citys.id,
          "id",
          "item",
          false,
          true
        );
        this.cityArr = [...cityArr, this.citys.id];
      }
      if (this.modelData && this.modelData.expected_position) {
        let expected_position = Number(this.modelData.expected_position);
        let careersArr = this.findParentById(
          this.careers,
          expected_position,
          "id",
          "children"
        );
        this.careersArr = [...careersArr, expected_position];
      }
      if (this.modelData && this.modelData.expected_position_name) {
        this.params = Object.assign(this.params, {
          expected_position_name: this.modelData.expected_position_name
        });
      }
    }
  },
  mounted() {
    this.init();
    this.labelDev();
    this.careersDev();
  },
  methods: {
		getSalaryStart(e){
			this.startSalary = e.split('k')[0];
			this.expected_salary_end = this.startSalary<99?(this.startSalary*1+1)+'k':this.startSalary==99?(this.startSalary*1+1)+'k以上':'--';
			this.form.setFieldsValue({
				'expected_salary_end':this.expected_salary_end
			})
			return e;
		},
    init() {
      area.map(item => {
        //获取地址列表
        this.areas.push({
          id: item.id,
          name: item.name,
          item: item.items
        });
      });
    },
    onCascader(value) {
      //地址
      let _city = Object.assign(
        {},
        {
          id: value[1]
        }
      );
      this.areas.map(item => {
        if (item.id == value[0]) {
          item.item.map(i => {
            if (i.id == value[1]) {
              this.city = Object.assign(_city, {
                name: i.name
              });
            }
          });
        }
      });
    },
    onCareersArr(value) {
      let _expected_position = value[value.length - 1];
      let _this = this;
      function getName(obj, id) {
        obj.map(item => {
          if (item.id == id) {
            _this.params = Object.assign(_this.params, {
              expected_position: _expected_position,
              expected_position_name: item.name
            });
          } else {
            if (item.children) getName(item.children, id);
          }
        });
      }
      getName(this.careers, _expected_position);
    },
    handleJobTypeName(value) {
      this.labels.jobTypes.map(item => {
        if (item.id == value) {
          this.params = Object.assign(this.params, {
            job_type_name: item.labelName
          });
        }
      });
    },
    handleCancel() {
      //关闭弹窗
      this.modelData = null;
      this.$emit("cancelModel", "objectiveModal");
    },
    handleSubmit(e) {
      //提交
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
					let userInfo = util.getStore("userInfo");
					values.expected_salary = values.expected_salary_start;
					if(values.expected_salary_end&&values.expected_salary_end!='--'){
						values.expected_salary = values.expected_salary_start+'-'+values.expected_salary_end;
					}
					delete values.expected_salary_start;
					delete values.expected_salary_end;
          let params = Object.assign(
            {},
            {
              ...values,
              ...this.params,
              user_id: userInfo.id,
              city: JSON.stringify(this.city)
            }
          );
          ajax.post("user/objective", params).then(res => {
            if (res.retcode == 0) {
              this.modelData = null;
              this.$emit("okModel", "objectiveModal");
            }
          });
        }
      });
    },
    labelDev() {
      //获取全部label
      ajax.get("label").then(res => {
        if (res.retcode == 0) {
          this.labels = res.data || {};
        }
      });
    },
    careersDev() {
      ajax.get("electric-career").then(res => {
        if (res.retcode == 0) {
          this.careers = res.data || [];
        }
      });
    },
    //通过子集值查询父级值
    findParentById(arr, path, type, pArr, needInfo, needsrot) {
      //arr:要匹配的数组，path:要匹配的值， type:根据什么字段匹配， pArr:子集数组属性名， needInfo:自定义返回值
      let parentIds = [],
        index = 0,
        names = [],
        hasParentId = (function loop(arr, index) {
          return arr.some(item => {
            if (needsrot) {
              if (item[type] == path && item.sort) {
                parentIds = parentIds.slice(0, index);
                names = names.splice(0, index);
                return true;
              } else if (Array.isArray(item[pArr])) {
                parentIds[index] = item[type];
                names[index] = item;
                return loop(item[pArr], index + 1);
              }
            } else {
              if (item[type] == path) {
                parentIds = parentIds.slice(0, index);
                names = names.splice(0, index);
                return true;
              } else if (Array.isArray(item[pArr])) {
                parentIds[index] = item[type];
                names[index] = item;
                return loop(item[pArr], index + 1);
              }
            }

            return false;
          });
        })(arr, index);
      if (needInfo) {
        return hasParentId
          ? {
              parentIds,
              names
            }
          : {
              parentIds: [],
              names: []
            };
      }
      return hasParentId ? parentIds : [];
    }
  }
};
</script>