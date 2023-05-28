<template>
  <q-page class="q-pa-md bg-cinza column justify-center items-center">
    <q-card class="q-pa-xl bg-vermelho rounded-borders column justify-center">
      <p class="dragonsden">Dragon's Den</p>
      <q-form class="q-px-xl column justify-center">
        <q-input dense rounded outlined v-model="username" label="Username" bg-color="grey-4" class="q-mb-lg"/>
        <q-input dense rounded outlined v-model="password" label="Password" bg-color="grey-4" class="q-mb-lg"/>
        <q-input dense rounded outlined v-model="confirmationPassword" label="Confirm password" bg-color="grey-4" class="q-mb-lg"/>
        <q-btn rounded color="cinza" label="Sign up" class="q-mb-lg" @click="signUp()"/>
      </q-form>
      <p class="text-center">Already have an account? <a href="signin" class="link-login text-bold">Log in now</a></p>
      {{ $store.state }}
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: '',
      confirmationPassword: ''
    }
  },
  methods: {
    ...mapActions('storeUser', ['signUp']),
    signUp () {
      this.signUp(this.username, this.password, this.confirmationPassword)
    }
  }
}

</script>
