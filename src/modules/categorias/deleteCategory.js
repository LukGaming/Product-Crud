export default{
    deleteCategory() {
        this.$http.delete(`api/categorias/${this.id}`).then(res => {
            this.$router.push({
                path: '/categorias',
                query: {
                    deleted: 'true'
                }
            })
            return res
        })
    },
}