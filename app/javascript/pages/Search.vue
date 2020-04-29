<template>
  <div class="container">
    <div class="row #e3f2fd blue lighten-5">
      <h2 class="center">検索</h2>
      <el-input placeholder="氏名・あだ名を入力" v-model="serchText"></el-input>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'serch',
    data: function() {
      return {
        serchText: ""
      }
    },
    computed: {

    },
    mounted: function() {

    },
    methods: {

    }
  }
</script>

<style scoped></style>
