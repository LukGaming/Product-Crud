export default {
  async submit () {
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
        console.log(this.imagens)
        var formData = new FormData()
        this.imagens.forEach((image) => {
          formData.append('images[]', image)
        })
        formData.append('nome', this.nome)
        formData.append('valor', this.valor)
        formData.append('descricao', this.descricao)
        formData.append('user_id', localStorage.getItem('userId'))
        formData.append('id_categoria', this.id_categoria)
        this.$http.post('api/produtos', formData).then(res => {
          this.v$.$reset()
          this.resetForm()
          this.loading = false
          this.SnackBarOptions.snackbarMessage = 'Produto Criado com sucesso'
          this.SnackBarOptions.snackbar = true
          this.select = ''
          return res
        })
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
