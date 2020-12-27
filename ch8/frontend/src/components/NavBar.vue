<template>
  <div>
    <ul>
      <li>
        <router-link to="/">Chatrooms</router-link>
      </li>
      <li><a href="#" @click='logOut'>Logout</a></li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { APIURL } from "../constants";

export default {
  name: "NavBar",
  methods: {
    async logOut() {
      await axios.post(`${APIURL}/api/auth/logout`);
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

ul li {
  display: inline;
  margin-right: 10px;
}
</style>
