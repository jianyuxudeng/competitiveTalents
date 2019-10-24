<template>
  <section class="page_centent">
    <div class="nav-bg"></div>
    <div class="company_info">
      <div class="company_nav">
        <div class="nav">
          <a v-for="(item, index) in navList" :key="index" :class="{active: active == index}" @click="bindActive(index)">{{item}}<span v-if="index == 3">{{noRead}}</span></a>
        </div>
      </div>
      <companyInfoModal v-if="active == 0"></companyInfoModal>
      <letterModal v-if="active == 1"></letterModal>
      <frequentlyAddress v-if="active == 2"></frequentlyAddress>
      <tidingsModal @handleNoRead="handleNoRead" v-if="active == 3"></tidingsModal>
    </div>
  </section>
</template>

<script>
import "./index.less";
import companyInfoModal from '../../components/molecule/companyInfoModal';
import letterModal from '../../components/molecule/letterModal';
import frequentlyAddress from '../../components/molecule/frequentlyAddress';
import tidingsModal from '../../components/molecule/tidingsModal';

export default {
  name: "company-info",
  components: {
    companyInfoModal,
    letterModal,
    frequentlyAddress,
    tidingsModal
  },
  data() {
      return{
        navList: ['企业信息管理', '信件模板', '常用上班地址', '未读消息'],
        active: 0,
        noRead: 0
      }
  },
  watch: {
    $route() {
      let _active = this.$route.query.active || 0;
      if(_active == 30) {
        _active = 3;
      };
      this.active = _active;
    }
  },
  created() {
    let _active = this.$route.query.active || 0;
    if(_active == 30) {
      _active = 3;
    };
    this.active = _active;
  },
  mounted() {
  },
  methods: {
    bindActive(index) {
      this.active = index;
    },
    handleNoRead(e) {
      this.noRead = e;
    }
  }
};
</script>