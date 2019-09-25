<template>
  <section class="page_centent">
    <div class="nav-bg"></div>
    <div class="company_info">
      <div class="company_nav">
        <div class="nav">
          <a v-for="(item, index) in navList" :key="index" :class="{active: active == index}" @click="bindActive(index)">{{item}}<span v-if="index == 3">6</span></a>
        </div>
      </div>
      <companyInfoModal v-if="active == 0"></companyInfoModal>
      <letterModal v-if="active == 1"></letterModal>
      <tidingsModal v-if="active == 3"></tidingsModal>
    </div>
  </section>
</template>

<script>
import "./index.less";
import companyInfoModal from '../../components/molecule/companyInfoModal';
import letterModal from '../../components/molecule/letterModal';
import tidingsModal from '../../components/molecule/tidingsModal';

export default {
  name: "company-info",
  components: {
    companyInfoModal,
    letterModal,
    tidingsModal
  },
  data() {
      return{
        navList: ['企业信息管理', '信件模板', '常用上班地址', '未读消息'],
        active: 0
      }
  },
  mounted() {
  },
  methods: {
    bindActive(index) {
      this.active = index;
    }
  }
};
</script>