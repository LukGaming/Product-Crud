export default {
  async submit () {
    console.log(this.valor)
    if (this.method == 'create') {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) {
        return
      } else {
        this.loading = true
        for (let i = 0; i < this.categorias.data.length; i++) {
          if (this.categorias.data[i].nome_categoria == this.select) {
            this.id_categoria = this.categorias.data[i].id
          }
        }
        var $produto = await this.$http.post('api/produtos', {
          nome: this.nome,
          valor: this.valor,
          descricao: this.descricao,
          user_id: localStorage.getItem('userId'),
          id_categoria: this.id_categoria
        })
        setTimeout(() => {
          this.v$.$reset()
          this.resetForm()
          this.loading = false
          this.SnackBarOptions.snackbarMessage = 'Produto Criado com sucesso'
          this.SnackBarOptions.snackbar = true
          this.select = ''
        }, 1000)

        this.id = $produto.data.produto.id
        this.submit_product_images()
      }
      return
    }
    if (this.method == 'edit') {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) {
        return
      } else {
        this.editarProduto()
      }
      return isFormCorrect
    }
  }
}
