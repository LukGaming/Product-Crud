<template>
<div>
    <v-container>
        <ProductCrud />
    </v-container>
</div>
</template>

<script>
import ProductCrud from "../components/productCrud.vue";
export default {
    data() {
        return {
            method: "create",
        };
    },
    components: {
        ProductCrud,
    },
    created() {
        // if (!this.$session.exists()) {
        //     this.$router.push("/login");
        // }
    },
};
</script>
