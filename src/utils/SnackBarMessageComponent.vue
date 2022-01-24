<template>
<div>
    <v-snackbar v-model="SnackBarOptions.snackbar" top right class="mt-16" color="success">
        {{SnackBarOptions.snackbarMessage}}
        <template>
            <v-btn color="primary" text @click="SnackBarOptions.snackbar = false">
                <div> Fechar</div>
            </v-btn>
        </template>
    </v-snackbar>
</div>
</template>

<script>
export default {
    props: {
      SnackBarOptions: Object
    },

    created() {
       
    },
}
</script>

<style >

</style>
