import pool from '../../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const signup = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      dob,
      height,
      phone,
      user_type,
      address
    } = req.body;

    const sqlDOB = new Date(dob).toISOString().slice(0, 10).replace('T', ' ')

    // Check if the email already exists
    var existingUser = await pool.query(
      'SELECT * FROM User_Account WHERE email = ?',
      [email]
    )
    if (existingUser[0].length !== 0) {
      return res.status(401).json('Email already exists')
    }
    //encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Insert the new user into the database
    const newUser = await pool.query(
      'INSERT INTO User_Account (first_name, last_name, email, password, dob, phone, user_type, address) VALUES (?, ?, ?, ?, ?, ?, ?,?)',
      [
        first_name,
        last_name,
        email.toLowerCase(),
        hashedPassword,
        sqlDOB,
        phone,
        user_type, 
        address
      ]
    )
    // Update Customer Table
    const CustInfo = await pool.query(
      'INSERT INTO Customer_Info (account_id,height) VALUES (?, ?)',
      [newUser[0].insertId, height]
    )
    //Response
    res.status(201).json('Customer Registered') // Use 201 for resource created successfully
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      'SELECT * FROM User_Account WHERE email = ?',
      [email]
    )

    if (user[0].length === 0) {
      console.log('Invalid Credentials')
      return res.status(401).json('Invalid Credentials')
    }
    const hashedPassword = user[0][0].password
    const validPassword = await bcrypt.compare(password, hashedPassword)
    if (!validPassword) {
      return res.status(401).json('Invalid Credentials')
    }
    const token = jwt.sign(
      { id: user[0][0].account_id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '1h'
      }
    )
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    })
    res.status(201).json({ auth: true, token: token, user: user[0][0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export const verifyJWT = (req, res, next) => {
  const token = req.header('x-access-token')
  if (!token) {
    return res.status(401).send('Not Authenticated')
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).send('Invalid Token')
    }
    req.user = decode
    next()
  })
}
