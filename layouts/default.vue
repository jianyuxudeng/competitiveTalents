<template>
  <div>
    <div v-show="isPc">
        <navgation v-if="!isLogin"></navgation>
    </div>
    <div v-show="!isPc">
        <mobile-navgation></mobile-navgation>
    </div>
    <nuxt/>
    <div v-show="isPc">
      <footer-bot v-if="!isLogin"></footer-bot>
    </div>
    <div v-show="!isPc">
        <mobile-footer ></mobile-footer>
    </div>
  </div>
</template>
<script>
const navgation = () => import("./navgation/index.vue");
const footerBot = () => import("./footer/index.vue");
const mobileNavgation = () => import("./mobile/mobile-navgation/index.vue");
const mobileFooter = () => import("./mobile/mobile-footer/index.vue");
export default {
  data() {
    return {
      isPc: false,
      isLogin: false
    };
  },
  created() {
    let fullpath = this.$router.history.current.fullPath;
    let name = this.$router.history.current.name;
    if(name == 'login') {
      this.isLogin = true;
    }else{
      this.isLogin = false;
    };
    if (process.browser) {
      if (document.documentElement.clientWidth > 750) {
        if(fullpath.indexOf('mobile')>-1){
          fullpath = '/'
          this.$router.push(fullpath);
        }
      } else {
        if(fullpath.indexOf('mobile')<0){
          fullpath = '/mobile'
          this.$router.push(fullpath);
        }
      }
      
      window.addEventListener(
        "resize",
        () => {
          if (document.documentElement.clientWidth > 750) {
            if(fullpath.indexOf('mobile')>-1){
              fullpath = '/'
               this.$router.push(fullpath);
            }
          } else {
            if(fullpath.indexOf('mobile')<0){
              fullpath = '/mobile'
               this.$router.push(fullpath);
            }
          }
        },
        false
      );
    }
  },
  mounted() {
    if (process.browser) {
      if (document.documentElement.clientWidth > 750) {
        this.isPc = true;
      } else {
        this.isPc = false;
      }
      window.addEventListener(
        "resize",
        () => {
          if (document.documentElement.clientWidth > 750) {
            this.isPc = true;
          } else {
            this.isPc = false;
          }
        },
        false
      );
    }
  },
  components: {
    navgation,
    footerBot,
    mobileNavgation,
    mobileFooter
  }
};
</script>

<style>
</style>

