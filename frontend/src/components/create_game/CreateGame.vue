<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        outlined
        v-model="campaignName"
        label="Nome da campanha *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />

      <q-input
        outlined
        type="number"
        v-model="qtdPlayers"
        label="Número máximo de jogadores *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Campo Obrigatório'
        ]"
      />

      <q-input
        outlined
        autogrow
        v-model="description"
        label="Descrição da campanha *"
        lazy-rules
      />

      <q-input outlined v-model="date">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="date" mask="DD/MM/YYYY HH:mm">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="date" mask="DD/MM/YYYY, HH:mm" format24h>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { api } from 'boot/axios'

const options = { day: 'numeric', year: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }
const config = {
  headers: {
    Authorization: '64da91cf-d22f-43f0-a749-df8dfee21f9e'
  }
}

export default {
  data () {
    return {
      campaignName: null,
      qtdPlayers: null,
      description: null,
      date: new Date().toLocaleString('pt-br', options)
    }
  },

  methods: {
    onSubmit () {
      api.post('/game', {
        name: this.campaignName,
        maximumPlayers: this.qtdPlayers,
        description: this.description
      }, config)
        .then((response) => {
          this.data = response.data
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Jogo criado'
          })
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading Failed',
            icon: 'report_problem'
          })
        })
    },

    onReset () {
      this.campaignName = null
      this.qtdPlayers = null
      this.description = null
      this.date = new Date().toLocaleString('en-GB')
    }
  }
}
</script>
