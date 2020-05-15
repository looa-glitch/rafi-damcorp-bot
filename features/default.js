/* const { NlpManager } = require("node-nlp");
const manager = new NlpManager();
const httpContext = require('express-http-context')
const uuid = require('uuid/v4')
const tm = require('../helper/trackingManager') */
const helper = require('../helper/helper')
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
		if (bot._config.activity.messageType == 'location') {
			await convo.setVar('latitude', response.split(',')[0])
			await convo.setVar('longitude', response.split(',')[1])
			convo.gotoThread('ask_selfie')
		}
		else {
			convo.gotoThread('ask_location_2')
		}
	})

	controller.plugins.cms.onChange("waba", "_answ_selfie", async(response, convo, bot) => {
		if (bot._config.activity.messageType == 'image') {
			await consumers.createUser(
				convo.vars.name, convo.vars.company, 
				convo.vars.email, convo.vars.latitude,
				convo.vars.longitude, bot._config.activity.from.id
			)
			//convo.gotoThread('menu_utama')
			await helper.api({
                method: "post",
                url: "https://private-65030d-dam7.apiary-mock.com/api/v1/bussines",
                data: {
                    phone : bot._config.activity.from.id
				}
			})
            .then( async res => {
                const list = res.data.data.list;
                list.forEach((el,i) => {
                	list[i] = `${i + 1}. ${el}`;
                })
                let dataList = 'Silahkan pilih kebutuhan Anda:\n\n' + list.join('\n');
                
                convo.setVar('listArr', list);
                convo.setVar('list', dataList);

                await convo.gotoThread('menu_utama');
            })
		}
		else {
			convo.gotoThread('ask_selfie_2')
		}
	})

	controller.plugins.cms.onChange("waba", "_answ_menu_utama", async(response, convo, bot) => {
		switch(response.toLowerCase()) {
            case '1':
            case 'whatsapp':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				); 
                //await convo.gotoThread('penutup')
            break
            case '2':
            case 'pawon':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				);
                //await convo.gotoThread('penutup')
            break
            case '3':
            case 'kiosk':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				); 
                //await convo.gotoThread('penutup')
            break
            case '4':
            case 'loker':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				);
                //await convo.gotoThread('penutup')
            break
            case '5':
            case 'flo':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				);
                //await convo.gotoThread('penutup')
            break
            case '6':
            case 'digiresto':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				); 
                //await convo.gotoThread('penutup')
            break
            case '7':
            case 'gowes':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				); 
                //await convo.gotoThread('penutup')
            break
            case '8':
            case 'edc':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				); 
                //await convo.gotoThread('penutup')
            break
            case '9':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				);
                //await convo.gotoThread('penutup')
            break
            case '10':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				); 
                //await convo.gotoThread('penutup')
            break
            case '11':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				); 
                //await convo.gotoThread('penutup')
            break
            case '12':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				); 
                //await convo.gotoThread('penutup')
            break
            case '13':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				);
                //await convo.gotoThread('penutup')
            break
            case '14':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				); 
                //await convo.gotoThread('penutup')
            break
            case '15':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				);
                //await convo.gotoThread('penutup')
            break
            case '16':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				); 
                //await convo.gotoThread('penutup')
            break
            case '17':
                consumers.setTicket(
					bot._config.activity.from.id,
					convo.vars.listArr[Number(response) - 1]
				); 
                //await convo.gotoThread('penutup')
            break
            default:
                await convo.gotoThread('menu_utama')
        }
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