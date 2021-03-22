<template>
  <div class="relation">
    <div class="rela">
      <font>我的团队</font>
    </div>
    <el-tree
      :data="treeData"
      :props="defaultProps"
      class="tree"
      node-key="Id"
      :indent="0"
      :default-expanded-keys="expandedData"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <font color="red"> -- </font>
        <span>Id: {{data.Id}}</span>
        <font color="red"> -- </font>
        <span style="padding-right: 100px">姓名: {{data.nickname}}</span>
       </span>
    </el-tree>
    <!------- @node-click="handleNodeClick" -------->
    <div class="bottom">&nbsp;</div>
  </div>
</template>

<script>
import { getRelationData } from '@/api/me'
import { mapState } from 'vuex'
  export default {
    data() {
      return {
        expandedData: [],
        treeData: [],
        defaultProps: {
          children: "children",
          label: "name",
        },
        treeDataTest: [{"Id":21019,"name":"test@admin","gx":"^1^21019","xmb_s":2,"xmb_d":1},{"Id":21022,"name":"test_nike","gx":"^1^21019^21022","xmb_s":2,"xmb_d":1},{"Id":23841,"name":"testn1","gx":"^1^21019^21022^23841","xmb_s":0,"xmb_d":0},{"Id":23913,"name":"test_hnnike","gx":"^1^21019^21022^23913","xmb_s":0,"xmb_d":0},{"Id":23921,"name":"test_dl","gx":"^1^21019^21022^23921","xmb_s":0,"xmb_d":0},{"Id":24070,"name":"test_li","gx":"^1^21019^21022^24070","xmb_s":0,"xmb_d":0.1},{"Id":24343,"name":"test_dl_1","gx":"^1^21019^21022^23921^24343","xmb_s":0,"xmb_d":0},{"Id":25973,"name":"test_uu","gx":"^1^21019^21022^25973","xmb_s":0.4,"xmb_d":0.2},{"Id":25977,"name":"test_gg","gx":"^1^21019^25977","xmb_s":0,"xmb_d":0},{"Id":25978,"name":"test_09ge","gx":"^1^21019^25978","xmb_s":0,"xmb_d":0},{"Id":25979,"name":"test__9987","gx":"^1^21019^25979","xmb_s":0,"xmb_d":0},{"Id":25980,"name":"test_00211","gx":"^1^21019^25980","xmb_s":0,"xmb_d":0},{"Id":25981,"name":"test_770","gx":"^1^21019^25981","xmb_s":0,"xmb_d":0},{"Id":25982,"name":"test_889","gx":"^1^21019^25982","xmb_s":0,"xmb_d":0},{"Id":25986,"name":"test_gett","gx":"^1^21019^25986","xmb_s":0,"xmb_d":0},{"Id":25987,"name":"test_cole","gx":"^1^21019^25987","xmb_s":0,"xmb_d":0},{"Id":25990,"name":"test_88u","gx":"^1^21019^25990","xmb_s":0,"xmb_d":0},{"Id":25992,"name":"test_uuyt","gx":"^1^21019^25992","xmb_s":0,"xmb_d":0},{"Id":25993,"name":"test_final","gx":"^1^21019^25993","xmb_s":0,"xmb_d":0},{"Id":25995,"name":"test_ok","gx":"^1^21019^25995","xmb_s":0,"xmb_d":0},{"Id":26016,"name":"test_hhy","gx":"^1^21019^26016","xmb_s":0.3,"xmb_d":0.1},{"Id":26018,"name":"test_jjt","gx":"^1^21019^21022^26018","xmb_s":0,"xmb_d":0},{"Id":26020,"name":"test_opy","gx":"^1^21019^21022^26020","xmb_s":0,"xmb_d":0},{"Id":26021,"name":"test_hhut","gx":"^1^21019^21022^26021","xmb_s":0,"xmb_d":0},{"Id":26022,"name":"test_dddl","gx":"^1^21019^21022^26022","xmb_s":0.5,"xmb_d":0},{"Id":26247,"name":"test_0dd","gx":"^1^21019^21022^26022^26247","xmb_s":0.1,"xmb_d":0},{"Id":26248,"name":"test_nn99","gx":"^1^21019^21022^26248","xmb_s":0,"xmb_d":0},{"Id":26249,"name":"test_0023","gx":"^1^21019^26249","xmb_s":0,"xmb_d":0},{"Id":26250,"name":"test_0024","gx":"^1^21019^26250","xmb_s":0,"xmb_d":0},{"Id":26251,"name":"test_0025","gx":"^1^21019^26250^26251","xmb_s":0,"xmb_d":0},{"Id":26252,"name":"test_0026","gx":"^1^21019^26250^26252","xmb_s":0,"xmb_d":0},{"Id":26253,"name":"test_0027","gx":"^1^21019^26253","xmb_s":0,"xmb_d":0},{"Id":26254,"name":"test_0028","gx":"^1^21019^26254","xmb_s":0,"xmb_d":0},{"Id":26255,"name":"test_0029","gx":"^1^21019^26255","xmb_s":0,"xmb_d":0},{"Id":26256,"name":"test_0030","gx":"^1^21019^26255^26256","xmb_s":0,"xmb_d":0},{"Id":26257,"name":"test_0031","gx":"^1^21019^26257","xmb_s":0,"xmb_d":0},{"Id":26258,"name":"test_0032","gx":"^1^21019^26258","xmb_s":0,"xmb_d":0},{"Id":26259,"name":"test_0033","gx":"^1^21019^26259","xmb_s":0,"xmb_d":0},{"Id":26260,"name":"test_0034","gx":"^1^21019^26260","xmb_s":0.3,"xmb_d":0}]
      }
    },
    computed: {
      ...mapState({ userInfo: state => state.user.info })
    },
    created() {
      this.getRelation()
      // console.log('treeData ... ', this.treeData)
    },
    methods: {
      getRelation() {
        const reqt = {
          Id: this.userInfo.Id
        }
        getRelationData(reqt).then(resp => {
          // console.log('resp relations data ..', resp)
          this.treeData = resp.data.JsonData.data
          let my = {
            Id: this.userInfo.Id,
            gx: `^${this.userInfo.Id}`,
            level: this.userInfo.level,
            name: this.userInfo.name,
            nickname: this.userInfo.nickname
          }
          this.treeData.unshift(my)
          this.getData(this.treeData)
        }).catch(err => {
          console.error(err)
        })
      },
      handleNodeClick(data) {
        // var Id = data.Id;
        // console.log(data)
        this.expandedData = [];
        this.expandedData.push(data.Id);
        //console.log(this.expandedData)
        // var selectItem = this.$Global.selectInfo.selectItem;
        // this.$Global.selectInfo.selectAgent = data.name;
        // this.$Global.selectInfo.xmb_d = data.xmb_d;
        // this.$Global.selectInfo.xmb_s = data.xmb_s;
        // if (selectItem == "会员管理") {
        //   var sendStr = {
        //     router: "GetMemberInfo",
        //     JsonData: { name: data.name, Id: Id, pageSize: 12, currentPage: 1 },
        //   };
        // }
        // if (selectItem == "代理管理") {
        //   var sendStr = {
        //     router: "GetAgentInfo",
        //     JsonData: { name: data.name, Id: Id, pageSize: 12, currentPage: 1 },
        //   };
        // }
        // if (selectItem == "会员管理" || selectItem == "代理管理")
        //   this.$pomelo.send(sendStr);
        //this.$refs.tree.store.nodesMap[data.id].expanded = true;
      },
      getData(data) {
      // if (!this.wsData.tableData || this.wsData.tableData.length <= 1) return;
      var content = data;
      // console.log('content ........ ', content)
      for (var i = 0; i < content.length; i++) {
        var d = content[i].gx.split("^");
        var dd = d[d.length - 2];
        content[i].pid = dd; // 上家的id
        content[i].children = [];
      }
      // console.log("expandedData:",this.expandedData)
      let dataArray = [];
      var self = this;
      content.forEach(function (data) {
        let pid = data.pid;
        if (data.Id == self.userInfo.Id) {
          let objTemp = {
            Id: data.Id,
            name: data.name,
            gx: data.gx,
            pid: pid,
            nickname: data.nickname
            // xmb_s: data.xmb_s,
            // xmb_d: data.xmb_d,
          };
          dataArray.push(objTemp);
        }
      });
      this.deepSort(content, dataArray);
    },
    deepSort(datas, dataArray) {
      for (let j = 0; j < dataArray.length; j++) {
        let dataArrayIndex = dataArray[j];
        let childrenArray = [];
        let Id = dataArrayIndex.Id;
        for (let i = 0; i < datas.length; i++) {
          let data = datas[i];
          let pid = data.pid;
          if (pid == Id) {
            //判断是否为儿子节点
            let objTemp = {
              Id: data.Id,
              name: data.name,
              gx: data.gx,
              pid: pid,
              nickname: data.nickname,
              // xmb_s: data.xmb_s,
              // xmb_d: data.xmb_d,
            };
            childrenArray.push(objTemp);
          }
        }
        dataArrayIndex.children = childrenArray;
        if (childrenArray.length > 0) {
          //有子节点则递归
          this.deepSort(datas, childrenArray);
        }
      }
      this.treeData = dataArray; //treeData
      // console.log('dataArray ... ... .. ', dataArray)
      return dataArray;
    },
    }
  }
</script>

<style lang="scss" scoped>
.relation {
  margin-top: 46px;
  background: #f7f8fa;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  .rela {
    font{
      color: grey;
      margin-left: 10px;
      line-height: 35px;
      border-left: 3px solid red;
      padding-left: 5px;
    }
  }
}

.bottom {
  position: relative;
  margin-bottom: 50px;
}

.custom-tree-node{
  font{
    line-height: 20px;
  }
}
</style>

<style>
.el-tree-node__expand-icon.is-leaf::before {
  display: none;
}
.el-tree-node__content>.el-tree-node__expand-icon{
  color: red !important;
}
.tree /deep/ .el-tree-node {
  position: relative;
  padding-left: 15px;
}
.el-tree {
  height: 80vh;
  width: 100%;
  overflow-x: scroll;
}

.el-tree>.el-tree-node {
  display: inline-block;
  min-width: 100%;
}

.tree /deep/ .el-tree-node__children {
  padding-left: 5px;
  overflow-x: scroll;
}

.tree /deep/ .el-tree-node :last-child:before {
  height: 38px;
}

.tree /deep/ .el-tree > .el-tree-node:before {
  border-left: none;
}

.tree-container /deep/ .el-tree > .el-tree-node:after {
  border-top: none;
}

.tree /deep/ .el-tree-node:before {
  content: "";
  left: -5px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree /deep/ .el-tree-node:after {
  content: "";
  left: -5px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree /deep/ .el-tree-node:before {
  border-left: 1px double #ee0a24;
  bottom: 0px;
  height: 100%;
  top: -26px;
  width: 1px;
}

.tree /deep/ .el-tree-node:after {
  border-top: 1px dashed #ee0a24;
  height: 20px;
  top: 12px;
  width: 24px;
}

/* .el-tree-node.is-current > .el-tree-node__content {
    background-color: #1989fa4d !important;
    color: red;
} */
</style>
