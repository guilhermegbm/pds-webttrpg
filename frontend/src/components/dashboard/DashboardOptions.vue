<template>

  <div id="options" class="row">

    <div class="col-3 options-card-col">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h5 options-header">Encontrar Jogos</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="card-description-section">
          <p>Busque jogos públicos que ainda estão aceitando novos jogadores</p>
        </q-card-section>

        <q-card-section>
          <img class="options-image" src="./../../assets/dashboard/icon-encontrar-jogos.png" alt="icon-encontrar-jogos">
        </q-card-section>
      </q-card>
    </div>

    <div class="col-3 options-card-col">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h5 options-header">Criar novo Jogo</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="card-description-section">
          <p>Crie um novo jogo, construa o seu mape e convide seus amigos para jogar!</p>
        </q-card-section>

        <q-card-section>
          <q-btn square flat class="options-image-btn" v-on:click="openDialogCreateNewGame()">
            <img class="options-image" src="./../../assets/dashboard/icon-novo-jogo.png" alt="icon-encontrar-jogos">
          </q-btn>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-3 options-card-col">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h5 options-header">Encontrar Amigos</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="card-description-section">
          <p>Busque jogadores ativos e crie amizades para jogarem juntos</p>
        </q-card-section>

        <q-card-section>
          <img class="options-image" src="./../../assets/dashboard/icon-pesquisar-usuario.png" alt="icon-encontrar-jogos">
        </q-card-section>
      </q-card>
    </div>

    <div class="col-3 options-card-col">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h5 options-header">Entrar no Jogo</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="card-description-section">
          <p>Entre em um jogo que já está em andamento</p>
        </q-card-section>

        <q-card-section>
          <img class="options-image" src="./../../assets/dashboard/icon-entrar.png" alt="icon-encontrar-jogos">
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="dialogCreateNewGame">
      <q-card flat bordered>
        <q-card-section>
          <CreateGame />
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>

</template>

<script>
import CreateGame from 'src/components/create_game/CreateGame.vue'

export default {
  components: {
    CreateGame
  },
  name: 'DashboardOptions',
  data () {
    return {
      dialogCreateNewGame: false
    }
  },

  methods: {
    openDialogCreateNewGame () {
      this.dialogCreateNewGame = true
    }
  }
}
</script>

<style scoped>
#options {
  margin: 50px 50px 0px 50px;
  align-items: center;
  padding-bottom: 40px
}

.options-card-col {
  padding: 0px 20px;
}

.card-description-section {
  min-height: 120px;
}

.options-header {
  text-align: center;
}

.options-image-btn {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.options-image {
  width: 64px;
  height: 64px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
