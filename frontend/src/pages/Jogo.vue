<template>
  <q-page class="row">
    <div class="col-9 flex flex-center">
      Map
    </div>

    <div class="col">
      <q-tabs
        v-model="tab"
        dense
        shrink
        class="bg-grey-3"
        narrow-indicator
      >
        <q-tab name="chat" label="Chat" />
        <q-tab name="sheets" label="Sheets" />
        <q-tab name="config" label="Config" />
      </q-tabs>

      <q-tab-panels class="q-pa-md" v-model="tab" animated>
        <q-tab-panel name="chat">
          <Chat />
        </q-tab-panel>
        <q-tab-panel name="sheets">
          <q-btn color="primary" label="Add" @click="addSheetModal=true"/>
          <div
            v-for="charSheet in characterSheets"
            :key="charSheet.id"
            @click="loadSheetInfo(charSheet)"
          >
            {{charSheet.characterName}}
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <!-- Modal para criar ficha de personagem -->
    <q-dialog v-model="addSheetModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Criar Ficha Nova</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 70vh; min-width: 50vw;" class="scroll">
          <q-input v-model="characterName" label="Nome do personagem" />
          <q-select multiple v-model="selectDropdown" :options="playerOptions" label="Quem pode editar:" />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat @click="resetSheet()" label="Fechar" color="primary" v-close-popup />
          <q-btn flat @click="addItem()" label="Salvar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal da ficha de personagem clicada -->
    <q-dialog v-model="sheetModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{selectedCharacter.characterName}}</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 70vh; min-width: 50vw;" class="scroll">
          <div>Belongs to: {{selectedCharacter.canEdit}}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
          <q-btn flat label="Salvar" @onclick="addItem()" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Chat from '../components/Chat.vue'

export default {
  name: 'Jogo',
  components: {
    Chat
  },
  data () {
    return {
      addSheetModal: false,
      sheetModal: false,
      characterName: '',
      selectDropdown: null,
      playerOptions: ['Joao', 'Lucas', 'Guilherme', 'Abner'],
      characterSheets: [],
      selectedCharacter: {},
      tab: 'chat'
    }
  },
  methods: {
    addItem () {
      this.characterSheets.push({
        id: this.characterSheets.length + 1,
        characterName: this.characterName,
        canEdit: this.selectDropdown
      })
      this.resetSheet()
    },
    resetSheet () {
      this.characterName = ''
      this.selectDropdown = null
    },
    loadSheetInfo (character) {
      this.selectedCharacter = character
      this.sheetModal = true
    }
  }
}
</script>
