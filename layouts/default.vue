<template>
  <a-locale-provider :locale="zh_CN">
    <div>
      <div v-show="isPc">
        <navgation v-if="!isLogin"></navgation>
      </div>
      <div v-show="!isPc">
        <mobile-navgation v-if="!isLogin"></mobile-navgation>
      </div>
      <nuxt />
      <div v-show="isPc">
        <footer-bot v-if="!isLogin"></footer-bot>
      </div>
      <div v-show="!isPc">
        <mobile-footer v-if="!isLogin"></mobile-footer>
      </div>
    </div>
  </a-locale-provider>
</template>
<script>
const navgation = () => import("./navgation/index.vue");
const footerBot = () => import("./footer/index.vue");
const mobileNavgation = () => import("./mobile/mobile-navgation/index.vue");
const mobileFooter = () => import("./mobile/mobile-footer/index.vue");
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  data() {
    return {
      isPc: false,
      isLogin: false,
      zh_CN
    };
  },
  watch: {
    $route() {
      let name = this.$router.history.current.name;
      console.log(name);
      if (name == "login" || name == "mobile-login") {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    }
  },
  created() {
    let fullpath = this.$router.history.current.fullPath;
    let name = this.$router.history.current.name;
    if (name == "login" || name == "mobile-login") {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    if (process.browser) {
      if (document.documentElement.clientWidth > 750) {
        if (fullpath.indexOf("mobile") > -1) {
          fullpath = fullpath.split('mobile')[1];
          this.$router.push(fullpath);
        }
      } else {
        if (fullpath.indexOf("mobile") < 0) {
          fullpath = "/mobile"+fullpath;
          this.$router.push(fullpath);
        }
      }
      window.addEventListener(
        "resize",
        () => {
          if (document.documentElement.clientWidth > 750) {
            if (fullpath.indexOf("mobile") > -1) {
              fullpath = fullpath.split('mobile')[1];
              this.$router.push(fullpath);
            }
          } else {
            if (fullpath.indexOf("mobile") < 0) {
              fullpath = "/mobile"+fullpath;
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
  methods: {
    getQueryVariable(variable) {
      var query = decodeURIComponent(window.location.search.substring(1));
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
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

