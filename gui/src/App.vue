<template>
    <div id="app">
        <nav v-if="authState.isLoggedIn">
            <a href="/" @click.prevent="logout">
                <font-awesome-icon icon="sign-out-alt" /> Logout
            </a>
            <router-link to="/convert">Currency Calculator</router-link>
        </nav>
        <router-view />
    </div>
</template>

<script>
import { authState, authActions } from './auth';

export default {
    name: "App",
    computed: {
        authState() {
            return authState; // Global Reactive State
        }
    },
    methods: {
        logout() {
            authActions.logout(); // Update global state
            this.$router.push('/');
        }
    }
};
</script>


<style scoped>
#app {
    font-family: Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
}
nav {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    align-content: center;
    gap: 10px;
    margin-bottom: 20px;
}
nav a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    background: #888;
    padding: 10px;
    border-radius: 5px;
    transition:all .3s;
}
nav a:hover {
    background: #444;
}
</style>
