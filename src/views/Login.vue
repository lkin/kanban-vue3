<template>
  <form @submit.prevent="submit" class="form-signin">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    <input v-model="data.username" class="form-control" placeholder="Username" required autofocus>
    <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useStore } from 'vuex'

export default {
    name: "Login",
    setup() {
        const data = reactive({
            username: '',//'test-nekidaem',
            password: ''//'test-nekidaem'
        })

        const store = useStore()
        const router = useRouter()

        const submit = async () => {
            try {
                const response = await axios.post('users/login/', data)
                if (response.status === 200) {
                    sessionStorage.setItem('token', response.data.token),
                    store.dispatch('setAuth', true)
                    router.push('/')
                }       
            } catch (error) {
                console.log({error});
                
            }
        }

        return {
            data,
            submit
        }
    }
}
</script>

<style>

</style>