<template >
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Produtos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <template>
            <router-link to="/produtos/create">
              <v-btn elevation="2" color="primary" class="ml-4"
                >Novo Produto</v-btn
              >
            </router-link>
          </template>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h5"
                >Tem certeza que deseja deletar este Produto?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="warning darken-1"
                  text
                  v-on:click="deleteItemConfirm(editedItem.id)"
                  >Excluir</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.user_data="{ item }">
        <div class="d-flex justify-center">
          <router-link :to="`/usuarios/${item.user_data.id}`">
            {{ item.user_data.name }}
          </router-link>
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <router-link :to="{ path: `/produtos/${item.id}/edit` }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
        </router-link>

        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <div class="text-center">
      <v-snackbar v-model="snackbar" color="red" right top class="message">
        {{ messageSnackBar }}

        <template v-slot:action="{ attrs }">
          <v-btn color="light" text v-bind="attrs" @click="snackbar = false">
            Fechar
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import ProductService from "../services/ProductService";
import listaDeProdutos from "../modules/produtos/listaDeProdutos";
import get_user_data from "../modules/user/get_user_data";

export default {
  components: {},
  data: () => ({
    snackbar: false,
    messageSnackBar: "",
    produtos: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Id do Produto",
        align: "start",
        value: "id",
      },
      {
        text: "Nome",
        value: "nome",
      },
      {
        text: "valor",
        value: "valor",
      },
      {
        text: "Usuario criador do Produto",
        value: "user_data",
      },
      {
        text: "Ações",
        value: "actions",
        sortable: false,
      },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  async created() {
    // if (!this.$session.exists()) {
    //     this.$router.push('/login')
    // }
    this.initialize();
    // this.listaDeProdutos();
    var produtos = new ProductService(this.$http);
    this.desserts = await produtos.listProductsAndUsers()
    // this.produtos = await produtos.listAllProducts();

    // var $usuarios_criadores = [];
    // for (let i = 0; i < this.produtos.data.data.length; i++) {
    //   $usuarios_criadores.push(this.produtos.data.data[i].id_user_criador);
    //   this.desserts.push({
    //     id: this.produtos.data.data[i].id,
    //     user_data: "",
    //     ...this.produtos.data.data[i],
    //   });
    // }
    // for (let i = 0; i < $usuarios_criadores.length; i++) {
    //   let user_data = await produtos.listUser($usuarios_criadores[i]);
    //   this.desserts[i].user_data =  user_data.data
    // }
  },
  methods: {
    ...listaDeProdutos,
    ...get_user_data,
    initialize() {
      this.desserts = [];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm(id) {
      //Apagar Produto do banco de dados aqui!
      this.$http.delete(`api/produtos/${id}`).then((res) => {
        this.listaDeProdutos();
        return res;
      });
      this.snackbar = true;
      this.messageSnackBar = "Produto excluido com sucesso!";
      setInterval(() => {
        if (this.snackbar == true) {
          this.snackbar = false;
        }
      }, 5000);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style lang="">
</style>
