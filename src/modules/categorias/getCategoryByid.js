
export default {
    async getCategoryByid() {
        var $categoria = await this.$http.get(`api/categorias/${this.id}`)
        this.nome_categoria = $categoria.data.nome_categoria
        var $user = await this.get_user_data($categoria.data.user_id)
        this.usuarioCriador.nameUserCreatorOfCategoria = $user.name
        this.usuarioCriador.idUserCreatorOfCategoria = $user.id
    }
}
