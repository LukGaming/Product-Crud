<template>
<div>
    <div class="d-flex align-center " style="min-height: 90vh">
        <v-container>
            <v-row no-gutters>
                <v-col align-self="center" class="borda-login container-color  px-10 py-10" outlined color="purple">
                    <div class="d-flex justify-center h2">
                        <div class="font-weight-medium">Página de Login</div>
                    </div>
                    <div class="inputs mt-4">
                        <v-text-field label="Email" hide-details="auto" class="mt-4" v-model="email"></v-text-field>
                        <v-text-field label="Senha" type="password" class="mt-4" v-model="senha"></v-text-field>
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
import useVuelidate from '@vuelidate/core'
import {
    required,
    minLength,
    email
} from '@vuelidate/validators'
export default {
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    validations() {
        return {
            email: {
                required,
                email
            },
            senha: {
                required,
                minLength: minLength(8)
            }
        }
    },
    data() {
        return {
            email: "",
            senha: "",
            SenhaIncorreta: false,
            loading: false
        }
    },

    created() {

    },
    methods: {
        async logar() {
            this.loading = true
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) {
                setInterval(() => {
                    this.loading = false
                    return
                }, 1000);

            }
            setInterval(() => {
                this.$http(`/usuarios/?email=${this.email}`).then(res => {
                    if (res.data) {
                        if (this.senha == res.data[0].senha) {
                            this.$session.start()
                            this.$session.set(
                                'userId', res.data[0].id,
                            )
                            this.$session.set(
                                'nome', res.data[0].nome,
                            )
                            this.$session.set(
                                'email', res.data[0].email,
                            )
                            this.loading = false
                            this.$router.push('produtos')
                        } else {
                            this.SenhaIncorreta = true
                            setInterval(() => {
                                this.loading = false
                                
                            }, 1000);
                        }

                    }

                })
            }, 1000);

        }
    },
}
</script>

<style>
.borda-login {
    margin-left: 30%;
    margin-right: 30%;

}

.container-color {

    border-radius: 15px;
    border: #272727 5px solid;
    background-color: #76FF03;
}
</style>
