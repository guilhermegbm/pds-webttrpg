<template>
  <div class="q-pa-md" style="width: 500px;">

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
        :rules="[
          val => val !== null && val !== '' || 'Campo Obrigatório'
        ]"
      />

      <q-input outlined v-model="startDate">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="startDate" mask="DD/MM/YYYY HH:mm">
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
              <q-time v-model="startDate" mask="DD/MM/YYYY, HH:mm" format24h>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-file
        v-model="mapImage"
        @input="handleFileMapImageUpload"
        label="Selecione o mapa principal"
        outlined
        bottom-slots
        counter
        v-bind:multiple="false">
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop.prevent />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click.stop.prevent="mapImage = null" class="cursor-pointer" />
        </template>

        <template v-slot:hint>
          Apenas arquivos .png
        </template>
      </q-file>

      <q-img v-if="base64MapImage" :src="base64MapImage"/>

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

export default {
  data () {
    return {
      campaignName: null,
      qtdPlayers: null,
      description: null,
      startDate: new Date().toLocaleString('pt-br', options),
      mapImage: null,
      base64MapImage: null
    }
  },

  methods: {
    handleFileMapImageUpload () {
      const reader = new FileReader()
      reader.readAsDataURL(this.mapImage)
      reader.onload = (event) => {
        this.base64MapImage = event.target.result
      }
      reader.onerror = function (error) {
        console.log('Error rendering Base 64 Img: ', error)
      }
    },
    onSubmit () {
      const moment = require('moment')
      const startDateAsMoment = moment(this.startDate, 'DD/MM/YYYY, HH:mm')

      api.post('/game', {
        userId: localStorage.getItem('userId'),
        name: this.campaignName,
        maximumPlayers: this.qtdPlayers,
        description: this.description,
        startDate: startDateAsMoment.format('YYYY-MM-DDTHH:mm:ss.sssZ'),
        base64MapImage: this.base64MapImage
      }, { headers: { Authorization: localStorage.getItem('authenticationToken') } })
        .then((response) => {
          this.data = response.data
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Jogo criado'
          })
        })
        .catch((e) => {
          console.log(e)
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: e.response.data.message,
            icon: 'report_problem'
          })
        })
    },

    onReset () {
      this.campaignName = null
      this.qtdPlayers = null
      this.description = null
      this.startDate = new Date().toLocaleString('en-GB')
      this.mapImage = null
      this.base64MapImage = null
    }
  }
}
</script>
