const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')

const { 
    authUser, 
    registerUser, 
    getUserProfile, 
    updateUserProfile,
    getUsers, 
} = userController

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

module.exports = router
