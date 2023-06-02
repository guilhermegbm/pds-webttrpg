<style>
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
    <q-btn color="primary" label="Add" @click="addSheetModal=true"/>
    <div
    v-for="charSheet in characterSheets"
    :key="charSheet.id"
    @click="loadSheetInfo(charSheet)"
    >
      {{charSheet.name}}
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
          <q-btn class="danger" label="Delete" @click="deleteSheet(selectedCharacter)" v-close-popup />
          <!-- Abrir confirmação de deletar -->
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 70vh; min-width: 50vw;" class="scroll">
          <div>
            <q-input type="text" label="Level" v-model="selectedCharacter.level"/>
            <q-input type="text" label="Classe" v-model="selectedCharacter.clazz" />
            <q-input type="text" label="Prof. Bonus" v-model="selectedCharacter.profBonus"/>
            <span class="text-h6">Atributos</span>
            <div class="attr-stats">
              <div>
                <!-- Add v-for here to clutter the page less -->
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
                <div class="" v-for="(stat, index) in selectedCharacter.stats" :key="index">
                  <input type="checkbox" v-model="stat.addProfBonus" />
                  <span>
                    {{ stat.addProfBonus ? (Math.floor((stat.value - 10) / 2)) + Number(profBonus) : Math.floor((stat.value - 10) / 2) }} {{ stat.name }}
                  </span>
                </div>
              </div>
              <div class="attr-savingthrows">
                <span>Skills</span>
                <div class="" v-for="(attrSkill, index) in selectedCharacter.attrSkills" :key="index">
                  <input type="checkbox" v-model="attrSkill.addProfBonus" />
                  <span>
                    {{ attrSkill.addProfBonus ? attrSkill.value + Number(profBonus) : attrSkill.value }} {{ attrSkill.name }}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span class="text-h6">Inventario</span>
              <q-input
                v-for="(inv,index) in selectedCharacter.inventorys"
                :key="index"
                v-model="selectedCharacter.inventorys[index].name"
                type="text"
                label="Item"
              />
              <q-btn @click="addItem('inv', selectedCharacter)" label="+" color="primary" />
            </div>
            <div>
              <span class="text-h6">Features</span>
              <q-input
                v-for="(skl,index) in selectedCharacter.skills"
                :key="index"
                v-model="selectedCharacter.skills[index].name"
                type="text"
                label="Item"
              />
              <q-btn @click="addItem('skill', selectedCharacter)" label="+" color="primary" />
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
const gameId = '4c96cb52-a481-41a8-bdc3-ee5c1d73dc92'

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
      profBonus: 2,
      characterName: '',
      selectDropdown: null,
      playerOptions: [localStorage.getItem('userId')], // Always put the GM into playerEditPermissions...
      characterSheets: [],
      hasSelectedCharacter: false,
      selectedCharacter: {},
      inventorys: []
    }
  },
  // computed: {
  //   strength () {
  //     return Math.floor((stats[0].value - 10) / 2)
  //   }
  // },
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

      // const attrSkills = [
      //   {
      //     name: 'Acrobatics (Dex)',
      //     addProfBonus: false,
      //     value: Math.floor(stats[1].value - 10) / 2
      //   },
      //   {
      //     name: 'Animal Handling (Wis)',
      //     addProfBonus: false,
      //     value: Math.floor(stats[4].value - 10) / 2
      //   },
      //   {
      //     name: 'Arcana (Int)',
      //     addProfBonus: false,
      //     value: Math.floor(stats[3].value - 10) / 2
      //   },
      //   {
      //     name: 'Athletics (Str)',
      //     addProfBonus: false,
      //     value: Math.floor(stats[0].value - 10) / 2
      //   },
      //   {
      //     name: 'Deception (Cha)',
      //     addProfBonus: false,
      //     value: Math.floor(stats[5].value - 10) / 2
      //   },
      //   {
      //     name: 'History (Int)',
      //     addProfBonus: false,
      //     value: Math.floor(stats[3].value - 10) / 2
      //   }
      // ]

      const characterSheet = {
        name: this.characterName,
        level: this.level,
        class: this.clazz,
        stats,
        inventorys: null,
        skills: null,
        enchantments: null,
        playersEditPermission: this.selectDropdown,
        imageName: '',
        gameId,
        userId: localStorage.getItem('userId')
      }

      api.post(`/game/${gameId}/game-chip`,
        characterSheet, config)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })

      // Remove this for a method to call said API later
      api.get(`/game/${gameId}/game-chip`,
        config)
        .then((response) => {
          this.characterSheets = [...response.data]
        }).catch((err) => {
          console.log(err)
        })

      this.resetSheet()
    },
    updateSheet (character) {
      character.enchantments = null
      character.class = character.clazz

      api.put(`/game/${gameId}/game-chip/${character.id}`,
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

      api.delete(`/game/${gameId}/game-chip/${character.id}`, config)
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
      console.log(character)
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
    }
  },
  beforeMount () {
    api.get('/game/4c96cb52-a481-41a8-bdc3-ee5c1d73dc92/game-chip',
      config)
      .then((response) => {
        this.characterSheets = [...response.data]
      }).catch((err) => {
        console.log(err)
      })
  }
}
</script>
