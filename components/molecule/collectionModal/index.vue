<template>
    <section v-if="modelData">
        <a-modal
            :title="modelData.title"
            :confirmLoading="false"
            :maskClosable="false"
            :visible="true"
            class="collection_model"
            @cancel="handleCancel"
        >
            <div class="file_centent">
                <a-upload
                    :multiple="true" 
                    :fileList="collectionFileList"
                    :action="upLoadUrl"
                    :supportServerRender="true"
                    :withCredentials="true"
                    @change="handleChange"
                >
                    <a-button type="primary">选择上传作品</a-button>
                </a-upload>
            </div>
            <p>支持png、jpg、jpge、gif格式文件</p>
            <p>文件大小需小于10M</p>
            <div slot="footer">
                <a-button type="primary" @click="addCollection">确定上传</a-button>
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
          collectionFileList: []
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
          this.collectionFileList = [];
          this.$emit('cancelModel', 'collectionModal');
      },
      handleChange({ file, fileList }) {
          let newList = [...fileList];
        //   newList = newList.slice(-1);
          newList = newList.map((v) => {
              if (v.response) {
                  v.url = v.response.data.imageList;
              }
              return v;
          });
          this.collectionFileList = newList;
      },
      addCollection() {
          if(this.collectionFileList.length > 0 && this.collectionFileList[0].status == 'done') {
              let userInfo = util.getStore('userInfo');
              let _collection_link = this.collectionFileList.map(item => item.url[0]);
              if(this.modelEdit && this.modelEdit.id) {
                  let newArr = [...this.modelEdit.collection_link, ..._collection_link];
                  ajax.put('user/collection', {
                      user_id: userInfo.id,
                      collection_link: JSON.stringify(newArr),
                      id: this.modelEdit.id
                  }).then(res => {
                      if(res.retcode == 0) {
                          this.modelData = null;
                          this.collectionFileList = [];
                          this.$emit('okModel', 'collectionModal');
                      }
                  })
              }else{
                  ajax.post('user/collection', {
                      user_id: userInfo.id,
                      collection_link: JSON.stringify(_collection_link)
                  }).then(res => {
                      if(res.retcode == 0) {
                          this.modelData = null;
                          this.collectionFileList = [];
                          this.$emit('okModel', 'collectionModal');
                      }
                  })
              }
          }
      }
  }
};
</script>