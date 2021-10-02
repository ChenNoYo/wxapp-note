
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const C = db.collection('note')
const api = {
    async add (event) {
        let { OPENID } = cloud.getWXContext()
        let data = await C.add({
            data: {
                createDate: new Date(),
                createBy: OPENID,
                ...event
            }
        })
        return { data, code: 1 }
    },
    async count () {
        let { OPENID } = cloud.getWXContext()
        let data = await C.where({ createBy: OPENID }).count()
        return { data, code: 1 }
    },
    async page (param) {
        let { OPENID } = cloud.getWXContext()
        let { pageSize, pageNum, startDate, endDate } = param
        delete param.pageSize
        delete param.pageNum
        let query = { createBy: OPENID }
        if (startDate && endDate) {
            query.createDate = _.gte(new Date(startDate + ' 00:00:00')).and(_.lte(new Date(endDate + ' 23:59:59')))
        }
        let data = await C.where(query).orderBy('createDate', 'desc')
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
            .get()
        return { data, code: 1, }
    }
}

exports.main = async (event, context) => {
    let action = event.action
    delete event.action
    try {
        return api[action](event)
    } catch (error) {
        return {
            error, event, context
        }
    }
}
