export default{
    excluirProduto() {
        if (confirm("Deseja realmente excluir o produto " + this.id + " ?")) {
            this.$http.delete(`api/produtos/${this.id}`, ).then(res => {
                this.v$.$reset()
                this.colorSnackbar = "red"
                this.sucessMessage = "Produto Excluido com sucesso";
                this.colorSnackbarText = "light"
                this.snackbar = true
                this.resetForm()
                this.method = "create";
                return res
            })
        }
    }
}