export default {
    async submit_product_images() {

        if(this.method == 'edit'){
            let imagens_enviadas = [];
            for (let i = 0; i < this.novas_imagens.length; i++) {
                let formData = new FormData();
                formData.append('fotos', this.novas_imagens[i])
                formData.append('id_produto', this.id)
                let $imagem_enviada = await this.$http.post('api/files', formData);
                imagens_enviadas.push($imagem_enviada.data)
            }
            this.getImagesFromProduct();
            this.novas_imagens = []
        }
        if(this.method == 'create'){
            let imagens_enviadas = [];
            console.log(this.imagens)
            for (let i = 0; i < this.imagens.length; i++) {
                let formData = new FormData();
                formData.append('fotos', this.imagens[i])
                formData.append('id_produto', this.id)
                let $imagem_enviada = await this.$http.post('api/files', formData);
                imagens_enviadas.push($imagem_enviada.data)
            }
            this.getImagesFromProduct();
        }
       
    }

}