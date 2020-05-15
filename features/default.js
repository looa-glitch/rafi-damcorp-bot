/* const { NlpManager } = require("node-nlp");
const manager = new NlpManager();
const httpContext = require('express-http-context')
const uuid = require('uuid/v4')
const tm = require('../helper/trackingManager') */
const validator = require("email-validator");
const consumers = require("../controllers/consumers.controller");
const sessionChat = require("../controllers/session.controller");

module.exports = (controller) => {
	controller.plugins.cms.before("waba", "default", async(convo, bot) => {
		let ce = await check_expired(bot)
		if (ce == 'found') {
			convo.gotoThread('menu_utama')
		}
	})

	controller.plugins.cms.onChange("waba", "_answ_default", async(response, convo, bot) => {
		if (response === '1' || response.toLowerCase() === 'lanjut') {
			convo.gotoThread('ask_name')
		}
	})

	controller.plugins.cms.onChange("waba", "_answ_name", async(response, convo, bot) => {
		await convo.setVar('name', response)
		convo.gotoThread('ask_company')
	})

	controller.plugins.cms.onChange("waba", "_answ_company", async(response, convo, bot) => {
		await convo.setVar('company', response)
		convo.gotoThread('ask_email')
	})

	controller.plugins.cms.onChange("waba", "_answ_email", async(response, convo, bot) => {
		if (validator.validate(response)) {
			await convo.setVar('email', response)
			convo.gotoThread('ask_location')
		}
		else {
			convo.gotoThread('ask_email_2')
		}
	})

	controller.plugins.cms.onChange("waba", "_answ_location", async(response, convo, bot) => {
		await convo.setVar('location', response)
		convo.gotoThread('ask_selfie')
	})

	controller.plugins.cms.onChange("waba", "_answ_selfie", async(response, convo, bot) => {
		if (bot._config.activity.messageType == 'image') {
			console.log("Name:     ", convo.vars.name)
			console.log("Company:  ", convo.vars.company)
			console.log("Email:    ", convo.vars.email)
			console.log("Location: ", convo.vars.location)
			console.log("Phone:    ", bot._config.activity.from.id)
			await consumers.createUser(
				convo.vars.name, convo.vars.company, 
				convo.vars.email, convo.vars.location,
				bot._config.activity.from.id
			)
			convo.gotoThread('menu_utama')
		}
		else {
			convo.gotoThread('ask_selfie_2')
		}
	})

	controller.plugins.cms.onChange("waba", "_answ_menu_utama", async(response, convo, bot) => {
		console.log("Pilihan menu utama anda: ", response)
	})

	function check_expired(bot) {
        return new Promise(async (resolve, reject) => {
            sessionChat
            .updateSession(bot._config.activity.from.id)
            .then(async result => {
                //console.log(result)
                if(result == null) {
                    sessionChat
                    .createSession(bot._config.activity.from.id)
                    .then(async result => {
                        //console.log(result)
                        consumers
                        .getUserByPhone(bot._config.activity.from.id)
                        .then(async consumen => {
                            if(consumen) {
                                resolve('found')
                            }
                            else {
                                resolve('not_found')
                            }
                        })
                    })
                }
                else {
                    consumers
                    .getUserByPhone(bot._config.activity.from.id)
                    .then(async consumen => {
                        if(consumen) {
                            resolve('found')
                        }
                        else {
                            resolve('not_found')
                        }
                    })
                }
            })
        })
    }
}