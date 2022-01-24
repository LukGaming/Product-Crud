<template lang="">
<div>
    <div class="d-flex align-center " style="min-height: 90vh">
        <v-container >
            <v-row no-gutters >
                <v-col align-self="center" class="deep-purple borda-login container-color  px-10 py-10" outlined color="purple">
                    <div class="d-flex justify-center h2">
                        <div class="font-weight-medium white--text">Página de Cadastro de usuário</div>
                    </div>
                    <div class="inputs mt-4">
                        <v-text-field label="Nome Completo" hide-details="auto" class="mt-4" v-model="usuario.name"></v-text-field>
                        <div v-if="v$.usuario.name.$error">
                            <v-alert border="left" color="red" type="error" dense>O nome deve conter entre 5 e 50 Caracteres</v-alert>
                        </div>
                        <v-text-field label="Email" hide-details="auto" class="mt-4" v-model="usuario.email"></v-text-field>
                        <div v-if="v$.usuario.email.$error">
                            <v-alert border="left" color="red" type="error" dense>Email invalido</v-alert>
                        </div>
                        <div v-if="email_existe == true">
                            <v-alert border="left" color="red" type="error" dense>Este Email já está sendo utilizado</v-alert>
                        </div>
                        <v-text-field label="Senha" type="password" class="mt-4" v-model="usuario.password"></v-text-field>
                        <div v-if="v$.usuario.password.$error">
                            <v-alert border="left" color="red" type="error" dense>A senha deve obter entre 8 e 16 caractéres</v-alert>
                        </div>
                        <v-text-field label="Confirmar senha" type="password" class="mt-4" v-model="usuario.senhaConfirm"></v-text-field>
                        <div v-if="ConfirmPassword">
                            <v-alert border="left" color="red" type="error" dense>As senhas não confirmam</v-alert>
                        </div>
                    </div>
                    <div class="d-flex justify-space-around mt-4">
                        <v-btn color="success" @click="cadastrar" :loading="loading">Logar</v-btn>
                        <router-link to="/login">
                            <v-btn color="primary">Já possui Conta? Logar</v-btn>
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
import { required, maxLength, minLength, email } from "@vuelidate/validators";
export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      usuario: {
        name: "",
        email: "",
        password: "",
        senhaConfirm: "",
      },
      loading: false,
      email_existe: false,
      ConfirmPassword: false,
    };
  },
  created() {
    if (this.$session.exists()) {
      this.$router.push("/");
    }
  },
  methods: {
    async cadastrar() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return isFormCorrect;
      } else {
        if (this.usuario.password == this.usuario.senhaConfirm) {
          this.ConfirmPassword = false;
          this.$http
            .post(`/api/register`, {
              name: this.usuario.name,
              email: this.usuario.email,
              password: this.usuario.password,
            })
            .then((res) => {
              this.email_existe = false;
              this.$http
                .post("/api/login", {
                  email: this.usuario.email,
                  password: this.usuario.password,
                })
                .then((res) => {
                  localStorage.setItem("userToken", res.data.token);
                  localStorage.setItem("userId", res.data.user.id);
                  localStorage.setItem("email", res.data.user.email);
                  localStorage.setItem("name", res.data.user.name);
                  this.$router.push({
                    path: "/",
                    query: {
                      register: "true",
                    },
                  });
                });

              return res;
            })
            .catch((error) => {
              this.email_existe = true;
              return error;
            });
        } else {
          this.ConfirmPassword = true;
        }
      }
    },
  },
  validations() {
    return {
      usuario: {
        name: {
          required,
          maxLength: maxLength(50),
          minLengt: minLength(5),
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          maxLength: maxLength(16),
          minLengt: minLength(8),
        },
      },
    };
  },
};
</script>

<style>
.theme--light.v-label {
  color: white !important;
}
</style>
