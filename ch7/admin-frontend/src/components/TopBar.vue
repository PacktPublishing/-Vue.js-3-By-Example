<template>
  <p>
    <router-link to="/orders">Orders</router-link>
    <router-link to="/shop-items">Shop Items</router-link>
    <button @click="logOut">Log Out</button>
  </p>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
a {
  margin-right: 5px;
}
</style>
