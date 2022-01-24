export default {
    async removerImagem($id) {
        var $removendo_imagem = await this.$http.delete(`api/imagens/produtos/${$id}`)
        this.getImagesFromProduct();
        this.SnackBarOptions.snackbar = true;
        this.SnackBarOptions.snackbarMessage = "Imagem removida com sucesso!";
        return $removendo_imagem
    }
}