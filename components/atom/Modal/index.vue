<template>
    <section v-if="modelData">
        <a-modal
            :title="modelData.title"
            :confirmLoading="false"
            :visible="true"
            class="editModel"
            @cancel="handleCancel"
        >
            <div class="page_modal">
        
            </div>
            <div slot="footer">
                <button type="button" class="ant-btn ant-btn-primary" @click="handleOk">保存</button>
            </div>
        </a-modal>
    </section>
</template>

<script>
import "./index.less";

export default {
  name: "Modal",
  props: ['modelEdit'],
  async asyncData(){
     return{

     }
  },
  data() {
      return{
          modelData: null
      }
  },
  watch: {
      modelEdit() {
          this.modelData = this.modelEdit;
      }
  },
  mounted() {
  },
  methods: {
      handleCancel() {
          this.modelData = null;
          this.$emit('cancelModel');
      },
      handleOk() {
          console.log(111)
      }
  }
};
</script>