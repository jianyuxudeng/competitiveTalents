<template>
  <section class="interest">
      <div class="title">猜您感兴趣</div>
      <dl>
          <dt><img src="../../../assets/images/positions_img.png" alt=""></dt>
          <dd>
              <p>赛事运营策划</p>
              <span>20k-30k/月</span>
          </dd>
      </dl>
      <dl>
          <dt><img src="../../../assets/images/positions_img.png" alt=""></dt>
          <dd>
              <p>赛事运营策划</p>
              <span>20k-30k/月</span>
          </dd>
      </dl>
      <div class="btn"><a>查看更多推荐职位</a></div>
  </section>
</template>

<script>
import "./index.less";

export default {
  name: "Interest",
  props: [],
  async asyncData(){
     return{

     }
  },
  data() {
      return{}
  },
  mounted() {
  },
  methods: {
  }
};
</script>