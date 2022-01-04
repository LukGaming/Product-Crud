<template lang="">
<div>
    <v-app App>
        <v-main>

            <v-card class="mx-auto overflow-hidden" style="min-height: 100vh;" absolute>
                <div v-if="menuIsValid">
                    <v-app-bar color="deep-purple" dark fixed>
                        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

                        <v-toolbar-title>Title</v-toolbar-title>
                    </v-app-bar>
                    <v-navigation-drawer v-model="drawer" fixed temporary>
                        <v-list>
                            <v-list-item class="px-2 d-flex justify-center">
                                <v-list-item-avatar>
                                    <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="text-h6 d-flex justify-center">
                                        Sandra Adams
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="d-flex justify-center">sandra_a88@gmail.com</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                        </v-list>
                        <v-divider></v-divider>
                        <v-list nav dense>
                            <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                                <div v-for="(routerLink, index) in routerlinks" :key="index">
                                    <router-link :to="routerLink.Routerlink" style="text-decoration: none; color: inherit;" exact>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon>mdi-{{routerLink.icon}}</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-title>{{routerLink.nome}}</v-list-item-title>
                                        </v-list-item>
                                    </router-link>
                                </div>
                            </v-list-item-group>
                        </v-list>
                        <template v-slot:append>
                            <div class="pa-2 d-flex justify-center ">
                                <v-btn color="black" class="white--text" block>
                                    Logout
                                </v-btn>
                            </div>
                        </template>

                    </v-navigation-drawer>
                </div>
                <transition appear enter-active-class="animate__animated animate__bounceInLeft animate__faster" leave-active-class="animate__animated animate__bounceOutRight animate__faster" mode="out-in">
                    <router-view class="mt-4">
                    </router-view>
                </transition>

            </v-card>

        </v-main>
    </v-app>
</div>
</template>

<script>
export default {
    data: () => ({
        drawer: false,
        group: false,
        menuIsValid: true,

        routerlinks: [{
                nome: "Página inicial",
                icon: "home",
                Routerlink: "/"
            },
            {
                nome: "Produtos",
                icon: "view-dashboard",
                Routerlink: "/produtos"
            }
        ]

    }),
    created() {
        if (this.$route.name == 'login' || this.$route.name == 'register') {
            this.menuIsValid = false

        }
    },
}
</script>

<style lang="">

</style>
