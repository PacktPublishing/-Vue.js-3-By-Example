<template>
  <div class="form">
    <h1>{{edit ? 'Edit' : 'Add'}} Photo</h1>
    <form @submit.prevent="submit">
      <div>
        <label for="name">Name</label>
        <br />
        <input type="text" v-model="form.name" name="name" id="name" class="form-field" />
      </div>
      <div>
        <label for="dscription">Description</label>
        <br />
        <textarea v-model="form.description" name="description" id="description" class="form-field"></textarea>
      </div>
      <div>
        <label for="dateTaken">Date Taken</label>
        <br />
        <input type="datetime-local" name="dateTaken" id="dateTaken" v-model="form.dateTaken" />
      </div>
      <div>
        <label for="photoFile">Photo</label>
        <br />
        <input type="file" name="photoFile" id="photoFile" @change="onChange" />
        <br />
        <img :src="form.photoFile" id="photo-preview" />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { APIURL } from "../constant";

export default {
  name: "PhotoForm",
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        dateTaken: "",
        photoFile: undefined,
      },
    };
  },
  methods: {
    async submit() {
      const { name, description, dateTaken, photoFile } = this.form;
      if (!name || !description || !dateTaken || !photoFile) {
        alert("All fields are required");
        return;
      }

      if (this.edit) {
        await axios.put(`${APIURL}/photos/${this.id}`, this.form);
      } else {
        await axios.post(`${APIURL}/photos`, this.form);
      }
      this.$router.push("/");
    },
    onChange(ev) {
      const reader = new FileReader();
      reader.readAsDataURL(ev.target.files[0]);
      reader.onload = () => {
        this.form.photoFile = reader.result;
      };
    },
  },
  async beforeMount() {
    if (this.edit) {
      const { data } = await axios.get(`${APIURL}/photos/${this.id}`);
      this.form = data;
    }
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

#photo-preview {
  width: 200px;
}
</style>
