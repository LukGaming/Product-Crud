export default {
  criar_categoria () {
    this.$http
      .post(`api/categorias`, {
        nome_categoria: this.nova_categoria,
        user_id: localStorage.getItem('userId')
      })
      .then(res => {
        this.existe_categoria = false
        this.dialog = false
        this.SnackBarOptions.snackbarMessage = 'Categoria Criada com sucesso'
        this.SnackBarOptions.snackbar = true
        this.select = this.nova_categoria
        this.nova_categoria = ''
        this.getAllCategoryes()
        return res
      })
      .catch(error => {
        this.existe_categoria = true
        return error
      })
  }
}
