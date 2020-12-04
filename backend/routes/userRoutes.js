const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

const { 
    authUser, 
    registerUser, 
    getUserProfile, 
    updateUserProfile 
} = userController

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

module.exports = router
