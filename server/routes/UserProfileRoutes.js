const express = require('express');
const userAuthentication = require('../middlewares/UserAuthenticate');
const {
    addUserProfile, getCurrentUserProfile,
    getUsersProfile, deleteUserProfile,
    updateUserProfile }
    = require('../controllers/UserProfileController');
const { addUserProfileValidations } = require('../validations/UserProfileValidations/userProfileValidations');
const userProfileRoutes = express.Router();
userProfileRoutes.post('/userProfile', userAuthentication,addUserProfileValidations, addUserProfile);
userProfileRoutes.get('/userProfile', userAuthentication, getCurrentUserProfile);
userProfileRoutes.get('/userProfiles', getUsersProfile);
userProfileRoutes.delete('/userProfile/:id', deleteUserProfile);
userProfileRoutes.put('/userProfile/:id', addUserProfileValidations,updateUserProfile);

module.exports = userProfileRoutes;