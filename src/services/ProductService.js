export default class ProductService {
    constructor($http) {
        this.$http = $http
        this.apiUrl = ('api/produtos/');
    }
    listAllProducts() {
        return this.$http.get(this.apiUrl)
    }
    listUser($user_id) {
        return this.$http.get(`api/user/${$user_id}`)
    }
    async listProductsAndUsers() {
        var $produtos = await this.listAllProducts();
        var users = []
        for (let i = 0; i < $produtos.data.data.length; i++) {
           let $usuario = await this.listUser($produtos.data.data[i].id_user_criador);
           users.push($usuario.data);
        }
        var desserts = [];
        for(let i=0; i<$produtos.data.data.length; i++){
            desserts.push({
                id: $produtos.data.data[i].id,
                user_data: users[i],
                ...$produtos.data.data[i],
            })
        }
        return desserts
    }
}