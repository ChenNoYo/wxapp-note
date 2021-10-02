<template>
  <view class="tabbar-container"
        :style="{height: tabberHeight}">
    <view class="tabbar-container-son">
      <view class="tabbar-item"
            :class="{'active' : fullPath==item.path,'center':!item.text}"
            v-for="(item,i ) in tabbarList"
            :key="i"
            @tap="itemHandle(item)">
        <view class="iconfont"
              :class="'icon-'+item.icon"></view>
        <view class="text">
          <text>{{item.text}}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { common } from '@/utils/mixins'
export default {
  mixins: [common],
  data () {
    return {
      imgNum: 0,
      fullPath: '',
      tabbarList: [{
        icon: 'home',
        path: '/pages/home/index',
        text: '回顾'
      }, {
        icon: 'add',
        path: '/pages/write/index',
      }, {
        icon: 'mine',
        path: '/pages/mine/index',
        text: '我的'
      },]
    };
  },
  created () {
    uni.hideTabBar()
  },
  mounted () {
    let pages = getCurrentPages()
    let page = pages[pages.length - 1]
    this.fullPath = page.$page.fullPath
  },
  methods: {
    itemHandle (item) {
      this.checkAuth(() => {
        uni.switchTab({
          url: item.path
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tabbar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5rpx 0;
  color: #999999;
  z-index: 9;
  background-color: #fff;
  box-sizing: border-box;
  height: 140rpx;
  box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.05);
}

.tabbar-container-son {
  width: 100%;
  height: 140rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.tabbar-container .tabbar-item {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #999999;
  background-color: #fff;
  &.center {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
    box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.2);
    transform: translateY(-25%);
    .iconfont {
      font-size: 60rpx;
    }
  }
  &:not(.center) {
    flex: 1;
  }
  .iconfont {
    font-size: 60rpx;
    width: 60rpx;
    height: 60rpx;
    margin-bottom: 6rpx;
  }
  .text {
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 42rpx;
  }
  &.active {
    color: $main;
  }
}
</style>
