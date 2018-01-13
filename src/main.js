/**
 * Created by gubaoer on 17/4/18.
 */

import Vue from 'vue'
import {
    Button,
    Select,
    Row,
    Col,
    Pagination,
    Table,
    TableColumn,
    Form,
    FormItem,
    Input,
    Dialog,
    Option,
    Upload,
    Rate,
} from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-default/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// more grace import third package !
import moment from 'moment'
import axios from 'axios'
import curvejs from 'curvejs'

import $ from 'jquery'

import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.js'

import '../static/neditor/neditor.config.js'
import '../static/neditor/neditor.all.js'
import '../static/neditor/lang/zh-cn/zh-cn.js'
import '../static/neditor/neditor.parse.js'



Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Object.defineProperty(Vue.prototype, '$axios', { value: axios });
Object.defineProperty(Vue.prototype, '$curvejs', { value: curvejs });

Vue.use(Button);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Dialog);
Vue.use(Option);
Vue.use(Upload);
Vue.use(Rate);

locale.use(lang);



// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    render: h => h(App)
});

