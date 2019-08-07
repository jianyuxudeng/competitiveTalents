<template>
    <section>
        <div class="nav-bg"></div>
        <div class="collection">
            <a-row type="flex" justify="space-between" align="top">
                <div class="left">
                    <div class="title">
                        <a-row type="flex" justify="space-between" align="middle">
                            <span>我收藏的职位</span>
                        </a-row>
                    </div>
                    <div class="list">
                        <div class="item" v-for="item in 3" :key="item">
                            <dl>
                                <dt><img src="../../assets/images/positions_img.png" alt=""></dt>
                                <dd>
                                    <h4>高校电竞讲师 <span>16k-20k/月</span></h4>
                                    <p>腾讯电竞</p>
                                    <span>电子竞技/上市公司/上海/全日制外包</span>
                                </dd>
                            </dl>
                            <div class="btn">
                                <p>发布时间 <span>2019-08-35 15:20</span></p>
                                <div>
                                    <a>取消收藏</a>
                                    <em></em>
                                    <a @click="handleModel">投简历</a>
                                    <!-- <span>已下线</span> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <Interest></Interest>
                </div>
            </a-row>
        </div>
        <a-modal
            title="投递简历"
            :confirmLoading="false"
            :visible="isModalShow"
            class="collectionModal"
            @cancel="handleCancel"
        >
            <div class="w100">
                <p>请选择你要投递的简历</p>
                <div class="radio">
                    <a-radio-group v-model="value" class="w100">
                        <a-row type="flex" justify="space-between" align="middle">
                            <a-col>
                                <a-radio :style="radioStyle" :value="1">
                                    在线简历
                                    <span class="blue">迪丽热巴的简历</span>
                                </a-radio>
                            </a-col>
                            <a-col>
                                <a-row type="flex" justify="end" align="middle">
                                    <a>预览</a>
                                    <em></em>
                                    <a>修改</a>
                                </a-row>
                            </a-col>
                        </a-row>
                        <a-row type="flex" justify="space-between" align="middle">
                            <a-col>
                                <a-radio :style="radioStyle" :value="2">
                                    附件简历
                                    <span class="blue">迪丽热巴的简历.wrod</span>
                                </a-radio>
                            </a-col>
                            <a-col>
                                <a-row type="flex" justify="end" align="middle">
                                    <a>下载</a>
                                </a-row>
                            </a-col>
                        </a-row>
                    </a-radio-group>
                </div>
                <p>上传附件简历</p>
            </div>
            <div slot="footer">
                <a-button type="primary">确认投递简历</a-button>
            </div>
        </a-modal>
    </section>
</template>

<script>
import "./index.less";

export default {
  name: "job-collection",
  async asyncData(){
     return{

     }
  },
  components: {
    Interest: () => import('../../components/atom/Interest')
  },
  data() {
      return{
          isModalShow: false,
          value: 1,
          radioStyle: {
              display: 'block',
              height: '.3rem',
              lineHeight: '.3rem',
              fontSize: '.16rem'
          }
      }
  },
  mounted() {
  },
  methods: {
      handleCancel() { //关闭弹窗
          this.isModalShow = false;
      },
      handleModel() { //显示弹窗
          this.isModalShow = true;
      }
  }
};
</script>