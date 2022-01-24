<template>
  <div>
    <div class="d-flex column justify-center">
      <h1 v-if="method == 'create'" class="mt-10">Criando um novo Produto</h1>
      <h1 v-if="method == 'edit'" class="mt-10">Editando Produto - {{ id }}</h1>
      <h1 v-if="method == 'read'" class="mt-10">Visualizando Produto - {{ id }}</h1>
    </div>
    <div>
      <!-- Snack bar é a mensagem depois que o produto for criado ou editado -->
      <SnackBarMessageComponent :SnackBarOptions="SnackBarOptions" />

      <v-form lazy-validation class="mx-16">
        <v-text-field v-model="nome" label="Nome" :readonly="inputsDisabled"></v-text-field>
        <div v-if="v$.nome.$error">
          <v-alert color="red" type="warning" dense>
            O campo de
            <strong>Nome</strong> deve conter entre 3 e 50 caracteres
          </v-alert>
        </div>
        <div class="valor">
          Preço R$:
          <money
            v-model="valor"
            v-bind="money"
            :readonly="inputsDisabled"
            class="my-4 moeda text--light"
          ></money>
        </div>
        <div class="d-flex">
          <v-select v-model="select" :items="nome_categorias" label="Categoria"></v-select>
          <dialogCreateCategoriaComponent
            :SnackBarOptions="SnackBarOptions"
            :getAllCategoryes="getAllCategoryes"
            :dialog="dialog"
          />
        </div>

        <div v-if="v$.valor.$error">
          <v-alert color="red lighten-2" type="warning" dense>
            Campo de
            <strong>Valor</strong> não pode ficar vazio
          </v-alert>
        </div>
        <v-textarea v-model="descricao" label="Descricao" :readonly="inputsDisabled"></v-textarea>
        <div v-if="v$.descricao.$error">
          <v-alert color="red" type="warning" dense>
            Campo de
            <strong>Descricao</strong> deve conter entre 20 e 2000
            Caracteres
          </v-alert>
        </div>
        <div v-if="method == 'edit'">
          <v-file-input
            label="Enviar novas imagens"
            filled
            multiple
            prepend-icon="mdi-camera"
            v-model="novas_imagens"
          ></v-file-input>
        </div>
        <div v-if="method == 'edit'">
          <div class="d-flex justify-center">
            <v-row class="d-flex justify-center mb-16">
              <v-col v-for="image in imagens" :key="image.id" class="d-flex child-flex" cols="1">
                <div class="imagens">
                  <div v-if="method == 'edit'">
                    <v-icon @click="removerImagem(image.id)">mdi-delete</v-icon>
                  </div>
                  <v-img
                    :src="`http://localhost:8000/${image.caminho_imagem_produto}`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
        <div v-if="method == 'create'">
          <v-file-input
            label="Imagens para o Produto"
            filled
            multiple
            prepend-icon="mdi-camera"
            v-model="imagens"
            @change="preview_images"
          ></v-file-input>

          <!--Preview Images-->
          <div class="d-flex justify-center">
            <v-row class="d-flex justify-center mb-16">
              <v-col
                v-for="(image, index) in imagePreview"
                :key="image.id"
                class="d-flex child-flex"
                cols="1"
              >
                <div class="imagens">
                  <v-icon @click="removerPreviewImage(index)">mdi-delete</v-icon>
                  <v-img :src="image" aspect-ratio="1" class="grey lighten-2">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </div>
              </v-col>
            </v-row>
          </div>
          <!--Preview Images-->

          <!-- <v-btn
            color="primary"
            @click="submit"
            class="mt-10"
            :loading="loading"
            :disabled="inputsDisabled"
          >
            Cadastrar Produto
          </v-btn>-->
          <v-btn
            @click="submit"
            :loading="loading"
            depressed
            class="wrapper gold mt-10"
          >Cadastrar Produto</v-btn>
        </div>
        <div v-if="method == 'edit'" class="d-flex justify-center">
          <!-- <v-btn
            color="primary"
            @click="submit"
            class="mx-10"
            :loading="loading"
          >
            Salvar Alterações
          </v-btn>
          <v-btn color="warning" @click="excluirProduto" class="mx-10">
            Excluir Produto
          </v-btn>-->
          <v-btn @click="submit" class="mx-10 wrapper gold" :loading="loading">Salvar Alterações</v-btn>
          <v-btn @click="excluirProduto" class="wrapper gold mx-10">Excluir Produto</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import SnackBarMessageComponent from "../utils/SnackBarMessageComponent.vue";
import submit from "../modules/produtos/submitProduct.js";
import getAllCategoryes from "../modules/produtos/getAllCategoryes.js";
import resetForm from "../modules/produtos/resetForm.js";
import getProductByID from "../modules/produtos/getProductByID.js";
import editarProduto from "../modules/produtos/editarProduto.js";
import excluirProduto from "../modules/produtos/excluirProduto.js";
import submit_product_images from "../modules/produtos/submit_product_images.js";
import removerImagem from "../modules/produtos/removerImagem.js";
import getImagesFromProduct from "../modules/produtos/getImagesFromProduct.js";
import pegausuario from "../modules/produtos/pegausuario.js";
import validations from "../modules/produtos/validations.js";
import useVuelidate from "@vuelidate/core";
import dialogCreateCategoriaComponent from "../components/dialogCreateCategoriaComponent.vue";
import useCurrencyInput from "vue-currency-input";
import VMoney from "v-money";

export default {
  directives: {
    money: VMoney,
  },
  components: {
    dialogCreateCategoriaComponent,
    SnackBarMessageComponent,
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options);
    return {
      v$: useVuelidate(),
      inputRef,
    };
  },
  data() {
    return {
      SnackBarOptions: {
        snackbar: false,
        snackbarMessage: "",
      },
      novas_imagens: [],
      imagePreview: [],
      dialog: false,
      select: [],
      nome_categorias: [],
      categorias: [],
      imagens: [],
      nova_categoria: "",
      money: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        masked: false /* doesn't work with directive */,
      },
      inputsDisabled: false,
      loading: false,
      colorSnackbar: "",
      colorSnackbarText: "black",
      error: "",
      id: null,
      nome: null,
      valor: "",
      descricao: "",
      sucessMessage: "",
      snackbar: false,
      multiLine: true,
      method: "create",
      id_categoria: 0,
    };
  },
  props: {
    options: Object,
  },
  created() {
    this.getAllCategoryes();
    if (this.$route.name == "produto/create") {
      //Em caso da rota ser Create, aparecer os inputs vazios
      this.method = "create";
    }
    this.id = this.$route.params.id;
    if (this.$route.name == "produto/read") {
      this.method = "read";
      this.getProductByID();
      this.inputsDisabled = true;
    }

    if (this.$route.name == "produto/edit") {
      this.method = "edit";
      this.getProductByID();
    }
  },
  methods: {
    preview_images(e) {
      for (let i = 0; i < e.length; i++) {
        let images = e[i];
        let reader = new FileReader();
        reader.readAsDataURL(images);
        reader.onload = (e) => {
          this.adiciona_fotos(e.target.result);
          return e;
        };
      }
      return e;
    },
    removerPreviewImage(image) {
      console.log(this.imagePreview);
      this.imagePreview.splice(image, 1);
      this.imagens.splice(image, 1);
      return image;
    },
    adiciona_fotos(event) {
      this.imagePreview.push(event);
    },
    ...submit,
    ...getAllCategoryes,
    ...resetForm,
    ...getProductByID,
    ...editarProduto,
    ...excluirProduto,
    ...submit_product_images,
    ...removerImagem,
    ...getImagesFromProduct,
    ...pegausuario,
  },
  ...validations,
};
</script>

<style>
.message {
  margin-top: 60px;
}

.moeda {
  padding: 10px;
  font-size: 1.2rem;
}

.valor {
  font-size: 1.2rem;
  color: white;
}
</style>
