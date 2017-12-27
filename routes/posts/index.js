const express = require('express');

const controller = {
    name : require('./search_name.js'),
    day : require('./search_day.js'),
    dayNear : require('./search_daynear.js')
};
const router = express.Router();

router.post('/name', controller.name.search);

router.post('/day', controller.day.search);

router.post('/day_near', controller.dayNear.search);

module.exports = router;
