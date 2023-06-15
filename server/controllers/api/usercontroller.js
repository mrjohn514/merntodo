const Joi = require('joi')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')

module.exports.singup = async function (req, res) {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(201).json({ message: error.details[0].message })
    }

    const userExists = await User.findOne({ email: req.body.email })
    if (userExists) {
      return res.status(201).json({ message: 'User already exists' })
    }

    const user = await User.create(req.body)
    return res.status(200).json({
      data: user,
      message: 'User registered successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(201).json({ message: 'Internal server error' })
  }
}

module.exports.createsession = async function (req, res) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(201).json({ message: error.details[0].message })
    }

    const user = await User.findOne({ email: req.body.email }).populate({
      path: 'tasks',
    })

    if (!user || user.password !== req.body.password) {
      return res.status(201).json({ message: 'Invalid username or password' })
    }

    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, {
      expiresIn: '10000000',
    })

    return res.status(200).json({
      message: 'This is your generated token',
      data: {
        user,
        token,
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(201).json({ message: 'Internal server error' })
  }
}
