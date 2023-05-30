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
      {{charSheet.characterName}}
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
        <q-card-section>
          <div class="text-h6">{{selectedCharacter.characterName}}</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 70vh; min-width: 50vw;" class="scroll">
          <div>
            <q-input type="text" label="Level"/>
            <q-input type="text" label="Classe"/>
            <q-input type="text" label="Prof. Bonus" v-model="profBonus"/>
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
                <div class="" v-for="(skill, index) in selectedCharacter.skills" :key="index">
                  <input type="checkbox" v-model="skill.addProfBonus" />
                  <span>
                    {{ skill.addProfBonus ? skill.value + Number(profBonus) : skill.value }} {{ skill.name }}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span class="text-h6">Inventario</span>
              <q-input v-for="(inv,index) in inventoryItems" :key="index" v-model="inventoryItems[index].name" type="text" label="Item" />
              <q-btn @click="addInvItem()" label="+" color="primary" />
            </div>
            <div>
              <span class="text-h6">Features</span>
            </div>
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
          <q-btn flat label="Salvar" @click="updateSheet()" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'Sheets',
  data () {
    return {
      addSheetModal: false,
      sheetModal: false,
      profBonus: 2,
      characterName: '',
      selectDropdown: null,
      playerOptions: ['Joao', 'Lucas', 'Guilherme', 'Abner'],
      characterSheets: [],
      hasSelectedCharacter: false,
      selectedCharacter: {},
      inventoryItems: [
        {
          name: '',
          qtd: 0
        }
      ]
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

      const skills = [
        {
          name: 'Acrobatics (Dex)',
          addProfBonus: false,
          value: Math.floor(stats[1].value - 10) / 2
        },
        {
          name: 'Animal Handling (Wis)',
          addProfBonus: false,
          value: Math.floor(stats[4].value - 10) / 2
        },
        {
          name: 'Arcana (Int)',
          addProfBonus: false,
          value: Math.floor(stats[3].value - 10) / 2
        },
        {
          name: 'Athletics (Str)',
          addProfBonus: false,
          value: Math.floor(stats[0].value - 10) / 2
        },
        {
          name: 'Deception (Cha)',
          addProfBonus: false,
          value: Math.floor(stats[5].value - 10) / 2
        },
        {
          name: 'History (Int)',
          addProfBonus: false,
          value: Math.floor(stats[3].value - 10) / 2
        }
      ]

      this.characterSheets.push({
        characterName: this.characterName,
        canEdit: this.selectDropdown,
        profBonus: this.profBonus,
        stats,
        skills
      })
      this.resetSheet()
    },
    updateSheet () {
      console.log('Atualizando Ficha...')
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
    addInvItem () {
      this.inventoryItems.push({
        name: '',
        qtd: 0
      })
    }
  }
}
</script>
