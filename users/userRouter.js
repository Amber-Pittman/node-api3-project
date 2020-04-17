const express = require('express');
const users = require("./userDb")
const posts = require("../posts/postDb")

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!

});

router.post('/:id/posts', validateUserId(), (req, res, next) => {
  // do your magic!
  
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

router.get('/:id', validateUserId(), (req, res, next) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  // do your magic!
  user.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(next)
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  // do your magic!
  user.remove(req.params.id)
    .then((count) => {
      res.status(200).json({
        message: "User deleted."
      })
    })
    .catch(next)
});

router.put('/:id', validateUserId(), (req, res, next) => {
  // do your magic!
  users.add(req.body)
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

function validateUser(req, res, next) {
  // do your magic!

}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
