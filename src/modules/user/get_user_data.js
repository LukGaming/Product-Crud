export default {
     get_user_data($user_id) {
        return this.$http.get(`api/user/${$user_id}`)
    }
}