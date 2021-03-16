<template>
  <form @submit.prevent="submit" class="form-signin">
    <h1 class="h3 mb-3 fw-normal">Please register</h1>
    <input v-model="data.username" class="form-control" placeholder="Username" required pattern="^[\w.@+-]+$" autofocus>
    <input v-model="data.email" type="email" class="form-control" placeholder="Email address" required>
    <input v-model="data.password" type="password" class="form-control" placeholder="Password" pattern=".{8,}" required>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
    name: "Register",
    setup() {
        const data = reactive({
            username: '',
            email: '',
            password: ''
        })
        const router = useRouter()
        const store = useStore()

        const submit = async () => {

            try {
                const response = await axios.post('/users/create/',
                    data,
                    { headers: {'Content-Type': 'application/json'} }
                )
                if (response.status === 201) {
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