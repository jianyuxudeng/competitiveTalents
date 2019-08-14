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
                <a-upload
                    :multiple="true" 
                    :fileList="logoFileList"
                    :action="upLoadUrl"
                    :supportServerRender="true"
                    :withCredentials="true"
                    @change="handleChange"
                >
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
          upLoadUrl: util.upLoadUrl,
          logoFileList: []
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
      handleChange({ file, fileList }) {
          let newList = [...fileList];
          newList = newList.slice(-1);
          newList = newList.map((v) => {
              if (v.response) {
                  v.url = v.response.data.imageList;
              }
              return v;
          });
          this.logoFileList = newList;
          console.log(newList)
      }
  }
};
</script>