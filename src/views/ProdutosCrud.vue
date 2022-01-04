<template>
<div>

    <v-container>
        
            <ProductCrud />
       
    </v-container>
</div>
</template>

<script>
import ProductCrud from '../components/productCrud.vue'
export default {
    data() {
        return {
            method: "create",
        };
    },
    components: {
        ProductCrud
    },
    created() {

    },
};
</script>
