<template>
    <section v-if="modelData">
        <a-modal
            :title="modelData.title"
            :confirmLoading="false"
            :visible="true"
            class="videoModel"
            @cancel="handleCancel"
        >
            <div class="file_centent">
                <a-upload name="file" :multiple="true" :action="fileUrl" @change="handleChange">
                    <a-button type="primary">选择上传文件</a-button>
                </a-upload>
            </div>
            <p>支持mp4、avi格式文件</p>
            <p>文件大小需小于20M</p>
            <p class="yellow">注：视频尽可能简短，清晰度72dpi或者以上（不得带有不良内容）</p>
            <div slot="footer"></div>
        </a-modal>
    </section>
</template>

<script>
import "./index.less";
import ajax from '../../../plugins/api';
import util from '../../../plugins/utils/util';

export default {
  name: "Modal",
  props: ['modelEdit'],
  async asyncData(){
     return{

     }
  },
  data() {
      return{
          modelData: null,
          labelCol: {span: 3},
          wrapperCol: {span: 21},
          form: this.$form.createForm(this),
          fileUrl: util.upLoadUrl
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
      handleCancel() { //关闭弹窗
          this.modelData = null;
          this.$emit('cancelModel', 'videoModel');
      },
      handleChange(info) { //上传
          if (info.file.status === 'done') {
              console.log(info.file)
          }
      }
  }
};
</script>