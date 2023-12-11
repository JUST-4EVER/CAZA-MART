const express = require('express');
const userAuthentication = require('../middleware/UserAuthenticate');
const { addUserProfile, getCurrentUserProfile, getUsersProfile, deleteUserProfile, updateUserProfile } = require('../controller/UserProfileController');
const userProfileRoutes = express.Router();
userProfileRoutes.post('/userProfile',userAuthentication , addUserProfile);
userProfileRoutes.get('/userProfile',userAuthentication , getCurrentUserProfile);
userProfileRoutes.get('/userProfiles', getUsersProfile);
userProfileRoutes.delete('/userProfile/:id', deleteUserProfile);
userProfileRoutes.put('/userProfile/:id', updateUserProfile);

module.exports = userProfileRoutes;