<template>
<div class="mt-16">
    <v-container>
        <div class="d-flex justify-center">
            <h1 class="mb-2 mt-16">
                Criando uma nova Categoria
            </h1>
        </div>
        <v-snackbar v-model="snackbar" top right class="mt-16" color="success">
            {{messageSnackBar}}
            <template v-slot:action="{ attrs }">
                <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
                    <div> Fechar</div>
                </v-btn>
            </template>
        </v-snackbar>
        <v-form ref="form" centralized>

            <div v-if="method == 'edit' || method == 'show' " class="my-8">
                <CriadorCategoriaComponent :usuarioCriador="usuarioCriador" />
            </div>

            <v-text-field v-model="nome_categoria" label="Nome da Categoria" :disabled="inputsDisabled"></v-text-field>
            <div class="input-errors" v-if="v$.nome_categoria.$error ">
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
                <v-btn color="warning" @click="submit">
                    Cadastrar Categoria
                </v-btn>
            </div>
            <div v-if="method == 'edit'" class="d-flex justify-space-around row">
                <v-btn color="success" @click="submit">
                    Editar Categoria
                </v-btn>
                <v-btn color="warning" @click="deleteCategory">
                    Excluir Categoria
                </v-btn>
            </div>
        </v-form>
    </v-container>
</div>
</template>

<script>
import get_user_data from '../modules/user/get_user_data'
import useVuelidate from '@vuelidate/core'
/*Funções das categorias*/
import getCategoryByid from '../modules/categorias/getCategoryByid'
import submit from '../modules/categorias/submit'
import deleteCategory from '../modules/categorias/deleteCategory'
import validations from '../modules/categorias/validations'
/*Funções das categorias*/
import CriadorCategoriaComponent from '../components/CriadorCategoriaComponent.vue'

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
                idUserCreatorOfCategoria: 0
            }

        }
    },
    components: {
        CriadorCategoriaComponent
    },
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    created() {
        if (this.$route.name == "categoria/create") {
            this.method = "create"
        }
        if (this.$route.name == "categoria/edit") {
            this.method = "edit"
            this.id = this.$route.params.id
            this.getCategoryByid();
        }
        if (this.$route.name == "categoria/show") {
            this.method = "show"
            this.inputsDisabled = true
            this.id = this.$route.params.id
            this.getCategoryByid()
        }
    },
    methods: {
        ...get_user_data,
        ...getCategoryByid,
        ...submit,
        ...deleteCategory,
    },
    ...validations
}
</script>

<style>
[centralized] {
    margin-left: 15%;
    margin-right: 15%;
}
</style>
