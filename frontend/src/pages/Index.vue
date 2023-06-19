<template>
  <q-page class="flex flex-center row">
    <div class="column q-gutter-md">
      <img
      alt="Quasar logo"
      src="~assets/logo.svg"
      style="width: 20vw"
      >
      <div class="row flex-center justify-around">
        <q-btn size="sm" rounded color="vermelho" label="Sign in" class="q-px-md" @click="$router.push('/signin')" />
        <q-btn size="sm" rounded color="cinza" label="Sign up" class="q-px-md" @click="$router.push('/signup')" />
      </div>
    </div>
  </q-page>
</template>

<style>
html, body {
  height: 100vh;
}
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
