<template>
  <div id="app">
    <div class="wrapper">
      <header class="header">
        <div class="container">
          <div class="logo">
            Shoptime
          </div>
          <ul class="nav">
            <li>
              <router-link to="/" class="active">HOME</router-link>
            </li>
            <li>
              <router-link to="/orders">ORDERS</router-link>
            </li>
            <li>
              <router-link to="/product">PRODUCT</router-link>
            </li>
          </ul>
          <div class="login">
            ADMIN
          </div>
        </div>

      </header>

      <router-view/>


    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
</style>
