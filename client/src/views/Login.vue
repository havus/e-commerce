<template>
  <div id="jumbotron" class="d-flex justify-center align-center">
    <v-card id="box" class="ma-2">
      <v-card-title class="pa-0" wrap>
        <v-tabs v-model="tab" fixed-tabs>
          <v-tab class="ml-0">Register</v-tab>
          <v-tab>Login</v-tab>
        </v-tabs>
      </v-card-title>
      <v-card-text>
        <v-tabs-items v-model="tab">
          <v-tab-item class="pa-7">
            <v-layout>
              <v-flex class="d-flex justify-center pt-2 pb-9">
                <h1>REGISTER</h1>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm-12 md-6 class="px-2">
                <v-text-field
                  v-model="formRegister.firstname"
                  label="First Name"
                ></v-text-field>
              </v-flex>
              <v-flex sm-12 md-6 class="px-2">
                <v-text-field
                  v-model="formRegister.lastname"
                  label="Last Name"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm-12 md-12 class="px-2">
                <v-text-field sm-12 md-12
                  v-model="formRegister.username"
                  label="Username"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm-12 md-12 class="px-2">
                <v-text-field sm-12 md-12
                  v-model="formRegister.email"
                  :rules="[emailValid]"
                  type="email"
                  label="Email"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm-12 md-12 class="px-2">
                <v-text-field sm-12 md-12
                  type="password"
                  v-model="formRegister.password"
                  label="Password"
                  hint="At least 8 characters"
                  counter
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-btn block large rounded color="primary" class="mt-7" @click="signUp">REGISTER</v-btn>
            </v-layout>
          </v-tab-item>
          <v-tab-item class="pa-5">
            <v-layout>
              <v-flex class="d-flex justify-center py-3">
                <h1>LOGIN</h1>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm-12 md-12 class="px-2">
                <v-text-field sm-12 md-12
                  type="email" :rules="[emailValid]"
                  v-model="formLogin.email"
                  label="Email"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex sm-12 md-12 class="px-2">
                <v-text-field sm-12 md-12
                  type="password"
                  v-model="formLogin.password"
                  label="Password"
                  counter
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
            <v-btn block large rounded color="primary" class="mt-7" @click="signIn">LOGIN</v-btn>
            </v-layout>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  computed: mapState(['token', 'baseUrl']),
  data: () => ({
    status: 'register',
    tab: null,
    showPassword: false,
    formRegister: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    },
    formLogin: {
      email: '',
      password: '',
    },
    emailValid: (value) => {
      if (value.length > 0) {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      } else {
        return true;
      }
    },
  }),
  methods: {
    signIn() {
      axios({
        method: "POST",
        url: `${this.baseUrl}/user/signin`,
        data: this.formLogin,
      })
        .then(({data}) => {
          this.$store.commit('SET_TOKEN', data.token);
          this.$swal.fire({
            type: 'success',
            title: 'Login Success!',
          })
        })
        .catch(({response}) => {
          this.$swal.fire({
            type: 'error',
            title: response.data.message,
          })
        })
      // this.$store.dispatch('signIn', this.formLogin);
    },
    signUp() {
      let fullname = `${this.formRegister.firstname} ${this.formRegister.lastname}`;
      axios({
        method: "POST",
        url: `${this.baseUrl}/user/signup`,
        data: {
          fullname,
          username: this.formRegister.username,
          email: this.formRegister.email,
          password: this.formRegister.password,
        },
      })
        .then(({data}) => {
          this.$store.commit('SET_TOKEN', data.token);
          this.$swal.fire({
            type: 'success',
            title: 'Registration Success!',
          })
        })
        .catch(({response}) => {
          this.$swal.fire({
            type: 'error',
            title: 'Something went wrong!',
          })
          console.log(response.data, 'err <<<<<<<<<<<<<<');
        })
    }
  },
  created() {
    if (this.token) {
      this.$router.push('/');
    }
  },
  watch: {
    token() {
      if (this.token) {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style>
  #jumbotron {
    height: 100%;
  }
  #box {
    width: 600px;
    overflow: hidden;
  }

  h1 {
    letter-spacing: 2px;
  }
</style>
