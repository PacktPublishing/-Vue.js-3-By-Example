<template>
  <div>
    <h1>Search</h1>
    <form @submit.prevent="submit">
      <div>
        <label for="name">Keyword</label>
        <br />
        <input type="text" v-model="keyword" name="keyword" id="keyword" class="form-field" />
      </div>
      <div>
        <input type="submit" value="Search" />
      </div>
    </form>
    <div v-for="p of photos" class="row" :key="p.id">
      <div>
        <img :src="p.photoFile" />
      </div>
      <div>{{p.name}}</div>
      <div>{{p.description}}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { APIURL } from "../constant";

export default {
  name: "SearchPage",
  data() {
    return {
      keyword: "",
      photos: [],
    };
  },
  methods: {
    async search() {
      const { data } = await axios.get(
        `${APIURL}/photos?name_like=${this.$route.query.q}`
      );
      this.photos = data;
    },
    submit() {
      console.log(this.keyword);
      this.$router.push({ path: "/search", query: { q: this.keyword } });
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.keyword = this.$route.query.q;
        this.search();
      },
    },
  },
};
</script>

<style scoped>
.form-field {
  width: 100%;
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.row div {
  width: 25%;
}

.row img {
  width: 100px;
}
</style>
