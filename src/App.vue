<template>
  <div id="app">
    <div class="wrapper">
      <header class="header">
        <div class="container">
          <div class="logo">
            Shoptime
          </div>

          <button class="menubar" @click="isShow = !isShow">
            <i class="fas fa-bars"></i>
          </button>

          <ul class="nav" :class="{ 'isShow' : isShow}">
            <li>
              <router-link to="/">HOME</router-link>
            </li>
            <li>
              <router-link active-class to="/orders">ORDERS</router-link>
            </li>
            <li>
              <router-link active-class to="/product">PRODUCT</router-link>
            </li>
            <li class="login">
              <span class="login__name"> ADMIN </span>
          </li>
          </ul>
          <!-- <div class="login">
            ADMIN
          </div> -->
        </div>

      </header>
      <router-view/>


    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isShow: false
    };
  }
};
</script>

<style>
</style>
