
const cloud = require('wx-server-sdk')
cloud.init()
const fs = require('fs')
const path = require('path')
const api = {
    async upload (event) {
        const fileStream = fs.createReadStream(path.join(__dirname, 'demo.jpg'))
        return await cloud.uploadFile({
            cloudPath: 'demo.jpg',
            fileContent: fileStream,
        })
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
