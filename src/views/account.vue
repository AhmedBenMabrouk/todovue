<template>
    <br>
    <div class="dont" @click="todo">
        To Do List 
    </div>
    <div class="dont" @click="logout">
         Log Out  
    </div>
    <div v-show="user !== '{}'">
        <div class="ahmed">
            <label >Account</label>
            <div  class="pill" >
                Email : {{user.email}}
            </div>
            <div  class="pill" >
                Name : {{user.name}}
            </div>
        </div>
    </div>
    <div v-show="user === '{}'">
        <div  class="pill" >
                Loading
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            email : this.$route.params.email,
            user : {},
        }
    },
    methods: {
        logout(){
             this.$router.push({name : 'login'})
        },
        todo(){
             this.$router.push({name : 'todo' , 
                                params:{email : this.email}})
        }
    },
    mounted() {
            fetch('http://127.0.0.1:8000/client/'+this.email)
            .then(res => res.json())
            .then(data => this.user = data)
            .catch(err => this.UsNoEx = true )
    },
}
</script>
<style scoped>
.ahmed{
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
.pill{
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background : rgba(84, 199, 136, 0.26);
    border-radius: 20px;
    letter-spacing: 1px;
    color: #146647b2;
    cursor: pointer;
    font-size: 20px;
    border-left:3px solid rgba(21, 216, 109, 0.979) ;
    border-right:3px solid rgba(21, 216, 109, 0.979) ;
}
.delete{
    float: right;
    padding: 0px 7px;
    background : rgba(84, 199, 136, 0.26);
    border-radius: 500px;
    letter-spacing: 1px;
    color: #146647b2;
    cursor: pointer;
    font-size: 20px;
    border:1px solid rgba(22, 168, 88, 0.979) ;
    position: 10px 10px 10px 10px;
}
.dont{
    text-align: center;
    background: rgba(84, 199, 136, 0.26);
    padding: 5px 5px;
    margin-top: 30px;
    margin-left: 50px;
    margin-right: 50px;
    border: none;
    color: #146647b2;
    font-size: 35px;
    cursor: pointer;
    display: inline-block;
    font-family:'Brush Script MT';
}
</style>