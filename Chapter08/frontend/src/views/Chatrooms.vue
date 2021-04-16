<template>
  <div>
    <NavBar></NavBar>
    <h1>Chatrooms</h1>
    <button @click="creatChatRoom">Create Chatroom</button>
    <table id="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Go</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c of chatRooms" :key="c.id">
          <td>{{ c.name }}</td>
          <td>
            <button @click="goToChatRoom(c.id)">Go to Chatroom</button>
          </td>
          <td>
            <button @click="editChatRoom(c.id)">Edit</button>
          </td>
          <td>
            <button @click="deleteChatRoom(c.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { APIURL } from "../constants";
import NavBar from "@/components/NavBar";

export default {
  name: "Chatrooms",
  components: {
    NavBar,
  },
  data() {
    return {
      chatRooms: [],
    };
  },
  methods: {
    async getChatRooms() {
      const { data } = await axios.get(`${APIURL}/api/chat`);
      this.chatRooms = data;
    },
    editChatRoom(id) {
      this.$router.push(`/edit-chatroom/${id}`);
    },
    creatChatRoom() {
      this.$router.push("/add-chatroom");
    },
    goToChatRoom(id) {
      this.$router.push(`/chatroom/${id}`);
    },
    async deleteChatRoom(id) {
      await axios.delete(`${APIURL}/api/chat/delete/${id}`);
      this.getChatRooms();
    },
  },
  beforeMount() {
    this.getChatRooms();
  },
};
</script>

<style scoped>
#table {
  width: 100%;
}

th {
  text-align: left;
}

td:first-child {
  width: 75%;
}
</style>
