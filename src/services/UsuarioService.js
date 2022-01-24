export default class UsuarioService {
  constructor ($http) {
    this.$http = $http
  }
  submit (usuario) {
    this.$http.post('api/perfil', usuario)
  }
  async edit_perfil_user ($user_id) {
    var get_user_data = await this.get_user_data($user_id)
    var get_perfil_user = await this.get_perfil_user($user_id)
    var perfil_user = get_perfil_user.data
    var user_data = get_user_data.data
    var edit_user = { user_data, perfil_user }
    return edit_user
  }
  async get_user_data ($user_id) {
    var $user_data = await this.$http(`api/user/${$user_id}`)
    return $user_data
  }
  async get_perfil_user ($user_id) {
    var $perfil_user = await this.$http(`api/perfil/${$user_id}`)
    return $perfil_user
  }
}
