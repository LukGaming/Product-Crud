import {
    required,
    minLength,
    maxLength
} from '@vuelidate/validators'
export default{
    validations() {
        return {
            nome_categoria: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(20),
            }
        }
    }
}