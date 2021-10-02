
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const C = db.collection('user')
const api = {
    async login (event) {
        const wxContext = cloud.getWXContext()
        return await selectOne('user', { _openId: wxContext.OPENID })
    },
    async registered (event) {
        const wxContext = cloud.getWXContext()
        let doc = await selectOne('user', { _openId: wxContext.OPENID })
        if (doc._id) {
            return { data: doc, code: 1 }
        } else {
            let data = await C.add({
                data: {
                    _openId: wxContext.OPENID,
                    _unionId: wxContext.UNIONID,
                    createDate: new Date(),
                    ...event
                }
            })
            return { data, code: 1 }
        }
    }
}

async function selectOne (database, params) {
    const wxContext = cloud.getWXContext()
    return db.collection(database).where(params)
        .get().then(res => {
            if (res.data.length) {
                return { data: res.data[0], code: 1 }
            } else {
                return { data: wxContext, code: 1 }
            }
        })
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
