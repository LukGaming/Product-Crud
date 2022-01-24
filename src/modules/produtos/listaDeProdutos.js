export default {
  async listaDeProdutos () {
    this.desserts = []
    var $produtos = await this.$http('api/produtos')
    console.log($produtos)
    var $usuarios_criadores = []
    for (let i = 0; i < $produtos.data.data.length; i++) {
      $usuarios_criadores.push($produtos.data.data[i].id_user_criador)
      this.desserts.push({
        id: $produtos.data.data[i].id,
        user_data: '',
        ...$produtos.data.data[i]
      })
    }
    var $user_data = []
    //    var  $usuarios = this.pegausuario($usuarios_criadores);
    // console.log($usuarios)
    for (let i = 0; i < $usuarios_criadores.length; i++) {
      $user_data.push(this.get_user_data($usuarios_criadores[i]))
    }

    for (let i = 0; i < $usuarios_criadores.length; i++) {
      this.desserts[i].user_data = $user_data[i]
    }
  }
}
