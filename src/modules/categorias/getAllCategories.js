export default {
    async getAllCategories() {
        this.desserts = [];
        var $categorias = await this.$http("api/categorias")
        var $criador_usuarios = [];
        for (let i = 0; i < $categorias.data.data.length; i++) {
            $criador_usuarios.push($categorias.data.data[i].user_id)
            this.desserts.push({
                id_categoria: $categorias.data.data[i].id,
                nome_categoria: $categorias.data.data[i].nome_categoria,
                criador_categoria: $categorias.data.data[i].user_id,
                user_data: []
            })
        }
        var $user_data = [];
        for (let i = 0; i < $criador_usuarios.length; i++) {
            let $user = await this.get_user_data($criador_usuarios[i])
            $user_data.push($user)
        }
        for (let i = 0; i < this.desserts.length; i++) {
            this.desserts[i].user_data = $user_data[i]
        }
    },
}