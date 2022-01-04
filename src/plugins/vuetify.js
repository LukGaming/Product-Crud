import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);


const MY_ICONS = {
    'complete': '',
    'cancel': '',
    'close': '',
    'delete': '', // delete (e.g. v-chip close)
    'clear': '',
    'success': '',
    'info': '',
    'warning': '',
    'error': '',
    'prev': '',
    'next': '',
    'checkboxOn': '',
    'checkboxOff': '',
    'checkboxIndeterminate': '',
    'delimiter': '', // for carousel
    'sort': '',
    'expand': '',
    'menu': '',
    'subgroup': '',
    'dropdown': '',
    'radioOn': '',
    'radioOff': '',
    'edit': ''
  }
  export default new Vuetify({
    icons: MY_ICONS
});