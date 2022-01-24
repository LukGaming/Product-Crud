<template>
<div>
   
       
        <v-icon dark>
            mdi-plus
        </v-icon>

        <!--  -->
        <!--  -->
        <v-dialog v-model="dialog" width="700">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" dark fab small v-bind="attrs" v-on="on">
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2 d-flex justify-center">
                    Criando nova Categoria
                </v-card-title>

                <v-container>
                    <v-text-field label="Nome da Categoria" v-model="nova_categoria"></v-text-field>
                    <v-alert v-if="existe_categoria" border="bottom" color="pink darken-1" dark>Essa categoria já existe!</v-alert>
                </v-container>

                <v-spacer></v-spacer>
                <div class="d-flex justify-space-around">
                    <v-btn color="primary" class="my-6" @click="criar_categoria">
                        Criar
                    </v-btn>
                    <v-btn color="primary" class="my-6" text @click="dialog = false">
                        Cancelar
                    </v-btn>

                </div>

            </v-card>
        </v-dialog>

    </div>

</template>

<script>
import criar_categoria from '../modules/produtos/criarCategoria'
export default {
    props: {
        getAllCategoryes: Function,
        SnackBarOptions: Object,
        sucessMessage: String
    },
    data() {
        return {
            nova_categoria: "",
            existe_categoria: false,
            dialog: false
        }
    },
    methods: {
        ...criar_categoria
    },
    created() {
       
       
       
        
    },
}
</script>

<style lang="">

</style>
