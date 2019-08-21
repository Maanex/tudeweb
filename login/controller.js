
/*Vue.component('cbox', {
    props: [ ],
    template: '#t-cbox'
});*/


var app;
app = new Vue({
    el: '#app',
    data: {
        page: 'login',

        darktheme: window.getCookie('darktheme', true),

        login: {
            email: '',
            password: '',
            tfa: false,
            tfacode: ''
        },
        register: {
            username: '',
            email: '',
            agbs: false
        }
    },
    methods: {
        proceedLogin() {
            var validEmail = validateEmail(app.login.email);
            var validPassword = validatePassword(app.login.password);

            if (!validEmail) document.getElementById('login-email').classList.add('error');
            if (!validPassword) document.getElementById('login-password').classList.add('error');

            if (validEmail && validPassword) {
                alert("login server is unavailable")
            }
        },
        proceedTfa() {
            
        },
        proceedRegister() {
            var validEmail = validateEmail(app.login.email);
            var validPassword = validatePassword(app.login.password);

            if (!validEmail) document.getElementById('login-email').classList.add('error');
            if (!validPassword) document.getElementById('login-password').classList.add('error');

            if (validEmail && validPassword) {
                alert("login server is unavailable")
            }
        }
    },
    watch: {
        darktheme(val) {
            window.setCookie('darktheme', val, 1000*60*60*24*365);
        },
        page(val) {
            document.getElementById('formheader').classList.add('switch');
            setTimeout(() => document.getElementById('formheader').classList.remove('switch'), 10);
        }
    }
});


var validateEmail = (email) => email.match(/^.+@.+\..+$/);
var validatePassword = (password) => password.match(/^.{6,20}$/);
var validateUsername = (username) => username.match(/^[A-Za-z0-9_-]{4,16}$/);