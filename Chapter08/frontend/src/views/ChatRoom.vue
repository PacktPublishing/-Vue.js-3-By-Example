<template>
  <div>
    <NavBar></NavBar>
    <h1>Chatroom</h1>
    <div id="chat-messages" ref="container">
      <div class="row" v-for="m of chatMessages" :key="m.id">
        <div>
          <b>{{ m.user.name }} - {{ m.created_at }}</b>
        </div>
        <div>{{ m.message }}</div>
      </div>
    </div>
    <form @submit.prevent="sendChatMessage">
      <div class="form-field">
        <label for="message">Message</label>
        <br />
        <input v-model="message" type="text" name="message" />
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
import NavBar from "@/components/NavBar";

export default {
  name: "Chatroom",
  components: {
    NavBar,
  },
  beforeMount() {
    this.getChatMessages();
    this.addChatListener();
  },
  data() {
    return {
      chatMessages: [],
      message: "",
    };
  },
  methods: {
    async getChatMessages() {
      const { id } = this.$route.params;
      const { data } = await axios.get(`${APIURL}/api/message/${id}`);
      this.chatMessages = data;
      this.$nextTick(() => {
        const container = this.$refs.container;
        container.scrollTop = container.scrollHeight;
      });
    },
    async sendChatMessage() {
      const { message } = this;
      if (!message) {
        return;
      }
      const { id: chat_id } = this.$route.params;
      const {
        data: { id: user_id },
      } = await axios.post(`${APIURL}/api/auth/me`);
      await axios.post(`${APIURL}/api/message/create`, {
        message,
        chat_id,
        user_id,
      });
      this.message = "";
    },
    addChatListener() {
      window.Echo.channel("laravel_database_chat").listen(
        ".MessageSent",
        () => {
          this.getChatMessages();
        }
      );
    },
  },
};
</script>

<style scoped>
#chat-messages {
  height: 300px;
  overflow-y: scroll;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.row div:first-child {
  width: 30%;
}
</style>
