var mongoose = require('mongoose');

module.exports = mongoose.model('Temprature', {
    date: {
        type: Date,
        default: ''
    },
	tempval: {
        type: Number,
        default: ''
    }
});