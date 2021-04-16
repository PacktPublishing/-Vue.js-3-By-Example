<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div class="form-field">
        <label for="email">Name</label>
        <br />
        <input v-model="form.name" type="text" name="name" />
      </div>
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
      <div class="form-field">
        <label for="confirmPassword">Confirm Password</label>
        <br />
        <input
          v-model="form.confirmPassword"
          type="password"
          name="confirmPassword"
        />
      </div>
      <div>
        <input type="submit" value="Log in" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { APIURL } from "../constants";

export default {
  name: "Register",
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async register() {
      const { name, email, password, confirmPassword } = this.form;
      if (!name) {
        alert("Name is required");
        return;
      }

      if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
        alert("invalid email");
        return;
      }

      if (password !== confirmPassword) {
        alert("Password and confirm password must be the same");
        return;
      }

      try {
        await axios.post(`${APIURL}/api/register`, {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        });
        this.$router.push("/login");
      } catch (error) {
        alert("Invalid username or password");
      }
    },
  },
};
</script>
