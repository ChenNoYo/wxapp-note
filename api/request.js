export default function (name, action, data) {
  return new Promise((resolve, reject) => {
    try {
      wx.cloud.callFunction({
        name,
        data: {
          action,
          ...data
        }
      }).then((res) => {
        if (res.result.code) {
          resolve(res.result.data)
        } else {
          uni.showToast({
            title: res.result.message,
            icon: 'error',
            mask: true
          })
          reject(res)
        }
      });
    } catch (e) {
      uni.showToast({
        title: e,
        icon: 'error',
        mask: true
      })
      reject(e)
    }
  })
}