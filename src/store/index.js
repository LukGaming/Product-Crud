import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        dialogCreateCategory: {
            dialog: false
        },
        categories: [],
        snackBarOptions: {
            snackbar: false,
            snackbarMessage: 'Testando mensagem'
        }
    },
    getters: {
        dialogCreateCategory(state) {
            return state.dialogCreateCategory
        },
        categories(state) {
            return state.categories
        },
        snackBarOptions(state) {
            return state.snackBarOptions
        }
    },
    actions: {
        setDialogCreateCategory({ commit }, payload) {
            commit('setDialogCreateCategory' , payload)
        },
        setCategories({ commit }, payload) {
            commit('setCategories', payload)
        },
        setSnackBar({ commit }, payload) {
            commit('setSnackBar', payload)
        }
    },
    mutations: {
        setDialogCreateCategory(state,payload) {
            state.dialogCreateCategory[payload.part] = payload.value
        },
        setCategories(state, payload) {
            state.categories.push(payload)
        },
        setSnackBar(state, payload) {
            state.snackBarOptions[payload.part] = payload.value
        }
    }
})