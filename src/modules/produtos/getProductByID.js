export default {
    async getProductByID() {
        var $produto = await this.$http.get(`api/produtos/${this.id}`)
        this.nome = $produto.data.nome;
        this.valor = $produto.data.valor;
        this.descricao = $produto.data.descricao
        var $categoria = await this.$http.get(`api/categorias/${$produto.data.id_categoria}`)
        this.select =  $categoria.data.nome_categoria
        this.getImagesFromProduct();
        return;
    },
}