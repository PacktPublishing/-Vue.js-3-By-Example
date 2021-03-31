<template>
  <nav>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/add-photo-form">Add Photo</router-link>
      </li>
      <li>
        <router-link to="/search">Search Photos</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
ul li {
  list-style: none;
  display: inline;
  margin-right: 10px;
}

ul {
  margin: 0 auto;
  width: 70vw;
}
</style>
