<style>
  .token {
    width: 20%;
    height: 20%;
  }

  .attr-stats {
    display: flex;
  }

  .attr-savingthrows {
    display: flex;
    flex-direction: column;
    border: 2px solid;
    border-radius: 8px;
    align-self: start;
    margin: 8px;
  }

  .attr-savingthrows>span {
    border-bottom: 1px solid;
    padding: 4px;
  }

  .attr-savingthrows>div {
    border-bottom: 1px solid;
    padding: 4px;
  }

  .attr-savingthrows>span:first-child {
    font-weight: 600;
  }

  .attr-savingthrows>div:last-child {
    border-bottom: 0px;
  }
</style>

<template>
  <div>
    <q-btn size="sm" color="primary" label="Add" @click="addSheetModal=true"/>
    <q-separator class="q-mt-xs q-mb-xs" />
    <div
      class="flex column items-stretch justify-around text-weight-medium"
      style="cursor: pointer;"
      v-for="charSheet in characterSheets"
      :key="charSheet.id"
      @click="loadSheetInfo(charSheet)"
      draggable
      @dragstart="startDrag($event, charSheet)"
    >
      {{charSheet.name}}
      <q-separator class="q-mt-xs q-mb-xs" />
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
          <q-btn flat @click="addSheet()" label="Salvar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal da ficha de personagem clicada -->
    <q-dialog v-model="sheetModal">
      <q-card v-if="hasSelectedCharacter">
        <q-card-section class="flex row justify-between">
          <div class="text-h6">{{selectedCharacter.name}}</div>
          <q-btn color="red" label="Delete" @click="deleteSheet(selectedCharacter)" v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 70vh; min-width: 50vw;" class="scroll">
          <div>
            <div class="flex row items-center">
              <div class="flex column col-3">
                <img class="token col-3" :src=selectedCharacter.imageURL />
                <q-input class="col-1" type="text" label="Token URL" v-model="selectedCharacter.imageURL" />
              </div>
              <div class="flex column col-grow q-ma-md">
                <q-input type="text" label="Level" v-model="selectedCharacter.level"/>
                <q-input type="text" label="Class" v-model="selectedCharacter.clazz" />
                <div class="text-bold q-mt-sm">Prof. Bonus</div>
                <span>{{ calculateProfBonus }}</span>
              </div>
            </div>
            <q-separator class="q-mt-md" />
            <p class="text-h6">Attributes</p>
            <div class="attr-stats">
              <div>
                <q-input
                  v-for="(stat, index) in selectedCharacter.stats"
                  :key="index"
                  type="text"
                  :label="stat.name"
                  v-model="stat.value"
                />
              </div>
              <div class="attr-savingthrows">
                <span>Saving Throws</span>
                <div v-for="(stat, index) in selectedCharacter.stats" :key="index">
                  <input type="checkbox" v-model="stat.addProfBonus" />
                  <span>
                    {{ stat.addProfBonus ? Math.floor(((stat.value - 10) / 2) + calculateProfBonus) : Math.floor(((stat.value - 10) / 2)) }} {{ stat.name }}
                  </span>
                </div>
              </div>
              <div class="attr-savingthrows">
                <span>Skills</span>
                <div v-for="(attrSkill, index) in selectedCharacter.attrSkills" :key="index">
                  <input type="checkbox" v-model="attrSkill.addProfBonus" />
                  <span>
                    {{
                      attrSkill.addProfBonus ? calcAttrSkill(selectedCharacter, attrSkill) + calculateProfBonus : calcAttrSkill(selectedCharacter, attrSkill)
                    }}
                    {{ attrSkill.name }}
                  </span>
                </div>
              </div>
            </div>
            <q-separator class="q-mt-md" />
            <div class="q-mt-md">
              <span class="text-h6 q-mr-md">Inventory</span>
              <div class="flex row justify-between items-start q-mb-md" v-for="(inv,index) in selectedCharacter.inventorys" :key="index">
                <q-input
                  class="col-6"
                  v-model="selectedCharacter.inventorys[index].name"
                  type="text"
                  label="Item"
                />
                <q-separator vertical />
                <q-input
                  class="col-3"
                  v-model="selectedCharacter.inventorys[index].quantity"
                  type="number"
                  label="Quantity"
                />
                <q-btn padding="sm" color="red" size="xs" icon="delete" @click="deleteItem('inv', index, selectedCharacter)" v-close-popup />
              </div>
              <q-btn round padding="sm" size="xs" icon="add" @click="addItem('inv', selectedCharacter)" color="primary" />
            </div>
            <q-separator class="q-mt-md" />
            <div class="q-mt-md">
              <span class="text-h6 q-mr-md">Features</span>
              <div class="flex row justify-between items-start q-mb-md" v-for="(skl,index) in selectedCharacter.skills" :key="index">
                <div class="col-10">
                  <q-input
                    :key="index"
                    v-model="selectedCharacter.skills[index].name"
                    type="text"
                    label="Name"
                  />
                  <q-input type="textarea" label="Description" v-model="selectedCharacter.skills[index].description" />
                </div>
                <q-btn padding="sm" color="red" size="xs" icon="delete" @click="deleteItem('skill', index, selectedCharacter)" v-close-popup />
              </div>
              <q-btn round padding="sm" size="xs" icon="add" @click="addItem('skill', selectedCharacter)" color="primary" />
            </div>
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
          <q-btn flat label="Salvar" @click="updateSheet(selectedCharacter)" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { api } from 'boot/axios'

const config = {
  headers: {
    Authorization: localStorage.getItem('authenticationToken')
  }
}

export default {
  name: 'Sheets',
  data () {
    return {
      addSheetModal: false,
      sheetModal: false,
      level: 1,
      clazz: '',
      skills: [],
      magic: [],
      characterName: '',
      selectDropdown: null,
      playerOptions: [], // Always put the GM into playerEditPermissions...
      characterSheets: [],
      hasSelectedCharacter: false,
      selectedCharacter: {},
      inventorys: []
    }
  },
  computed: {
    calculateProfBonus () {
      return Math.ceil(1 + (this.selectedCharacter.level / 4))
    }
  },
  methods: {
    addSheet () {
      const stats = [
        {
          name: 'Strength',
          value: 10,
          addProfBonus: false
        },
        {
          name: 'Dexterity',
          value: 10,
          addProfBonus: false
        },
        {
          name: 'Constitution',
          value: 10,
          addProfBonus: false
        },
        {
          name: 'Intelligence',
          value: 10,
          addProfBonus: false
        },
        {
          name: 'Wisdom',
          value: 10,
          addProfBonus: false
        },
        {
          name: 'Charisma',
          value: 10,
          addProfBonus: false
        }
      ]

      const canEdit = this.selectDropdown.map((select) => {
        return select.value
      })

      const characterSheet = {
        name: this.characterName,
        level: this.level,
        class: this.clazz,
        stats,
        inventorys: null,
        skills: null,
        enchantments: null,
        playersEditPermission: canEdit,
        imageURL: 'https://i.imgur.com/Q2We6mI.png',
        gameId: this.$store.state.storeGame.gameId,
        userId: localStorage.getItem('userId')
      }

      api.post(`/game/${this.$store.state.storeGame.gameId}/game-chip`,
        characterSheet, config)
        .then((response) => {
          api.get(`/game/${this.$store.state.storeGame.gameId}/game-chip`,
            config)
            .then((response) => {
              this.characterSheets = [...response.data]
            }).catch((err) => {
              console.log(err)
            })
        })
        .catch((error) => {
          console.log(error)
        })

      this.resetSheet()
    },
    updateSheet (character) {
      character.enchantments = null
      character.class = character.clazz

      api.put(`/game/${this.$store.state.storeGame.gameId}/game-chip/${character.id}`,
        character, config)
        .then((response) => {
          console.log(response)
        }).catch((err) => {
          console.log(err)
        })
    },
    deleteSheet (character) {
      const index = this.characterSheets.indexOf(character, 0)
      this.characterSheets.splice(index, 1)

      api.delete(`/game/${this.$store.state.storeGame.gameId}/game-chip/${character.id}`, config)
        .then((response) => {
          console.log(response)
        }).catch((err) => {
          console.log(err)
        })
    },
    resetSheet () {
      this.characterName = ''
      this.selectDropdown = null
    },
    loadSheetInfo (character) {
      this.selectedCharacter = character

      this.sheetModal = true
      this.hasSelectedCharacter = true
    },
    addItem (type, selectedCharacter) {
      switch (type) {
        case 'inv':
          selectedCharacter.inventorys.push({
            name: '',
            quantity: 1
          })
          break
        case 'skill':
          selectedCharacter.skills.push({
            name: '',
            description: ''
          })
          break
      }
    },
    deleteItem (type, index, selectedCharacter) {
      switch (type) {
        case 'inv':
          selectedCharacter.inventorys.splice(index, 1)
          break
        case 'skill':
          selectedCharacter.skills.splice(index, 1)
          break
      }
    },
    calcAttrSkill (character, attrSkill) {
      let attrValue = 10
      switch (attrSkill.type) {
        case 'str':
          attrValue = Math.floor(((character.stats[0].value - 10) / 2))
          break
        case 'dex':
          attrValue = Math.floor(((character.stats[1].value - 10) / 2))
          break
        case 'int':
          attrValue = Math.floor(((character.stats[3].value - 10) / 2))
          break
        case 'wis':
          attrValue = Math.floor(((character.stats[4].value - 10) / 2))
          break
        case 'cha':
          attrValue = Math.floor(((character.stats[5].value - 10) / 2))
          break
      }

      return attrValue
    },
    startDrag (evt, sheet) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('sheetImg', sheet.imageURL)
      console.log(sheet)
    }
  },
  beforeMount () {
    api.get(`/game/${this.$store.state.storeGame.gameId}/game-chip`,
      config)
      .then((response) => {
        this.characterSheets = response.data.map((sheet) => {
          const attrSkills = [
            {
              name: 'Acrobatics (Dex)',
              type: 'dex'
            },
            {
              name: 'Animal Handling (Wis)',
              type: 'wis'
            },
            {
              name: 'Arcana (Int)',
              type: 'int'
            },
            {
              name: 'Athletics (Str)',
              type: 'str'
            },
            {
              name: 'Deception (Cha)',
              type: 'cha'
            },
            {
              name: 'History (Int)',
              type: 'int'
            },
            {
              name: 'Insight (Wis)',
              type: 'wis'
            },
            {
              name: 'Intimidation (Cha)',
              type: 'cha'
            },
            {
              name: 'Investigation (Int)',
              type: 'int'
            },
            {
              name: 'Medicine (Wis)',
              type: 'wis'
            }
          ]

          return {
            ...sheet,
            imageURL: 'https://i.imgur.com/Q2We6mI.png',
            attrSkills
          }
        })
      }).catch((err) => {
        console.log(err)
      })

    api.get(`/game/${this.$store.state.storeGame.gameId}/players`,
      config)
      .then((response) => {
        this.playerOptions = response.data.map((players) => {
          return {
            value: players.id,
            label: players.username
          }
        })
      }).catch((err) => {
        console.log(err)
      })
  }
}
</script>
