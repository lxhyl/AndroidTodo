<template>
  <div>
    <div class="bgd"></div>
    <h3 style="z-index:10;">
      <span @click="routerPage('/home')" class="el-icon-back caidan"></span>
      <span class="shop">SHOP</span>
      <span class="user-star">
        {{userjson.star}}
        <span class="el-icon-star-on"></span>
      </span>
    </h3>
    <div class="flex-container">
      <div class="flex-item" v-for="(item,index) in list" :key="index">
        <img class="flex-item-img" @click="item.show = true" :src="item.img" />
        <el-dialog :visible.sync="item.show" width="70%" center destroy-on-close>
          <span slot="title">{{item.name}}</span>
          <div class="itemdes">
              <p>{{item.des}}</p>
              <p>Experience:{{item.jy}}</p>
              <p>Cost:{{item.price}}<span class="el-icon-star-on"></span></p>
          </div>
          
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="buy(index)">PURCHASE</el-button>
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
      list: [],
      name: "",
      userjson: {},
      centerDialogVisible: false
    };
  },
  created() {
    this.name = localStorage.getItem("cookieName");
  },
  mounted() {
    this.getjson();
    this.getThings();
  },
  methods: {
    getThings() {
      this.$axios.get(`http://zhangpengfan.xyz/todo/getthings`).then(res => {
        this.list = res.data.wp;
      });
    },
    getjson() {
      this.$axios.get(`http://zhangpengfan.xyz/todo/getjson?name=${this.name}`).then(res => {
        this.userjson = res.data;
      });
    },
    routerPage(e) {
      this.$router.push(e);
    },
    buy(index){
       
        this.$axios.get(`http://zhangpengfan.xyz/todo/buything?name=${this.name}&index=${index}`)
        .then(res => {
            if(res.data == 'cg'){
                this.$message('succeed');
                this.reload();
                this.list[index].show = false;
            
            }
            if(res.data == 'sb'){
                 this.$message('Star not enough')
            }
        })
    }
  }
};
</script>

<style scoped>
.caidan {
  font-size: 40px;
  margin-left: 10px;
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
.user-star {
  position: absolute;
  right: 20px;
  line-height: 40px;
}
.flex-container {
  position: relative;
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.flex-item {
  width: 80px;
  height: 80px;
  border: 1px solid #2c3e50;
}
.flex-item-img {
  width: 80px;
  height: 80px;
}
.itemdes > p{
    width: 100%;
    text-align: center;
}
.shop{
    position:absolute;
    height: 40px;
    line-height: 40px;
    width: 40%;
    text-align: center;
    left:30%;
}
</style>