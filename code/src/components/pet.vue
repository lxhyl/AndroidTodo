<template>
  <div>
    <div class="bgd"></div>
    <h3>
      <span @click="routerPage('/home')" class="el-icon-back caidan"></span>
      <span class="user-star">
        {{userjson.star}}
        <span class="el-icon-star-on"></span>
      </span>
    </h3>
    <div>
      <el-carousel trigger="click" height="350px" @change="thisCarousel">
        <el-carousel-item
          v-for="(item,index) in userjson.pet"
          :key="index"
          style="text-align:center;"
        >
          <p style="text-align:center;">Lv{{Math.floor(item.jy/100)}}</p>
          <div v-if="item.name == 'one'">
            <img
              class="petimg"
              v-if="Math.floor(item.jy/100) == 0"
              src="http://zhangpengfan.xyz/todoimg/d1lv0.png"
            />
            <img
              class="petimg"
              v-if="Math.floor(item.jy/100) == 1"
              src="http://zhangpengfan.xyz/todoimg/d1lv1.png"
            />
            <img
              class="petimg"
              v-if="Math.floor(item.jy/100) == 2"
              src="http://zhangpengfan.xyz/todoimg/d1lv2.png"
            />
            <img
              class="petimg"
              v-if="Math.floor(item.jy/100) == 3"
              src="http://zhangpengfan.xyz/todoimg/d1lv3.png"
            />
            <img
              class="petimg"
              v-if="Math.floor(item.jy/100) == 4"
              src="http://zhangpengfan.xyz/todoimg/d1lv4.png"
            />
              <img
              class="petimg"
              v-if="Math.floor(item.jy/100) > 4"
              src="http://zhangpengfan.xyz/todoimg/d1lv4.png"
            />
          </div>
          <div v-if="item.name == 'two'">
            <img
              class="petimg"
              v-if="Math.floor(item.jy/100) == 0"
              src="http://zhangpengfan.xyz/todoimg/d2lv0.png"
            />
            <img
              class="petimg"
              v-if="Math.floor(item.jy/100) == 1"
              src="http://zhangpengfan.xyz/todoimg/d2lv1.png"
            />
            <img
              class="petimg"
              v-if="Math.floor(item.jy/100) == 2"
              src="http://zhangpengfan.xyz/todoimg/d2lv2.png"
            />
            <img
              class="petimg"
              v-if="Math.floor(item.jy/100) == 3"
              src="http://zhangpengfan.xyz/todoimg/d2lv3.png"
            />
            <img
              class="petimg"
              v-if="Math.floor(item.jy/100) == 4"
              src="http://zhangpengfan.xyz/todoimg/d2lv4.png"
            />
             <img
              class="petimg"
              v-if="Math.floor(item.jy/100) > 4"
              src="http://zhangpengfan.xyz/todoimg/d2lv4.png"
            />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="flex-container">
      <div class="flex-item" v-for="(item,index) in userjson.thing" :key="index">
        <img class="flex-item-img" @click="item.show = true" :src="item.img" />
        <p
          v-if='item.jy != "Uneatable"'
          style="heigth:20px;margin:0;text-align:center;font-size:12px;"
        > Exp：{{item.jy}}</p>
        <p
          v-if='item.jy == "Uneatable"'
          style="heigth:20px;margin:0;text-align:center;font-size:12px;"
        >{{item.jy}}</p>
        <el-dialog :visible.sync="item.show" width="70%" center destroy-on-close>
          <span slot="title">{{item.name}}</span>
          <p style="text-align:center;">EXP:{{item.jy}}</p>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="usething(index)">USE</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
     inject: ["reload"],
  data() {
    return {
      userjson: {},
      name: "",
      petindex:0,//当前宠物索引
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
        this.userjson = res.data;
      });
    },
    routerPage(e) {
      this.$router.push(e);
    },
    usething(index){
        this.userjson.thing[index].show = false;
        console.log(index)
        this.$axios.get(`http://zhangpengfan.xyz/todo/usething?name=${this.name}&petindex=${this.petindex}&thingindex=${index}`)
        .then(res => {
            this.reload();
        })
    },
    // 当前索引
    thisCarousel(e){
      this.petindex = e;
    }
  }
};
</script>

<style scoped>
.caidan {
  font-size: 40px;
  margin-left: 10px;
}
.user-star {
  position: absolute;
  right: 20px;
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
.flex-container {
  position: relative;
  margin-top: 20px;
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.flex-item {
  width: 80px;
  height: 100px;
  border: 1px solid #2c3e50;
}
.flex-item-img {
  width: 80px;
  height: 80px;
}
</style>