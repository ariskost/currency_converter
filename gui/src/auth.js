import Vue from 'vue';

export const authState = Vue.observable({
    isLoggedIn: !!localStorage.getItem('token'),
});

export const authActions = {
    login(token) {
        localStorage.setItem('token', token);
        authState.isLoggedIn = true;
    },
    logout() {
        localStorage.removeItem('token');
        authState.isLoggedIn = false;
    },
};
