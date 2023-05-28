<template>

  <div id="meus-jogos" class="row">
    <div class="col-12">

      <div class="row">
        <div class="col-12 text-h4" style="margin: 10px">Meus Jogos</div>
      </div>

      <div id="lista-jogos" class="row">

        <div v-for="item in testes" :key="item.val" class="col-4 options-card-col">
          <q-card class="my-card">
            <img src="./../../assets/dashboard/default-map.png" alt="Mapa do Jogo">

            <q-card-section>
              <div class="nome-jogo">Aventura 01</div>
              <div class="usuario-autor-jogo">by John Doe</div>
              <div class="situacao-jogo">Em Andamento</div>
              <div class="data-inicio-jogo">28/05/2023</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Em um mundo desolado, tal tal tal.Em um mundo desolado, tal tal tal.Em um mundo desolado, tal tal tal.Em um mundo desolado, tal tal tal.Em um mundo desolado, tal tal tal.
            </q-card-section>
          </q-card>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: 'DashboardOptions',
  data () {
    return {
      lorem: 'Batatata taatata',
      testes: [{ val: 1 }, { val: 2 }, { val: 3 }, { val: 4 }],
      jogos: [
        {
          id: '1',
          name: 'Game 1',
          maximumPlayers: 5,
          description: 'D 1',
          userId: '3fd91d4f-ee40-4f48-8f4d-8eb1f7231401'
        }
      ]
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
