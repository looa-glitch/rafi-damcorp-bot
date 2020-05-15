var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fallback = new Schema({
	name: String,
    company: String,
    email: String,
    location: String,
    phone: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const model = mongoose.model("users", fallback);
module.exports = model