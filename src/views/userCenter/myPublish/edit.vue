<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="650px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      top="2vh">

      <el-form :model="formData" ref="formData" label-width="100px" :rules="rules">
        <el-form-item label="物品标题" prop="title">
          <el-input :disabled="!btnFlag" v-model="formData.title" type="text" placeholder="请输入标题" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="物品描述" prop="desc">
          <el-input :disabled="!btnFlag" type="textarea" v-model="formData.desc" placeholder="请输入物品描述" :rows="3" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="物品分类" prop="itemclass">
          <el-select :disabled="!btnFlag" style="width: 200px; margin-right: 20px;" v-model="formData.itemclass" placeholder="请选择物品分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="text + '地点'" prop="site">
          <el-input :disabled="!btnFlag" v-model="formData.site" type="text" :placeholder="'请输入' + text + '地点'" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item :label="text + '时间'" prop="occur_time">
          <el-date-picker
            :disabled="!btnFlag"
            v-model="formData.occur_time"
            type="datetime"
            :placeholder="'请选择' + text + '时间'"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 200px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式" prop="contcat">
          <el-input :disabled="!btnFlag" v-model="formData.contcat" type="text" placeholder="请输入联系方式" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="物品图片" prop="img_url">
          <el-upload
            :disabled="!btnFlag"
            class="avatar-uploader"
            :action="URL + '/user/lostitemimg'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="llj-swzl">
            <img v-if="formData.img_url" :src="URL + formData.img_url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <div class="btn-group">
          <el-button @click="cancelPublish">取消</el-button>
          <el-button @click="editItem" type="primary" :disabled="!btnFlag">{{ btnText }}</el-button>  
        </div>



      </el-form>

    </el-dialog>
  </div>
</template>

<script>

import { getItemClass, updateUserLost, updateUserPick } from '@/api/myPublish/index'

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
        return callback(new Error('请填写' + this.text + '地点！'))
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
    var checkOccurTime = (rule, value, callback) => {
      if(value === '') {
        return callback(new Error('请填写' + this.text + '时间！'))
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
      title: '我的失物',
      text: '丢失',
      btnText: '',
      btnFlag: null,
      options: [],
      formData: {
        title: '',
        itemclass: null,
        desc: '',
        site: '',
        contcat: '',
        occur_time: '',
        img_url: '',
      },
      rules: {
        title: [
          { validator: checkTitle, trigger: 'blur' }
        ],
        itemclass: [
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
        occur_time: [
          { validator: checkOccurTime, trigger: 'blur' },
        ],
        img_url: [
          { validator: checkImgUrl, trigger: 'blur' },
        ]
      },
      // URL: ''
    };
  },
  created() {
    this.getItemClass()
    // this.URL = window.location.origin
    // console.log(window.location.origin)
  },
  methods: {
    handleClose(done) {
      // this.$emit('update-list')
      done()
    },
    handleAvatarSuccess(res, file) {
      this.lostData.imageUrl = res.data
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
      // this.$emit('update-list')
      this.dialogVisible = false
    },
    editItem() {
      this.$refs['formData'].validate(valid => {
        if(valid) {
          if(this.text === '丢失') {
            updateUserLost({
              title: this.formData.title,
              desc: this.formData.desc,
              itemclass: this.formData.itemclass,
              img_url: this.formData.img_url,
              occur_time: this.formData.occur_time,
              site: this.formData.site,
              contcat: this.formData.contcat,
              account_id: this.$store.state.user.accountid,
              id: this.formData.id
            })
              .then(res => {
                console.log(res)
                this.$emit('update-list')
                this.dialogVisible = false
              })
          } else if(this.text === '拾取') {
            updateUserPick({
              title: this.formData.title,
              desc: this.formData.desc,
              itemclass: this.formData.itemclass,
              img_url: this.formData.img_url,
              occur_time: this.formData.occur_time,
              site: this.formData.site,
              contcat: this.formData.contcat,
              account_id: this.$store.state.user.accountid,
              id: this.formData.id
            })
              .then(res => {
                console.log(res)
                this.$emit('update-list')
                this.dialogVisible = false
              })
          }
          
        } else {
          return false
        }
      })


    },


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