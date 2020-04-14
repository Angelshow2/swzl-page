<template>
  <div class="dictMan-container">
    <div class="dictMan-item" v-loading="listLoadingOne">
      <div class="title">院系专业管理</div>
      <div class="depart-container"> 
        <el-tree
          class="tree-container"
          :data="departMajorList"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
        <div class="btn-group">
          <div class="btn-item btn-add" @click="addItem">新增</div>
          <div class="btn-item btn-edit" @click="editItem">修改</div>
          <div class="btn-item btn-delete" @click="deleteItem">删除</div>
        </div>
      </div>
      <!-- 新增窗口 -->
      <div class="dic-dialog" v-if="dialogFlagOne">
        <div class="close el-icon-close" @click="cancelAdd"></div>
        <div class="nav-group">
          <div :class="['nav-item', navActive===1?'nav-active':'']" @click="toDepart">新增院系</div>
          <div :class="['nav-item', navActive===2?'nav-active':'']" @click="toMajor">新增专业</div>
        </div>
        <div v-if="navActive===1" class="depart-content">
          <div class="depart-content-item">
            <div class="depart-item-tit">院系名称</div>
            <el-input v-model="addDepartData.label" size="mini" style="width: 60%;" placeholder="请输入院系名称"></el-input>
          </div>
          <div class="depart-content-item">
            <div class="depart-item-tit">值</div>
            <el-input v-model="addDepartData.value" size="mini" style="width: 60%;" placeholder="请输入值"></el-input>
          </div>
          <div class="depart-btn-group">
            <div class="depart-btn depart-btn-cancel" @click="cancelAdd">取消</div>
            <div class="depart-btn depart-btn-sure" @click="sureAddDepart">确认</div>
          </div>
        </div>

        <div v-if="navActive===2" class="major-content" style="margin-top: 32px;">
          
          <div class="depart-content-item">
            <div class="depart-item-tit">所属院系</div>
            <el-select v-model="addMajorData.depart" placeholder="请选择" size="mini" style="width: 60%;">
              <el-option
                v-for="item in departList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="depart-content-item">
            <div class="depart-item-tit">专业名称</div>
            <el-input v-model="addMajorData.label" size="mini" style="width: 60%;" placeholder="请输入专业名称"></el-input>
          </div>
          <div class="depart-content-item">
            <div class="depart-item-tit">值</div>
            <el-input v-model="addMajorData.value" size="mini" style="width: 60%;" placeholder="请输入值"></el-input>
          </div>
          <div class="depart-btn-group" style="margin-top: 22px;">
            <div class="depart-btn depart-btn-cancel" @click="cancelAdd">取消</div>
            <div class="depart-btn depart-btn-sure" @click="sureAddMajor">确认</div>
          </div>

        </div>





      </div>
      <!-- 修改窗口 -->
      <div class="dic-dialog-edit" v-if="dialogFlagTwo">
        <div class="close el-icon-close" @click="cancelEdit"></div>
        <div class="nav-group">
          <div :class="['nav-item', navActiveEdit===1?'nav-active':'']" @click="toDepartEdit">修改院系</div>
          <div :class="['nav-item', navActiveEdit===2?'nav-active':'']" @click="toMajorEdit">修改专业</div>
        </div>
        <div v-if="navActiveEdit===1" class="depart-content" style="margin-top: 32px;">
          <div class="depart-content-item">
            <div class="depart-item-tit">修改院系</div>
            <el-select v-model="editDepartData.oldValue" placeholder="请选择" size="mini" style="width: 60%;" @change="editDepartChange">
              <el-option
                v-for="item in departList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="depart-content-item">
            <div class="depart-item-tit">院系名称</div>
            <el-input v-model="editDepartData.label" size="mini" style="width: 60%;" placeholder="请输入院系名称"></el-input>
          </div>
          <div class="depart-content-item">
            <div class="depart-item-tit">值</div>
            <el-input disabled v-model="editDepartData.value" size="mini" style="width: 60%;" placeholder="院系值"></el-input>
          </div>
          <div class="depart-btn-group" style="margin-top: 22px;">
            <div class="depart-btn depart-btn-cancel" @click="cancelEdit">取消</div>
            <div class="depart-btn depart-btn-sure" @click="sureEditDepart">确认</div>
          </div>
        </div>

        <div v-if="navActiveEdit===2" class="major-content" style="margin-top: 32px;">
          
          <div class="depart-content-item">
            <div class="depart-item-tit">修改专业</div>
            <el-cascader
              size="mini"
              style="width: 60%;"
              v-model="editMajorData.editMajor"
              :options="departMajorList"
              @change="editMajorChange"></el-cascader>
          </div>
          <!-- <div class="depart-content-item">
            <div class="depart-item-tit">所属院系</div>
            <el-select v-model="editMajorData.depart" placeholder="请选择" size="mini" style="width: 60%;">
              <el-option
                v-for="item in departList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div> -->
          <div class="depart-content-item">
            <div class="depart-item-tit">专业名称</div>
            <el-input v-model="editMajorData.label" size="mini" style="width: 60%;" placeholder="请输入专业名称"></el-input>
          </div>
          <div class="depart-content-item">
            <div class="depart-item-tit">值</div>
            <el-input disabled v-model="editMajorData.oldValue" size="mini" style="width: 60%;" placeholder="专业值"></el-input>
          </div>
          <div class="depart-btn-group" style="margin-top: 22px;">
            <div class="depart-btn depart-btn-cancel" @click="cancelEdit">取消</div>
            <div class="depart-btn depart-btn-sure" @click="sureEditMajor">确认</div>
          </div>

        </div>





      </div>
      <!-- 删除窗口 -->
      <div class="dic-dialog-delete" v-if="dialogFlagThree">
        <div class="close el-icon-close" @click="cancelDelete"></div>
        <div class="nav-group">
          <div :class="['nav-item', navActiveDelete===1?'nav-active':'']" @click="toDepartDelete">删除院系</div>
          <div :class="['nav-item', navActiveDelete===2?'nav-active':'']" @click="toMajorDelete">删除专业</div>
        </div>
        <div v-if="navActiveDelete===1" class="depart-content">
          <div class="depart-content-item" style="margin-top: 70px;">
            <div class="depart-item-tit">删除院系</div>
            <el-select v-model="deleteDepartData.oldValue" placeholder="请选择" size="mini" style="width: 60%;">
              <el-option
                v-for="item in departList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="depart-btn-group" style="margin-top:85px;">
            <div class="depart-btn depart-btn-cancel" @click="cancelDelete">取消</div>
            <div class="depart-btn depart-btn-sure" @click="sureDeleteDepart">确认</div>
          </div>
        </div>

        <div v-if="navActiveDelete===2" class="major-content" style="margin-top: 32px;">
          
          <div class="depart-content-item" style="margin-top: 70px;">
            <div class="depart-item-tit">删除专业</div>
            <el-cascader
              size="mini"
              style="width: 60%;"
              v-model="deleteMajorData.editMajor"
              :options="departMajorList"
              @change="deleteMajorChange"></el-cascader>
          </div>
          <div class="depart-btn-group" style="margin-top:85px;">
            <div class="depart-btn depart-btn-cancel" @click="cancelDelete">取消</div>
            <div class="depart-btn depart-btn-sure" @click="sureDeleteMajor">确认</div>
          </div>

        </div>





      </div>

      <div class="dep-shade" v-if="shadeFlag"></div>
    </div>

    <div class="dictMan-item">
      <div class="title">物品分类管理</div>
    </div>
  </div>
</template>

<script>

import { getDepartList, getMajorList } from '@/api/user.js'
import { newMajor, newDepart, editDepart, editMajor } from '@/api/system/index.js'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      departMajorList: [],
      deparList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      listLoadingOne: false,
      dialogFlagOne: false,
      dialogFlagTwo: false,
      dialogFlagThree: false,
      shadeFlag: false,
      navActive: 1,
      navActiveEdit: 1,
      navActiveDelete: 1,
      departValue: '',
      addDepartData: {
        label: '',
        value: null
      },
      addMajorData: {
        label: '',
        value: null,
        depart: ''
      },
      editDepartData: {
        oldValue: null,
        label: '',
        value: null
      },
      editMajorData: {
        label: '',
        oldValue: null,
        // depart: '',
        editMajor: ''
      },
      deleteDepartData: {
        oldValue: null,
      },
      deleteMajorData: {
        oldValue: null,
        editMajor: null
      },
      
    }
  },
  created() {
    this.listLoadingOne = true
    this.getDepartList()
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    getDepartList() {
      getDepartList()
        .then(res => {
          let data = res.data
          this.departList = data
          for(let i in data) {
            this.getMajorList(data[i].value)
              .then(res => {
                data[i].children = res
                if(i == data.length-1) {
                  this.departMajorList = data
                  this.listLoadingOne = false
                }
              })
          }
        })
    },
    getMajorList(code) {
      return new Promise((resolve, reject) => {
        getMajorList({
          value: code
        })
          .then(res => {
            resolve(res.data)
          })
      })
    },
    addItem() {
      this.dialogFlagOne = true
      this.shadeFlag = true
    },
    editItem() {
      this.dialogFlagTwo = true
      this.shadeFlag = true
    },
    deleteItem() {
      this.dialogFlagThree = true
      this.shadeFlag = true
    },
    toDepart() {
      this.navActive = 1
    },
    toDepartEdit() {
      this.navActiveEdit = 1
    },
    toDepartDelete() {
      this.navActiveDelete = 1
    },
    toMajor() {
      this.navActive = 2
    },
    toMajorEdit() {
      this.navActiveEdit = 2
    },
    toMajorDelete() {
      this.navActiveDelete = 2
    },
    cancelAdd() {
      this.addDepartData = {
        label: '',
        value: null
      }
      this.addMajorData = {
        label: '',
        value: null,
        depart: ''
      }
      this.dialogFlagOne = false
      this.shadeFlag = false
    },
    cancelEdit() {
      this.editDepartData = {
        oldValue: null,
        label: '',
        value: null
      }
      this.editMajorData = {
        label: '',
        value: null,
        depart: '',
        editMajor: ''
      }
      this.dialogFlagTwo = false
      this.shadeFlag = false
    },
    cancelDelete() {
      this.deleteDepartData = {
        oldValue: null,
        label: '',
        value: null
      }
      this.deleteMajorData = {
        label: '',
        value: null,
        depart: '',
        editMajor: ''
      }
      this.dialogFlagThree = false
      this.shadeFlag = false
    },
    sureAddDepart() {
      newDepart({
        account_id: this.$store.state.user.accountid,
        ...this.addDepartData
      })
        .then(res => {
          console.log(res)
          Message({
            message: '新增成功!',
            type: 'success',
            duration: 2 * 1000
          })
          this.cancelAdd()
          this.listLoadingOne = true
          this.getDepartList()
        })
    },
    sureAddMajor() {
      newMajor({
        account_id: this.$store.state.user.accountid,
        ...this.addMajorData
      })
        .then(res => {
          console.log(res)
          Message({
            message: '新增成功!',
            type: 'success',
            duration: 2 * 1000
          })
          this.cancelAdd()
          this.listLoadingOne = true
          this.getDepartList()
        })
    },
    sureDeleteDepart() {
      console.log(this.deleteDepartData)
    },
    sureDeleteMajor() {
      console.log(this.deleteMajorData)
    },
    editDepartChange(e) {
      this.editDepartData.value = e
    },
    deleteDepartChange(e) {
      this.deleteDepartData.value = e
    },
    sureEditDepart() {
      editDepart({
        account_id: this.$store.state.user.accountid,
        ...this.editDepartData
      })
        .then(res => {
          console.log(res)
          Message({
            message: '修改成功!',
            type: 'success',
            duration: 2 * 1000
          })
          this.cancelEdit()
          this.listLoadingTwo = true
          this.getDepartList()
        })
    },
    sureEditMajor() {
      editMajor({
        account_id: this.$store.state.user.accountid,
        ...this.editMajorData
      })
        .then(res => {
          console.log(res)
          Message({
            message: '修改成功!',
            type: 'success',
            duration: 2 * 1000
          })
          this.cancelEdit()
          this.listLoadingTwo = true
          this.getDepartList()
        })
    },
    editMajorChange(e) {
      console.log(e)
      this.editMajorData.oldValue = e[1]
    },
    deleteMajorChange(e) {
      this.deleteMajorData.oldValue = e[1]
    }
  },
}
</script>

<style lang="scss" scoped>

.dictMan-container {
  width: 99%;
  height: 99%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;

  .dictMan-item {
    width: 49%;
    border-radius: 4px;
    background-color: #fff;
    padding: 20px;
    position: relative;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.08);

    .title {
      font-size: 18px;
      line-height: 50px;
      color: #0066ff;
      text-align: center;
      border-bottom: 1px dashed #0066ff;
    }

    .depart-container {
      padding: 30px;
      display: flex;

      .tree-container {
        width: 66%;
        margin: auto;
      }

      .btn-group {

        .btn-item {
          width: 60px;
          line-height: 25px;
          text-align: center;
          margin-bottom: 5px;
          border-radius: 3px;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
        }
        .btn-add {
          background-color: #409EFF;
        } 
        .btn-edit {
          background-color: #409EFF;
        }
        .btn-delete {
          background-color: #F56C6C;
        }
      }
    }

    .dep-shade {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 10;
    }

    .dic-dialog, .dic-dialog-edit, .dic-dialog-delete {
      width: 60%;
      min-height: 300px;
      background-color: #fff;
      position: absolute;
      top: 150px;
      margin-left: 50%;
      left: -30%;
      z-index: 11;
      padding: 7px;
      text-align: right;

      .close {
        cursor: pointer;
        position: relative;
        right: 0;
      }

      .nav-group {
        width: 50%;
        line-height: 30px;
        display: flex;
        margin: auto;
        font-size: 14px;

        .nav-item {
          flex: 1;
          text-align: center;
          border-radius: 3px;
          cursor: pointer;
        }

        .nav-active {
          color: #fff;
          background-color: #409EFF;
        }
      }

      .depart-content, .major-content {
        margin-top: 50px;

        .depart-content-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;

          .depart-item-tit {
            font-size: 14px;
            min-width: 80px;
            margin-right: 10px;
          }
        }

        .depart-btn-group {
          width: 45%;
          line-height: 26px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: auto;
          margin-top: 40px;

          .depart-btn {
            width: 40%;
            text-align: center;
            border-radius: 3px;
            font-size: 14px;
            cursor: pointer;
          }

          .depart-btn-cancel {
            border: 1px solid #e5e5e5;
          }

          .depart-btn-sure {
            color: #fff;
            background-color: #409EFF;
          }
        }
      }
      
    }
  }
}
  
</style>  