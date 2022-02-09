<template>
  <div>
    <div class="text-center mt-16">
      <SnackBarMessageComponent :SnackBarOptions="SnackBarOptions" />
    </div>
    Teste
  </div>
</template>

<script>
import SnackBarMessageComponent from "../utils/SnackBarMessageComponent.vue";
export default {
  components: {
    SnackBarMessageComponent,
  },

  data() {

    return {
      SnackBarOptions: {
        snackbar: false,
        snackbarMessage: "",
      },
      nome: "Primary",
      primary: true,
      large: true,
      rounded: true,
      images: [],
      image_uploaded: false,
      path_image: "",
    };
  },
  methods: {
    uploadFiles() {
      this.images = this.$refs.file.files[0];
      var formData = new FormData();
      formData.append("fotos", this.images);
      this.$http.post("api/files", formData).then((res) => {
        console.log(res);
        this.path_image = "http://localhost:8000/" + res.data.imagem;
        this.image_uploaded = true;
      });
    },
  },
  created() {
    if (this.$route.query.register) {
      this.SnackBarOptions.snackbarMessage = "Cadastro efetuado com sucesso!";
      this.SnackBarOptions.snackbar = true;
    }

    if (this.$route.query.loginSucess) {
      this.SnackBarOptions.snackbarMessage = "Login efetuado com sucesso!";
      this.SnackBarOptions.snackbar = true;
    }
  },

};
</script>

<style>
</style>
