import pool from '../../db.js'
import 'dotenv/config'
import moment from 'moment'
import nodemailer from 'nodemailer'

export const getRides = async (req, res) => {
  try {
    const rides = await pool.query(
      'SELECT name, description, picture, height_restriction, ride_id, broken, rained_out, cost FROM Rides'
    )
    res.json(rides[0])
  } catch (error) {
    console.error(error.message)
  }
}

export const getGames = async (req, res) => {
  try {
    const games = await pool.query(
      'SELECT name, description, picture, game_id, cost FROM Games'
    )
    res.json(games[0])
  } catch (error) {
    console.error(error.message)
  }
}

export const getAttractions = async (req, res) => {
  try {
    const attractions = await pool.query(
      'SELECT name, description, picture, attraction_id, age_restriction, cost FROM Attraction'
    )
    res.json(attractions[0])
  } catch (error) {
    console.error(error.message)
  }
}
export const EntryPass = async (req, res) => {
  try {
    const { account_id, start_date, end_date } = req.body

    // Parse dates as UTC and subtract one day
    const utcStartDate = moment
      .utc(start_date)
      .subtract(1, 'days')
      .format('YYYY-MM-DD')
    const utcEndDate = moment
      .utc(end_date)
      .subtract(1, 'days')
      .format('YYYY-MM-DD')

    // Log to verify
    const alreadyExists = await pool.query(
      'SELECT COUNT(*) FROM Entry_Pass WHERE account_id = ? AND entry_date = ?',
      [account_id, utcStartDate]
    )
    if (alreadyExists[0][0]['COUNT(*)'] > 0) {
      console.log('Entry pass already exists')
      return res.status(401).json('Entry pass already exists')
    }

    const newEntryPass = await pool.query(
      'INSERT INTO Entry_Pass (account_id, entry_date, expire_date, cost) VALUES(?,?,?,?)',
      [account_id, utcStartDate, utcEndDate, 10.0]
    )
    res.json(newEntryPass)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const Gifts = async (req, res) => {
  try {
    const products = await pool.query(
      'SELECT name, description, picture, gift_id, cost FROM Gift_Items'
    )
    res.json(products[0])
  } catch (error) {
    console.error(error.message)
  }
}

export const AddToGiftCart = async (req, res) => {
  try {
    let { account_id, gift_id, quantity, size, cost } = req.body
    let TotalCost = parseFloat(cost) * parseFloat(quantity)
    if (gift_id === 2 || gift_id === 4) {
      let OutofStock = await pool.query(
        'SELECT COUNT(*) FROM Inventory WHERE gift_id = ? AND size = ? AND inventory <= 0',
        [gift_id, size]
      )
      if (OutofStock[0][0]['COUNT(*)'] > 0) {
        return res.status(402).json('Out of stock')
      }
      let count = await pool.query(
        'SELECT COUNT(*) FROM Gift_Cart WHERE account_id = ? AND gift_id = ? AND size = ? AND purchased = false',
        [account_id, gift_id, size]
      )
      if (count[0][0]['COUNT(*)'] > 0) {
        let UpdateGiftCart = await pool.query(
          'UPDATE Gift_Cart SET quantity = quantity + ?, cost = cost + ?  WHERE account_id = ? AND gift_id = ? AND size = ? AND purchased = false',
          [quantity, TotalCost, account_id, gift_id, size]
        )
        res.status(200).json(UpdateGiftCart)
        return
      }
    }
    if (gift_id === 1 || gift_id === 3 || gift_id === 5) {
      let OutofStock = await pool.query(
        'SELECT COUNT(*) FROM Inventory WHERE gift_id = ? AND inventory <= 0',
        [gift_id]
      )
      if (OutofStock[0][0]['COUNT(*)'] > 0) {
        return res.status(402).json('Out of stock')
      }
      let count = await pool.query(
        'SELECT COUNT(*) FROM Gift_Cart WHERE account_id = ? AND gift_id = ? AND purchased = false',
        [account_id, gift_id]
      )
      if (count[0][0]['COUNT(*)'] > 0) {
        let UpdateGiftCart = await pool.query(
          'UPDATE Gift_Cart SET quantity = quantity + ?, cost = cost + ?  WHERE account_id = ? AND gift_id = ? AND purchased = false',
          [quantity, TotalCost, account_id, gift_id]
        )
        res.status(200).json(UpdateGiftCart)
        return
      }
    }
    const currentDateWithTime = new Date()

    // Get the date portion without the time
    const currentDateWithoutTime = currentDateWithTime
      .toISOString()
      .split('T')[0]

    const sql = `
    INSERT INTO Gift_Cart (account_id, gift_id, quantity, size, cost, purchased) VALUES(?,?,?,?,?,?)`
    const newCartItem = await pool.query(sql, [
      account_id,
      gift_id,
      quantity,
      size,
      TotalCost,
      false,
    ])
    res.status(200).json(newCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}

export const AddToGameCart = async (req, res) => {
  try {
    let { account_id, game_id, count, cost } = req.body
    let TotalCost = parseFloat(cost) * parseFloat(count)
    const CheckEPass = await pool.query(
      'SELECT COUNT(*) FROM Entry_Pass WHERE account_id = ? AND CURDATE() BETWEEN entry_date AND expire_date',
      [account_id]
    )
    if (CheckEPass[0][0]['COUNT(*)'] === 0) {
      return res.status(403).json('Entry pass required')
    }
    let CheckWorking = await pool.query(
      `Select COUNT(*) FROM Games WHERE game_id = ? AND broken = 1 OR rained_out = 1`,
      [game_id]
    )
    if (CheckWorking[0][0]['COUNT(*)'] > 0) {
      return res.status(402).json('Game is broken or rained out')
    }
    let CheckGameCart = await pool.query(
      'SELECT COUNT(*) FROM Game_Cart WHERE account_id = ? AND game_id = ? AND purchased = false',
      [account_id, game_id]
    )
    if (CheckGameCart[0][0]['COUNT(*)'] > 0) {
      let UpdateGameCart = await pool.query(
        'UPDATE Game_Cart SET quantity = quantity + ?, cost = cost + ? WHERE account_id = ? AND game_id = ? AND purchased = false',
        [count, TotalCost, account_id, game_id]
      )
      res.status(200).json(UpdateGameCart)
      return
    }
    const sql =
      'INSERT INTO Game_Cart (account_id, game_id, quantity, cost, purchased) VALUES(?,?,?,?,?)'
    const newCartItem = await pool.query(sql, [
      account_id,
      game_id,
      count,
      TotalCost,
      false
    ])
    res.status(200).json(newCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const AddToRideCart = async (req, res) => {
  try {
    let { account_id, ride_id, count, cost } = req.body
    let TotalCost = parseFloat(cost) * parseFloat(count)
    const CheckEPass = await pool.query(
      'SELECT COUNT(*) FROM Entry_Pass WHERE account_id = ? AND CURDATE() BETWEEN entry_date AND expire_date',
      [account_id]
    )
    if (CheckEPass[0][0]['COUNT(*)'] === 0) {
      return res.status(403).json('Entry pass required')
    }
    const CheckRideHeight = await pool.query(
      'SELECT height_restriction FROM Rides WHERE ride_id = ?',
      [ride_id]
    )
    const CheckPersonHeight = await pool.query(
      'SELECT height FROM Customer_Info A WHERE account_id = ?',
      [account_id]
    )
    if (
      CheckPersonHeight[0][0].height < CheckRideHeight[0][0].height_restriction
    ) {
      res.status(402).json('Height restriction not met')
      return
    }
    let CheckIfWorking = await pool.query(
      'SELECT COUNT(*) AS ride_count FROM Rides WHERE ride_id = ? AND (broken = 1 OR rained_out = 1)',
      [ride_id]
    )
    if (CheckIfWorking[0][0]['ride_count'] > 0) {
      res.status(401).json('Ride is broken or rained out')
      return
    }

    let CheckRideCart = await pool.query(
      'SELECT COUNT(*) FROM Ride_Cart WHERE account_id = ? AND ride_id = ? AND purchased = false',
      [account_id, ride_id]
    )
    if (CheckRideCart[0][0]['COUNT(*)'] > 0) {
      let UpdateRideCart = await pool.query(
        'UPDATE Ride_Cart SET quantity = quantity + ?, cost = cost + ? WHERE account_id = ? AND ride_id = ? AND purchased = false',
        [count, TotalCost, account_id, ride_id]
      )
      res.status(200).json(UpdateRideCart)
      return
    }
    const sql =
      'INSERT INTO Ride_Cart (account_id, ride_id, quantity, cost, purchased) VALUES(?,?,?,?,?)'
    const newCartItem = await pool.query(sql, [
      account_id,
      ride_id,
      count,
      TotalCost,
      false
    ])
    res.status(200).json(newCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const AddToAttractionCart = async (req, res) => {
  try {
    let { account_id, attraction_id, count, cost } = req.body
    let TotalCost = parseFloat(cost) * parseFloat(count)

    const CheckEPass = await pool.query(
      'SELECT COUNT(*) FROM Entry_Pass WHERE account_id = ? AND CURDATE() BETWEEN entry_date AND expire_date',
      [account_id]
    )
    if (CheckEPass[0][0]['COUNT(*)'] === 0) {
      return res.status(403).json('Entry pass required')
    }
    const CheckAge = await pool.query(
      'SELECT age_restriction FROM Attraction WHERE attraction_id = ?',
      [attraction_id]
    )
    const CheckPersonAge = await pool.query(
      'SELECT TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age FROM User_Account WHERE account_id = ?',
      [account_id]
    )
    if (CheckPersonAge[0][0].age < CheckAge[0][0].age_restriction) {
      return res.status(402).json('Age restriction not met')
    }
    let checkRainout = await pool.query(
      'SELECT COUNT(*) FROM Attraction WHERE attraction_id = ? AND rained_out = 1',
      [attraction_id]
    )
    if (checkRainout[0][0]['COUNT(*)'] > 0) {
      res.status(401).json('Attraction is rained out')
      return
    }
    let CheckAttractionCart = await pool.query(
      'SELECT COUNT(*) FROM Attraction_Cart WHERE account_id = ? AND attraction_id = ? AND purchased = false',
      [account_id, attraction_id]
    )
    if (CheckAttractionCart[0][0]['COUNT(*)'] > 0) {
      let UpdateAttractionCart = await pool.query(
        'UPDATE Attraction_Cart SET quantity = quantity + ?, cost = cost + ? WHERE account_id = ? AND attraction_id = ? AND purchased = false',
        [count, TotalCost, account_id, attraction_id]
      )
      res.status(200).json(UpdateAttractionCart)
      return
    }
    const sql =
      'INSERT INTO Attraction_Cart (account_id, attraction_id, quantity, cost, purchased) VALUES(?,?,?,?,?)'
    const newCartItem = await pool.query(sql, [
      account_id,
      attraction_id,
      count,
      TotalCost,
      false
    ])
    res.status(200).json(newCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const GetRideCart = async (req, res) => {
  try {
    const { account_id } = req.params
    const sql = `
   SELECT
    R.name,
    RC.cost,
    RC.quantity,
    RC.Ride_Cart_id,
    R.picture,
    R.ride_id
FROM
    Rides R
INNER JOIN
    Ride_Cart RC ON R.ride_id = RC.ride_id
WHERE
    RC.account_id = ? AND RC.purchased = 0;
   `
    const cart = await pool.query(sql, [account_id])
    res.json(cart[0])
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const GetGameCart = async (req, res) => {
  try {
    const { account_id } = req.params
    console.log(account_id)
    const sql = `
    SELECT
    G.name,
    GC.cost,
    GC.quantity,
    GC.Game_Cart_id,
    G.picture, 
    G.game_id
FROM
    Games G
INNER JOIN
    Game_Cart GC ON G.game_id = GC.game_id
WHERE
    GC.account_id = ? AND GC.purchased = 0;
`
    const cart = await pool.query(sql, [account_id])
    res.json(cart[0])
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const GetAttractionCart = async (req, res) => {
  try {
    const { account_id } = req.params
    const sql = `
    SELECT
    A.name,
    AC.cost,
    AC.quantity,
    AC.Attraction_Cart_id,
    A.picture,
    A.attraction_id
FROM
    Attraction A
INNER JOIN
    Attraction_Cart AC ON A.attraction_id = AC.attraction_id
WHERE
    AC.account_id = ? AND AC.purchased = 0
    `
    const cart = await pool.query(sql, [account_id])
    res.status(201).json(cart[0])
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const GetGiftCart = async (req, res) => {
  try {
    const { account_id } = req.params
    const sql = `
    SELECT
    GI.name,
    GI.picture,
    GC.cost,
    GC.quantity,
    GC.gift_cart_id,
    GC.size,
    GI.gift_id
FROM
    Gift_Items GI
INNER JOIN
    Gift_Cart GC ON GI.gift_id = GC.gift_id
WHERE
    GC.account_id = ? AND GC.purchased = 0;
    `
    const cart = await pool.query(sql, [account_id])
    res.json(cart[0])
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const DeleteRideCartItem = async (req, res) => {
  try {
    const { id } = req.params
    const sql = 'DELETE FROM Ride_Cart WHERE Ride_Cart_id = ?'
    const deleteCartItem = await pool.query(sql, [id])
    res.json(deleteCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const DeleteGameCartItem = async (req, res) => {
  try {
    const { id } = req.params
    const sql = 'DELETE FROM Game_Cart WHERE Game_Cart_id = ?'
    const deleteCartItem = await pool.query(sql, [id])
    res.json(deleteCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const DeleteAttractionCartItem = async (req, res) => {
  try {
    const { id } = req.params
    const sql = 'DELETE FROM Attraction_Cart WHERE Attraction_Cart_id = ?'
    const deleteCartItem = await pool.query(sql, [id])
    res.json(deleteCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const DeleteGiftCartItem = async (req, res) => {
  try {
    const { id } = req.params
    const sql = 'DELETE FROM Gift_Cart WHERE gift_cart_id = ?'
    const deleteCartItem = await pool.query(sql, [id])
    res.json(deleteCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const DecrementRideCartItemandCost = async (req, res) => {
  try {
    const { id } = req.params
    const sql =
      'UPDATE Ride_Cart SET quantity = quantity - 1, cost = cost - 5 WHERE Ride_Cart_id = ?'
    const updateCartItem = await pool.query(sql, [id])
    if (updateCartItem[0].quantity <= 1) {
      res.status(400).send('Cannot decrement item below 1')
      return
    }
    res.json(updateCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const DecrementGameCartItemandCost = async (req, res) => {
  try {
    const { id } = req.params
    const sql =
      'UPDATE Game_Cart SET quantity = quantity - 1, cost = cost - 3 WHERE Game_Cart_id = ?'
    const updateCartItem = await pool.query(sql, [id])
    if (updateCartItem[0].quantity <= 1) {
      res.status(400).send('Cannot decrement item below 1')
      return
    }
    res.json(updateCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const DecrementAttractionCartItemandCost = async (req, res) => {
  try {
    const { id } = req.params
    const sql =
      'UPDATE Attraction_Cart SET quantity = quantity - 1, cost = cost - 12 WHERE Attraction_Cart_id = ?'
    const updateCartItem = await pool.query(sql, [id])
    if (updateCartItem[0].quantity <= 1) {
      res.status(400).send('Cannot decrement item below 1')
      return
    }
    res.json(updateCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const DecrementGiftCartItemandCost = async (req, res) => {
  try {
    const { id } = req.params // Make sure the id is correctly passed as a parameter
    const selectSql =
      'SELECT cost, quantity FROM Gift_Cart WHERE gift_cart_id = ?'
    const cartItems = await pool.query(selectSql, [id]) // Execute the correct query with correct SQL variable
    const cartItem = cartItems[0] // Assuming the query returns at least one result
    if (cartItem[0].length === 0) {
      res.status(404).send('Item not found')
      return
    }
    if (cartItem[0].quantity <= 1) {
      res.status(400).send('Cannot decrement item below 1')
      return
    }

    let unitPrice =
      parseFloat(cartItem[0].cost) / parseFloat(cartItem[0].quantity)
    let decreaseCost = unitPrice // As we decrement by 1, we subtract one unit price from the total

    const updateSql =
      'UPDATE Gift_Cart SET quantity = quantity - 1, cost = cost - ? WHERE gift_cart_id = ?'
    const updateCartItem = await pool.query(updateSql, [decreaseCost, id]) // Pass both updated cost and id

    res.json(updateCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}

export const IncrementRideCartItemandCost = async (req, res) => {
  try {
    const { id } = req.params
    const sql =
      'UPDATE Ride_Cart SET quantity = quantity + 1, cost = cost + 5 WHERE Ride_Cart_id = ?'
    const updateCartItem = await pool.query(sql, [id])
    res.json(updateCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const IncrementGameCartItemandCost = async (req, res) => {
  try {
    const { id } = req.params
    const sql =
      'UPDATE Game_Cart SET quantity = quantity + 1, cost = cost + 3 WHERE Game_Cart_id = ?'
    const updateCartItem = await pool.query(sql, [id])
    res.json(updateCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const IncrementAttractionCartItemandCost = async (req, res) => {
  try {
    const { id } = req.params
    const sql =
      'UPDATE Attraction_Cart SET quantity = quantity + 1, cost = cost + 12 WHERE Attraction_Cart_id = ?'
    const updateCartItem = await pool.query(sql, [id])
    res.json(updateCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const IncrementGiftCartItemandCost = async (req, res) => {
  try {
    const { id } = req.params
    const selectSql =
      'SELECT cost, quantity FROM Gift_Cart WHERE gift_cart_id = ?'
    const cartItems = await pool.query(selectSql, [id]) // Execute the correct query with correct SQL variable

    const cartItem = cartItems[0] // Assuming the query returns at least one result

    if (cartItem[0].length === 0) {
      res.status(404).send('Item not found')
      return
    }

    let unitPrice =
      parseFloat(cartItem[0].cost) / parseFloat(cartItem[0].quantity)
    let increaseCost = unitPrice // As we increment by 1, we add one unit price to the total

    const updateSql =
      'UPDATE Gift_Cart SET quantity = quantity + 1, cost = cost + ? WHERE gift_cart_id = ?'
    const updateCartItem = await pool.query(updateSql, [increaseCost, id]) // Pass both updated cost and id

    res.json(updateCartItem)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
export const InsertIntoAttractionVisited = async (req, res) => {
  try {
    const { account_id, AttractionData } = req.body // Assuming AttractionData is an array of objects
    const sql = `
      INSERT INTO Attraction_Visited (account_id, attraction_id, cost, num_tickets, visit_date ) VALUES(?,?,?,?,?)
    `
    const sql2 = `
      UPDATE Attraction_Cart SET purchased = 1 WHERE account_id = ? AND Attraction_Cart_id = ?
    `

    // Loop through each attraction data object and insert it into the database
    for (const attraction of AttractionData) {
      const { attraction_id, cost, quantity, Attraction_Cart_id } = attraction
      await pool.query(sql, [
        account_id,
        attraction_id,
        cost,
        quantity,
        new Date()
      ])
      await pool.query(sql2, [account_id, Attraction_Cart_id])
    }

    res.json({ message: 'All attractions inserted successfully.' })
  } catch (error) {
    console.error('Error inserting attraction data:', error.message)
    res.status(500).send('Server error')
  }
}
export const InsertIntoGameVisited = async (req, res) => {
  try {
    const { account_id, GameData } = req.body // Assuming GameData is an array of objects

    const sql = `
      INSERT INTO Game_Visited (account_id, game_id, cost, num_tickets, date_visited) VALUES(?,?,?,?,?)
    `
    const sql2 = `
      UPDATE Game_Cart SET purchased = 1 WHERE account_id = ? AND Game_Cart_id = ?
    `

    // Loop through each game data object and insert it into the database
    for (const game of GameData) {
      const { game_id, cost, quantity, Game_Cart_id } = game
      await pool.query(sql, [account_id, game_id, cost, quantity, new Date()])
      await pool.query(sql2, [account_id, Game_Cart_id])
    }

    res.json({ message: 'All games inserted successfully.' })
  } catch (error) {
    console.error('Error inserting game data:', error.message)
    res.status(500).send('Server error')
  }
}
export const InsertIntoRideVisited = async (req, res) => {
  try {
    const { account_id, RideData } = req.body // Assuming RideData is an array of objects

    const sql = `
      INSERT INTO Ride_Visited (account_id, ride_id, cost, num_tickets, visit_date ) VALUES(?,?,?,?,?)
    `
    const sql2 = `
      UPDATE Ride_Cart SET purchased = 1 WHERE account_id = ? AND Ride_Cart_id = ?
    `

    // Loop through each ride data object and insert it into the database
    for (const ride of RideData) {
      const { ride_id, cost, quantity, Ride_Cart_id } = ride
      await pool.query(sql, [account_id, ride_id, cost, quantity, new Date()])
      await pool.query(sql2, [account_id, Ride_Cart_id])
    }

    res.json({ message: 'All rides inserted successfully.' })
  } catch (error) {
    console.error('Error inserting ride data:', error.message)
    res.status(500).send('Server error')
  }
}
export const UpdateGiftPurchased = async (req, res) => {
  try {
    const { account_id, GiftData } = req.body
    console.log(GiftData)
    const sql = `
      UPDATE Gift_Cart SET purchased = 1 WHERE account_id = ? AND gift_cart_id = ?
    `
    const sql2 = `
      UPDATE Inventory SET inventory = inventory - ? 
      WHERE gift_id = ? AND size = ? AND inventory >= 0`
    const sql3 = `
      UPDATE Inventory SET inventory = inventory - ?
      WHERE gift_id = ? AND inventory >= 0`

    for (const gift of GiftData) {
      const { gift_cart_id, quantity, gift_id } = gift
      await pool.query(sql, [account_id, gift_cart_id])
      if (gift.size) {
        await pool.query(sql2, [quantity, gift_id, gift.size])
      } else {
        await pool.query(sql3, [quantity, gift_id])
      }
    }
    res.json('Gifts purchased successfully')
  } catch (error) {
    console.error('Error updating gift cart:', error.message)
    res.status(500).send('Server error')
  }
}
export const GetRideVisited = async (req, res) => {
  try {
    const { account_id } = req.params
    const sql = `
    SELECT
    R.name,
    RV.num_tickets,
    RV.visit_date,
    R.picture,
    R.ride_id
FROM
    Rides R
INNER JOIN
    Ride_Visited RV ON R.ride_id = RV.ride_id
WHERE
    RV.account_id = ?
AND
RV.visit_date = CURDATE();
    `
    const visitedRides = await pool.query(sql, [account_id])
    res.json(visitedRides[0])
  } catch (error) {
    console.error('Error getting visited rides:', error.message)
    res.status(500).send('Server error')
  }
}
export const GetGameVisited = async (req, res) => {
  try {
    const { account_id } = req.params
    const sql = `
    SELECT
    G.name,
    GV.num_tickets,
    GV.date_visited,
    G.picture,
    G.game_id
FROM
    Games G
INNER JOIN
    Game_Visited GV ON G.game_id = GV.game_id
WHERE
    GV.account_id = ?
    AND
    GV.date_visited = CURDATE();
    `
    const visitedGames = await pool.query(sql, [account_id])
    res.json(visitedGames[0])
  } catch (error) {
    console.error('Error getting visited games:', error.message)
    res.status(500).send('Server error')
  }
}
export const GetAttractionVisited = async (req, res) => {
  try {
    const { account_id } = req.params
    console.log(account_id)
    const sql = `
    SELECT
    A.name,
    AV.num_tickets,
    AV.visit_date,
    A.picture,
    A.attraction_id
FROM
    Attraction A
INNER JOIN
    Attraction_Visited AV ON A.attraction_id = AV.attraction_id
WHERE
    AV.account_id = ?
    AND 
    AV.visit_date = CURDATE();
    `
    const visitedAttractions = await pool.query(sql, [account_id])
    res.json(visitedAttractions[0])
  } catch (error) {
    console.error('Error getting visited attractions:', error.message)
    res.status(500).send('Server error')
  }
}
export const GetCustomerProfile = async (req, res) => {
  const account_id = req.params
  console.log(account_id)
  try {
    const sql = `
    SELECT 
    U.first_name,
    U.last_name,
    U.email,
    U.phone,
    U.address,
    CU.height
    FROM
    User_Account U
    INNER JOIN
    Customer_Info CU ON U.account_id = CU.account_id
    WHERE
    U.account_id = ?
    `
    const profile = await pool.query(sql, [account_id.account_id])
    res.json(profile[0])
  } catch (error) {
    console.error('Error getting customer profile:', error.message)
    res.status(500).send('Server error')
  }
}
export const UpdateCustomerProfile = async (req, res) => {
  const account_id = req.params
  const { first_name, last_name, email, phone, address, height } = req.body
  console.log(req.body)
  try {
    const sql = `
    UPDATE User_Account
    SET first_name = ?,
    last_name = ?,
    email = ?,
    phone = ?,
    address = ?
    WHERE account_id = ?
    `
    const sql2 = `
    UPDATE Customer_Info
    SET height = ?
    WHERE account_id = ?
    `
    await pool.query(sql, [
      first_name,
      last_name,
      email,
      phone,
      address,
      account_id
    ])
    await pool.query(sql2, [height, account_id])
    res.json('Profile updated successfully')
  } catch (error) {
    console.error('Error updating customer profile:', error.message)
    res.status(500).send('Server error')
  }
}
const createEmailHTML = giftData => {
  let itemsHtml = giftData
    .map(
      item =>
        `<li>${item.name} - Quantity: ${item.quantity}, Price: $${item.cost}</li>`
    )
    .join('')

  return `
    <h1>Your Gift Purchase</h1>
    <p>Thank you for your purchase! Here are the details of your gift items:</p>
    <ul>
      ${itemsHtml}
    </ul>
  `
}

export const sendEmail = async (req, res) => {
  const { account_id } = req.params
  const { GiftData } = req.body
  console.log(account_id)
  console.log(GiftData)
  const sql = `
  SELECT email
  FROM User_Account
  WHERE account_id = ?
  `
  const email = await pool.query(sql, [account_id])
  console.log(email[0][0].email)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })
  const mailOptions = {
    from: process.env.EMAIL,
    to: email[0][0].email,
    subject: 'Gift Purchase Confirmation',
    html: createEmailHTML(GiftData)
  }
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent: ' + info.response)
    res.json('Email sent')
  } catch (error) {
    console.error('Error sending email:', error.message)
    res.status(500).send('Server error')
  }
}
export const RememberPayment = async (req, res) => {
  try {
    const { account_id } = req.params
    const {
      card_number,
      card_holder_name,
      expire_date,
      cvv,
      address_line1,
      address_line2,
      state,
      city,
      zip_code
    } = req.body
    console.log(account_id)
    console.log(req.body)
    const ifExist = await pool.query(
      'SELECT COUNT(*) FROM CreditCards WHERE account_id = ?',
      [account_id]
    )
    if (ifExist[0][0]['COUNT(*)'] > 0) {
      const updatesql = `
      UPDATE CreditCards
      SET card_number = ?,
      card_holder_name = ?,
      expire_date = ?,
      cvv = ?,
      address_line1 = ?,
      address_line2 = ?,
      state = ?,
      city = ?,
      zip_code = ?
      WHERE account_id = ?
      `
      await pool.query(updatesql, [
        card_number,
        card_holder_name,
        expire_date,
        cvv,
        address_line1,
        address_line2,
        state,
        city,
        zip_code,
        account_id
      ])
      console.log('Payment updated')
      return res.json('Payment updated')
    }
    const sql = `
    INSERT INTO CreditCards (account_id, card_number, card_holder_name, expire_date, cvv, address_line1, address_line2, state, city, zip_code)
    VALUES(?,?,?,?,?,?,?,?,?,?)
    `
    await pool.query(sql, [
      account_id,
      card_number,
      card_holder_name,
      expire_date,
      cvv,
      address_line1,
      address_line2,
      state,
      city,
      zip_code
    ])
    console.log('Payment remembered')
  } catch (error) {
    console.error('Error remembering payment:', error.message)
    res.status(500).send('Server error')
  }
}
export const GetPayment = async (req, res) => {
  try {
    const { account_id } = req.params
    const sql = `
    SELECT card_number, card_holder_name, expire_date, cvv, address_line1, address_line2, state, city, zip_code
    FROM CreditCards
    WHERE account_id = ?
    `
    const payment = await pool.query(sql, [account_id])
    res.json(payment[0])
  } catch (error) {
    console.error('Error getting payment:', error.message)
    res.status(500).send('Server error')
  }
}
