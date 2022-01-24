<template>
  <div>
    <div class="d-flex align-center" style="min-height: 90vh">
      <v-container>
        <v-row no-gutters>
          <v-col
            align-self="center"
            class="borda-login container-color px-10 py-10 deep-purple"
            outlined
          >
            <div class="d-flex justify-center h2">
              <div class="font-weight-medium white--text">Página de Login</div>
            </div>
            <div class="inputs mt-4">
              <v-text-field
                label="Email"
                hide-details="auto"
                class="mt-4 text-light"
                v-model="usuario.email"
              ></v-text-field>
              <v-text-field label="Senha" type="password" class="mt-4" v-model="usuario.password"></v-text-field>
              <div v-if="v$.$errors.length > 0 || SenhaIncorreta">
                <v-alert border="left" color="red" type="error" dense>Usuário ou senha incorretos</v-alert>
              </div>
            </div>
            <div class="d-flex justify-space-around mt-4">
              <v-btn color="success" @click="logar" :loading="loading">Logar</v-btn>
              <router-link to="/register">
                <v-btn color="primary">Criar uma conta</v-btn>
              </router-link>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";

import login from "../modules/session/login";

import { required, minLength, email } from "@vuelidate/validators";
export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      usuario: {
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(8),
        },
      },
    };
  },
  data() {
    return {
      usuario: {
        email: "",
        password: "",
      },
      SenhaIncorreta: false,
      loading: false,
    };
  },

  created() {
    if (this.$session.exists()) {
      this.$router.push("/");
    }
  },
  methods: {
    ...login,
  },
};
</script>

<style>
/* .borda-login {
  margin-left: 30%;
  margin-right: 30%;
} */

.container-color {
  border-radius: 15px;
  border: #272727 5px solid;
}
.theme--light.v-label {
  color: white !important;
}
</style>
