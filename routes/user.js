const {Router} = require('express')
const {createUserSignup, createUserLogin} = require('../controllers/user')

const router = Router()


router.post('/signup',createUserSignup)
router.post('/login', createUserLogin)

module.exports = router