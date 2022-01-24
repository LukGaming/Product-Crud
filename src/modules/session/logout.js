export default{
    logout(){
        this.$session.destroy()
        this.$router.push('/login')
    }
}