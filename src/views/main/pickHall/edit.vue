<template>
  <div>
    <el-dialog
      title="发布拾物"
      :visible.sync="dialogVisible"
      width="650px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      top="2vh">

      <el-form :model="pickData" ref="pickData" label-width="100px" :rules="rules">
        <el-form-item label="物品标题" prop="title">
          <el-input v-model="pickData.title" type="text" placeholder="请输入标题" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="物品描述" prop="desc">
          <el-input type="textarea" v-model="pickData.desc" placeholder="请输入物品描述" :rows="3" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="物品分类" prop="itemClass">
          <el-select style="width: 200px; margin-right: 20px;" v-model="pickData.itemClass" placeholder="请选择物品分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拾取地点" prop="site">
          <el-input v-model="pickData.site" type="text" placeholder="请输入拾取地点" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="拾取时间" prop="pickTime">
          <el-date-picker
            v-model="pickData.pickTime"
            type="datetime"
            placeholder="请选择拾取时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 200px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式" prop="contcat">
          <el-input v-model="pickData.contcat" type="text" placeholder="请输入联系方式" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="物品图片" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:8080/user/pickitemimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="llj-swzl">
            <img v-if="pickData.imageUrl" :src="pickData.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <div class="btn-group">
          <el-button @click="cancelPublish">取消</el-button>
          <el-button @click="publistPick" type="primary">发布</el-button>  
        </div>



      </el-form>

    </el-dialog>
  </div>
</template>

<script>

import { getItemClass, publishPick } from '@/api/pickHall/index'

export default {
  data() {
    var checkTitle = (rule, value, callback) => {
      if(value === '') {
        return callback(new Error('请填写标题！'))
      } else {
        callback()
      }
    }
    var checkItemClass = (rule, value, callback) => {
      if(value === null) {
        return callback(new Error('请选择物品分类！'))
      } else {
        callback()
      }
    }
    var checkDesc = (rule, value, callback) => {
      if(value === '') {
        return callback(new Error('请填写物品描述！'))
      } else {
        callback()
      }
    }
    var checkSite = (rule, value, callback) => {
      if(value === '') {
        return callback(new Error('请填写拾取地点！'))
      } else {
        callback()
      }
    }
    var checkContcat = (rule, value, callback) => {
      if(value === '') {
        return callback(new Error('请填写联系方式！'))
      } else {
        callback()
      }
    }
    var checkpickTime = (rule, value, callback) => {
      if(value === '') {
        return callback(new Error('请填写拾取时间！'))
      } else {
        callback()
      }
    }
    var checkImgUrl = (rule, value, callback) => {
      if(value === '') {
        return callback(new Error('请上传图片！'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      options: [],
      pickData: {
        title: '',
        itemClass: null,
        desc: '',
        site: '',
        contcat: '',
        pickTime: '',
        imageUrl: '',
      },
      rules: {
        title: [
          { validator: checkTitle, trigger: 'blur' }
        ],
        itemClass: [
          { validator: checkItemClass, trigger: 'blur' }
        ],
        desc: [
          { validator: checkDesc, trigger: 'blur' },
        ],
        site: [
          { validator: checkSite, trigger: 'blur' },
        ],
        contcat: [
          { validator: checkContcat, trigger: 'blur' },
        ],
        pickTime: [
          { validator: checkpickTime, trigger: 'blur' },
        ],
        imageUrl: [
          { validator: checkImgUrl, trigger: 'blur' },
        ]
      }
    };
  },
  created() {
    this.getItemClass()
  },
  methods: {
    handleClose(done) {
      this.dataInit()
      this.$emit('update-list')
      done()
    },
    handleAvatarSuccess(res, file) {
      this.pickData.imageUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('只能上传JPG和PNG格式的图片！');
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
        return false
      }
      return true
    },
    getItemClass() {
      getItemClass()
        .then(res => {
          console.log(res.data)
          this.options = res.data
        })
    },
    cancelPublish() {
      this.dataInit()
      this.$emit('update-list')
      this.dialogVisible = false
    },
    publistPick() {
      this.$refs['pickData'].validate(valid => {
        if(valid) {
          publishPick({
            title: this.pickData.title,
            desc: this.pickData.desc,
            itemclass: this.pickData.itemClass,
            img_url: this.pickData.imageUrl,
            occur_time: this.pickData.pickTime,
            site: this.pickData.site,
            contcat: this.pickData.contcat,
            account_id: this.$store.state.user.accountid,
          })
            .then(res => {
              console.log(res)
              this.$emit('update-list')
              this.dialogVisible = false
              this.dataInit()
            })
        } else {
          return false
        }
      })

      
      
    },
    dataInit() {
      this.pickData.title = ''
      this.pickData.itemClass = null
      this.pickData.desc = ''
      this.pickData.site = ''
      this.pickData.contcat = ''
      this.pickData.pickTime = ''
      this.pickData.imageUrl = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    max-width: 178px;
    max-height: 178px;
    display: block;
  }
  .btn-group {
    text-align: center;
  }
</style>