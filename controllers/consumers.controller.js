const config = require('../constant').config
const helper = require('../helper/helper')
const moment = require('moment')
const uniqid = require('uniqid')
const _ = require('lodash')
/* Model */
const users = require('../model/users')
class consumersController {

    static async createUser(name, company, email, latitude, longitude, phone){
        return new Promise((resolve, reject) => {
            users.create({
                name: name,
                company: company,
                email: email,
                phone: phone,
                location: {
                    latitude : latitude,
                    longitude : longitude
                },
                createdAt: moment().format(),
                updatedAt: moment().format()
            }).then(result => resolve(result))
            .catch(err => reject(err))
        })
    }
    static async getUserByPhone(phone){
        return new Promise((resolve, reject) => {
            users.findOne({
                phone: phone
            }).lean()
            .then(result => resolve(result))
            .catch(err => reject(err))
        })
    }
    static async setTicket(phone, ticket){
        return new Promise((resolve, reject) => {
            users.updateOne(
                { phone: phone }, {ticket: ticket} 
            )
            .then(result => resolve(result))
            .catch(err => reject(err))
        })
    }

}

module.exports = consumersController