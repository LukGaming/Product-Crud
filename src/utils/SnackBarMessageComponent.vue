<template>
  <div>
    <v-snackbar v-model="snackbar" top right class="mt-16" color="success">
      {{ snackBarOptions.snackbarMessage }}
      <template>
        <v-btn
          color="primary"
          text
          @click="setSnackBar({ part: 'snackbar', value: false })"
        >
          <div>Fechar</div>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["setSnackBar"]),
  },
  computed: {
    ...mapGetters(["snackBarOptions"]),
    snackbar: {
      get() {
        return this.snackBarOptions.snackbar;
      },
      set(value) {
        this.setSnackBar({ part: "snackbar", value: value });
      },
    },
  },
};
</script>

<style></style>
