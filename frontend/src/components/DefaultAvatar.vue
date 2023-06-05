<template>
  <div class="main-div-avatar">
    <q-btn round color="primary" @click="onClickBtnShowUserInfo">
      <q-avatar
        size="40px"
        font-size="20px"
        color="secondary"
        text-color="white">

          <span v-if="loadingGetUserById">
            <q-spinner
              color="white"
              size="26px"
              :thickness="6"
            />
          </span>

          <span v-else>
            {{ firstLetterUpperCase(username) }}
          </span>

          <q-menu v-model="toggleMenuUserInfo" no-parent-event>

            <div class="avatar-user-info-menu">

              <div class="row avatar-user-info-menu-row">
                <div class="col-4">
                  <q-img class="map-img-game" src="../assets/dashboard/default-profile-picture.png"/>
                </div>
                <div class="col-8" style="padding: 10px;">
                  <div class="text-h6 q-mb-md">{{ username }}</div>
                  <div><q-img style="width: 16px; height: 16px;" src="../assets/dashboard/icon-available.png"/> Disponível</div>
                  <br />
                  <div> <b>Última sessão:</b> &nbsp; <span style="font-family: Arial">{{ new Date() | moment("DD/MM/YYYY") }}</span></div>
                </div>
              </div>

              &nbsp;

              <div class="row avatar-user-info-menu-row">
                <div class="col-12">
                  <q-btn style="width: 100%" flat color="primary" label="Sair" icon="logout" @click="logout()"/>
                </div>
              </div>

            </div>

          </q-menu>
        </q-avatar>
    </q-btn>
    &nbsp;
    <div v-if="showFullUsername"> {{username}} </div>
  </div>
</template>

<script>
import { api } from 'boot/axios'
import { mapActions } from 'vuex'

export default {
  props: {
    // userId: String,
    propUsername: String,
    showFullUsername: Boolean
  },
  data () {
    return {
      loadingGetUserById: false,
      user: null,
      username: '',
      toggleMenuUserInfo: false
    }
  },

  created () {
    this.checkUsername()
  },

  methods: {
    ...mapActions('storeUser', ['logOut']),
    checkUsername () {
      if (!this.propUsername || this.propUsername == null || this.propUsername === '') {
        this.getUserById()
      } else {
        this.username = this.propUsername
      }
    },
    getUserById () {
      const userId = this.$store.state.storeUser.userId
      if (!userId || userId == null || userId === '') {
        return
      }

      this.loadingGetUserById = true

      const url = '/user/' + userId
      api.get(url, { headers: { Authorization: localStorage.getItem('authenticationToken') } })
        .then((response) => {
          this.user = response.data
          this.username = this.user.username
        })
        .catch((e) => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: e.response.data.message,
            icon: 'report_problem'
          })
        }).finally(() => {
          this.loadingGetUserById = false
        })
    },

    onClickBtnShowUserInfo () {
      if (this.user != null) {
        this.toggleMenuUserInfo = !this.toggleMenuUserInfo
      }
    },

    logout () {
      this.$router.push('signin')
      this.logOut()
    },

    firstLetterUpperCase (text) {
      if (!text || text == null || text === '') {
        return '-'
      }

      return (text.substring(0, 1)).toUpperCase()
    }
  }
}
</script>

<style scoped>

.main-div-avatar {
  display: flex;
  justify-content: right;
  align-items: center;
}

.avatar-user-info-menu {
  min-width: 400px;
  background-color: #dbdbdb;
  padding: 10px;
}

.avatar-user-info-menu-row {
  background-color: #FFF;
  padding: 10px;
  border-radius: 10px;
}

</style>
