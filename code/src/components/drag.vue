<template>
  <div>
    <div class="bgd"></div>
    <h3>
      <span @click="routerPage('/home')" class="el-icon-back caidan"></span>
      <span class="title">COLLECTION</span>
    </h3>
    <div>
      <el-carousel trigger="click" height="400px">
        <el-carousel-item v-if="petone" style="text-align:center;">
          <img class="petimg" src="http://zhangpengfan.xyz/todoimg/d1lv1.png" />
          <p>A happy normal dragon. Just feed them and they will grow.</p>
        </el-carousel-item>
         <el-carousel-item v-if="!petone" style="text-align:center;">
          <img class="petimg" src="http://zhangpengfan.xyz/todoimg/unkownPet.png" />
          <p>???</p>
        </el-carousel-item>
        <el-carousel-item v-if="pettwo" style="text-align:center;">
          <img class="petimg" src="http://zhangpengfan.xyz/todoimg/d2lv1.png" />
          <p>Usually proud of their colour, they live near the water and love rainy day.</p>
        </el-carousel-item>
        <el-carousel-item v-if="!pettwo" style="text-align:center;">
          <img class="petimg" src="http://zhangpengfan.xyz/todoimg/unkownPet.png" />
          <p>???</p>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      petone: false,
      pettwo: false
    };
  },
  created() {
    this.name = localStorage.getItem("cookieName");
  },
  mounted() {
    this.getjson();
  },
  methods: {
    getjson() {
      this.$axios.get(`http://zhangpengfan.xyz/todo/getjson?name=${this.name}`).then(res => {
        let pet = res.data.pet;
        for (let i = 0; i < pet.length; i++) {
          if (pet[i].name) {
            if (pet[i].name == "two") {
              this.pettwo = true;
            }
            if(pet[i].name == 'one'){
              this.petone = true;
            }
          }
        
        }
      });
    },
    routerPage(e) {
      this.$router.push(e);
    }
  }
};
</script>

<style scoped>
.caidan {
  font-size: 40px;
  margin-left: 10px;
  height: 40px;
  line-height: 40px;
}
.bgd {
  position: fixed;
  left: 0;
  top: 0;
  background-color: aliceblue;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
.petimg {
  width: 300px;
  height: 300px;
}
.title{
    position:absolute;
    height: 40px;
    line-height: 40px;
    width: 60%;
    text-align: center;
    left:20%;
}
</style>