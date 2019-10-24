<template>
  <section>
      <div class="frequently_address">
          <a-form :form="form" @submit="handleSubmit">
              <div class="address_form">
                  <div class="title">
                      <p>常用地址</p>
                      <a @click="bindAdd">
                          <a-icon type="plus-square" />
                          <span>添加</span>
                      </a>
                  </div>
                  <div class="row">
                      <ul>
                          <li v-for="(item, index) in list" :key="index" @click="bindEdit(item, index)">
                              <p>
                                  <span>{{item.region.provincesName}}</span>
                                  <span>{{item.region.cityName}}</span>
                                  <span>{{item.region.areaName}}</span>
                                  <span>{{item.address}}</span>
                              </p>
                              <a @click.stop="bindDel(item.id, index)">
                                  <a-icon type="close-square" />
                                  <span>删除</span>
                              </a>
                          </li>
                      </ul>
                  </div>
                  <div class="input">
                      <a-form-item
                          label=""
                          :colon="false"
                      >
                          <a-select
                            size="large"
                            @change="bindProvinces"
                            v-decorator="[
                                'provincesId',
                                {
                                    initialValue: params.provincesId,
                                    rules: [{ required: true }]
                                }
                            ]"
                          >
                            <a-select-option
                                v-for="item in provinces"
                                :key="item.id"
                                :value="item.id"
                            >{{item.name}}</a-select-option>
                          </a-select>
                      </a-form-item>
                      <a-form-item
                          label=""
                          :colon="false"
                      >
                          <a-select
                            size="large"
                            @change="bindCitys"
                            v-decorator="[
                                'cityId',
                                {
                                    initialValue: params.cityId,
                                    rules: [{ required: true }]
                                }
                            ]"
                          >
                            <a-select-option
                                v-for="item in citys"
                                :key="item.id"
                                :value="item.id"
                            >{{item.name}}</a-select-option>
                          </a-select>
                      </a-form-item>
                      <a-form-item
                          label=""
                          :colon="false"
                      >
                          <a-select
                            size="large"
                            @change="bindAreas"
                            v-decorator="[
                                'area',
                                {
                                    initialValue: params.area,
                                    rules: [{ required: true }]
                                }
                            ]"
                          >
                            <a-select-option
                                v-for="item in areas"
                                :key="item.id"
                                :value="item.id"
                            >{{item.name}}</a-select-option>
                          </a-select>
                      </a-form-item>
                      <a-form-item
                          label=""
                          :colon="false"
                      >
                          <a-input
                            size="large"
                            v-decorator="[
                                'address',
                                {
                                    initialValue: params.address,
                                    rules: [{ required: true }]
                                }
                            ]"
                          />
                      </a-form-item>
                  </div>
              </div>
              <a-button class="btn" type="primary" html-type="submit">保存</a-button>
          </a-form>
      </div>
  </section>
</template>

<script>
import "./index.less";
import ajax from '../../../plugins/api';
import util from '../../../plugins/utils/util';
import area from "../../../plugins/utils/area";

export default {
  data() {
      return{
          form: this.$form.createForm(this),
          list: [],
          provinces: [],
          citys: [],
          areas: [],
          params: {
              provincesId: null,
              cityId: null,
              area: null,
              address: ''
          },
          active: null
      }
  },
  mounted() {
      this.devData();
      this.init();
  },
  methods: {
      init() { //初始化
          this.provinces = area;
          this.provinces.map(item => {
              if(item.id == this.params.provincesId) {
                  this.citys = item.items;
                  item.items.map(i => {
                      if(i.id == this.params.cityId) {
                          this.areas = i.items;
                      }
                  })
              }
          })
      },
      handleSubmit(e) { //提交
          e.preventDefault();
          this.form.validateFields((err, values) => {
              if (!err) {
                  let userInfo = util.getStore('userInfo');
                  let region = values;
                  let _type = null;
                  this.provinces.map(item => {
                      if(item.id == region.provincesId) {
                          region.provincesName = item.name;
                          item.items.map(i => {
                              if(i.id == region.cityId) {
                                  region.cityName = i.name;
                                  i.items.map(h => {
                                      if(h.id == region.area) region.areaName = h.name;
                                  })
                              }
                          })
                      }
                  });
                  let _params = {
                      region: JSON.stringify(region),
                      user_id: userInfo.id,
                      address: region.address
                  };
                  if(this.active == null) {
                      _type = 'post';
                  }else{
                      _type = 'put';
                      _params.id = this.list[this.active].id;
                  };
                  ajax[_type]('address', _params).then(res => {
                      if(res.retcode == 0) {
                          this.devData();
                      }
                  })
              }
          });
      },
      bindProvinces(value) { //省联动
          this.form.resetFields();
          let _provinces = this.provinces.find(item => item.id == value);
          this.params = Object.assign({}, {
              provincesId: value,
              cityId: _provinces.items[0].id,
              area: _provinces.items[0].items[0].id,
              address: ''
          });
          this.init();
      },
      bindCitys(value) { //市联动
          this.form.resetFields();
          this.params = Object.assign(this.params, {
              cityId: value,
              area: this.citys.find(item => item.id == value).items[0].id,
              address: ''
          });
          this.init();
      },
      bindAreas(value) { //区联动
          this.form.resetFields();
          this.params = Object.assign(this.params, {
              area: value,
              address: ''
          });
          this.init();
      },
      bindEdit(e, index) { //编辑
          this.form.resetFields();
          this.active = index;
          this.params = Object.assign({}, {
              provincesId: e.region.provincesId,
              cityId: e.region.cityId,
              area: e.region.area,
              address: e.address
          });
          this.init();
      },
      bindAdd() { //添加
          this.form.resetFields();
          this.active = null;
          this.params = Object.assign({}, {
              provincesId: null,
              cityId: null,
              area: null,
              address: ''
          });
          this.init();
      },
      bindDel(id, index) { //删除
          if(index == this.active) {
              this.bindAdd();
          };
          ajax.delete('address', {id: id}).then(res => {
              if(res.retcode == 0) {
                  this.devData();
              }
          });
      },
      devData() {
          let userInfo = util.getStore('userInfo');
          ajax.get('address', {user_id: userInfo.id}).then(res => {
              if(res.retcode == 0) {
                  this.list = res.data || [];
                  if(this.list.length > 0) {
                      this.list.map(item => {
                          item.region = JSON.parse(item.region);
                      })
                  }
              }
          })
      }
  }
};
</script>