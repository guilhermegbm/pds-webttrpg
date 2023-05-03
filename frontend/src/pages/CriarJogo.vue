<template>
  <q-layout view="lhr LpR fff">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          Dragon's Den
        </q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md" style="max-width: 400px">

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="name"
            label="Nome da campanha *"
            hint="O nome da sua campanha"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
          />

          <q-input
            filled
            type="number"
            v-model="age"
            label="Número de jogadores *"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Digita a quantidade de jogares',
              val => val > 0 && val < 100 || 'Campo obrigatório'
            ]"
          />

          <q-toggle v-model="accept" label="I accept the license and terms" />

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>

        </div>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<!-- <script>
import useQuasar from 'quasar/src/composables/use-quasar.js';
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)

    return {
      name,
      age,
      accept,

      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset () {
        name.value = null
        age.value = null
        accept.value = false
      }
    }
  }
}
</script> -->
