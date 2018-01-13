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
            <el-button type="primary" @click.native="editItem">主要按钮2</el-button>
        </el-form-item>

        <el-form-item v-if='formInline.sex' label="Description">
            <el-input v-model="formInline.email" placeholder="Please input suffix of email"></el-input>
        </el-form-item>

        <el-form-item v-else='formInline.sex' label="Description">
            <el-input v-model="formInline.email" disabled placeholder="Please input suffix of email"></el-input>
        </el-form-item>

    <el-dialog title="新增菜单" size="small" v-model="addFormVisible2" :close-on-click-modal="false">
      <div>
        <el-button size="primary" type="info" icon="plus" @click="getContent2">获取内容</el-button>
        <!-- <NEditor :config=config2 ref="neditor"></NEditor> -->
        <!-- <Quill ref="quill"></Quill> -->
        <!-- <medium-editor></medium-editor> -->
        <!-- <tuieditor id="tuieditor" :config=config3></tuieditor> -->
        <editormd></editormd>
      </div>
    </el-dialog>

    </el-form>
    </div>
</template>

<script>
import lodash from "lodash";
import Bus from "../eventBus";

import {UEditor} from './ueditor/index.js'
import {NEditor} from './neditor/index.js'
import {Quill} from './quill/index.js'
import {MediumEditor} from './mediumeditor/index.js'
import {Editormd} from './editor.md/index.js'
import {Tuieditor} from './tuieditor/index.js'




export default {
  name: "db-filterinput",
  components: {UEditor,NEditor,Quill,MediumEditor,Editormd,Tuieditor},
  data() {
    return {
      config2: {
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
            UEDITOR_HOME_URL: 'static/neditor/'
      },
      config3: {
        previewStyle: 'vertical',
        height: '400px',
        initialEditType: 'markdown',
        useCommandShortcut: true,
        initialValue: '',
        exts: ['scrollSync', 'colorSyntax', 'uml', 'chart', 'mark', 'table', 'taskCounter']
      },
      type_options: [],
      defaultMsg: '这里是NE测试',
      formInline: {
        sex: "",
        email: ""
      },
      formLabelWidth: "120px",
      addFormVisible2: true,
    };
  },

  mounted(){
    var content = [
        '| @cols=2:merged |',
        '| --- | --- |',
        '| table | table |',
        '```uml',
        'partition Conductor {',
        '  (*) --> "Climbs on Platform"',
        '  --> === S1 ===',
        '  --> Bows',
        '}',
        '',
        'partition Audience #LightSkyBlue {',
        '  === S1 === --> Applauds',
        '}',
        '',
        'partition Conductor {',
        '  Bows --> === S2 ===',
        '  --> WavesArmes',
        '  Applauds --> === S2 ===',
        '}',
        '',
        'partition Orchestra #CCCCEE {',
        '  WavesArmes --> Introduction',
        '  --> "Play music"',
        '}',
        '```',
        '```chart',
        ',category1,category2',
        'Jan,21,23',
        'Feb,31,17',
        '',
        'type: column',
        'title: Monthly Revenue',
        'x.title: Amount',
        'y.title: Month',
        'y.min: 1',
        'y.max: 40',
        'y.suffix: $'
      ].join('\n');
    this.config3.initialValue = content;
    this.addFormVisible2 = false;
  },

  watch: {
    "formInline.sex": "filterResultData",
    "formInline.email": "filterResultData"
  },

  methods: {
    editItem: function(){
      

      this.addFormVisible2 = true;
      // this.$refs.quill.setUEContent("这里是测试语句");
    },

    setUEContent(something){
      this.$refs.quill.setUEContent(something);
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
          let content = this.$refs.quill.getUEContent();
          console.log(content);
          alert(content);
        },

        getContent2: function(){
          let content = this.$refs.quill.getUEContent();
          console.log(content);
          alert(content);
        }
  }
};
</script>