export default {
  async submit () {
    const isFormCorrect = await this.v$.$validate()
    if (!isFormCorrect) {
      return isFormCorrect
    } else {
      if (this.method == 'create') {
        this.$http
          .post(`api/categorias`, {
            nome_categoria: this.nome_categoria,
            user_id: localStorage.getItem('userId')
          })
          .then(res => {
            this.categoriaExists = false
            this.v$.$reset()
            this.snackbar = true
            this.messageSnackBar = 'Categoria Criada com sucesso!'
            this.nome_categoria = ''
            return res
          })
          .catch(error => {
            this.categoriaExists = true
            return error
          })
      }
      if (this.method == 'edit') {
        this.$http.get(`api/categorias/${this.id}`).then(res => {
          if (res.data.length > 0) {
            this.categoriaExists = true
          } else {
            this.categoriaExists = false
            this.$http
              .patch(`api/categorias/${this.id}`, {
                nome_categoria: this.nome_categoria
              })
              .then(res => {
                this.snackbar = true
                this.messageSnackBar = 'Categoria editada com sucesso!'
                return res
              })
          }
        })
      }
    }
  }
}
