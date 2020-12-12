<template>
	<div class="join">
		<div class="limiter">
			<div class="container-login100">
				<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
					<form class="login100-form validate-form" v-on:submit.prevent="join">
						<span class="login100-form-title p-b-33">
							Sign up
						</span>

						<span class="gray">
							Email*
						</span>

						<div class="wrap-input100 validate-input" v-bind:class="{ red: emailError }" data-validate = "Valid email is required: ex@abc.xyz">
							<input class="input100" type="email" name="email" v-model="email" required>
							<span class="focus-input100-1"></span>
							<span class="focus-input100-2"></span>
						</div>

						<span class="gray">
							Пароль*
						</span>

						<div class="wrap-input100 rs1 validate-input" v-bind:class="{ red: passError }" data-validate="Password is required">
							<input class="input100" type="password" name="pass" v-model="pass" required>
							<span class="focus-input100-1"></span>
							<span class="focus-input100-2"></span>
						</div>

						<span class="login100-form-message m-t-10">
							{{detail}}
						</span>

						<div class="container-login100-form-btn m-t-20">
							<button class="login100-form-btn">
								Sign up
							</button>
						</div>

						<div class="text-center p-t-45">
							<span class="txt1">
								Уже есть аккаунт?
							</span>
							<router-link class="txt2 hov1" to="/auth" exact>Войти</router-link>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>



<script>
export default {
	data() {
		return {
			email: '',
			pass: '',
      name: '',
      surname: '',
			detail: '',
      passError: false,
      emailError: false,
		}
	},
  methods: {
      async join() {

        this.emailError = false;
        this.passError = false;
        this.detail = '';

        this.$store.dispatch('join', {username: this.email, password: this.pass, email: this.email })
        .then(data=> {
            if (data.id) {
                this.$store.dispatch('login', {username: this.email, password: this.pass })
                .then(data2 => {
                    if (data2.refresh) {
                        this.$router.push('/');
                    }
                    else {
                        this.$router.push('/auth');
                    }
                })
           }
            else {
              if (data.username || data.password) {
                if (data.username) {
                  this.emailError = true;
                  for (let i=0; i < data.username.length; i++) {
                    this.detail += data.username[i];
                  }
                }
                else if (data.password) {
                  this.passError = true;
                  for (let i=0; i < data.password.length; i++) {
                    this.detail += data.password[i];
                  }
                }
              }
            }

        })
        .catch(err => console.log(err));
       
      }
    }
}
</script>


<style scoped>

.limiter {
	width: 100%;
	margin: 0 auto;
}

.container-login100 {
	width: 100%;  
	min-height: 100vh;
	display: -webkit-box;
	display: -webkit-flex;
	display: -moz-box;
	display: -ms-flexbox;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	padding: 15px;
	background: #e9faff;
}

.wrap-login100 {
	width: 500px;
	background: #fff;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
	-moz-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
	-webkit-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
	-o-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
	-ms-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
}

/*---------------------------------------------*/
a {
	font-family: OpenSans-Regular;
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
    text-decoration: none;
	margin: 0px;
	transition: all 0.4s;
	-webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
}

a:focus {
	outline: none !important;
}

a:hover {
	text-decoration: none;
}

/*---------------------------------------------*/
h1,h2,h3,h4,h5,h6 {
	margin: 0px;
}

p {
	font-family: OpenSans-Regular;
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 0px;
}

ul, li {
	margin: 0px;
	list-style-type: none;
}


/*---------------------------------------------*/
input {
	outline: none;
	border: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus, input:focus {
  border-color: transparent !important;
}

input::-webkit-input-placeholder { color: #666666;}
input:-moz-placeholder { color: #666666;}
input::-moz-placeholder { color: #666666;}
input:-ms-input-placeholder { color: #666666;}

textarea::-webkit-input-placeholder { color: #666666;}
textarea:-moz-placeholder { color: #666666;}
textarea::-moz-placeholder { color: #666666;}
textarea:-ms-input-placeholder { color: #666666;}

/*---------------------------------------------*/
button {
	outline: none !important;
	border: none;
	background: transparent;
}

button:hover {
	cursor: pointer;
}

iframe {
	border: none !important;
}

/*//////////////////////////////////////////////////////////////////
[ Utility ]*/
.txt1 {
  font-family: OpenSans-Regular;
  font-size: 15px;
  line-height: 1.4;
  color: #999999;
}

.txt2 {
  font-family: OpenSans-Regular;
  font-size: 15px;
  line-height: 1.4;
  color: #4272d7;
}

.hov1:hover {
  text-decoration: underline;
}

.gray {
  color: #555555;
}

/*==================================================================
[ Form ]*/

.login100-form {
  width: 100%;
}

.login100-form-title {
  display: block;
  font-family: OpenSans-Regular;
  font-size: 30px;
  color: #555555;
  line-height: 1.2;
  text-align: center;
}

.login100-form-message {	
  display: block;
  font-family: OpenSans-Regular;
  font-size: 15px;
  color: red;
  font-style: italic;
  line-height: 1.2;
}

/*------------------------------------------------------------------
[ Input ]*/

.wrap-input100 {
  width: 100%;
  position: relative;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  margin-bottom: 10px;
  margin-top: 10px;

}

.wrap-input100.red {
  border: 1px solid red;
}

.input100 {
  display: block;
  width: 100%;
  background: transparent;
  font-family: OpenSans-Regular;
  font-size: 15px;
  color: #666666;
  line-height: 1.2;
}

.p-r-55 {
    padding-right: 55px;
}

.p-l-55 {
    padding-left: 55px;
}

.p-b-50 {
    padding-bottom: 50px;
}

.p-t-65 {
    padding-top: 65px;
}

.p-b-33 {
    padding-bottom: 33px;
}

.m-t-20 {
    margin-top: 20px;
}


.m-t-10 {
    margin-top: 10px;
}

.p-b-4 {
    padding-bottom: 4px;
}
.p-t-45 {
    padding-top: 45px;
}
.text-center {
    text-align: center!important;
}


/*---------------------------------------------*/
input.input100 {
  height:40px;
  padding: 0 10px 0 10px;
}

/*------------------------------------------------------------------
[ Focus Input ]*/

.focus-input100-1, 
.focus-input100-2 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.focus-input100-1::before,
.focus-input100-2::before {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 1px;
  background-color: #4272d7;
}

.focus-input100-1::before {
  top: -1px;
  left: 0;
}

.focus-input100-2::before {
  bottom: -1px;
  right: 0;
}

.focus-input100-1::after,
.focus-input100-2::after {
  content: "";
  display: block;
  position: absolute;
  width: 1px;
  height: 0;
  background-color: #4272d7;
}

.focus-input100-1::after {
  top: 0;
  right: -1px;
}

.focus-input100-2::after {
  bottom: 0;
  left: -1px;
}

.input100:focus + .focus-input100-1::before {
  -webkit-animation: full-w 0.2s linear 0s;
  animation: full-w 0.2s linear 0s;
  animation-fill-mode: both;
  -webkit-animation-fill-mode: both;
}

.input100:focus + .focus-input100-1::after {
  -webkit-animation: full-h 0.1s linear 0.2s;
  animation: full-h 0.1s linear 0.2s;
  animation-fill-mode: both;
  -webkit-animation-fill-mode: both;
}

.input100:focus + .focus-input100-1 + .focus-input100-2::before {
  -webkit-animation: full-w 0.2s linear 0.3s;
  animation: full-w 0.2s linear 0.3s;
  animation-fill-mode: both;
  -webkit-animation-fill-mode: both;
}

.input100:focus + .focus-input100-1 + .focus-input100-2::after {
  -webkit-animation: full-h 0.1s linear 0.5s;
  animation: full-h 0.1s linear 0.5s;
  animation-fill-mode: both;
  -webkit-animation-fill-mode: both;
}


@keyframes full-w {
  to {
    width: calc(100% + 1px);
  }
}

@keyframes full-h {
  to {
    height: calc(100% + 1px);
  }
}


/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
}

.login100-form-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 60px;
  background-color: #4272d7;

  font-family: OpenSans-Regular;
  font-size: 14px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn:hover {
  background-color: #333333;
}


/*------------------------------------------------------------------
[ Alert validate ]*/

.validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  max-width: 70%;
  background-color: #fff;
  border: 1px solid #c80000;
  border-radius: 2px;
  padding: 4px 25px 4px 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 12px;
  pointer-events: none;

  font-family: OpenSans-Regular;
  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  visibility: hidden;
  opacity: 0;

  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate::after {
  content: "\f12a";
  font-family: FontAwesome;
  display: block;
  position: absolute;
  color: #c80000;
  font-size: 16px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 18px;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}
	

</style>