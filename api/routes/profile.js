const router = require('express').Router();
const Profile = require('../../models/profileModel');

// @route GET api/profile
// @description Get all profiles
// @access Public
router.route('/').get((req, res) => {
    Profile.find()
        .then(profiles => res.json(profiles))
        .catch(err => res.status(400).json({error: err.message}));
});

// @route GET api/profile/:id
// @description Get single profile by id
// @access Public
router.route('/:id').get((req, res) => {
    Profile.findById(req.params.id)
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json({ error: err.message}));
})

// @route POST api/profile
// @description Create new profile
// @access Public
router.route('/').post((req, res) => {
    Profile.create(req.body)
        .then(profile => res.json({'message': 'success', 'data': profile}))
        .catch(err => {res.status(400).json({error: err.message}); console.log(err.message)});
})

// @route PUT api/profile/:id
// @description Update single profile by id
// @access Public
router.put('/:id', (req, res) => {
    Profile.findByIdAndUpdate(req.params.id, req.body)
        .then(profile => res.json({'message': 'success', 'data': profile}))
        .catch(err => res.status(400).json({error: err.message}));
})

module.exports = router;