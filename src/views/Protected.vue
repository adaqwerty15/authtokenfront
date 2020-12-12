<template>
  <div class="prot">
    <h1>This is page with protected content </h1>
    <router-link to="/">Home</router-link> 
    <p>{{message}}</p>
  </div>
</template>


<script>
export default {
  data() {
    return {
      message: 'This content is avaliable only for authorized users'
    }
  },
  created() {
    let token = JSON.parse(this.$store.state.token)
   
    if (token.access!=undefined) {
      console.log(token.access)
      let promGetInf = (token) => fetch('http://localhost:5000/getinfo/', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': `Bearer ${token}`
            },
      });

    let p1 = promGetInf(token.access);

    p1
    .then((res)=> res.json())
    .then(data=>  {
      if (data.information) {
          this.message = data.information
      }    
      else {
        if (data.code=="token_not_valid") {
            console.log(token)
            this.$store.dispatch('refresh_token')
            .then(res=> {
                if (res.access) {
                    let p2 = promGetInf(res.access)
                    p2
                    .then((res)=> res.json())
                    .then((data)=> {
                        if (data.information) {
                          this.message = data.information
                        }
                        else {
                            this.$store.dispatch('logout')
                        }  
                    })
                }
            })
        }
      }
                
       console.log(data)
    });
    }
    
  }
}
</script>

<style scoped>
	.prot {
		padding: 20px;
	}
</style>
