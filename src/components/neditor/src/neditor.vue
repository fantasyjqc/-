<template>
  <div>
    <script id="editor" type="text/plain" ></script>
  </div>
</template>

<script>
  import '../../../../static/neditor/neditor.config.js'
  import '../../../../static/neditor/neditor.all.js'
  import '../../../../static/neditor/lang/zh-cn/zh-cn.js'

  export default {
    name: "NEditor",
    props: {
      id: {
          type: String
      },
      config: {
          type: Object
      }
    },
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      //初始化UE
      const _this = this;
      this.editor = UE.getEditor('editor',this.config);
    },
    destoryed() {
      this.editor.destory();
    },
    methods:{
      getUEContent: function(){
       return this.editor.getContent();
      },
      setUEContent: function(something){
       this.editor.setContent(something);
      },
    }
  }
</script>
