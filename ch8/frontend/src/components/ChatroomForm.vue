<template>
  <div>
    <h1>{{ edit ? "Edit" : "Add" }} Chatroom</h1>
    <form @submit.prevent="submit">
      <div class="form-field">
        <label for="name">Name</label>
        <br />
        <input v-model="form.name" type="text" name="name" />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { APIURL } from "../constants";

export default {
  name: "ChatroomForm",
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
      },
    };
  },
  methods: {
    async submit() {
      const { name } = this.form;
      if (!name) {
        alert("Name is required");
        return;
      }
      if (this.edit) {
        await axios.put(`${APIURL}/api/chat/update/${this.id}`, {
          name,
        });
      } else {
        await axios.post(`${APIURL}/api/chat/create`, {
          name,
        });
      }
      this.$router.push("/");
    },
  },
  async beforeMount() {
    if (this.edit) {
      const { data } = await axios.get(`${APIURL}/api/chat/${this.id}`);
      this.form = data;
    }
  },
};
</script>
