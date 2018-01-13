<template>
  <div>
    <div class="editable">

    </div>
  </div>
  
</template>

<script>
  import MediumEditor from 'medium-editor'
  import 'medium-editor/dist/css/medium-editor.css'
  import 'medium-editor/dist/css/themes/default.css'


  export default {
    name: "MediumEditor",
    data() {
      return {
        mediumeditor: null
      }
    },
    mounted() {
      this.mediumeditor = new MediumEditor('.editable');
    },
    methods:{
      
    }
  }
</script>

<style scoped>
    .editable {
        z-index: 10000;
    }

</style>
