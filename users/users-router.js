const router = require('express').Router();

const Users = require('./users-model');


router.get('/', async (req, res) => {
    try {
        const userList = await Users.get();
        res.status(200).json(userList)
    }
    catch (error) {
        res.send(error);
    }
});


module.exports = router;
