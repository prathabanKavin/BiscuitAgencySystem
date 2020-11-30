const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

const { authUser, getUserProfile } = userController

router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

module.exports = router