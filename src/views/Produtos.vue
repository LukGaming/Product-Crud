<template>
<div>
    
    <div>
        <v-container>
            <h1 class="d-flex justify-center">visualizando Produtos</h1>

            <ShowProducts />
        </v-container>
    </div>
</div>
</template>

<script>
import ShowProducts from '../components/ShowProducts.vue'

export default {

    components: {
        
        ShowProducts
    },
    data() {
        return {
            headers: [{

                    align: 'start',
                    sortable: false,
                    id: 'id',
                },
                {
                    text: 'Id do Produto',
                    value: 'id'
                },
                {
                    text: 'Nome',
                    value: 'nome'
                },
                {
                    text: 'Valor (R$)',
                    value: 'valor'
                },
                {
                    text: 'Ações',
                    value: 'Options'

                },
            ],
            desserts: [

            ],
        }
    },
    created() {

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
};
</script>
