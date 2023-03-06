var router = require('express').Router()
var activities = require('./activities');

router.use('/activities', activities);

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás conectado a nuestra API.' })
})

module.exports = router