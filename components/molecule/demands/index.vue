<template>
  <section class="demands_page">
      <ul>
          <li v-for="(item, index) in listCope" :key="index" @click="onClick(index)">
              <div class="demands_top">
                  <div class="demands_text">
                      <div>
                          <p>{{item.title}}</p>
                          <p>{{item.ner}}</p>
                      </div>
                      <div>
                          <span>{{item.times}}</span>
                          <span>{{item.nub}}</span>
                      </div>
                  </div>
                  <div class="demands_btn">
                      <span :class="item.className">{{item.stateName}}</span>
                      <span>{{item.jin}}</span>
                      <span>{{item.she}}</span>
                      <span>{{item.zhi}}</span>
                  </div>
              </div>
              <dl>
                  <dt><img :src="item.tx" alt=""></dt>
                  <dd>
                      <p>{{item.xuexiao}}</p>
                      <p>{{item.zhuanye}}</p>
                  </dd>
              </dl>
          </li>
      </ul>
  </section>
</template>

<script>
import "./index.less";

export default {
  name: "demands",
  props: ['list'],
  async asyncData(){
     return{

     };
  },
  data() {
      return{
          listCope: []
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