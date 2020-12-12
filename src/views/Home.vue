<template>
  <div class="home">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/prot">Protected</router-link> |
    <span v-if="isLoggedIn"><a @click="logout">Выход</a></span>
    <span v-else><router-link class="txt2 hov1" to="/auth" exact>Вход</router-link></span>
<!--     <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>


<script>
  export default {
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/').catch(()=>{})
        })
      }
    },
  }
</script>


<style scoped>
	div.home {
		padding: 20px;
	}
</style>
