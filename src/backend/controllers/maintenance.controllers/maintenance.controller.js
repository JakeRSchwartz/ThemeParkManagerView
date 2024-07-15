import pool from '../../db.js'
import 'dotenv/config'

//create a ride maintenance request
export const rideMaintenanceRequest = async (req, res) => {
  try {
    const {
      breakdown_date,
      maintainer_id,
      description,
      requester_id,
      ride_id
    } = req.body

    const sql_breakdown_date = new Date(breakdown_date)
      .toISOString()
      .replace('T', ' ')
      .slice(0, 19)

    // Checks if maintainer_id exists
    var maintainerResult = await pool.query(
      "SELECT * FROM User_Account WHERE account_id = ? AND user_type = 'maintanence'",
      [maintainer_id]
    )
    if (maintainerResult[0].length === 0) {
      return res.status(404).json('Maintainer does not exist')
    }

    // Checks if requester_id exists
    var requesterResult = await pool.query(
      "SELECT * FROM User_Account WHERE account_id = ? AND user_type = 'attendant'",
      [requester_id]
    )
    if (requesterResult[0].length === 0) {
      return res.status(404).json('Requester does not exist')
    }

    // Checks if ride_id exists
    var rideResult = await pool.query('SELECT * FROM Rides WHERE ride_id = ?', [
      ride_id
    ])
    if (rideResult[0].length === 0) {
      return res.status(404).json('Ride does not exist')
    }

    // Insert the new ride maintenance request into the database
    await pool.query(
      'INSERT INTO Ride_Maintenance_Request (breakdown_date, maintainer_id, description, requester_id, ride_id) VALUES (?, ?, ?, ?, ?)',

      [sql_breakdown_date, maintainer_id, description, requester_id, ride_id]
    )

    //Mark ride as broken
    await pool.query(
      'UPDATE Rides SET broken = 1 WHERE ride_id = ?',

      [ride_id]
    )

    //Response
    return res.status(201).json('Ride maintenance request inserted') // Use 201 for resource created successfully
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

//create a game maintenanace request
export const gameMaintenanceRequest = async (req, res) => {
  try {
    const {
      breakdown_date,
      maintainer_id,
      description,
      requester_id,
      game_id
    } = req.body

    const sql_breakdown_date = new Date(breakdown_date)
      .toISOString()
      .replace('T', ' ')
      .slice(0, 19)

    // Checks if maintainer_id exists
    var maintainerResult = await pool.query(
      "SELECT * FROM User_Account WHERE account_id = ? AND user_type = 'maintanence'",
      [maintainer_id]
    )
    if (maintainerResult[0].length === 0) {
      return res.status(404).json('Maintainer does not exist')
    }

    // Checks if requester_id exists
    var requesterResult = await pool.query(
      "SELECT * FROM User_Account WHERE account_id = ? AND user_type = 'attendant'",
      [requester_id]
    )
    if (requesterResult[0].length === 0) {
      return res.status(404).json('Requester does not exist')
    }

    // Checks if game_id exists
    var gameResult = await pool.query('SELECT * FROM Games WHERE game_id = ?', [
      game_id
    ])
    if (gameResult[0].length === 0) {
      return res.status(404).json('Game does not exist')
    }

    // Insert the new game maintenance request into the database
    await pool.query(
      'INSERT INTO Game_Maintenance_Request (breakdown_date, maintainer_id, description, requester_id, game_id) VALUES (?, ?, ?, ?, ?)',

      [sql_breakdown_date, maintainer_id, description, requester_id, game_id]
    )

    //Mark game as broken
    await pool.query(
      'UPDATE Games SET broken = 1 WHERE game_id = ?',

      [game_id]
    )

    //Response
    res.status(201).json('Game maintenance request inserted') // Use 201 for resource created successfully
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

//Update the date a certain ride maintenance request was completed
export const rideFixedDate = async (req, res) => {
  try {
    const { fixed_date, breakdown_id } = req.body

    const sql_fixed_date = new Date(fixed_date)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')

    // Checks if breakdown_id exists
    var results = await pool.query(
      'SELECT * FROM Ride_Maintenance_Request WHERE breakdown_id = ?',
      [breakdown_id]
    )
    console.log(results)

    if (results[0].length === 0) {
      return res.status(404).json('Ride maintenance request does not exist')
    }

    //Update fixed date
    await pool.query(
      'UPDATE Ride_Maintenance_Request SET fixed_date = ? WHERE breakdown_id = ?',
      [sql_fixed_date, breakdown_id]
    )

    //Mark ride as not broken
    await pool.query('UPDATE Rides SET broken = 0 WHERE ride_id = ?', [
      results[0][0].ride_id
    ])

    //Response
    return res.status(201).json('Updated fixed date') // Use 201 for resource created successfully
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

//Update the date a certain game maintenance request was completed
export const gameFixedDate = async (req, res) => {
  try {
    const { fixed_date, breakdown_id } = req.body

    const sql_fixed_date = new Date(fixed_date)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')

    // Checks if breakdown_id exists
    var results = await pool.query(
      'SELECT * FROM Game_Maintenance_Request WHERE breakdown_id = ?',
      [breakdown_id]
    )

    if (results[0].length === 0) {
      return res.status(404).json('Game maintenance request does not exist')
    }

    //Update fixed date
    await pool.query(
      'UPDATE Game_Maintenance_Request SET fixed_date = ? WHERE breakdown_id = ?',
      [sql_fixed_date, breakdown_id]
    )

    //Mark game as not broken
    await pool.query('UPDATE Games SET broken = 0 WHERE game_id = ?', [
      results[0][0].game_id
    ])

    //Response
    return res.status(201).json('Updated fixed date') // Use 201 for resource created successfully
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

//get ride maintenance request
export const getRideMaintenanceRequest = async (req, res) => {
  try {
    const { breakdown_id } = req.query

    //Check if breakdown_id exists
    const results = await pool.query(
      'SELECT * FROM Ride_Maintenance_Request WHERE breakdown_id = ?',
      [breakdown_id]
    )
    if (results[0].length === 0) {
      res.status(404).json('Ride maintenance request does not exist')
    } else {
      res.status(200).json(results[0])
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

//get game maintenance request
export const getGameMaintenanceRequest = async (req, res) => {
  try {
    const { breakdown_id } = req.query

    //Check if breakdown_id exists
    const results = await pool.query(
      'SELECT * FROM Game_Maintenance_Request WHERE breakdown_id = ?',
      [breakdown_id]
    )

    if (results[0].length === 0) {
      res.status(404).json('Game maintenance request does not exist')
    } else {
      res.status(200).json(results[0])
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

//get all ride maintenance requests
export const allRideMaintenanceRequests = async (req, res) => {
  try {
    //CHecks if any records exist
    const results = await pool.query('SELECT * FROM Ride_Maintenance_Request')
    if (results[0].length === 0) {
      res.status(404).json('There are no ride maintenance requests')
    } else {
      res.status(200).json(results[0])
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

//get all game maintenance requests
export const allGameMaintenanceRequests = async (req, res) => {
  try {
    //CHecks if any records exist
    const results = await pool.query('SELECT * FROM Game_Maintenance_Request')
    if (results[0].length === 0) {
      res.status(404).json('There are no game maintenance requests')
    } else {
      res.status(200).json(results[0])
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

//get pending game maintenance requests

//get completed ride maintenance requests

//get completed game maintenance request
//jdsabkjsadbjdsabjasdkbdsakjbdaskjsadjkbdsakjsdakbsdajkdsabdsjkabkjdsakjdsakjsdakbadsjbjksadjksdabskda
export const maintenanceRequest = async (req, res) => {
  const {
    type,
    account_id,
    first_name,
    last_name,
    item_id,
    breakdown_date,
    description
  } = req.body
  console.log(req.body)
  try {
    if (type === 'rides') {
      const sql = `INSERT INTO Ride_Maintenance_Request (requester_id, ride_id, breakdown_date, description) VALUES (?, ?, ?, ?)`
      var insertRide = await pool.query(sql, [
        account_id,
        item_id,
        breakdown_date,
        description
      ])
      const sql2 = `UPDATE Rides SET broken = 1 WHERE ride_id = ?`
      var updateRide = await pool.query(sql2, [item_id])
      res.status(202).json('Ride Maintenance Requested')
    } else if (type === 'games') {
      const sql = `INSERT INTO Game_Maintenance_Request (requester_id, game_id, breakdown_date, description) VALUES (?, ?, ?, ?)`
      var insertGame = await pool.query(sql, [
        account_id,
        item_id,
        breakdown_date,
        description
      ])
      const sql2 = `UPDATE Games SET broken = 1 WHERE game_id = ?`
      var updateGame = await pool.query(sql2, [item_id])
      res.status(202).json('Game Maintenance Requested')
    } else {
      const sql = `INSERT INTO Attraction_Maintenance_Request (requester_id, attraction_id, breakdown_date, description) VALUES (?, ?, ?, ?)`
      var insertAttraction = await pool.query(sql, [
        account_id,
        item_id,
        breakdown_date,
        description
      ])
      const sql2 = `UPDATE Attraction SET broken = 1 WHERE attraction_id = ?`
      var updateAttraction = await pool.query(sql2, [item_id])
      res.status(202).json('Attraction Maintenance Requested')
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const MyRideMaintenanceRequests = async (req, res) => {
  const { account_id } = req.body
  try {
    const sql = `SELECT
        RMR.breakdown_id as breakdown_id,
        UA.first_name as requester_fname,
        UA.last_name as requester_lname,
        UA.email as requester_email,
        RMR.breakdown_date as breakdown_date,
        RMR.description as description,
        R.name as ride_name
        FROM Ride_Maintenance_Request as RMR
        LEFT JOIN
        User_Account as UA ON RMR.requester_id = UA.account_id
        LEFT JOIN
        Rides as R ON RMR.ride_id = R.ride_id
        WHERE
        RMR.maintainer_id = ? AND
        RMR.fixed_date IS NULL
        `
    var myRideMaintenanceRequests = await pool.query(sql, [account_id])
    res.status(200).json({ myRide: myRideMaintenanceRequests[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const MyAttractionMaintenanceRequests = async (req, res) => {
  const { account_id } = req.body
  try {
    const sql = `SELECT 
        AMR.breakdown_id as breakdown_id,
        UA.first_name as requester_fname,
        UA.last_name as requester_lname,
        UA.email as requester_email,
        AMR.breakdown_date as breakdown_date,
        AMR.description as description,
        A.name as name
        FROM Attraction_Maintenance_Request as AMR
        LEFT JOIN
        User_Account as UA ON AMR.requester_id = UA.account_id
        LEFT JOIN
        Attraction as A ON AMR.attraction_id = A.attraction_id
        WHERE
        AMR.maintainer_id = ? AND
        AMR.fixed_date IS NULL;
        `
    var myAttractionMaintenanceRequests = await pool.query(sql, [account_id])
    res.status(200).json({ myAttractions: myAttractionMaintenanceRequests[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

}
export const MyGameMaintenanceRequests = async (req, res) => {
  const { account_id } = req.body
  console.log(account_id)
  try {
    const sql = `SELECT 
        GMR.breakdown_id as breakdown_id,
        UA.first_name as requester_fname,
        UA.last_name as requester_lname,
        UA.email as requester_email,
        GMR.breakdown_date as breakdown_date,
        GMR.description as description,
        G.name as game_name
        FROM Game_Maintenance_Request as GMR
        LEFT JOIN
        User_Account as UA ON GMR.requester_id = UA.account_id
        LEFT JOIN
        Games as G ON GMR.game_id = G.game_id
        WHERE 
        GMR.maintainer_id = ? AND
        GMR.fixed_date IS NULL;
        `
    var myGameMaintenanceRequests = await pool.query(sql, [account_id])
    console.log(myGameMaintenanceRequests[0])
    res.status(200).json({ myGame: myGameMaintenanceRequests[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const MaintenanceFixed = async (req, res) => {
  const account_id = req.body.account_id
  console.log(account_id)
  try {
    const sql = `
        SELECT
        R.name AS name,
        R.ride_id AS id,
        RMR.breakdown_id AS breakdown_id,
        RMR.breakdown_date AS breakdown_date,
        RMR.description AS description,
        UA.first_name AS requester_fname,
        UA.last_name AS requester_lname,
        UA.email AS requester_email
        FROM Ride_Maintenance_Request AS RMR
        LEFT JOIN
        User_Account AS UA ON RMR.requester_id = UA.account_id
        LEFT JOIN Rides AS R ON RMR.ride_id = R.ride_id
        WHERE RMR.maintainer_id = ? AND
        RMR.fixed_date IS NULL 

        `
    var updateRide = await pool.query(sql, [account_id, account_id])
    res.status(202).json({ myRequests: updateRide[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const updateMaintenanceRequest = async (req, res) => {
  const {
    name,
    id,
    breakdown_id,
    description,
    requester_fname,
    requester_lname,
    requester_email
  } = req.body
  try {
    const sql = `UPDATE Ride_Maintenance_Request SET fixed_date = NOW() WHERE breakdown_id = ?`
    var updateRide = await pool.query(sql, [breakdown_id])

    const CheckifNotBroken = `SELECT 
    COUNT(*)
    FROM Ride_Maintenance_Request
    WHERE ride_id = ?
    AND fixed_date IS NULL;`
    var checkIfNotBroken = await pool.query(CheckifNotBroken, [id])
    if (checkIfNotBroken[0][0]['COUNT(*)'] === 0) {
      const sql2 = `UPDATE Rides SET broken = 0 WHERE ride_id = ?`
      var updateRide = await pool.query(sql2, [id])
    }
    res.status(202).json('Ride Maintenance Request Fixed')
  } catch {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const updateMaintenanceRequestAttractions = async (req, res) => {
  const {
    name,
    breakdown_id,
    description,
    requester_fname,
    requester_lname,
    requester_email,
    id
  } = req.body
  try {
    const sql = `UPDATE Attraction_Maintenance_Request SET fixed_date = NOW() WHERE breakdown_id = ?`
    var updateAttraction = await pool.query(sql, [breakdown_id])
    const sql2 = `SELECT
    COUNT(*)
    FROM Attraction_Maintenance_Request
    WHERE attraction_id = ?
    AND fixed_date IS NULL;`
    var checkIfNotBroken = await pool.query(sql2, [id])
    if (checkIfNotBroken[0][0]['COUNT(*)'] === 0) {
      const sql3 = `UPDATE Attraction SET broken = 0 WHERE attraction_id = ?`
      var updateAttraction = await pool.query(sql3, [id])
    }
    res.status(202).json('Attraction Maintenance Request Fixed')
  } catch {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const FreeMaintReq = async (req, res) => {
  try {
    const sql = `SELECT 
    RMR.breakdown_id as breakdown_id,
    R.name as name,
    RMR.breakdown_date as breakdown_date,
    RMR.description as description,
    UA.first_name as requester_fname,
    UA.last_name as requester_lname,
    UA.email as requester_email
    FROM Ride_Maintenance_Request as RMR
    LEFT JOIN
    User_Account as UA ON RMR.requester_id = UA.account_id
    LEFT JOIN
    Rides as R ON RMR.ride_id = R.ride_id
    WHERE 
    RMR.fixed_date IS NULL
    AND
    RMR.maintainer_id is NULL
    `
    var freeMaintReq = await pool.query(sql)
    res.status(200).json({ AllRequests: freeMaintReq[0] })
  } catch {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const FreeMaintReqGames = async (req, res) => {
  try {
    const sql = `SELECT 
    GMR.breakdown_id as breakdown_id,
    G.name as name,
    GMR.breakdown_date as breakdown_date,
    GMR.description as description,
    UA.first_name as requester_fname,
    UA.last_name as requester_lname,
    UA.email as requester_email
    FROM Game_Maintenance_Request as GMR
    LEFT JOIN
    User_Account as UA ON GMR.requester_id = UA.account_id
    LEFT JOIN
    Games as G ON GMR.game_id = G.game_id
    WHERE 
    GMR.fixed_date IS NULL
    AND
    GMR.maintainer_id is NULL
    `
    var freeMaintReqGames = await pool.query(sql)
    res.status(200).json({ AllRequests: freeMaintReqGames[0] })
  } catch {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const FreeMaintReqAttractions = async (req, res) => {
  try {
    const sql = `SELECT 
    AMR.breakdown_id as breakdown_id,
    A.name as name,
    AMR.breakdown_date as breakdown_date,
    AMR.description as description,
    UA.first_name as requester_fname,
    UA.last_name as requester_lname,
    UA.email as requester_email
    FROM Attraction_Maintenance_Request as AMR
    LEFT JOIN
    User_Account as UA ON AMR.requester_id = UA.account_id
    LEFT JOIN
    Attraction as A ON AMR.attraction_id = A.attraction_id
    WHERE 
    AMR.fixed_date IS NULL
    AND
    AMR.maintainer_id is NULL
    `
    var freeMaintReqAttractions = await pool.query(sql)
    res.status(200).json({ AllRequests: freeMaintReqAttractions[0] })
  } catch {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export const PickupMaintenanceRequest = async (req, res) => {
  console.log(req.body)
  const { account_id, breakdown_id } = req.body
  try {
    const sql = `UPDATE Ride_Maintenance_Request SET maintainer_id = ? WHERE breakdown_id = ?`
    var pickupRide = await pool.query(sql, [account_id, breakdown_id])
    res.status(202).json('Ride Maintenance Request Picked Up')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const PickupMaintenanceRequestGames = async (req, res) => {
  const { account_id, breakdown_id } = req.body
  try {
    const sql = `UPDATE Game_Maintenance_Request SET maintainer_id = ? WHERE breakdown_id = ?`
    var pickupGame = await pool.query(sql, [account_id, breakdown_id])
    res.status(202).json('Game Maintenance Request Picked Up')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const PickupMaintenanceRequestAttractions = async (req, res) => {
  const { account_id, breakdown_id } = req.body
  try {
    const sql = `UPDATE Attraction_Maintenance_Request SET maintainer_id = ? WHERE breakdown_id = ?`
    var pickupAttraction = await pool.query(sql, [account_id, breakdown_id])
    res.status(202).json('Attraction Maintenance Request Picked Up')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export const MyGamesFixed = async (req, res) => {
  const { account_id } = req.body
  console.log(account_id)
  try {
    const sql = `SELECT 
        GMR.breakdown_id as breakdown_id,
        UA.first_name as requester_fname,
        UA.last_name as requester_lname,
        UA.email as requester_email,
        GMR.breakdown_date as breakdown_date,
        GMR.description as description,
        G.name as game_name, 
        G.game_id as id
        FROM Game_Maintenance_Request as GMR
        LEFT JOIN
        User_Account as UA ON GMR.requester_id = UA.account_id
        LEFT JOIN
        Games as G ON GMR.game_id = G.game_id
        WHERE 
        GMR.maintainer_id = ? AND
        GMR.fixed_date IS NULL;
        `
    var myGameMaintenanceRequests = await pool.query(sql, [account_id])
    console.log(myGameMaintenanceRequests[0])
    res.status(200).json({ myGame: myGameMaintenanceRequests[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const MyAttractionsFixed = async (req, res) => {
  const { account_id } = req.body
  console.log(account_id)
  try {
    const sql = `SELECT 
        AMR.breakdown_id as breakdown_id,
        UA.first_name as requester_fname,
        UA.last_name as requester_lname,
        UA.email as requester_email,
        AMR.breakdown_date as breakdown_date,
        AMR.description as description,
        A.name as name,
        A.attraction_id as id
        FROM Attraction_Maintenance_Request as AMR
        LEFT JOIN
        User_Account as UA ON AMR.requester_id = UA.account_id
        LEFT JOIN
        Attraction as A ON AMR.attraction_id = A.attraction_id
        WHERE
        AMR.maintainer_id = ? AND
        AMR.fixed_date IS NULL;
        `
    var myAttractionMaintenanceRequests = await pool.query(sql, [account_id])
    res.status(200).json({ myAttractions: myAttractionMaintenanceRequests[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const updateMaintenanceRequestGames = async (req, res) => {
  const {
    name,
    breakdown_id,
    description,
    requester_fname,
    requester_lname,
    requester_email, 
    id
  } = req.body
  try {
    const sql = `UPDATE Game_Maintenance_Request SET fixed_date = NOW() WHERE breakdown_id = ?`
    var updateGame = await pool.query(sql, [breakdown_id])
    const sql2 = `SELECT
    COUNT(*)
    FROM Game_Maintenance_Request
    WHERE game_id = ?
    AND fixed_date IS NULL;`
    var checkIfNotBroken = await pool.query(sql2, [id])
    if (checkIfNotBroken[0][0]['COUNT(*)'] === 0) {
      const sql3 = `UPDATE Games SET broken = 0 WHERE game_id = ?`
      var updateGame = await pool.query(sql3, [id])
    }
    res.status(202).json('Game Maintenance Request Fixed')
  } catch {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
