<template>
  <div class="page">
    <div class="bgd"></div>
    <span @click="dialogFormVisible = true;">
      <el-avatar :size="60" class="addTodo" icon="el-icon-plus"></el-avatar>
    </span>
    <el-dialog title="Add New Task" :visible.sync="dialogFormVisible" width="80%">
      <el-form>
        <el-form-item>
          <el-input v-model="addData.title" placeholder="Title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addData.des" placeholder="Task content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="addData.startTime" type="date" placeholder="Start Date"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="addData.endTime" type="date" placeholder="End Date"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <label>Difficulty:</label>
          <el-rate v-model="addData.nd"></el-rate>
        </el-form-item>
        <el-button @click="addTodo" type="primary" style="width:100%;">ADD</el-button>
      </el-form>
    </el-dialog>

    <h3>
      <span @click="routerPage('/home')" class="el-icon-back caidan"></span>
    </h3>
    <h3 style="width:90vw;margin-left:10vw;">All Tasks</h3>

    <div class="flex-container">
      <div class="flex-item" v-for="(item,index) in list" :key="index">
        <span class="item-time">{{item.endTime | toTime}}</span>
        <p class="item-title">{{item.title}}</p>
        <p class="item-des">{{item.des}}</p>
        <p class="item-footer">
          <el-row>
            <el-col :span="3">
              <span v-if="item.nd == 1">20</span>
              <span v-if="item.nd == 2">40</span>
              <span v-if="item.nd == 3">60</span>
              <span v-if="item.nd == 4">80</span>
              <span v-if="item.nd == 5">100</span>
            </el-col>
            <el-col :span="15">
              <span class="el-icon-star-on"></span>
            </el-col>
            <el-col :span="2">
              <span @click="xgtd(index)" class="el-icon-edit"></span>
              <el-dialog title="Edit Task" :visible.sync="dialogChangeTask" width="80%">
                <el-form>
                  <el-form-item>
                    <el-input v-model="task.title" placeholder="Title"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="task.des" placeholder="Task content"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-date-picker v-model="task.startTime" type="date" placeholder="Start Date"></el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-date-picker v-model="task.endTime" type="date" placeholder="End Date"></el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <label>Difficulty:</label>
                    <el-rate v-model="task.nd"></el-rate>
                  </el-form-item>
                  <el-button @click="changeTask" type="primary" style="width:100%;">ADD</el-button>
                </el-form>
              </el-dialog>
            </el-col>
            <el-col :span="2">
              <el-popover placement="top" width="160" v-model="visible">
                <p>Do you want to delete this task?</p>
                <div style="text-align: right; margin: 0">
                  <el-button type="primary" size="mini"  @click="visible = false">no</el-button>
                  <el-button type="primary" size="mini" @click="sctd(item.id)">yes</el-button>
                </div>
                <span slot="reference" class="el-icon-close"></span>
              </el-popover>
            </el-col>
            <el-col :span="2">
              <span @click=" wctd(item.id)" class="el-icon-check"></span>
            </el-col>
          </el-row>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      dialogFormVisible: false, //新建todo
      dialogChangeTask: false, //修改todo
      drawer: false, //侧边栏
      addData: {
        title: "",
        des: "",
        startTime: "",
        endTime: "",
        nd: 0,
        name: "",
        id: ""
      },
      list: [], //渲染列表
      userjson: {}, //用户数据
      task: {}, //要修改的task内容
      name: "",
      visible:false,
    };
  },
  created() {
    this.addData.name = localStorage.getItem("cookieName");
    this.name = localStorage.getItem("cookieName");
  },
  mounted() {
    this.getjson();
  },
  methods: {
    //新建todo
    addTodo() {
      this.addData.id = new Date().getTime();
     
      for (let obj in this.addData) {
      
        if (this.addData[obj] == "") {
          this.$message("内容不能为空");
          return;
        }
      }
      this.$axios.post("http://zhangpengfan.xyz//todo/addtodo", this.addData).then(res => {
        this.reload();
        this.addData.title = this.addData.des = this.addData.startTime = this.addData.endTime = this.addData.name = this.addData.id =
          "";
        this.addData.nd = 0;
        this.dialogFormVisible = false;
      });
    },
    //get数据
    getjson() {
      this.$axios.get(`http://zhangpengfan.xyz//todo/getjson?name=${this.addData.name}`).then(res => {
        this.userjson = res.data;
        let arr = res.data.todo;
        function compare(property) {
          
          return function(a, b) {
            var value1 =new Date(a[property]).getTime();
            var value2 = new Date(b[property]).getTime();
            return value1 - value2;
         }; 
        }
        arr.sort(compare('startTime'));
        this.list = this.list.concat(arr);
      });
    },
    // 修改todo
    xgtd(index) {
      let json = this.list[index];
      this.task = json;
      this.dialogChangeTask = true;
    },
    //确定修改
    changeTask() {
      this.$axios.post("http://zhangpengfan.xyz/todo/changetodo", this.task).then(res => {
        this.reload();
        this.dialogChangeTask = false;
      });
    },
    //删除todo
    sctd(id) {
      this.$axios.get(`http://zhangpengfan.xyz/todo/sctd?name=${this.name}&id=${id}`).then(res => {
        this.reload();
      });
    },
    //完成todo
    wctd(id) {
      this.$axios.get(`http://zhangpengfan.xyz/todo/wctd?name=${this.name}&id=${id}`).then(res => {
        this.reload();
      });
    },
    routerPage(e){
        this.$router.push(e);
    }
  }
};
</script>

<style scoped>
.page {
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  background-color: aliceblue;
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
.caidan {
  font-size: 40px;
  margin-left: 10px;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 10px;
  background-color: aliceblue;
}
.flex-item {
  width: 80vw;
  border: solid 1px #90a4ae;
  background-color: white;
  border-radius: 10px;
  position: relative;
  margin: 10px 0;
}
.addTodo {
  position: fixed;
  top: 80vh;
  right: 10vw;
  background-color: #409eff;
  z-index: 100;
}
.caidan > p {
  width: 100%;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
}
.item-time {
  position: absolute;
  right: 5px;
  height: 20px;
  font-size: 12px;
  color: #90a4ae;
}
.item-title {
  width: 80%;
  margin-top: 20px;
  margin-left: 10%;
  text-align: center;
  border-bottom: 1px solid #90a4ae;
}
.item-des {
  width: 80%;
  font-size: 14px;
  margin-left: 10%;
}
.item-footer {
  width: 80%;
  margin-left: 10%;
}
.user-star {
  position: absolute;
  right: 20px;
  line-height: 40px;
}
</style>