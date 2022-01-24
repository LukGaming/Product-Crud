<template>
  <div>
    <div class="my-4">Usuário Criador da Categoria</div>
    <v-alert dense outlined class="py-4">
      <router-link :to="`/usuarios/${usuarioCriador.idUserCreatorOfCategoria}`">
        <div class="row">
          <v-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <div class="my-4 mx-4">
            {{ usuarioCriador.nameUserCreatorOfCategoria }}
          </div>
        </div>
      </router-link>
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    usuarioCriador: Object,
  },
};
</script>

<style >
</style>
