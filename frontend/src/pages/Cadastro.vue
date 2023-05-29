<template>
  <q-page class="q-pa-md bg-cinza column justify-center items-center">
    <q-card class="q-pa-xl bg-vermelho rounded-borders column justify-center">
      <p class="dragonsden">Dragon's Den</p>
      <q-form class="q-px-xl column justify-center">
        <q-input dense rounded outlined v-model="username" label="Username" bg-color="grey-4" class="q-mb-lg"/>
        <q-input dense rounded outlined v-model="password" label="Password" bg-color="grey-4" class="q-mb-lg" :type="isPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-input dense rounded outlined v-model="confirmationPassword" label="Confirm password" bg-color="grey-4" class="q-mb-lg" :type="isCnfPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon
              :name="isCnfPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isCnfPwd = !isCnfPwd"
            />
          </template>
        </q-input>
        <q-btn rounded color="cinza" label="Sign up" class="q-mb-lg" @click="cadastrarUsuario()"/>
      </q-form>
      <p class="text-center">Already have an account? <a href="signin" class="link-login text-bold">Log in now</a></p>
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
      confirmationPassword: '',
      isPwd: true,
      isCnfPwd: true
    }
  },
  methods: {
    ...mapActions('storeUser', ['signUp']),
    cadastrarUsuario () {
      const payload = {
        username: this.username,
        password: this.password,
        confirmationPassword: this.confirmationPassword
      }
      this.signUp(payload)
    }
  }
}

</script>
