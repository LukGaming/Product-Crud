<template lang="">
<div>
    
        
        <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Produtos</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <template>
                        <router-link to="/produtos/create">
                            <v-btn elevation="2" color="primary" class="ml-4">Novo Produto</v-btn>
                        </router-link>
                    </template>

                    <v-dialog v-model="dialogDelete" max-width="600px">
                        <v-card>
                            <v-card-title class="text-h5">Tem certeza que deseja deletar este Produto?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                                <v-btn color="warning darken-1" text v-on:click="deleteItemConfirm(editedItem.id)">Excluir</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <router-link :to="{ path: `/produtos/${item.id}/edit` }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                </router-link>

                <v-icon small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>
        </v-data-table>
        <div class="text-center">

            <v-snackbar v-model="snackbar" color="red" right top class="message">
                {{messageSnackBar}}

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

export default {
    components: {
        
    },
    data: () => ({
        snackbar: false,
        messageSnackBar: "",
        dialog: false,
        dialogDelete: false,
        headers: [{
                text: 'Id do Produto',
                align: 'start',
                sortable: true,
                value: 'id',
            },
            {
                text: 'Nome',
                value: 'nome'
            },
            {
                text: 'valor',
                value: 'valor'
            },

            {
                text: 'Ações',
                value: 'actions',
                sortable: false
            },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
    created() {
        console.log(this.$router.params)
        this.initialize()

        this.listaDeProdutos()

    },

    methods: {
        listaDeProdutos() {
            this.desserts = []
            this.$http("produtos").then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    this.desserts.push({
                        id: res.data[i].id,
                        ...res.data[i],
                    })

                }
                return res
            });
        },
        initialize() {
            this.desserts = [{
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                },

            ]
        },

        editItem(item) {
            

            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {

            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm(id) {
            console.log(id)
            //Apagar Produto do banco de dados aqui!
            this.$http.delete(`produtos/${id}`).then(res => {
                console.log("Produto deletado!")
                this.listaDeProdutos()
                return res
            })
            this.snackbar = true
            this.messageSnackBar = "Produto excluido com sucesso!"
            setInterval(() => {
                if (this.snackbar == true) {
                    this.snackbar = false
                }
            }, 5000);
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>

<style lang="">

</style>
