<template>
  <div class="page"
       :style="{paddingBottom: tabberHeight}">
    <div class="box df">
      <div class="avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <div class="nickname">{{userInfo.nickName}}
        <view v-if="userInfo.gender"
              class="iconfont icon-man"></view>
        <view v-else
              class="iconfont icon-women"></view>
      </div>
    </div>
    <div class="box"
         v-if="total">
      记忆条数:{{total}}
    </div>
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
      total: 0
    }
  },
  components: {
  },
  mounted () {
    this.$api.count().then(res => {
      this.total = res.total
    })
  },
  watch: {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  overflow: hidden;
  border: 1rpx solid #ccc;
  margin: 20px;
}
.nickname {
  display: flex;
  align-items: center;
  .iconfont {
    margin-left: 10rpx;
  }
}
</style>