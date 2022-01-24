<template>
  <div>
    <Appbar />
    
  </div>
</template>

<script>

import Appbar from "./components/AppBar.vue";
export default {
  name: "App",
  components: {
    Appbar,
    
  },
  data: () => ({
    drawer: false,
    group: false,
    routerlinks: [
      {
        nome: "Página inicial",
        icon: "home",
        Routerlink: "/",
      },
      {
        nome: "Produtos",
        icon: "mdi-view-dashboard",
        Routerlink: "/produtos",
      },
    ],
  }),
  created() {},
};
</script>

<style>






</style>
