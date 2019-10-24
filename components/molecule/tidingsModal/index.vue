<template>
  <section>
      <div class="tidings">
          <div class="table">
              <p v-for="(item, index) in list" :key="index" :class="{read: item.is_read > 0}" @click="tapItem(item)">
                  <span>收到{{item.username}}的一份简历投递</span>
                  <span>{{item.send_time}}</span>
              </p>
          </div>
          <a-pagination showQuickJumper :total="list.length" />
      </div>
  </section>
</template>

<script>
import "./index.less";
import ajax from '../../../plugins/api';
import util from '../../../plugins/utils/util';
export default {
  data() {
      return{
          list: []
      }
  },
  mounted() {
      this.devData();
  },
  methods: {
      devData() {
          let userInfo = util.getStore('userInfo');
          ajax.get('message-list', {company_id: userInfo.id}).then(res => {
              if(res.retcode == 0) {
                  this.list = res.data.list || [];
                  this.$emit('handleNoRead', res.data.no_read);
              }
          })
      },
      tapItem(evt) {
          this.$router.push({
              path: 'resume-detail',
              query: {
                  id: evt.id,
                  user_id: evt.user_id
              }
          })
      }
  }
};
</script>