const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')
const { validateAuthUser, validateRegisterUser } = require('../middleware/validators/userValidator');

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

router.route('/').post(validateRegisterUser, registerUser).get(protect, admin, getUsers)
router.route('/login').post(validateAuthUser, authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

module.exports = router
