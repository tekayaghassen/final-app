const express = require ('express');
const router= express.Router();
const auth = require('../../middleware/auth');


const Item = require('../../models/Item');



router.get('/', (req, res) => {
  Item.find()
  .then (items=>res.json(items))
});


router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    status: req.body.status,
    description: req.body.description
  });

  newItem.save().then(item=>res.json(item))
});

router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
  .then(item=>item.remove().then( ()=>res.json("Item removed"))
).catch(err=>res.status(404).json("Item is not removed"))
})



module.exports = router;
