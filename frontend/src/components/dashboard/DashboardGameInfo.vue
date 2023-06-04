<template>

  <q-card style="width: 700px; max-width: 80vw;">

    <q-card-section>
      <!--<div class="text-h4">Informações do Jogo</div>-->
      <div class="text-h4">{{game.name}}</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="row">
        <div class="col-6">
          <img class="map-img-game" :src="game.imgMapBase64" alt="Mapa do Jogo">
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col-12">
              <p>{{game.description}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <b>Status do Jogo:</b> Em andamento
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <b>Data de início:</b> {{ game.startDate | moment("DD/MM/YYYY") }}
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-12">
              <b>GM:</b> &nbsp;&nbsp;&nbsp; <q-avatar size="40px" font-size="20px" color="primary" text-color="white">{{firstLetterUpperCase(game.authorPlayer.username)}}</q-avatar> {{game.authorPlayer.username}}
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-actions>
      <div class="text-h6">Jogadores já confirmados</div>
    </q-card-actions>

    <q-card-actions align="right" class="bg-white text-teal">
      <q-btn flat label="Fechar" v-close-popup />
    </q-card-actions>
  </q-card>

</template>

<script>
import { api } from 'boot/axios'

export default {
  props: {
    game: Object
  },
  data () {
    return {
      playersByGame: []
    }
  },

  created () {
    this.getAllPlayersByGame()
  },

  methods: {
    getAllPlayersByGame () {
      const url = '/game/' + this.game.id + '/players'
      api.get(url, { headers: { Authorization: localStorage.getItem('authenticationToken') } })
        .then((response) => {
          this.playersByGame = response.data
          console.log(this.playersByGame)
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
    firstLetterUpperCase (text) {
      if (!text || text == null || text === '') {
        return ''
      }

      return (text.substring(0, 1)).toUpperCase()
    }
  }
}
</script>

<style scoped>

.map-img-game {
  margin-right: 10px;
  width: 95%;
  max-height: 200px;
}

</style>
