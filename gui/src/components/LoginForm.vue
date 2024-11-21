<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login" class="login-form">
            <input v-model="username" type="text" placeholder="Username" required class="input-field" />
            <input v-model="password" type="password" placeholder="Password" required class="input-field" />
            <button type="submit" class="primary-button">Login</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from "axios";
import { authActions } from "../auth";

const baseURL = process.env.APP_API_BASE_URL || 'http://localhost:5000';

export default {
    data() {
        return {
            username: "",
            password: "",
            errorMessage: "",
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post(`${baseURL}/api/auth/login`, {
                    username: this.username,
                    password: this.password,
                });

                authActions.login(response.data.token); // Update global state
                
                this.$router.push("/convert"); // Redirect to convert page
            } catch (error) {
                this.errorMessage = "Invalid username or password.";
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: #f9f9f9;
    text-align: center;
}

h2 {
    margin-bottom: 20px;
    color: #2c3e50;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.input-field {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.input-field:focus {
    border-color: #3498db;
    outline: none;
}

.primary-button {
    padding: 10px;
    background-color: #3498db;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.primary-button:hover {
    background-color: #2980b9;
}

.error-message {
    color: #e74c3c;
    font-size: 14px;
}
</style>
