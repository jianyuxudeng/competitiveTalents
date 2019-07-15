<template>
  <footer id="footer" ref="footer" :class="[exducationFooter,'mfooter']">
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
