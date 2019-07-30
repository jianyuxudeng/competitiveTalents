<template>
  <section class="search_positions">
      <div class="nav-bg"></div>
      <div class="banner">
          <img src="../../assets/images/positions_banner.jpg" alt="">
          <div class="banner_cent">
              <a-upload 
                  name="file" 
                  :multiple="true" 
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  :fileList="fileList"
                  @change="handleFile"
              >
                  <a-button>立即上传</a-button>
              </a-upload>
          </div>
      </div>
      <div class="centent">
          <div class="left">
              <a-input-group compact>
                  <a-select defaultValue="上海" size="large" class="pos_selsct">
                      <a-select-option value="上海">上海</a-select-option>
                  </a-select>
                  <a-input-search class="pos_search" size="large" placeholder="查找工作请输入技能、项目名称或职位" />
              </a-input-group>
              <div class="search_list">
                  <div class="search_area">
                      <dl>
                          <dt>行政区</dt>
                          <dd>
                              <span v-for="item in regionList" :key="item.area" :class="{active: params.region.area == item.area}" @click="handleArea('region', item)">{{item.areaName}}</span>
                          </dd>
                      </dl>
                  </div>
                  <div>
                      <dl>
                          <dt>工作经验</dt>
                          <dd>
                              <span v-for="item in workExperienceList" :key="item.id" :class="{active: params.workExperience == item.id}" @click="handleArea('workExperience', item.id)">{{item.name}}</span>
                          </dd>
                      </dl>
                      <dl>
                          <dt>学历要求</dt>
                          <dd>
                              <span v-for="item in educationalList" :key="item.id" :class="{active: params.educational == item.id}" @click="handleArea('educational', item.id)">{{item.name}}</span>
                          </dd>
                      </dl>
                      <dl>
                          <dt>融资阶段</dt>
                          <dd>
                              <span v-for="item in capitalizeList" :key="item.id" :class="{active: params.capitalize == item.id}" @click="handleArea('capitalize', item.id)">{{item.name}}</span>
                          </dd>
                      </dl>
                      <dl>
                          <dt>公司规模</dt>
                          <dd>
                              <span v-for="item in companySizeList" :key="item.id" :class="{active: params.companySize == item.id}" @click="handleArea('companySize', item.id)">{{item.name}}</span>
                          </dd>
                      </dl>
                      <dl>
                          <dt>行业领域</dt>
                          <dd>
                              <span v-for="item in tradeList" :key="item.id" :class="{active: params.trade == item.id}" @click="handleArea('trade', item.id)">{{item.name}}</span>
                          </dd>
                      </dl>
                  </div>
              </div>
              <div class="search_list">
                  <div class="sorting">
                      <dl>
                          <dt>排序方式</dt>
                          <dd>
                              <span v-for="(item, index) in sortingList" :key="index" :class="{active: params.sorting == index}">{{item}}</span>
                          </dd>
                      </dl>
                      <dl>
                          <dt>月薪</dt>
                          <dd>
                              <a-select defaultValue="不限">
                                  <a-select-option value="不限">不限</a-select-option>
                              </a-select>
                          </dd>
                      </dl>
                      <dl>
                          <dt>工作性质</dt>
                          <dd>
                              <a-select defaultValue="不限">
                                  <a-select-option value="不限">不限</a-select-option>
                              </a-select>
                          </dd>
                      </dl>
                  </div>
              </div>
              <div class="rows">
                  <div class="rows_li" v-for="item in 5" :key="item">
                    <div class="head">
                        <span>急<br />聘</span>
                        <div class="rows_left">
                            <div class="title"><span>电竞内容后期制作[ 上海 ]</span>经验5年以上 / 本科</div>
                            <div class="list">
                                <div class="li">
                                    <p><a-icon type="appstore" theme="filled" />招聘类型</p>
                                    <p>全日制外包</p>
                                </div>
                                <em></em>
                                <div class="li">
                                    <p><a-icon type="calendar" />周期</p>
                                    <p>3-6个月</p>
                                </div>
                                <em></em>
                                <div class="li">
                                    <p><a-icon type="appstore" theme="filled" />形式</p>
                                    <p>外派</p>
                                </div>
                            </div>
                        </div>
                        <div class="rows_right">
                            <div>
                                <p>20k-30k/月</p>
                                <p>腾讯电竞</p>
                                <p>电子竞技/上市公司/上海</p>
                            </div>
                            <em><img src="../../assets/images/positions_img.png" alt=""></em>
                        </div>
                    </div>
                    <div class="foot">
                        <div class="btn">
                            <span>赛事相关经验</span>
                            <span>APP设计</span>
                            <span>H5制作</span>
                        </div>
                        <div class="times">
                            <a-icon type="clock-circle" />
                            <span>发布时间 2019-08-35   15:20</span>
                        </div>
                    </div>
                  </div>
              </div>
              <a-pagination showQuickJumper :defaultCurrent="1" :total="500" @change="onChangePage" />
          </div>
          <div class="right">
              <div><img src="../../assets/images/positions_1.jpg" alt=""></div>
              <div><img src="../../assets/images/positions_2.jpg" alt=""></div>
              <div><img src="../../assets/images/positions_3.jpg" alt=""></div>
          </div>
      </div>
  </section>
</template>

<script>
import "./index.less";

export default {
  name: "search-positions",
  async asyncData(){
     return{
     }
  },
  data() {
      return{
          fileList: [], //上传文件列表
          regionList: [ //地区
              {area: 1, areaName: '静安区'},
              {area: 2, areaName: '静安区'}
          ],
          workExperienceList: [ //工作经验
              {id: 1, name: '应届毕业生'},
              {id: 2, name: '3年以下'}
          ],
          educationalList: [ //学历要求
              {id: 1, name: '大专'},
              {id: 2, name: '本科'}
          ],
          capitalizeList: [ //融资阶段
              {id: 1, name: '未融资'},
              {id: 2, name: '天使轮'}
          ],
          companySizeList: [ //公司规模
              {id: 1, name: '少于15人'},
              {id: 2, name: '15-50人'}
          ],
          tradeList: [ //行业领域
              {id: 1, name: '赛事相关职位'},
              {id: 2, name: '电竞俱乐部'}
          ],
          sortingList: ['默认', '最新发布'], //排序方式
          params: { //筛选参数
              region: { //地区
                  area: 0, 
                  areaName: '不限'
              },
              workExperience: 0, //工作经验
              educational: 0, //学历要求
              capitalize: 0, //融资阶段
              companySize: 0, //公司规模
              trade: 0, //行业领域
              sorting: 0 //排序方式
          }
      }
  },
  mounted() {
      this.init();
  },
  methods: {
      init() { //初始化数据
          this.regionList = [ //地区
              {area: 0, areaName: '不限'},
              ...this.regionList
          ];
          this.workExperienceList = [ //工作经验
              {id: 0, name: '不限'},
              ...this.workExperienceList
          ];
          this.educationalList = [ //学历要求
              {id: 0, name: '不限'},
              ...this.educationalList
          ];
          this.capitalizeList = [ //融资阶段
              {id: 0, name: '不限'},
              ...this.capitalizeList
          ];
          this.companySizeList = [ //公司规模
              {id: 0, name: '不限'},
              ...this.companySizeList
          ];
          this.tradeList = [ //行业领域
              {id: 0, name: '不限'},
              ...this.tradeList
          ]
      },
      handleFile(info) { //上传简历
          let fileList = [...info.fileList];
          fileList = fileList.slice(-1);
          fileList = fileList.map((file) => {
              if (file.response) {
                  file.url = file.response.url;
              };
              return file;
          });
          this.fileList = fileList;
      },
      handleArea(name, val) { //筛选
          this.params = Object.assign(this.params, {[name]: val});
      },
      onChangePage(pageNumber) { //分页
          console.log('Page: ', pageNumber);
      }
  }
};
</script>