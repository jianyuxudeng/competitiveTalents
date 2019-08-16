<template>
  <section class="interest" v-if="userInfo">
      <div class="title">猜您感兴趣</div>
      <dl v-for="item in rows" :key="item.id" @click="goJobDetail(item)">
          <dt><img :src="item.logo" alt=""></dt>
          <dd>
              <p>{{item.careersName}}</p>
              <span>{{item.jobPrice}}/月</span>
          </dd>
      </dl>
      <div class="btn"><a @click="goJob">查看更多推荐职位</a></div>
  </section>
</template>

<script>
import "./index.less";
import ajax from '../../../plugins/api';
import util from '../../../plugins/utils/util';

export default {
  name: "Interest",
  props: [],
  async asyncData(){
     return{

     }
  },
  data() {
      return{
          rows: [],
          userInfo: null
      }
  },
  mounted() {
      this.init();
  },
  methods: {
      init() {
          let userInfo = util.getStore('userInfo');
          this.userInfo = userInfo;
          if(userInfo) {
              this.devGet();
          }
      },
      devGet() {
          ajax.get("jobs/interest", {
              user_id: this.userInfo.id
          }).then(res => {
              if(res.retcode == 0) {
                  this.rows = res.data || [];
              }
          })
      },
      goJob() {
          this.$router.push({
              path: 'search-positions'
          })
      },
      goJobDetail(e) {
          console.log(e,77777)
          this.$router.push({
              path: 'job-detail',
              query: {
                  id: e.id
              }
          })
      }
  }
};
</script>