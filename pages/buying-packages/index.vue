<template>
    <section class="page_centent">
        <div class="buying_packages">
            <div class="item" v-for="(item, index) in rows" :key="index">
                <div class="left">
                  <p>{{item.name}}</p>
                  <span>剩余次数：{{item.nub}}</span>
                </div>
                <a-button type="primary">单项次数购买</a-button>
            </div>
            <div class="btn">
              <a-button type="primary" size="large">服务套餐购买</a-button>
            </div>
        </div>
    </section>
</template>

<script>
import "./index.less";
import ajax from '../../plugins/api';
import util from '../../plugins/utils/util';
export default {
  name: "buying-packages",
  data() {
    return {
      rows: [
        {name: '自动刷新', nub: 27},
        {name: '置顶', nub: 27},
        {name: '职位推荐', nub: 27},
        {name: '公司规模 / 行业领域 / 工资阶段', nub: 27}
      ]
    };
  },
  async asyncData() {
   
  },
  mounted() {
  },
  methods: {
  }
};
</script>
