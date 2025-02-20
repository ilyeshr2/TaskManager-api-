<template>
    <Page>
        <ActionBar title="Register" />
        <StackLayout class="p-4">
            <TextField v-model="username" hint="Username" class="input m-b-10" />
            <TextField v-model="email" hint="Email" keyboardType="email" class="input m-b-10" />
            <TextField v-model="password" hint="Password" secure="true" class="input m-b-20" />
            <Button text="Register" @tap="register" class="btn btn-primary m-b-10" />
            <Button text="Back to Login" @tap="goToLogin" class="btn btn-outline" />
        </StackLayout>
    </Page>
</template>

<script>
import api from '../services/api';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        async register() {
            try {
                await api.register({
                    username: this.username,
                    email: this.email,
                    password: this.password
                });
                alert('Registration successful!');
                this.goToLogin();
            } catch (error) {
                alert('Registration failed. Please try again.');
            }
        },
        goToLogin() {
            this.$navigateTo(require('./Login').default);
        }
    }
}
</script>
