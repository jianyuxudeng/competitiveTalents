<template>
  <section class="job_release page_centent">
    <a-form :form="form" @submit="handleSubmit">
      <div class="centent">
        <a-tabs :defaultActiveKey="active" @change="callback">
          <a-tab-pane v-for="item in labels.careers" :key="item.id" :tab="item.labelName"></a-tab-pane>
        </a-tabs>
        <div class="list labelMat list_active">
          <a-form-item label="职位信息"><div class="bg_laber"></div></a-form-item>
        </div>
        <div class="list">
          <a-form-item class="left" label="职位名称">
            <a-cascader
              :fieldNames="{label: 'name', value: 'id', children: 'children'}"
              :options="careers"
              size="large"
              v-decorator="[
                              'careers_id',
                              {
                                  initialValue: careerIds,
                                  rules: [{ required: true, message: '请选择职位' }]
                              }
                          ]"
            />
          </a-form-item>
          <a-form-item class="right" label="工作性质">
            <a-radio-group
              v-decorator="[
                              'type',
                              {
                                  initialValue: params.type,
                                  rules: [{ required: true, message: '请选择工作性质' }]
                              }
                          ]"
            >
              <a-radio
                :value="item.id"
                v-for="item in labels.jobTypes"
                :key="item.id"
              >{{item.labelName}}</a-radio>
            </a-radio-group>
          </a-form-item>
        </div>
        <div class="list">
          <a-form-item class="left" label="发布城市">
            <a-row type="flex" justify="space-between" align="middle">
              <a-select
                size="large"
                class="w159"
                @change="handleProvinces"
                v-decorator="[
                  'region',
                  {
                      initialValue: provincesId,
                      rules: [{ required: true, message: '请选择发布城市' }]
                  }
                ]"
              >
                <a-select-option
                  v-for="item in provincesList"
                  :key="item.id"
                  :value="item.id"
                >{{item.name}}</a-select-option>
              </a-select>
              <a-select size="large" class="w159" v-model="city" @change="handleCity">
                <a-select-option
                  v-for="item in cityList"
                  :key="item.id"
                  :value="item.id"
                >{{item.name}}</a-select-option>
              </a-select>
              <a-select size="large" class="w159" v-model="area" @change="handleArea">
                <a-select-option
                  v-for="item in areaList"
                  :key="item.id"
                  :value="item.id"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-row>
          </a-form-item>
          <a-form-item class="right" label="岗位薪资">
            <a-row type="flex" justify="space-between" align="middle">
              <a-select
                size="large"
                class="w114"
                v-decorator="[
                                  'careerPrice',
                                  {
                                      initialValue: params.careerPrice,
                                      rules: [{ required: true, message: '请选择薪资类型' }]
                                  }
                              ]"
              >
                <a-select-option
                  v-for="item in labels.careerPrices"
                  :key="item.id"
                  :value="item.id"
                >{{item.labelName}}</a-select-option>
              </a-select>
              <a-select
                size="large"
                class="w184"
                v-model="params.jobPrice"
                @change="handleJobPrice"
                v-if="isTrue"
              >
                <a-select-option
                  v-for="item in labels.jobPrices"
                  :key="item.id"
                  :value="item.labelName"
                >{{item.labelName}}</a-select-option>
              </a-select>
              <a-row type="flex" justify="space-between" align="middle" v-else>
                <a-input-number size="large" class="w90" v-model="jobPriceFirt"></a-input-number>
                <span>-</span>
                <a-input-number size="large" class="w90" :min="jobPriceFirt + 1" v-model="jobPriceLast"></a-input-number>
              </a-row>
              <a
                @click="() => {
                                  isTrue = false;
                                  jobPrice = null;
                              }"
              >自定义</a>
            </a-row>
          </a-form-item>
        </div>
        <div class="list">
          <a-form-item class="left" label="上班地址">
            <a-input
              size="large"
              v-decorator="[
                'address',
                {
                    initialValue: params.address,
                    rules: [{ required: true, message: '请输入上班地址' }]
                }
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item class="right justify" label="关键词">
            <a-input
              size="large"
              placeholder="输入职位关键词，提高被搜索概率"
              v-decorator="[
                'keywords',
                {
                    initialValue: params.keywords,
                    rules: [{ required: true, message: '请输入关键词' }]
                }
              ]"
            ></a-input>
          </a-form-item>
        </div>
        <div class="list">
          <a-form-item class="left" label="技能要求">
            <a-select
              size="large"
              mode="multiple"
              :tokenSeparators="[',']"
              @change="handleSkills"
              v-decorator="[
                              'skills',
                              {
                                  initialValue: params.skills,
                                  rules: [{ required: true, message: '请选择技能要求' }]
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
          <a-form-item class="right" label="所属部门">
            <a-input
              size="large"
              placeholder="输入职位部门"
              v-decorator="[
                              'depatment',
                              {
                                  initialValue: params.depatment,
                                  rules: [{ required: true, message: '请输入所属部门' }]
                              }
                          ]"
            ></a-input>
          </a-form-item>
        </div>
        <div class="list labelMat">
          <a-form-item class="left" label="工作经验">
            <a-select
              size="large"
              v-decorator="[
                              'workExperience',
                              {
                                  initialValue: handleIdTrue(params.workExperience),
                                  rules: [{ required: false }]
                              }
                          ]"
            >
              <a-select-option
                v-for="item in labels.workExpress"
                :key="item.id"
                :value="item.id"
              >{{item.labelName}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item class="right" label="工作周期">
            <a-input
              size="large"
              v-decorator="[
                              'work_time',
                              {
                                  initialValue: params.work_time,
                                  rules: [{ required: false }]
                              }
                          ]"
            />
          </a-form-item>
        </div>
        <div class="list labelMat">
          <a-form-item class="left" label="公司规模">
            <a-select
              size="large"
              v-decorator="[
                              'companySize',
                              {
                                  initialValue: handleIdTrue(params.companySize),
                                  rules: [{ required: false }]
                              }
                          ]"
            >
              <a-select-option
                v-for="item in labels.companySizes"
                :key="item.id"
                :value="item.id"
              >{{item.labelName}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item class="right" label="融资阶段">
            <a-select
              size="large"
              v-decorator="[
                              'capitalize',
                              {
                                  initialValue: handleIdTrue(params.capitalize),
                                  rules: [{ required: false }]
                              }
                          ]"
            >
              <a-select-option
                v-for="item in labels.capitalizes"
                :key="item.id"
                :value="item.id"
              >{{item.labelName}}</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="list labelMat">
          <a-form-item class="left" label="工作形式">
            <a-input
              size="large"
              v-decorator="[
                              'form',
                              {
                                  initialValue: params.form,
                                  rules: [{ required: false }]
                              }
                          ]"
            />
          </a-form-item>
          <a-form-item class="right" label="截止时间">
            <a-date-picker
              size="large"
              :defaultValue="moment(deadTime || formatDate(new Date()), dateFormat)"
              @change="handleDeadTime"
            />
          </a-form-item>
        </div>
        <div class="list labelMat">
          <a-form-item class="left" label="福利标签">
            <!-- <a-select
              size="large"
              mode="multiple"
              :tokenSeparators="[',']"
              @change="handleSkills"
              v-decorator="[
                              'skills',
                              {
                                  initialValue: params.skills,
                                  rules: [{ required: true, message: '请选择技能要求' }]
                              }
                          ]"
            >
              <a-select-option
                v-for="item in labels.skills"
                :key="item.id"
                :value="item.labelName"
              >{{item.labelName}}</a-select-option>
            </a-select> -->
          </a-form-item>
          <a-form-item class="right" label="是否急聘">
            <a-radio-group
                size="large"
                v-decorator="[
                    'is_worry',
                    {
                        initialValue: params.is_worry,
                        rules: [{ required: false }]
                    }
                ]"
            >
              <a-radio :value="0">否</a-radio>
              <a-radio :value="1">是</a-radio>
            </a-radio-group>
          </a-form-item>
        </div>
        <div class="list">
          <a-form-item label="职位描述">
            <a-textarea
              size="large"
              v-decorator="[
                              'des',
                              {
                                  initialValue: params.des,
                                  rules: [{ required: true, message: '请输入职位描述' }]
                              }
                          ]"
            />
          </a-form-item>
        </div>
        <div class="list">
          <a-form-item label="职位职责">
            <a-textarea
              size="large"
              :autosize="{minRows: 6}"
              v-decorator="[
                              'duties',
                              {
                                  initialValue: params.duties,
                                  rules: [{ required: true, message: '请输入职位职责' }]
                              }
                          ]"
            />
            <p>0/1000文字</p>
          </a-form-item>
        </div>
        <div class="list">
          <a-form-item label="职位要求">
            <a-textarea
              size="large"
              :autosize="{minRows: 6}"
              v-decorator="[
                              'request',
                              {
                                  initialValue: params.request,
                                  rules: [{ required: true, message: '请输入职位要求' }]
                              }
                          ]"
            />
            <p>0/1000文字</p>
          </a-form-item>
        </div>
        <div class="list labelMat list_active">
          <a-form-item label="职位要求"><div class="bg_laber"></div></a-form-item>
        </div>
        <div class="list labelMat">
          <a-form-item class="left" label="工作年限"></a-form-item>
          <a-form-item class="right" label="学历">
            <a-select
              size="large"
              v-decorator="[
                              'educational',
                              {
                                  initialValue: handleIdTrue(params.educational),
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
        </div>
        <div class="list labelMat">
          <a-form-item class="left" label="年龄"></a-form-item>
          <a-form-item class="right" label="语音程度"></a-form-item>
        </div>
        <div class="list labelMat">
          <a-form-item class="left" label="专业"></a-form-item>
          <a-form-item class="right" label="行业">
            <a-select
              size="large"
              v-decorator="[
                              'trade',
                              {
                                  initialValue: handleIdTrue(params.trade),
                                  rules: [{ required: false }]
                              }
                          ]"
            >
              <a-select-option
                v-for="item in labels.trades"
                :key="item.id"
                :value="item.id"
              >{{item.labelName}}</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="list labelMat list_active">
          <a-form-item label="其他设置"><div class="bg_laber"></div></a-form-item>
        </div>
        <div class="list labelMat">
          <a-form-item class="left" label="性别"></a-form-item>
          <a-form-item class="right" label="户口"></a-form-item>
        </div>
        <div class="list labelMat">
          <a-form-item class="left" label="居住地"></a-form-item>
          <a-form-item class="right" label="简历接收方式"></a-form-item>
        </div>
        <div class="list labelMat list_active">
          <a-form-item label="服务选择"><div class="bg_laber"></div></a-form-item>
        </div>
        <div class="list mar_bot">
          <a-row type="flex" justify="space-between" align="middle" class="mar_wid">
            <a-row type="flex" align="middle">
              <div class="item">
                <div>
                  <span>自动刷新</span>
                  <a-checkbox></a-checkbox>
                </div>
                <p>剩余次数：27</p>
              </div>
              <div class="item">
                <div>
                  <span>置顶</span>
                  <a-checkbox></a-checkbox>
                </div>
                <p>剩余次数：27</p>
              </div>
              <div class="item">
                <div>
                  <span>职位推荐</span>
                  <a-checkbox></a-checkbox>
                </div>
                <p>剩余次数：27</p>
              </div>
            </a-row>
            <a-button type="primary" class="list_btn">服务购买</a-button>
          </a-row>
        </div>
      </div>
      <a-form-item class="job_release_btn">
        <a-button type="primary" html-type="submit">立即发布</a-button>
        <a-button>保存为职位模板</a-button>
        <a-button>预览</a-button>
        <a-button html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </section>
</template>

<script>
import "./index.less";
import ajax from "../../plugins/api";
import util from "../../plugins/utils/util";
import area from "../../plugins/utils/area";
import moment from 'moment';

export default {
  name: "job-release",
  async asyncData() {
    return {};
  },
  data() {
    return {
      form: this.$form.createForm(this),
      dateFormat: 'YYYY-MM-DD',
      careers: [],
      labels: [],
      provincesList: [],
      provincesId: null,
      cityList: [],
      city: null,
      areaList: [],
      area: null,
      region: {},
      jobPrice: null,
      jobPriceFirt: null,
      jobPriceLast: null,
      isTrue: true,
      active: null,
      params: {},
      careerIds: [],
      deadTime: null
    };
  },
  watch: {
    $route() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    moment,
    formatDate: util.formatDate,
    async init() {
      //初始化
      this.provincesList = area;
      let _id = this.$route.query.id;
      const res = await this.getCareers();
      console.log( this.provincesList)
      if (_id&&res) {
        this.devData(_id);
      }else{
        this.params = {};
        this.careerIds = [];
        // this.provincesList = [];
        this.provincesId = null;
        this.cityList = [];
        this.city = null;
        this.areaList = [];
        this.area = null;
      };
    },
    callback(key) {
      //类型切换
      this.active = key;
    },
    handleDeadTime(date, dateString) {
      this.deadTime = dateString;
    },
    handleSkills(value) {
      if (value.length > 3) {
        value.length = 3;
      }
    },
    handleProvinces(value) {
      //省市联动
      area.map(item => {
        if (item.id == value) {
          this.cityList = item.items;
          this.city = item.items[0].id;
          this.areaList = item.items[0].items;
          this.area = item.items[0].items[0].id;
          this.region = Object.assign(
            {},
            {
              provincesId: item.id,
              provincesName: item.name,
              cityId: item.items[0].id,
              cityName: item.items[0].name,
              area: item.items[0].items[0].id,
              areaName: item.items[0].items[0].name
            }
          );
        }
      });
    },
    handleCity(value) {
      //市区联动
      this.cityList.map(item => {
        if (item.id == value) {
          this.areaList = item.items;
          this.area = item.items[0].id;
          this.region = Object.assign(this.region, {
            cityId: item.id,
            cityName: item.name,
            area: item.items[0].id,
            areaName: item.items[0].name
          });
        }
      });
    },
    handleArea(value) {
      //区选择
      this.areaList.map(item => {
        if (item.id == value) {
          this.region = Object.assign(this.region, {
            area: item.id,
            areaName: item.name
          });
        }
      });
    },
    handleJobPrice(value) {
      this.jobPrice = value;
    },
    handleSubmit(e) {
      //提交
      e.preventDefault();
      let _id = this.$route.query.id;
      this.form.validateFields((err, values) => {
        if (!err) {
          let userInfo = util.getStore("userInfo");
          let skills_ids = [];
          values.skills &&
            values.skills.map(item => {
              this.labels.skills &&
                this.labels.skills.map(inItem => {
                  if (item == inItem.labelName) {
                    skills_ids = [...skills_ids, inItem.id];
                  }
                });
            });
          let params = Object.assign(values, {
            careers_id: values.careers_id[values.careers_id.length - 1],
            user_id: userInfo.id,
            region: JSON.stringify(this.region),
            jobPrice: this.isTrue ? this.jobPrice : (this.jobPriceFirt + '-' + this.jobPriceLast),
            skills_ids: `${skills_ids}`,
            skills: `${values.skills}`,
            careers_type: this.active,
            deadTime: this.deadTime || util.formatDate(new Date())
          });
          params &&
            Object.keys(params).map(item => {
              if (!params[item]) {
                delete params[item];
              }
            });
          if (_id) {
            params.id = _id;
            ajax.put("jobs", params).then(res => {
              if (res.retcode == 0) {
                this.$message.success(res.msg);
                this.$router.push({
                  path: 'resume-manage'
                })
              };
            });
          } else {
            ajax.post("jobs", params).then(res => {
              if (res.retcode == 0) {
                this.$message.success(res.msg);
                this.$router.push({
                  path: 'resume-manage'
                })
              };
            });
          }
        }
      });
    },
    handleIdTrue(id) {
      if(id) {
        return parseFloat(id);
      }else{
        return null;
      }
    },
    async getCareers() {
      const res = await ajax.get("electric-career");
      if (res) {
        this.careers = res.data || [];
      }
      const label = await ajax.get("label");
      if (label) {
        this.labels = label.data || {};
        this.active = label.data.careers[0].id;
      }
      return res;
    },
    devData(id) {
      let userInfo = util.getStore("userInfo");
      ajax
        .get("jobs/detail", {
          user_id: userInfo.id,
          job_id: id
        })
        .then(async res => {
          if (res.retcode == 0) {
            this.params = res.data.jobDetail || {};
            if (this.params.deadTime) this.deadTime = util.formatDate(this.params.deadTime) || util.formatDate(new Date());
            if (this.params.type) this.params.type = Number(this.params.type);
            if (this.params.careerPrice)
              this.params.careerPrice = Number(this.params.careerPrice);
            if (this.params.skills)
              this.params.skills = this.params.skills.split(",");
            if (this.params.careers_id) {
              let careerIds = await this.findParentById(
                this.careers,
                this.params.careers_id,
                "id",
                "children"
              );
              this.careerIds = [...careerIds, this.params.careers_id * 1];
            }
            if (this.params.region) {
              let _region = JSON.parse(this.params.region);
              if (_region.provincesId) {
                this.provincesId = Number(_region.provincesId);
                this.handleProvinces(_region.provincesId);
              }
              if (_region.cityId) {
                this.city = Number(_region.cityId);
                this.handleCity(_region.cityId);
              }
              if (_region.area) {
                this.area = Number(_region.area);
                this.handleArea(_region.area);
              }
              this.params.region = _region;
            }
            if(this.params.careers_type) this.active = this.params.careers_type * 1;
          }
        });
    },
    //通过子集值查询父级值
    findParentById(arr, path, type, pArr, needInfo) {
      //arr:要匹配的数组，path:要匹配的值， type:根据什么字段匹配， pArr:子集数组属性名， needInfo:自定义返回值
      let parentIds = [],
        index = 0,
        names = [],
        hasParentId = (function loop(arr, index) {
          return arr.some(item => {
            if (item[type] == path) {
              parentIds = parentIds.slice(0, index);
              names = names.splice(0, index);
              return true;
            } else if (Array.isArray(item[pArr])) {
              parentIds[index] = item[type];
              names[index] = item;
              return loop(item[pArr], index + 1);
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