const express = require ('express');
const router= express.Router();
const bcrypt = require ('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const gravatar = require ('gravatar');

router.post('/', (req, res) => {

  

const { name, role, address, email, password} = req.body;
 if (!name || !email || !password) {
   return res.status(400).json({msg: 'Please enter all fields'});
 }

 User.findOne({email})
 .then(user=>{
   if(user) return res.status(400).json({msg: 'User already exists'});
  
   const avatar = gravatar.url(email, {
    s: '200',
    r:'pg',
    d: 'mm'
  })
 
   const newUser = new User ({
   name,
   avatar,
   role,
   address,
   email,
   password
 });

 

 bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(newUser.password, salt, (err, hash)=>{
     if (err) throw err;
     newUser.password = hash;
     newUser.save()
     .then(user=>{

       jwt.sign(
         { id: user.id },
         config.get('jwtSecret'),
         {expiresIn: 3600}, 
         (err, token)=>{
           if (err) throw err;
           res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              role: user.role,
              address: user.address,
              email: user.email,
   
            }
          });
         }
       ) 

       
     });
   })
 
  })
})
});



module.exports = router;
