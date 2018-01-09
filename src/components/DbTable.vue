<template>
    <div>
        <el-form ref="newform" :model="newform" :rules="rules">
        <el-form-item style="text-align:center">
         <el-button type="primary" @click="newSubmitForm()" class="yes-btn">
          确 定
         </el-button>
         <el-button @click="resetForm('newform')">
          重 置
         </el-button>
        </el-form-item>
        <el-form-item label="" prop="expvmFiles">
          <el-upload
            class="upload-demo"
            drag
            ref="uploadfile"
            :action="upload_url"
            :auto-upload="false"
            :before-upload="newFiles"
            multiple>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">实验信息附件上传，只能传(.file)文件</div>
          </el-upload>
        </el-form-item>
     </el-form>
    </div>

</template>

<script>
import Bus from "../eventBus";
import DbModal from "./DbModal.vue";

export default {
  data() {
    return {
      upload_url: "aaa", // 随便填一个，但一定要有
      uploadForm: new FormData(), // 一个formdata
      rules: {}, // 用到的规则
      newform: {
        expName: "",
        groupName: "",
        expSn: "",
        subGroupName: "",
        expvmDifficulty: 1
      }
    };
  },

  components: {
    DbModal
  },
  mounted() {},

  methods: {
    newSubmitForm() {
      this.$refs["newform"].validate(valid => {
        if (valid) {
          this.$refs.uploadfile.submit();

          this.$axios({
            method: "post", // 方式一定是post
            url: "http://localhost:8000/test",
            timeout: 20000,
            data: this.uploadForm // 参数需要是单一的formData形式
          }).then(res => {
            if (res.code === 400) {
              alert(res.error);
            } else if (res.code === 200) {
                alert("上传成功！");
            }
            this.uploadForm = new FormData();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    newFiles(file) {
      this.uploadForm.append("file", file);
      return false;
    }
  }
};
</script>

<style>
.table {
  margin-top: 30px;
}

.pagination {
  margin-top: 10px;
  float: right;
}
</style>