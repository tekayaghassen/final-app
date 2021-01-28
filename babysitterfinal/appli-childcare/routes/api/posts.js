const express = require('express');
const router = express.Router();
const {check, validationResult} = require ('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require ('../../models/User')

router.post(
  '/',
  [
    auth,
    [
      check('description', 'Description is required')
      .not()
      .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post ({
      description: req.body.description,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });
    
    const post = await newPost.save();

    res.json(post);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }});

  router.get('/:id',auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post){return res.status(404).json({msg : 'Post not found'})}
      res.json(post);
    } catch (err) {
      console.error(err.message);
      if(err.kind === "ObjectId") {
      return res.status(500).send({msg: 'Post not found'});
    }
    res.status(500).send('Server Error')
  }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if(!post) {
        return res.status(500).send({msg: 'Post not found'});
      }

      if (post.user.toString() !== req.user.id ) {
        return res.status(401).json({msg: 'User not authorized'});
      }

      await post.remove();

      res.json({msg: 'post removed'});
    } catch (err){
      console.error(err.message);
      if(err.kind === "ObjectId") {
        return res.status(500).send({msg: 'Post not found'});
      }
      res.status(500).send('Server Error');
    }
  });

  router.put('/like/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0
      ) {
        return res.status(400).json({ msg: 'User already liked this post' });
      }
      post.likes.unshift({ user: req.user.id });
  
      await post.save();
      res.json(post.likes);
    } catch(err) { console.error(err.message);
      res.status(500).send('Server Error');
    }});

  
    router.put('/unlike/:id', auth, async (req, res) => {
      try {
        const post = await Post.findById(req.params.id);

        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0
        ) {
          return res.status(400).json({ msg: 'Post has not yet been liked' });
        }
        
        const removeIndex = post.likes.map(like => like.user.toString())
            .indexOf(req.user.id);
         
          post.likes.splice(removeIndex, 1);
    
        await post.save();
        res.json(post.likes);
      } catch(err) { console.error(err.message);
        res.status(500).send('Server Error');
      }});
  

      router.post(
        '/comment/:id',
        [
          auth,
          [
            check('description', 'Description is required')
            .not()
            .isEmpty()
          ]
        ],
        async (req, res) => {
          const errors = validationResult(req);
          if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
          }
      
          try {
          const user = await User.findById(req.user.id).select('-password');
          const post = await Post.findById(req.params.id);
      
          const newComment = {
            description: req.body.description,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
          };
          
          post.comments.unshift(newComment);
          await post.save();
      
          res.json(post.comments);
      
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
          }
        }
      );





      router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);

          const comment =  post.comments.find(comment=>comment.id===req.params.comment_id);
        
        if (!comment){
          return res.status(404).json({msg: 'Comment does not exist'})
        }; 

        if (comment.user.toString() !== req.user.id) {
          return res.status(401).json({msg: 'User not authorized'})
        }
       
              const removeIndex = post.comments
                .map(comment => comment.user.toString())
                .indexOf(req.user.id);
      
          
              post.comments.splice(removeIndex, 1);
      
              await post.save();

              res.json(post.comments);
            }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
      }
    }
  );

/* router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));








router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

 
    if (!isValid) {
     
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);







router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }


          

        
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);


router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    
    if (!isValid) {
     
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };


        post.comments.unshift(newComment);

 
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);


router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
    
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

 
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

    
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
); */

module.exports = router;
