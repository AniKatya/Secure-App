const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Contact = require('../models/contact')
const webpush = require('web-push')
const dotenv = require('dotenv')
dotenv.config()

// from .env
const publicKey = process.env.PUBLIC_PUSH_KEY || ''
const privateKey = process.env.PRIVATE_PUSH_KEY || ''

router.get('/existingUser/:name/:email', (req, res) => {
  let email = req.params.email
  let name = req.params.name
  console.log(email,name)
  User.findOne({ email, name }).exec((err, user) => err ? res.send(err) : res.send(user))
});

router.get('/userContacts/:id', (req, res) => {
  // User.findOne({ _id: req.params.id }).exec((err,user) => console.log(user.emergencyContacts))
  User.findOne({ _id: req.params.id })
    .populate('emergencyContacts')
    .exec((err, user) => {
      console.log(user)
      res.send(user.emergencyContacts)
    })
});


router.post('/newUserContact/:id', (req, res) => {
  let contact = new Contact(req.body)
  contact.save()
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    user.emergencyContacts.push(contact)
    user.save()
    res.end()
  })
});

router.put("/updateUserLocation/:id", (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, (err, body) => res.end())
})

router.put("/updateUserContactNumber/:id", (req, res) => {
  Contact.findOneAndUpdate({ _id: req.params.id }, req.body, (err, body) => res.end())
})

router.delete('/deleteUserContact/:id', (req, res) => {
  Contact.findOneAndRemove({ _id: req.params.id }, (err, body) => res.end())
  // User.findOne({ _id: req.params.id }, (err,body) => res.end())
  // router.delete('/deleteUserContact/:id', (req,res) => {
  // Contact.findOneAndRemove({ _id: req.params.id }, (err,body) => res.end())
});

//FOR PUSH NOTIFICATIONS

//this post route saves user's device link
router.post('/subscribe', async (req, res) => {
  const newUser = new User(req.body)
  try {
    await newUser.save()
    if (!newUser) throw new Error('User not saved')
    res.status(201)
  }
  catch (e) {
    console.log(e.errmsg)
    res.status(400).send(e.errmsg)
  }
})

router.put("/updateUser/:id", (req, res) => {
  const subscriptionObject = req.body.subscriptionObject
  const location = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    address: req.body.address
  }
  User.findOneAndUpdate({ _id: req.params.id }, { location, subscriptionObject }, (err, body) => res.end())
})

//the actual push notification route

router.post('/alert', async (req, res) => {
  webpush.setVapidDetails('mailto:mail@mail.com', publicKey, privateKey)
  const subscription = req.body
  const endpoint = subscription.endpoint
  const otherUsers = await User.find({ 'subscriptionObject': { $ne: subscription } })
  const currentUser = await User.findOne({ "subscriptionObject.endpoint": endpoint })
  const message = JSON.stringify({
    title: `Your fellow human, ${currentUser.name}, needs your help ASAP!`,
    body: `${currentUser.name} is located at ${currentUser.location.address}.`,
    link: 'https://rescyoume-app.herokuapp.com/sos',
    icon: 'https://tpmbc.com/wp-content/uploads/2018/02/TrailCondition.png'
  })
  const maxLatitude = currentUser.location.latitude + 2400
  const minLatitude = currentUser.location.latitude - 2400
  const maxLongitude = currentUser.location.longitude + 1920
  const minLongitude = currentUser.location.longitude - 1920

  otherUsers
    .filter(a =>
      a.location.latitude < maxLatitude &&
      a.location.latitude > minLatitude &&
      a.location.longitude < maxLongitude &&
      a.location.longitude > minLongitude)
    .map(async (el) => {
      try { await webpush.sendNotification(el.subscriptionObject, message) }
      catch (e) { console.error(e) }
    })
})

module.exports = router