<template>
  <div class="app full-height">
    <app-navbar></app-navbar>
    <router-view class="view-ctn"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    appNavbar: Navbar
  }
}
</script>

<style>
  div.app {
    width: 100%;
    height: 100%;
    background-color: white;
  }

  .view-ctn {
    padding-top: 52px;
    min-height: 100%;
    background-color: '#f9f9f9' !important
  }

  ::-webkit-scrollbar
  {
      width: 6px;
      height: 6px;
      background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-track
  {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb
  {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #999999;
  }
</style>
