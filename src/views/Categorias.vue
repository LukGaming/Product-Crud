<template>
  <div class="mt-16">
    <v-container>
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Categorias</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <div>
              <template>
                <router-link to="/categorias/create">
                  <v-btn color="primary" dark class="mb-2">
                    Criar nova Categoria
                  </v-btn>
                </router-link>
              </template>
            </div>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <router-link :to="`/categorias/${item.id_categoria}/edit`">
            <v-icon small class="mr-2"> mdi-pencil </v-icon>
          </router-link>
          <v-icon small @click="deleteItem(item.id_categoria)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:item.user_data="{ item }">
          <router-link :to="`/usuarios/${item.user_data.id}`">
            {{ item.user_data.name }}</router-link
          >
        </template>
      </v-data-table>
      <SnackBarMessageComponent :SnackBarOptions="SnackBarOptions" />
    </v-container>
  </div>
</template>

<script>
import SnackBarMessageComponent from "../utils/SnackBarMessageComponent.vue";
import getAllCategories from "../modules/categorias/getAllCategories";
import get_user_data from "../modules/user/get_user_data";
export default {
  components: {
    SnackBarMessageComponent,
  },
  data: () => ({
    SnackBarOptions: {
      snackbarMessage: "",
      snackbar: false,
    },

    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Id categoria",
        align: "start",
        sortable: true,
        value: "id_categoria",
      },
      {
        text: "Nome da Categoria",
        value: "nome_categoria",
      },
      {
        text: "Usuário Criador da Categoria",
        value: "user_data",
        sortable: false,
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
  methods: {
    close() {
      return;
    },
    formTitle() {
      return;
    },
    deleteItemConfirm() {
      return;
    },
    closeDelete() {},
    save() {},
    initialize() {},

    deleteItem(item) {
      this.$http.delete(`api/categorias/${item}`).then((res) => {
        this.SnackBarOptions.snackbar = true;
        this.SnackBarOptions.snackbarMessage = "Item Removido com sucesso!";
        this.getAllCategories();
        return res;
      });
    },
    ...get_user_data,
    ...getAllCategories,
  },
  created() {
    // if(!this.$session.exists()){
    //      this.$router.push('/login')
    //  }
    this.getAllCategories();
    if (this.$route.query.deleted) {
      this.SnackBarOptions.snackbar = true;
      this.SnackBarOptions.snackbarMessage = "Categoria excluida com sucesso!";
    }
  },
};
</script>

<style >
</style>
