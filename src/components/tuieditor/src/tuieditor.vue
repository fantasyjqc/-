<template>
  <div>
    <div id="tuieditor">

    </div>
  </div>
  
</template>

<script>
  import 'tui-editor/dist/tui-editor-Editor-all.js'
  import 'tui-editor/dist/tui-editor-contents.css'
  import 'tui-editor/dist/tui-editor.css'


  export default {
    name: "Tuieditor",
    props: {
      config: {
          type: Object
      }
    },
    data() {
      return {
        tuieditor: null
      }
    },
    mounted() {
      $('#tuieditor').tuiEditor(this.config);
    },
    methods:{
      getUEContent: function(){
       return this.tuieditor.getText();
      },
      setUEContent: function(something){
       this.tuieditor.setText(something);
      },
    }
  }
</script>
