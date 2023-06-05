<template>

  <div id="my-games" class="row">
    <div class="col-12">

      <div class="row">
        <div class="col-12 text-h4" style="margin: 10px">Meus Jogos</div>
      </div>

      <div id="list-games" class="row">

        <div v-for="jogo in jogos" :key="jogo.id" class="col-4 options-card-col">
          <q-card class="my-card">
            <q-img class="map-img-game" :src="jogo.imgMapBase64" alt="Mapa do Jogo"></q-img>

            <q-card-section class="q-pt-none q-pb-none">
              <div class="name-game"> {{ jogo.name }} </div>
              <div class="username-author-game">por {{ jogo.authorPlayer.username }}</div>
              <div class="situation-game">Em Andamento</div>
              <div class="start-date-game">{{ jogo.startDate | moment("DD/MM/YYYY") }} </div>
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              {{ jogo.description }}
            </q-card-section>

            <q-card-section>
              <q-btn label="Mais informações" color="primary" @click="openDialogGameInfo(jogo)"/>
            </q-card-section>
          </q-card>
        </div>
      </div>

    </div>

    <q-dialog v-model="dialogGameInfo">
      <DashboardGameInfo :game="selectedGame" />
    </q-dialog>

  </div>
</template>

<script>

import { api } from 'boot/axios'
import DashboardGameInfo from 'src/components/dashboard/DashboardGameInfo.vue'

export default {
  components: {
    DashboardGameInfo
  },
  name: 'DashboardOptions',
  data () {
    return {
      jogos: [],
      dialogGameInfo: false,
      selectedGame: null
    }
  },

  created () {
    this.buscarJogos()
  },

  methods: {
    buscarJogos () {
      api.get('/game', { headers: { Authorization: localStorage.getItem('authenticationToken') } })
        .then((response) => {
          this.jogos = response.data
        })
        .catch((e) => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: e.response.data.message,
            icon: 'report_problem'
          })
        })
    },
    openDialogGameInfo (game) {
      this.selectedGame = game
      this.dialogGameInfo = true
    }
  }
}
</script>

<style scoped>
#my-games {
  background-color: #FFF;
}

#list-games {
  padding: 0px 50px;
}

.options-card-col {
  padding: 10px;
}

.map-img-game {
  max-height: 280px;
}

.name-game {
  font-size: 30px;
}

.username-author-game {
  font-size: 11px;
}

.situation-game {
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
}

.start-date-game {
  display: block;
  float: right;
}
</style>
