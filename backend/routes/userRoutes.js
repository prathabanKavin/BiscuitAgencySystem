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
    deleteUser,
    getUserById,
    updateUser, 
} = userController

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

module.exports = router
