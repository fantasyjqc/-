<template>
    <div>
    <el-form :inline="true" :model="formInline">

        <el-form-item label="Sex">
            <el-select v-model="formInline.sex" clearable placeholder="select sex"
                       v-on:visible-change="selectDemo">
                <el-option
                        v-for="item in type_options"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click.native="addFormVisible = true">主要按钮</el-button>
        </el-form-item>

        <el-form-item v-if='formInline.sex' label="Description">
            <el-input v-model="formInline.email" placeholder="Please input suffix of email"></el-input>
        </el-form-item>

        <el-form-item v-else='formInline.sex' label="Description">
            <el-input v-model="formInline.email" disabled placeholder="Please input suffix of email"></el-input>
        </el-form-item>

    <el-dialog title="新增菜单" size="small" v-model="addFormVisible" :close-on-click-modal="false">
      <div>
        <el-button size="primary" type="info" icon="plus" @click="getContent">获取内容</el-button>
        <UEditor :config=config ref="ueditor"></UEditor>
      </div>
    </el-dialog>

    </el-form>
    </div>
</template>

<script>
import lodash from "lodash";
import Bus from "../eventBus";

import {UEditor} from './ueditor/index.js'


export default {
  name: "db-filterinput",
  components: {UEditor},
  data() {
    return {
      config: {
            //可以在此处定义工具栏的内容
            // toolbars: [
            //  ['fullscreen', 'undo', 'redo','|','bold', 'italic', 'underline',
            //  '|','superscript','subscript','|', 'insertorderedlist', 'insertunorderedlist',
            //  '|','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify']
            // ],
            autoHeightEnabled: false,
            autoFloatEnabled: true,
            initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
            autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
            initialFrameWidth: null,
            initialFrameHeight: 450,
            BaseUrl: '',
            UEDITOR_HOME_URL: 'static/'
      },
      type_options: [],
      defaultMsg: '这里是UE测试',
      formInline: {
        sex: "",
        email: ""
      },
      formLabelWidth: "120px",
      addFormVisible: false
    };
  },

  watch: {
    "formInline.sex": "filterResultData",
    "formInline.email": "filterResultData"
  },

  methods: {
    editItem: function(){
      this.addFormVisible = true;
    },

    selectDemo: function(params) {
      if (params) {
        this.$axios
          .get("http://127.0.0.1:8000/api/persons/sex")
          .then(response => {
            this.type_options = response.data;
            console.log(response.data);
          })
          .catch(function(response) {
            console.log(response);
          });
      }
    },
    filterResultData: _.debounce(function() {
      this.$axios
        .get("http://127.0.0.1:8000/api/persons", {
          params: {
            sex: this.formInline.sex,
            email: this.formInline.email
          }
        })
        .then(response => {
          response.data["sex"] = this.formInline.sex;
          response.data["email"] = this.formInline.email;
          Bus.$emit("filterResultData", response.data);
          console.log(response.data);
        })
        .catch(function(response) {
          console.log(response);
        });
    }, 500),

    getContent: function(){
          let content = this.$refs.ueditor.getUEContent();
          console.log(content);
          alert(content);
        }
  }
};
</script>