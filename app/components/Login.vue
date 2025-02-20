<template>
    <Page>
        <ActionBar title="Login" />
        <StackLayout class="p-4">
            <TextField v-model="email" hint="Email" keyboardType="email" class="input m-b-10" />
            <TextField v-model="password" hint="Password" secure="true" class="input m-b-20" />
            <Button text="Login" @tap="login" class="btn btn-primary m-b-10" />
            <Button text="Register" @tap="goToRegister" class="btn btn-outline" />
        </StackLayout>
    </Page>
</template>

<script>
import api from '../services/api';
import { ApplicationSettings } from '@nativescript/core';

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
            try {
                const response = await api.login({
                    email: this.email,
                    password: this.password
                });
                ApplicationSettings.setString('token', response.token);
                this.$navigateTo(require('./Tasks').default, {
                    clearHistory: true
                });
            } catch (error) {
                alert('Login failed. Please check your credentials.');
            }
        },
        goToRegister() {
            this.$navigateTo(require('./Register').default);
        }
    }
}
</script>
