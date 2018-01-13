<template>
  <div>
    <div id="editor">

    </div>
  </div>
  
</template>

<script>
  import Quill from 'quill'
  import 'quill/dist/quill.snow.css'
  import toolbar from 'quill/modules/toolbar.js'

  export default {
    name: "Quill",
    data() {
      return {
        quill: null
      }
    },
    mounted() {
      this.quill = new Quill('#editor', {
        theme: 'snow'
      });
    },
    methods:{
      getUEContent: function(){
       return this.quill.getText();
      },
      setUEContent: function(something){
       this.quill.setText(something);
      },
    }
  }
</script>
