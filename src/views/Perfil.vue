<template>
    <div>
        <v-container>
            <div class="mt-10 d-flex justify-center display-1">Preenchimento de Perfil de Usuário</div>
            <div class="mt-16 mx-16">
                <v-text-field v-model="name" label="Nome Completo"></v-text-field>
                <div v-if="v$.name.$error">
                    <v-alert color="red" type="warning" dense>
                        Campo de
                        <strong>Nome</strong> Não pode ficar vazio
                    </v-alert>
                </div>

                <!--Componente de Data -->
                <div>
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                label="Data de nascimento"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            :active-picker.sync="activePicker"
                            locale="pt-br"
                            :max="
                                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                                    .toISOString()
                                    .substr(0, 10)
                            "
                            min="1950-01-01"
                            @change="save"
                        ></v-date-picker>
                    </v-menu>
                </div>
                <div v-if="v$.date.$error">
                    <v-alert color="red" type="warning" dense>
                        Campo de
                        <strong>Data</strong> Não pode ficar vazio
                    </v-alert>
                </div>

                <v-row v-if="imagem_antiga" class="d-flex justify-center mt-5">
                    <v-col cols="2">
                        <div class="imagem_edit">
                            <v-img :src="imagem_antiga" aspect-ratio="1" class="grey lighten-2">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                            <div class="containerBtn">
                                <v-btn
                                    class="mx-2 btnEdit"
                                    fab
                                    dark
                                    x-small
                                    color="cyan"
                                    @click="editarImagemPerfil"
                                >
                                    <v-icon dark>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn class="mx-2 btnEdit" fab dark x-small color="red">
                                    <v-icon dark>mdi-delete</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <!--Componente de Data -->
                <!-- <div v-if="nova_imagem || method == 'created'"> -->
                <v-row class="d-flex justify-center mt-5">
                    <v-col cols="6">
                        <vue-anka-cropper
                            @cropper-saved="ImagemEditada"
                            @cropper-error="erroSelectImage"
                            @cropper-file-selected="cropperFileSelected"
                            :options="{
                                selectButtonLabel: 'Selecionar Imagem',
                                dropareaMessage: 'Escolha uma foto para seu perfil',
                                maxFileSize: 1000000,
                            }"
                        ></vue-anka-cropper>
                    </v-col>
                </v-row>
                <!-- </div> -->
                <div v-if="erro_imagem">
                    <v-alert
                        type="info"
                        class="mt-4"
                        border="right"
                        color="pink"
                        dark
                    >A imagem deve obter no máximo 1 mb</v-alert>
                </div>
            </div>
            <!-- <img :src="cropperImgAfterEdit" alt="" /> -->
            <v-row v-if="cropperImgAfterEdit" class="d-flex justify-center mt-5">
                <v-col cols="2">
                    <v-img :src="cropperImgAfterEdit" aspect-ratio="1" class="grey lighten-2">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>
            </v-row>
            <div class="d-flex justify-center mt-4">
                <v-btn depressed color="primary" @click="submit">Salvar</v-btn>
            </div>
        </v-container>
    </div>
</template>

<script>
import vueAnkaCropper from "vue-anka-cropper";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import UsuarioService from "../services/UsuarioService";
export default {
    created() {
        if (this.$route.name == "perfil/create") {
            this.method = "create"
        }
        if (this.$route.name == "perfil/edit") {
            this.method = "edit"
        }
        if (this.method == "edit") {
            this.get_user_data();
        }

    },
    data() {
        return {
            name: "",
            activePicker: null,
            date: null,
            menu: false,
            cropperImgAfterEdit: "",
            erro_imagem: false,
            method: "create",
            user_data: [],
            nova_imagem: false,
            imagem_antiga: ""
        };
    },
    components: {
        vueAnkaCropper,
    },

    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = "YEAR"));
        },
    },
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    methods: {
        async get_user_data() {
            var $usuario = new UsuarioService(this.$http);
            var $user_data = await $usuario.edit_perfil_user(localStorage.getItem('userId'))
            var user = $user_data.user_data;
            var perfil_user = $user_data.perfil_user.perfil_usuario
            this.name = user.name
            this.date = perfil_user.birth_date
            this.imagem_antiga = `http://localhost:8000/` + perfil_user.caminho_imagem_perfil
        },
        editarImagemPerfil() {
            console.log("Editando imagem")
        },
        save(date) {
            this.$refs.menu.save(date);
        },
        ImagemEditada(event) {
            this.cropperImgAfterEdit = event.croppedImageURI;
        },
        erroSelectImage(event) {
            this.erro_imagem = true;
            return event;
        },
        cropperFileSelected() {
            this.erro_imagem = false;
        },
        async submit() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) {
                return isFormCorrect
            } else {
                var $usuario = {
                    user_id: localStorage.getItem('userId'),
                    image: this.cropperImgAfterEdit,
                    name: this.name,
                    birth_date: this.date
                }
                var Usuario = new UsuarioService(this.$http);
                Usuario.submit($usuario);
            }
        },

    },
    validations() {
        return {
            name: { required },
            date: { required }
        }
    }
};
</script>

<style>
.imagem_edit {
    display: flex;
}
.containerBtn {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
}
.imagem_edit {
    position: relative;
}
.btnEdit {
    margin: 5px;
}
</style>
