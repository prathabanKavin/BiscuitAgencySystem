const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const User = require('../models/userModel')

// @desc        Auth user & get token
// @route       POST /api/users/login
// @access      Public
const authUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isMainAdmin: user.isMainAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

// @desc        Register a new user
// @route       POST /api/users
// @access      Public
const registerUser = asyncHandler (async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isMainAdmin: user.isMainAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User data')
    }
})

// @desc        Get user profile
// @route       GET /api/users/profile
// @access      Private
const getUserProfile = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isMainAdmin: user.isMainAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc        Update user profile
// @route       PUT /api/users/profile
// @access      Private
const updateUserProfile = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isMainAdmin: updatedUser.isMainAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc        Get all users
// @route       GET /api/users
// @access      Private/Admin
const getUsers = asyncHandler (async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc        Delete an user
// @route       DELETE /api/users/:id
// @access      Private/Admin
const deleteUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({ message : 'User removed' })
    }else{
        res.json(404)
        throw new Error('User not found')
    }  
})

module.exports = {authUser, getUserProfile, registerUser, updateUserProfile, getUsers ,deleteUser} 
