<template>
  <div>
    <NavBar></NavBar>
    <ChatroomForm></ChatroomForm>
  </div>
</template>

<script>
import ChatroomForm from "@/components/ChatroomForm";
import NavBar from "@/components/NavBar";

export default {
  components: {
    ChatroomForm,
    NavBar
  },
};
</script>
