<template>
  <q-page class="q-pa-md bg-cinza column justify-center items-center">
    <q-card class="q-pa-xl bg-vermelho rounded-borders column justify-center">
      <p class="dragonsden">Dragon's Den</p>
      <q-form class="q-px-xl column justify-center">
        <q-input dense rounded outlined v-model="email" label="Username" bg-color="grey-4" class="q-mb-lg"/>
        <q-input dense rounded outlined v-model="password" label="Password" bg-color="grey-4" class="q-mb-lg"/>
        <q-btn rounded color="cinza" label="Log in" class="q-mb-lg"/>
      </q-form>
      <p class="text-center">Don't have an account yet? <a href="signup" class="link-signup text-bold">Sign up now</a></p>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }
}

</script>
