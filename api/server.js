const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/swagger-node')

const UserSchema = new Schema({
  email: {
    type: String, required: true,
    trim: true, unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  firstName: String,
  lastName: String,
})

mongoose.model('User', UserSchema)
const User = require('mongoose').model('User')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const createUser = (req, res, next) => {
  const user = new User(req.body)
  user.save(err => {
    if (err) {
      next(err)
    } else {
      res.json(user)
    }
  })
}

const getAllUsers = (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      next(err)
    } else {
      res.json(users)
    }
  })
}

const getOneUser = (req, res) => {
  res.json(req.user)
}

const getUserById = (req, res, next, id) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      next(err)
    } else {
      req.user = user
      next()
    }
  })
}

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
    if (err) {
      next(err)
    } else {
      res.json(user)
    }
  })
}

const removeUser = (req, res, next) => {
  req.user.remove(err => {
    if (err) {
      next(err)
    } else {
      res.status(202).send(req.body._id)
    }
  })
}

router.route('/users')
  .post(createUser)
  .get(getAllUsers)

router.route('/users/:userId')
  .get(getOneUser)
  .put(updateUser)
  .delete(removeUser)

router.param('userId', getUserById)

app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Listening on port 3000...')
})
