<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">Home</router-link>
            
            <button class="navbar-toggler" @click="toggleMenu"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link active">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link active">Register</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="auth">
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link active" @click="logout">Logout</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
    name: "Nav",
    setup() {
        const store = useStore()

        const auth = computed(() => store.state.authenticated)

        const logout = async () => {
            //await store.dispatch('setAuth', false)
            sessionStorage.clear()
        }

        return { 
            auth,
            logout
        }
    },
    data() {
        return {
            menuOpen: false
        }
    },
    methods: {
        toggleMenu() {
            console.log(' sdg')
        }
    }
}
</script>

<style>

</style>