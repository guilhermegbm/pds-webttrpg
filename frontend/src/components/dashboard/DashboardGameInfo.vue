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
          <q-img class="map-img-game" :src="game.imgMapBase64" alt="Mapa do Jogo"/>
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
            <div class="col-1">
              <b>GM:</b>
            </div>
            <div class="col-6">
              <DefaultAvatar :userId="game.authorPlayer.id" :propUsername="game.authorPlayer.username" :showFullUsername="true"/>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div class="text-h6">Jogadores já confirmados</div>
    </q-card-section>

    <q-card-section>
      <div class="row">
        <div class="col-3" style="margin-bottom: 5px;" v-for="player in playersByGame" :key="player.id">
          <DefaultAvatar :userId="player.id" :propUsername="player.username" :showFullUsername="true"/>
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right" class="bg-white text-teal">
      <q-btn flat label="Fechar" v-close-popup />
      <q-btn flat label="Entrar no Jogo" @click="joinGame" v-if="loggedUserHasAccess"/>
      <q-btn flat label="Solicitar Acesso" @click="requestAccess" v-else/>

    </q-card-actions>
  </q-card>

</template>

<script>
import { api } from 'boot/axios'
import { mapActions } from 'vuex'
import DefaultAvatar from '../DefaultAvatar.vue'

export default {
  components: {
    DefaultAvatar
  },
  props: {
    game: Object
  },
  data () {
    return {
      playersByGame: [],
      loggedUserHasAccess: false
    }
  },

  created () {
    this.getAllPlayersByGame()
  },

  methods: {
    ...mapActions('storeGame', ['setGameInfo']),
    getAllPlayersByGame () {
      const url = '/game/' + this.game.id + '/players'
      api.get(url, { headers: { Authorization: localStorage.getItem('authenticationToken') } })
        .then((response) => {
          this.playersByGame = response.data
          this.checkIfLoggedUserHasAccess()
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

    checkIfLoggedUserHasAccess () {
      const loggedUserId = localStorage.getItem('userId')
      this.loggedUserHasAccess = false

      this.playersByGame.forEach((player) => {
        if (player.id === loggedUserId) {
          this.loggedUserHasAccess = true
        }
      })
    },
    requestAccess () {
      api.post('/game/request-access', {
        playerId: localStorage.getItem('userId'),
        gameId: this.game.id
      }, { headers: { Authorization: localStorage.getItem('authenticationToken') } })
        .then((response) => {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Solicitação aceita'
          })
          this.getAllPlayersByGame()
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
    joinGame () {
      this.setGameInfo(this.game)
      this.$router.push('game')
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
