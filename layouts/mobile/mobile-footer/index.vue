<template>
  <footer id="footer" ref="footer" :class="[exducationFooter,'mfooter']">
    <span>沪ICP备18044668号-3</span>
    <!-- <img src="../../../assets/images/foot_img.jpg" alt=""> -->
  </footer>
</template>
<script>
import "./index.less";
import axios from "axios";
export default {
  name: "mobileFooter",
  data() {
    return {
    
    };
  },
  created() {
   
  },
  beforeDestroy() {},
  mounted() {
    
  },
  props: {
      exducationFooter:String
  },
  methods: {},
  components: {}
};
</script>
