<template>
  <div>
    <ProductCrud />
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
  created() {},
};
</script>
