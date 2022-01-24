export default {
  async logar () {
    this.loading = true
    const isFormCorrect = await this.v$.$validate()
    if (!isFormCorrect) {
      setInterval(() => {
        this.loading = false
        return
      }, 1000)
    }
    this.$http
      .post(`/api/login`, {
        email: this.usuario.email,
        password: this.usuario.password
      })
      .then(res => {
        localStorage.setItem('userToken', res.data.token)
        localStorage.setItem('userId'),
          localStorage.setItem('email', res.data.user.email)
        localStorage.setItem('name', res.data.user.name)
        this.loading = false
        this.$router.push({ path: '/', query: { loginSucess: 'true' } })
        return res
      })
      .catch(error => {
        this.loading = false
        this.SenhaIncorreta = true
        return error
      })
  }
}
