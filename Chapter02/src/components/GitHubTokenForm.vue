<template>
  <form @submit.prevent="saveToken">
    <div>
      <label for="githubToken">Github Token</label>
      <br />
      <input id="githubToken" v-model="githubToken" />
    </div>
    <div>
      <input type="submit" value="Save token" />
      <button type="button" @click="clearToken">Clear token</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "GitHubTokenForm",
  data() {
    return {
      githubToken: "",
    };
  },
  beforeMount() {
    this.githubToken = localStorage.getItem("github-token");
  },
  methods: {
    saveToken() {
      localStorage.setItem("github-token", this.githubToken);
    },
    clearToken() {
      localStorage.clear();
    },
  },
};
</script>
