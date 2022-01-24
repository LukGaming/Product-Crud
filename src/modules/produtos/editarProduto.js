export default{
    editarProduto() {
        this.loading = true;
        for(let i=0; i<this.categorias.data.length; i++){
            if(this.categorias.data[i].nome_categoria == this.select){
                this.nova_categoria = this.categorias.data[i].id
            }
        }
        this.$http.patch(`api/produtos/${this.id}`, {
            nome: this.nome,
            valor: this.valor,
            descricao: this.descricao,
            id_categoria: this.nova_categoria
        }).then(res => {
            this.v$.$reset()
            setTimeout(() => {
                this.SnackBarOptions.snackbar = true;
                 this.SnackBarOptions.snackbarMessage= "Produto Editado com sucesso";
                 this.loading = false;
            }, 1000);
            return res
        })
        this.submit_product_images();
    },
}