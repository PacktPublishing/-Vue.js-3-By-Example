<template>
  <div>
    <h1>Photos</h1>
    <button @click="load">Refresh</button>
    <div class="row">
      <div>Name</div>
      <div>Photo</div>
      <div>Description</div>
      <div>Actions</div>
    </div>
    <div v-for="p of photos" class="row" :key="p.id">
      <div>
        <img :src="p.photoFile" />
      </div>
      <div>{{p.name}}</div>
      <div>{{p.description}}</div>
      <div>
        <button @click="edit(p.id)">Edit</button>
        <button @click="deletePhoto(p.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { APIURL } from "../constant";

export default {
  data() {
    return {
      photos: [],
    };
  },
  methods: {
    async load() {
      const { data } = await axios.get(`${APIURL}/photos`);
      this.photos = data;
    },
    edit(id) {
      this.$router.push({ path: `/edit-photo-form/${id}` });
    },
    async deletePhoto(id) {
      await axios.delete(`${APIURL}/photos/${id}`);
      this.photos = [];
      this.load();
    },
  },
  beforeMount() {
    this.load();
  },
};
</script>

<style scoped>
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
