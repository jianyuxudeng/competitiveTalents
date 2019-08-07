<template>
  <section class="demands_page">
      <ul>
          <li v-for="(item, index) in listCope" :key="index" @click="onClick(index)">
              <div class="demands_top">
                  <div class="demands_text" :class="{size: isWork == 'resume'}">
                      <div>
                          <p v-if="isWork == 'work'">{{item.title}}</p>
                          <p v-if="isWork == 'resume'">{{item.title}} <span>[电竞内容后期制作]</span></p>
                          <p v-if="isWork == 'work'">{{item.workExperience}}/{{item.educational}}</p>
                      </div>
                      <div>
                          <span v-if="isWork == 'work'">{{item.times}}</span>
                          <span>{{item.jobPrice}}/月</span>
                      </div>
                  </div>
                  <div class="resume_text" v-if="isWork == 'resume'">
                      <span>求职期望：上海</span>
                      <span>工作经历：1年</span>
                  </div>
                  <div class="demands_btn">
                      <span :class="item.className">{{item.stateName}}</span>
                      <span>{{item.jin}}</span>
                      <span>{{item.she}}</span>
                      <span>{{item.zhi}}</span>
                  </div>
              </div>
              <dl v-if="isWork == 'work'">
                  <dt><img :src="item.tx" alt=""></dt>
                  <dd>
                      <p>{{item.xuexiao}}</p>
                      <p>{{item.zhuanye}}</p>
                  </dd>
              </dl>
              <dl v-if="isWork == 'resume'">
                  <dd>{{item.zhuanye}}</dd>
              </dl>
          </li>
      </ul>
  </section>
</template>

<script>
import "./index.less";

export default {
  name: "demands",
  props: ['list', 'isWork'],
  async asyncData(){
     return{

     };
  },
  data() {
      return{
          listCope: []
      }
  },
  watch: {
      isWork() {
          this.init();
          return this.isWork;
      }
  },
  mounted() {
      this.init();
  },
  methods: {
      init() { //初始化
          if(this.list.length > 0) {
            this.listCope = this.list.map(item => {
                switch (item.state) {
                    case '1':
                        item.className = 'blue';
                        item.stateName = '全职';
                        break;
                    case '2':
                        item.className = 'orange';
                        item.stateName = '兼职';
                        break;
                    case '3':
                        item.className = 'green';
                        item.stateName = '外包';
                        break;
                    default:
                        break;
                };
                return item;
            });
          }
      },
      onClick(index) { //点击每个item
          console.log(index)
      }
  }
};
</script>