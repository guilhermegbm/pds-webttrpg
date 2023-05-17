<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center row">
        <div class="flex flex-center col-9">Map</div>
        <q-separator vertical size="4px" color="blue" />
        <div class="flex flex-center col">
          <q-form
            class="q-pa-md row justify-center"
            @submit="onSend"
          >
            <div style="width: 100%; max-width: 400px">
              <q-chat-message
                :text="['hey, how are you?']"
                sent
              />
              <q-chat-message
                :text="['doing fine, how r you?']"
              />
            </div>
            <input
              class="col"
              type="text"
              v-model="message"
              label="Envie uma mensagem"
            />
            <input type="submit" hidden />
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Jogo',
  data () {
    return {
      chatMessages: null,
      message: null
    }
  },
  methods: {
    onSend () {
      console.log(this.message)
      this.message = ''
    }
  }
}
</script>
