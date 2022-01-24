import {
    required,
    maxLength,
    minLength,
    helpers

} from '@vuelidate/validators'
export default{
    validations() {
        return {
            nome: {
                required: helpers.withMessage("O campo de <strong>Nome</strong> não pode ficar vazio", required),
                minLength: minLength(3),
                maxLength: maxLength(100)
            },
            valor: {
                required
            },
            descricao: {
                required,
                minLength: minLength(20),
                maxLength: maxLength(2000)
            },
        };
    },
}