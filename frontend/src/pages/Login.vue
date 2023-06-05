<template>
  <q-page class="row flex-center" style="margin-left: -20vw">
    <div class="row items-end">
      <div class="" style="z-index: 2">
        <img
          alt="Quasar logo"
          src="~assets/logo.svg"
          style="width: 20vw"
        >
      </div>
      <q-card class="q-pa-xl bg-vermelho rounded-borders column justify-center items-center" style="z-index: 1">
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
          <q-btn rounded color="cinza" label="Log in" class="q-mb-lg" @click="fazerLogin()"/>
        </q-form>
        <p class="text-center">Don't have an account yet? <a href="signup" class="link-signup text-bold">Sign up now</a></p>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: '',
      isPwd: true
    }
  },
  methods: {
    ...mapActions('storeUser', ['signIn']),
    fazerLogin () {
      const payload = {
        username: this.username,
        password: this.password
      }

      this.signIn(payload)
    }
  }
}

</script>
