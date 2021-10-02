<template>
  <div class="page pd"
       :style="{paddingBottom: tabberHeight}">
    <div class="time-select"
         v-if="dataList.length || (startDate && endDate)">
      <template v-if="startDate && endDate">
        <div>{{startDate}} <span>{{startDate&&endDate&&'至'}}</span> {{endDate}}</div>
        <u-button type="primary"
                  size="mini"
                  @click="cancel">取消</u-button>
      </template>
      <div v-else
           class="tip"
           @click="show=true">请选择搜索的时间段</div>
    </div>
    <u-calendar v-model="show"
                @change="change"
                mode="range"></u-calendar>
    <div class="note-list">
      <div class="note-item"
           v-for="note in dataList"
           :key="note._id">
        <p class="time"> {{$tools.formatDate(note.createDate, 'MM月dd日 hh:mm')}}</p>
        <p class="content"> {{note.content}}</p>
        <img :src="note.imgUrl"
             mode="widthFix"
             v-if="note.imgUrl">
      </div>
      <uni-load-more :status="more"></uni-load-more>
    </div>
    <button v-if="!dataList.length && !startDate && !endDate && more != 'loading'"
            class="u-button large info"
            hover-class="btn-hover"
            @tap="goWrite">试一笔</button>
    <base-tabbar></base-tabbar>
  </div>
</template>

<script>
import { common, getData } from '@/utils/mixins'
export default {
  mixins: [common, getData],
  name: '',
  props: {
    propName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false,
      startDate: '',
      endDate: '',
    }
  },
  methods: {
    change (date) {
      this.startDate = date.startDate
      this.endDate = date.endDate
      this.loadData(true)
    },
    cancel () {
      this.startDate = ''
      this.endDate = ''
      this.loadData(true)
    },
    async getData (param) {
      param.startDate = this.startDate
      param.endDate = this.endDate
      let res = await this.$api.page(param)
      return res.data
    },
    goWrite () {
      this.checkAuth(() => {
        uni.switchTab({
          url: '/pages/write/index'
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.time-select {
  display: flex;
  div {
    height: 60rpx;
    line-height: 60rpx;
    flex: 1;
    margin: 0 8rpx;
    &.tip {
      color: #636e72;
      border: 1rpx solid #b2bec3;
      border-radius: 6rpx;
      padding: 0 10rpx;
    }
    span {
      margin: 0 8rpx;
    }
  }
}
.note-list {
  margin: 30rpx 0 60rpx;
  min-height: 400rpx;
  .note-item {
    background: #f8efba;
    border-radius: 10rpx;
    margin-bottom: 15rpx;
    padding: 30rpx;
    .time {
      text-align: right;
      font-size: 24rpx;
      color: #25ccf7;
    }
    .content {
      color: #2c3a47;
      text-indent: 20rpx;
      font-size: 28rpx;
      line-height: 40rpx;
      margin: 8rpx 0;
    }
    image {
      width: 100%;
    }
  }
}
</style>