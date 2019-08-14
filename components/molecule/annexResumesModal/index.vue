<template>
    <section v-if="modelData">
        <a-modal
            :title="modelData.title"
            :confirmLoading="false"
            :visible="true"
            class="annexResumes_model"
            @cancel="handleCancel"
        >
            <div class="file_centent">
                <a-upload
                    :multiple="true" 
                    :fileList="annexResumesFileList"
                    :action="upLoadUrl"
                    :supportServerRender="true"
                    :withCredentials="true"
                    @change="handleChange"
                >
                    <a-button type="primary">选择上传文件</a-button>
                </a-upload>
            </div>
            <p>支持word、pdf、ppt、txt、wps格式文件</p>
            <p>文件大小需小于10M</p>
            <p class="yellow">注：若从其他网站下载的word简历，请讲文件另存为.docx格式后上传</p>
            <div slot="footer">
                <a-button type="primary" @click="addVideo">确定上传</a-button>
            </div>
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
          annexResumesFileList: []
      }
  },
  watch: {
      modelEdit() {
          this.modelData = this.modelEdit;
          if(this.modelData) {
              if(this.modelData.video_link) this.annexResumesFileList = [this.modelData.video_link];
          }
      }
  },
  mounted() {
  },
  methods: {
      handleCancel() { //关闭弹窗
          this.modelData = null;
          this.annexResumesFileList = [];
          this.$emit('cancelModel', 'annexResumesModal');
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
          this.annexResumesFileList = newList;
      },
      addVideo() {
          if(this.annexResumesFileList.length > 0 && this.annexResumesFileList[0].status == 'done') {
              let userInfo = util.getStore('userInfo');
              ajax.post('user/annexResumes', {
                  user_id: userInfo.id,
                  video_link: this.annexResumesFileList[0].url[0]
              }).then(res => {
                  if(res.retcode == 0) {
                      this.modelData = null;
                      this.annexResumesFileList = [];
                      this.$emit('okModel', 'annexResumesModal');
                  }
              })
          }
      }
  }
};
</script>