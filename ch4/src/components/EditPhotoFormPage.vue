<template>
  <div>
    <PhotoForm edit :id="$route.params.id"></PhotoForm>
  </div>
</template>

<script>
import PhotoForm from "./PhotoForm";

export default {
  name: "EditPhotoFormPage",
  components: {
    PhotoForm,
  },
};
</script>

