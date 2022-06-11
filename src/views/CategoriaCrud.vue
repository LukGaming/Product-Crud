<template>
  <div class="mt-16">
    <div class="d-flex justify-center">
      <h1 class="mb-2 mt-16">Criando uma nova Categoria</h1>
    </div>
    <v-form ref="form">
      <div v-if="method == 'edit' || method == 'show'" class="my-8">
        <CriadorCategoriaComponent :usuarioCriador="usuarioCriador" />
      </div>
      <v-text-field
        v-model="nome_categoria"
        label="Nome da Categoria"
        :disabled="inputsDisabled"
      ></v-text-field>
      <div class="input-errors" v-if="v$.nome_categoria.$error">
        <v-alert border="bottom" color="pink darken-1" dark>
          O nome da categoria deve obter entre 3 e 20 Caractéres
        </v-alert>
      </div>
      <div v-if="categoriaExists">
        <v-alert border="bottom" color="pink darken-1" dark>
          Esta categoria já existe
        </v-alert>
      </div>
      <div v-if="method == 'create'">
        <v-btn color="warning" @click="submit"> Cadastrar Categoria </v-btn>
      </div>
      <div v-if="method == 'edit'" class="d-flex justify-space-around row">
        <v-btn color="success" @click="submit"> Editar Categoria </v-btn>
        <v-btn color="warning" @click="deleteCategory">
          Excluir Categoria
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import get_user_data from "../modules/user/get_user_data";
import useVuelidate from "@vuelidate/core";
/*Funções das categorias*/
import getCategoryByid from "../modules/categorias/getCategoryByid";
// import submit from "../modules/categorias/submit";
import deleteCategory from "../modules/categorias/deleteCategory";
import validations from "../modules/categorias/validations";
/*Funções das categorias*/
import CriadorCategoriaComponent from "../components/CriadorCategoriaComponent.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      id: null,
      snackbar: false,
      nome_categoria: "",
      categoriaExists: false,
      method: "create",
      messageSnackBar: "",
      inputsDisabled: false,
      usuarioCriador: {
        nameUserCreatorOfCategoria: "",
        idUserCreatorOfCategoria: 0,
      },
    };
  },
  components: {
    CriadorCategoriaComponent,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  created() {
    if (this.$route.name == "categoria/create") {
      this.method = "create";
    }
    if (this.$route.name == "categoria/edit") {
      this.method = "edit";
      this.id = this.$route.params.id;
      this.getCategoryByid();
    }
    if (this.$route.name == "categoria/show") {
      this.method = "show";
      this.inputsDisabled = true;
      this.id = this.$route.params.id;
      this.getCategoryByid();
    }
  },
  methods: {
    ...mapActions(["setCategories", "setDialogCreateCategory", "setSnackBar"]),
    async submit() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return isFormCorrect;
      } else {
        if (this.method == "create") {
          this.$http
            .post(`api/categorias`, {
              nome_categoria: this.nome_categoria,
              user_id: localStorage.getItem("userId"),
            })
            .then((res) => {
              this.setCategories(res.data.categoria);
              this.setSnackBar({
                part: "snackbarMessage",
                value: "Categoria Criada com sucesso!",
              });
              this.setSnackBar({
                part: "snackbar",
                value: true,
              });
              this.setDialogCreateCategory({ part: "dialog", value: false });
              this.categoriaExists = false;
              this.v$.$reset();
              this.snackbar = true;
              this.messageSnackBar = "Categoria Criada com sucesso!";
              this.nome_categoria = "";
              return res;
            })
            .catch((error) => {
              this.categoriaExists = true;
              return error;
            });
        }
        if (this.method == "edit") {
          this.$http.get(`api/categorias/${this.id}`).then((res) => {
            if (res.data.length > 0) {
              this.categoriaExists = true;
            } else {
              this.categoriaExists = false;
              this.$http
                .patch(`api/categorias/${this.id}`, {
                  nome_categoria: this.nome_categoria,
                })
                .then((res) => {
                  this.snackbar = true;
                  this.messageSnackBar = "Categoria editada com sucesso!";
                  return res;
                });
            }
          });
        }
      }
    },
    ...get_user_data,
    ...getCategoryByid,
    ...deleteCategory,
  },
  ...validations,
};
</script>

<style>
[centralized] {
  margin-left: 15%;
  margin-right: 15%;
}
</style>
