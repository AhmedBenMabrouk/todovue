<template>
    <form @submit.prevent="signupf" v-show="!signup">
        <label >Email:</label>
        <input @click="changeusex" type="email" required v-model="email">
        <div class="error" v-show="user">
            User Exists
        </div>

        <label >Name</label>
        <input @click="getUser" type="text" required v-model="name">

        <label > Password </label>
        <input   type="password" required v-model="password">

        <label >Confirm Password</label>
        <input type="password" required v-model="repass">

        <div class="error" v-show="spasserr">
            Password is not Correct
        </div>


        <div  class="terms">
            <input @click="changespasserr" type="checkbox" v-model="terms" required>
            <label>Accept terms and conditions </label>
        </div>
        <div class="submit">
            <button type="submit">Sign up</button>
        </div>
        <div class="dont" @click="changesignup">
            Already registred ?
        </div>

    </form>


    <form @submit.prevent="login" v-show="signup">
        <div class="error" v-show="UsNoEx">
            User Does Not Exist
        </div>
        <label >Email:</label>
        <input @click="changenousex" type="email" required v-model="email">

        <label> Password </label>
        <input @click="getUser" type="password" required v-model="password">
        <div class="error" v-show="lpasserr">
            Password Incorrect
        </div>

        <div class="submit">
            <button type="submit">Login</button>
        </div>
        <div class="dont" @click="changesignup">
            Not yet registred ?
        </div>
        
    </form>


</template>

<script>

export default {
    data() 
    {
        return {
            email:"",
            name :'',
            password : '',
            repass : '',
            terms : false ,
            signup : true,
            user : null,
            lpasserr : false,
            spasserr : false,
            UsNoEx : false,


        }
    },
    methods: 
    {
        changesignup(){
            this.signup= !this.signup
            this.email="";
            this.name ='';
            this.password = '';
            this.repass = '';
            this.terms = false ;
            this.user = null;
            this.UsNoEx = false;
            
        },
        login (){
            
            if (this.UsNoEx === false ){
                if (this.password === this.user.password){
                    this.$router.push({name : 'todo' , params:{email : this.email}})
                }
                else{
                    this.password = '';
                    this.lpasserr = true;
                }
            }
            else{
                this.email ='';
                this.password= '';
                this.user = null;

            }
        },
        changespasserr(){
            if (this.password !== this.repass) {
               this.spasserr=true 
            }
        },
        signupf (){
            if (this.password === this.repass && this.user === null) {
                this.addUser();
                this.email="";
                this.name ='';
                this.password = '';
                this.repass = '';
                this.terms = false ;
                this.signup = true;
                this.user = null;
                this.UsNoEx = false;
            }else{
                if (this.user !== null) {
                    this.email="";
                    this.password='';
                    this.repass='';
                    this.UsNoEx = false;
                    this.name ='';
                    this.terms = false ;
                } else {
                    this.password='';
                    this.repass='';
                }

            }
        
        },
        changeusex(){
            this.user=null
        },
        changenousex(){
            this.UsNoEx = false;
        },
        getUser() {
            fetch('http://172.17.0.5:8000/client/'+this.email+'/')
            .then(res => res.json())
            .then(data => this.user = data)
            .catch(err => this.UsNoEx = true )
            this.lpasserr=false
            
        },
        addUser() {
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',                    'Authorization': 'Bearer my-token',
                },
                body: JSON.stringify({ email: this.email ,
                                        name :this.name,
                                        password:this.password })
            };
            fetch('http://172.17.0.5:8000/client/', requestOptions)
            .then(res => res.json())
            .then(data => this.user = data )
            
        }
    },

     

}

</script>
<style>
form{
    max-width: 420px;
    margin: 30px auto;
    background: rgba(84, 199, 136, 0.26);
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}
label{
    color: #146647b2;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}
input{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 2px solid rgba(21, 216, 109, 0.979) ;
    color: #146647b2;
    background: rgba(84, 199, 136, 0.26);
    border-radius: 10px;
    font-size: 17px;
}
input[type="checkbox"]
{
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
}
button{
    background: rgba(84, 199, 136, 0.26);
    padding: 12px 35px;
    margin-top: 15px;
    border: none;
    color: #146647b2;
    border-radius: 20px;
    border-left:4px solid rgba(21, 216, 109, 0.979) ;
    border-right:4px solid rgba(21, 216, 109, 0.979) ;
    border-top: 2px solid rgba(21, 216, 109, 0.979) ;
    border-bottom: 2px solid rgba(21, 216, 109, 0.979) ;
    font-size: 18px;
    cursor: pointer;
}
.submit{
    text-align: center;
}
.dont{
    text-align: center;
    background: rgba(84, 199, 136, 0.26);
    padding: 5px 5px;
    margin-top: 30px;
    margin-left: 80px;
    margin-right: 80px;
    border: none;
    color: #146647b2;
    font-size: 18px;
    cursor: pointer;
}
.error{
    text-align: center;
    background: rgba(19, 148, 120, 0.301);
    padding: 3px 3px;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 50px;
    margin-right: 50px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border: none;
    color: #146647b2;
    font-size: 18px;
    cursor: pointer;
    font-family: "comic sans ms";
    font-style: oblique  ;
}
</style>