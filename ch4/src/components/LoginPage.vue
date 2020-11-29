<template>
  <div>
    <h1>Log In</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <br />
        <input type="text" v-model="form.username" name="username" id="username" class="form-field" />
      </div>
      <div>
        <label for="username">Password</label>
        <br />
        <input type="password" v-model="form.password" name="password" id="password" class="form-field" />
      </div>
      <div>
        <input type="submit" value="Log In" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const { username, password } = this.form;
      if (username === "jane" && password === "abc123") {
        localStorage.setItem('logged-in', true);
        this.$router.push("/");
      } else {
        alert("Invalid username or password.");
      }
    },
  },
};
</script>

<style scoped>
.form {
  margin: 0 auto;
  width: 70vw;
}

.form-field {
  width: 100%;
}
</style>

