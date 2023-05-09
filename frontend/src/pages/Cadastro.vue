<template>
    <q-page class="">
        <q-card>
            <q-form>
                <q-input v-model="username" label="Username"/>
                <q-input v-model="email" label="E-mail"/>
                <q-input v-model="password" label="Password"/>
                <q-btn label="Sign up" />

                <p>Alraedy have an account? <a href="" class="bold">Log in now</a></p>
            </q-form>
        </q-card>
    </q-page>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  }
}

</script>
