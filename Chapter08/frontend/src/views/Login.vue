<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-field">
        <label for="email">Email</label>
        <br />
        <input v-model="form.email" type="email" name="email" />
      </div>
      <div class="form-field">
        <label for="password">Password</label>
        <br />
        <input v-model="form.password" type="password" name="password" />
      </div>
      <div>
        <input type="submit" value="Log in" />
        <button type="button" @click="goToRegister">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { APIURL } from "../constants";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      const { email, password } = this.form;
      if (!email || !password) {
        alert("Email and password are required");
        return;
      }

      try {
        const {
          data: { access_token },
        } = await axios.post(`${APIURL}/api/auth/login`, {
          email,
          password,
        });
        localStorage.setItem("token", access_token);
        this.$router.push("/");
      } catch (error) {
        alert("Invalid username or password");
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
