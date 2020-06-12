const express = require('express');
const users = require("./userDb")
const posts = require("../posts/postDb")

const router = express.Router();

router.post('/', validateUser(), (req, res, next) => {
  // do your magic!
  users.insert(req.body)
  .then((user) => {
    res.status(201).json(user)
  })
  .catch(next)
  // you could do catch this way:
  //.catch(error => {
    //next(error)
  //})
});

router.post('/:id/posts', validatePost(), validateUserId(), (req, res, next) => {
  // do your magic!
  const{ text } = req.body
  const { id: user_id } = req.params

  posts.insert({ text, user_id})
    .then((user) => {
      res.status(201).json(user)
    })
    .catch(next)
});

router.get('/', (req, res, next) => {
  // do your magic!
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
  }

  console.log("req.query", req.query);
  users.get(options)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(next)
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(next)
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  // do your magic!
  users.remove(req.params.id)
    .then((count) => {
      res.status(200).json({
        message: "User deleted."
      })
    })
    .catch(next)
});

router.put('/:id', validateUser(), validateUserId(), (req, res, next) => {
  // do your magic!
  users.update(req.params.id, req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch(next)
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    users.getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user
          next()
        } else {
          res.status(400).json({
            message: "invalid user id"
          })
        }
      })
      .catch(next)
      // you could do catch this way:
      //.catch(error => {
        //next(error)
      //})
  }
}

function validateUser() {
  // do your magic!
  return (req, res, next) => {
    if (!req.body || !req.body.name) {
      return res.status(400).json({
        message: "Missing User Name or Data",
      })
  } 
  next()
}}

function validatePost() {
  // do your magic!
  return (req, res, next) => {
    if (!req.body || !req.body.text) {
      return res.status(400).json({
        message: "Missing Post Data or Required Text",
      })
  } 
  next()
}}

module.exports = router;
