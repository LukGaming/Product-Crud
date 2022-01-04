<template lang="">
<div>
    <div class="d-flex column justify-center ">
        <h1 v-if="method == 'create'" class="mt-10">Criando um novo Produto</h1>
        <h1 v-if="method == 'edit'" class="mt-10">Editando Produto - {{id}}</h1>
        <h1 v-if="method == 'read'" class="mt-10">Visualizando Produto - {{id}}</h1>

    </div>
    <div>
        <!-- Snack bar é a mensagem depois que o produto for criado ou editado -->
        <v-snackbar v-model="snackbar" :multi-line="multiLine" :color="colorSnackbar" top right class="message">
            {{sucessMessage}}

            <template v-slot:action="{ attrs }">
                <v-btn :color="colorSnackbarText" text v-bind="attrs" @click="snackbar = false">
                    fechar
                </v-btn>
            </template>
        </v-snackbar>

        <v-form ref="form" lazy-validation class="mx-16">
            <v-text-field v-model="nome" label="Nome" :readonly="inputsDisabled">
            </v-text-field>
            <div v-if="v$.nome.$error">
                <v-alert color="red" type="warning" dense>
                    O campo de <strong>Nome</strong> deve conter entre 3 e 50 caracteres
                </v-alert>
            </div>

            <v-text-field v-model="valor" label="Valor" type="number" prefix="R$" :readonly="inputsDisabled"></v-text-field>

            <div v-if="v$.valor.$error">
                <v-alert color="red" type="warning" dense>Campo de <strong>Valor</strong> não pode ficar vazio</v-alert>
            </div>
            <v-textarea v-model="descricao" label="Descricao" :readonly="inputsDisabled"></v-textarea>
            <div v-if="v$.descricao.$error">
                <v-alert color="red" type="warning" dense>Campo de <strong>Descricao</strong> deve conter entre 20 e 2000 Caracteres</v-alert>
            </div>
            <div v-if="method == 'create'">
                <v-btn color="primary" @click="submit" class="mt-10" :loading="loading" :disabled="inputsDisabled">
                    Cadastrar Produto
                </v-btn>
            </div>
            <div v-if="method == 'edit'" class="d-flex justify-center">
                <v-btn color="primary" @click="submit" class="mx-10" :loading="loading">
                    Salvar Alterações
                </v-btn>
                <v-btn color="warning" @click="excluirProduto" class="mx-10">
                    Excluir Produto
                </v-btn>
            </div>

        </v-form>
    </div>
</div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {
    useCurrencyInput
} from 'vue-currency-input'
import {
    required,
    maxLength,
    minLength,
    helpers,
    numeric
} from '@vuelidate/validators'
export default {

    setup(props) {
        const {
            inputRef
        } = useCurrencyInput(props.options)
        return {
            v$: useVuelidate(),
            inputRef
        };
    },
    data() {
        return {
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
            method: "create"
        };
    },
    props: {

        options: Object
    },
    created() {
        console.log(this.$route.name)
        if (this.$route.name == "produto/create") {
            //Em caso da rota ser Create, aparecer os inputs vazios
            this.method = "create";

        }

        this.id = this.$route.params.id;
        if (this.$route.name == "produto/read") {
            this.method = "read";
            this.getProductByID();
            this.inputsDisabled = true
        }

        if (this.$route.name == "produto/edit") {
            this.method = "edit";
            this.getProductByID();
        }
    },
    methods: {
        async submit() {
            if (this.method == "create") {
                const isFormCorrect = await this.v$.$validate()
                if (!isFormCorrect) {
                    return
                } else {
                    this.loading = true
                    this.$http.post('produtos', {
                        id: null,
                        nome: this.nome,
                        valor: this.valor,
                        descricao: this.descricao
                    }).then(res => {
                        setTimeout(() => {
                            this.v$.$reset()
                            this.resetForm();
                            this.loading = false
                            this.colorSnackbar = "success",
                                this.colorSnackbarText = "black"
                            this.sucessMessage = "Produto Criado com sucesso";
                            this.snackbar = true
                        }, 1000);

                        return res
                    })
                }
                return;
            }
            if (this.method == "edit") {
                const isFormCorrect = await this.v$.$validate()
                if (!isFormCorrect) {
                    return
                } else {
                    this.editarProduto()
                }
                return isFormCorrect;
            }
        },
        getProductByID() {
            this.$http.get(`produtos/${this.id}`, {}).then(res => {
                this.nome = res.data.nome;
                this.valor = res.data.valor,
                    this.descricao = res.data.descricao
            })
        },
        beforeRouteLeave(to, from, next) {
            alert("Ok")
            console.log(to)
            console.log(from)
            console.log(next)
        },
        resetForm() {
            this.id = null;
            this.nome = ""
            this.valor = ""
            this.descricao = ""
        },
        editarProduto() {
            this.loading = true;
            this.$http.patch(`produtos/${this.id}`, {
                nome: this.nome,
                valor: this.valor,
                descricao: this.descricao
            }).then(res => {
                this.v$.$reset()
                this.sucessMessage = "Produto Editado com sucesso";
                setTimeout(() => {
                    this.snackbar = true
                    this.loading = false;
                }, 1000);

                return res
            })
        },
        excluirProduto() {
            if (confirm("Deseja realmente excluir o produto " + this.id + " ?")) {
                this.$http.delete(`produtos/${this.id}`, {}).then(res => {
                    this.v$.$reset()
                    this.colorSnackbar = "red"
                    this.sucessMessage = "Produto Excluido com sucesso";
                    this.colorSnackbarText = "light"
                    this.snackbar = true
                    this.resetForm()
                    this.method = "create";
                    return res
                })
            }

        }
    },
    validations() {
        return {
            nome: {
                required: helpers.withMessage("O campo de <strong>Nome</strong> não pode ficar vazio", required),
                minLength: minLength(3),
                maxLength: maxLength(100)

            },
            valor: {
                required,
                numeric
            },
            descricao: {
                required,
                minLength: minLength(20),
                maxLength: maxLength(2000)
            },
        };
    },
};
</script>

<style>
.message {
    margin-top: 60px;
}
</style>
