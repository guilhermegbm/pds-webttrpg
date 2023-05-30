<template>

  <div id="meus-jogos" class="row">
    <div class="col-12">

      <div class="row">
        <div class="col-12 text-h4" style="margin: 10px">Meus Jogos</div>
      </div>

      <div id="lista-jogos" class="row">

        <div v-for="jogo in jogos" :key="jogo.id" class="col-4 options-card-col">
          <q-card class="my-card">
            <img src="./../../assets/dashboard/default-map.png" alt="Mapa do Jogo">

            <q-card-section class="q-pt-none q-pb-none">
              <div class="nome-jogo"> {{ jogo.name }} </div>
              <div class="usuario-autor-jogo">por John Doe</div>
              <div class="situacao-jogo">Em Andamento</div>
              <div class="data-inicio-jogo">{{ jogo.startDate | moment("DD/MM/YYYY") }} </div>
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              {{ jogo.description }}
            </q-card-section>
          </q-card>
        </div>
      </div>

    </div>
  </div>

</template>

<script>

import { api } from 'boot/axios'

export default {
  name: 'DashboardOptions',
  data () {
    return {
      jogos: []
    }
  },

  created () {
    this.buscarJogos()
  },

  methods: {
    buscarJogos () {
      api.get('/game', { headers: { Authorization: localStorage.getItem('authenticationToken') } })
        .then((response) => {
          this.jogos = response.data.allGames
        })
        .catch((e) => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: e.response.data.message,
            icon: 'report_problem'
          })
        })
    }
  }
}
</script>

<style scoped>
#meus-jogos {
  background-color: #FFF;
}

#lista-jogos {
  padding: 0px 50px;
}

.options-card-col {
  padding: 10px;
}

.nome-jogo {
  font-size: 30px;
}

.usuario-autor-jogo {
  font-size: 11px;
}

.situacao-jogo {
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
}

.data-inicio-jogo {
  display: block;
  float: right;
}
</style>
