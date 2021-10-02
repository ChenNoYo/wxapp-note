const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    return {
        code: 1,
        data: {
            event,
            context,
            wxContext
        }
    }
}
