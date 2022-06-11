<template>
  <div>
    <v-icon dark> mdi-plus </v-icon>
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-title>
          <span class="text-h5">Criando categoria</span>
        </v-card-title>
        <v-card-text>
          <CategoriaCrud />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="setDialogCreateCategory({ part: 'dialog', value: false })">
            Close
          </v-btn>
        </v-card-actions>
      </v-card></v-dialog
    >
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CategoriaCrud from "../views/CategoriaCrud.vue";
export default {
    computed: {
        ...mapGetters(["dialogCreateCategory"]),
        dialog: {
            get() {
                return this.dialogCreateCategory.dialog;
            },
            set(value) {
                this.setDialogCreateCategory({ part: "dialog", value: value });
            },
        },
    },
    methods: {
        ...mapActions(["setDialogCreateCategory"]),
    },
    components: { CategoriaCrud }
};
</script>

<style lang=""></style>
