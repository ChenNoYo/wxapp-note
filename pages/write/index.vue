<template>
  <div class="page add"
       :style="{paddingBottom: tabberHeight}">
    <uni-easyinput type="textarea"
                   maxlength="200"
                   placeholder="写点什么"
                   :clearable="true"
                   v-model="form.content" />
    <img :src="form.imgUrl"
         v-if="form.imgUrl"
         mode="widthFix">
    <button class="u-button large info"
            hover-class="btn-hover"
            @tap="uploadImg">{{form.imgUrl?'换':'给'}}张图吧</button>
    <button class="u-button large primary"
            :disabled="!form.content"
            hover-class="btn-hover"
            @tap="sumbit">保存</button>
    <button class="u-button large sub"
            hover-class="btn-hover"
            @tap="goIndex"
            style="margin-bottom:60rpx;">取消</button>
    <base-tabbar></base-tabbar>
  </div>
</template>

<script>
import { common } from '@/utils/mixins'
export default {
  mixins: [common],
  name: '',
  props: {
    propName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: {
        content: '',
        imgUrl: ''
      }
    }
  },
  methods: {
    // 上传图片
    uploadImg () {
      uni.chooseImage({
        count: 1,
        success: (imageRes) => {
          this.form.imgUrl = imageRes.tempFilePaths[0] || imageRes.tempFiles[0]
        }
      })
    },
    async sumbit () {
      try {
        let imgRes = {}
        // 上传图片
        if (this.form.imgUrl) {
          uni.showLoading({
            title: '图片上传中...',
            mask: true
          })
          let suffix = /\.\w+$/.exec(this.form.imgUrl)[0]
          imgRes = await wx.cloud.uploadFile({
            cloudPath: 'note/' + new Date().getTime() + suffix, // 上传至云端的路径
            filePath: this.form.imgUrl, // 小程序临时文件路径
          })
        }
        uni.showLoading({
          title: '记录中...',
          mask: true
        })
        this.$api.addNote({ content: this.form.content, imgUrl: imgRes.fileID || '' }).then(() => {
          uni.hideLoading()
          this.form = {
            content: '',
            imgUrl: ''
          }
          this.goIndex()
        }).catch(() => {
          uni.hideLoading()
        })
      } catch (err) {
        console.log('err: ', err);
      }
    },
    goIndex () {
      uni.switchTab({
        url: '/pages/home/index'
      })
    }
  },
}
</script>

<style lang="scss">
.add {
  padding: 0 30rpx;
  .uni-easyinput {
    textarea {
      height: 300rpx;
    }
  }
  img {
    width: 100%;
    margin: 8rpx 0;
  }
  button {
    margin-top: 30rpx;
  }
}
</style>