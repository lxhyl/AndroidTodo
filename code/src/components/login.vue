<template>
  <div class="page">
    <div class="main">
      <el-tabs type="border-card" v-model="activeName" stretch>
        <el-tab-pane name="logintab" label="SIGN IN">
          <el-form>
            <el-form-item>
              <el-input v-model="loginForm.name" placeholder="Name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="loginForm.password" show-password placeholder="Password"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center;">
              <el-checkbox v-model="loginForm.remember">Remember me</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button @click="loginfn" style="width:100%;" type="primary">CONTINUE</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane name="loguptab" label="SIGN UP">
          <el-form>
            <el-form-item>
              <el-input v-model="logup.mail" placeholder="Mail"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="logup.name" placeholder="Full Name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="logup.password1" placeholder="Password" show-password></el-input>
            </el-form-item>
            <el-form-item style="text-align:center;">
              <el-input v-model="logup.password2" placeholder="Confirm Password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="logupfn" style="width:100%;" type="primary">CONTINUE</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="logup-succeed" v-if="logupSucceed">
      <h3>
        Congratulation!
        <br />You have signed up
        successfully!
        Please log in to the
        app.
      </h3>
      <el-button
        type="primary"
        @click="gotoLogin"
        style="position: fixed;bottom:20%;width:80%;left:0;right: 0;margin: 0 auto;"
      >LOG IN</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "logintab",
      loginForm: {
        name: "",
        password: "",
        remember: false
      },
      logup: {
        mail: "",
        name: "",
        password1: "",
        password2: ""
      },
      logupSucceed: false
    };
  },
  mounted(){
    let name = localStorage.getItem('name');
    if(name){
        this.$router.push('/home')
    }
  },
  methods: {
    logupfn() {
      if (this.logup.mail == "") {
        this.$message("error");
        return;
      }
      if (this.logup.name == "") {
        this.$message("error");
        return;
      }
      if (this.logup.password1 == "") {
        this.$message("error");
        return;
      }
      if (this.logup.password2 == "") {
        this.$message("error");
        return;
      }
      if (this.logup.password1 != this.logup.password2) {
        this.$message("error");
        return;
      }
      this.$axios
        .get(
          `http://zhangpengfan.xyz/todo/logup?mail=${this.logup.mail}&name=${this.logup.name}&password=${this.logup.password1}`
        )
        .then(res => {
          this.logupSucceed = true;
        });
    },
    loginfn() {
      console.log(this.loginForm);
      if (this.loginForm.name == "") {
        this.$message("error");
        return;
      }
      if (this.loginForm.password == "") {
        this.$message("error");
        return;
      }
      this.$axios
        .get(
          `http://zhangpengfan.xyz/todo/login?name=${this.loginForm.name}&password=${this.loginForm.password}`
        )
        .then(res => {
          if (res.data == "succeed") {
            if(this.loginForm.remember){
                localStorage.setItem('name',this.loginForm.name);
                  localStorage.setItem('cookieName',this.loginForm.name);
            }
            this.$message("Log in Successfully");
            this.$router.push('/home');
          }
          
        })
        .catch(err => {
           this.$message("error");
        })
    },
    gotoLogin() {
      this.activeName = "logintab";
      this.logupSucceed = false;
    }
  }
};
</script>

<style scoped>
.page{
    background-color: aliceblue;
    height: 100vh;
    width: 100vw;
    left:0;
    top:0;
    z-index: -1;
    position:absolute;
}
.main {
  position: absolute;
  width: 80%;
  top: 20%;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  background-color: aliceblue;
}
.logup-succeed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 998;
  background-color: aliceblue;
}
h3 {
  text-align: center;
  background-color: white;
  position: fixed;
  top: 20%;
  width: 80%;
  left: 0;
  right: 0;
  margin: 0 auto;
  line-height: 60px;
  border-radius: 20px;
}
</style>