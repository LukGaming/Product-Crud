export default {
    getAllCategoryes() {
        console.log("carregando novas categorias")
        this.$http.get(`api/categorias`).then(res => {
            for (let i = 0; i < res.data.data.length; i++) {
                this.nome_categorias.push(res.data.data[i].nome_categoria)
            }
            this.categorias = res.data
        })
    }
}