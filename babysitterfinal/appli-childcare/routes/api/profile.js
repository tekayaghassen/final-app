const express = require('express');
const router = express.Router();
const auth = require ('../../middleware/auth');
const Profile = require ('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { check, validationResult } = require ('express-validator');


/* const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education'); */


/* router.get('/test', (req, res) => res.json({ msg: 'Profile Works' })); */

router.get('/me', auth, async (req, res)=> {
try {
const profile = await Profile.findOne({ user: req.user.id })
      .populate('user', ['avatar']);

      if (!profile) {
        return res.status(400).json({msg: 'No profile for this user'});
      }
      res.json(profile);
    } catch(err){console.error(err.message);
      res.status(500).send('Server Error')
    }});

    router.post ('/', [auth, [check('role', 'Role is required')
    .not()
    .isEmpty(),
    check('email', 'Email is required').not().isEmpty()
  ]], 
  async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }
const {
  name,
  role,
  address,
  email
} = req.body;
    

const profileFields = {};
profileFields.user = req.user.id;
if (name) profileFields.name = name;
if (role) profileFields.role = role;
if (address) profileFields.address = address;
if (email) profileFields.email = email;

try {
  let profile = await Profile.findOne({user: req.user.id});
  
  if (profile) {
    profile = await Profile.findOneAndUpdate(
      {user: req.user.id},
      {$set: profileFields},
      {new: true}
    );

    return res.json(profile);

  }

    profile = new Profile (profileFields);
    
    await profile.save();
    res.json(profile);
  
} catch(err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}});

router.get ('/', async (req, res)=>{
  try {
    const profiles = await Profile.find().populate('user', ['avatar']);
    res.json(profiles);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id})
    .populate('user', ['avatar']);
    if (!profile) return res.status(400).json({msg: 'Profile is not found'});
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId' ) {
      return res.status(400).json({msg: 'Profile is not found'})
    }
    res.status(500).send('Server Error');
  }
  });

  router.delete ('/', auth, async (req, res)=>{
    try {
      await Post.deleteMany({ user: req.user.id});
      await Profile.findOneAndRemove({ user: req.user.id});
      await User.findOneAndRemove({ _id: req.user.id});
      
      res.json({msg: 'User deleted'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;
