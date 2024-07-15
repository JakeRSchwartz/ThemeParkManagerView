import pool from '../../db.js'
import bcrypt from 'bcryptjs'

export const GetRideName = async (req, res) => {
  try {
    const rideNames = await pool.query('SELECT name, ride_id FROM Rides')
    res.status(202).json({ rideNames: rideNames[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const GetGameName = async (req, res) => {
  try {
    const gameNames = await pool.query('SELECT name, game_id FROM Games')
    res.status(202).json({ gameNames: gameNames[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const GetAttractionName = async (req, res) => {
  try {
    const attractionNames = await pool.query(
      'SELECT name, attraction_id FROM Attraction'
    )
    res.status(202).json({ attractionNames: attractionNames[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export const NumTicketNow = async (req, res) => {
  try {
    const numTiks = await pool.query(
      'SELECT COUNT(*) AS count FROM Entry_Pass WHERE expire_date >= CURRENT_DATE'
    )
    const count = numTiks[0][0]['count']
    res.status(202).json({ count: count })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const NumRidesBroken = async (req, res) => {
  try {
    const numRides = await pool.query(
      'SELECT COUNT(*) AS count FROM Rides WHERE broken = "1"'
    )
    const count = numRides[0][0]['count']
    res.status(202).json({ count: count })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const NumRainouts = async (req, res) => {
  try {
    const numRides = await pool.query(
      'SELECT COUNT(*) AS count FROM Rides WHERE rained_out = "1"'
    )
    const count = numRides[0][0]['count']
    res.status(202).json({ count: count })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const NumEmpNow = async (req, res) => {
  try {
    const numRides = await pool.query(
      'SELECT COUNT(*) AS count FROM Shifts WHERE shift_date = CURRENT_DATE'
    )
    const count = numRides[0][0]['count']
    res.status(202).json({ count: count })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export const GetRideData = async (req, res) => {
  try {
    const { start_date, end_date } = req.body
    if (req.body.start_date && req.body.end_date) {
      const sqlQuery = `SELECT 
    Rides.name, 
    CASE WHEN Rides.broken = 0 THEN 'No' ELSE 'Yes' END AS broken,
    Rides.age_restriction,
    Rides.height_restriction,
    CASE WHEN Rides.rained_out = 0 THEN 'No' ELSE 'Yes' END AS rained_out,
    COUNT(Ride_Visited.ride_visited) AS person_usage
    FROM 
    Rides
    LEFT JOIN 
    Ride_Visited ON Rides.ride_id = Ride_Visited.ride_visited AND visit_date BETWEEN ? AND ?
    GROUP BY 
    Rides.ride_id;`
      const rideData = await pool.query(sqlQuery, [start_date, end_date])
      res.status(202).json({ rideData: rideData[0] })
    } else if (req.body.start_date) {
      const { start_date } = req.body
      const sqlQuery = `SELECT 
      Rides.name, 
      CASE WHEN Rides.broken = 0 THEN 'No' ELSE 'Yes' END AS broken,
      Rides.age_restriction,
      Rides.height_restriction,
      CASE WHEN Rides.rained_out = 0 THEN 'No' ELSE 'Yes' END AS rained_out,
      COUNT(Ride_Visited.ride_visited) AS person_usage
      FROM Rides
      LEFT JOIN 
      Ride_Visited ON Rides.ride_id = Ride_Visited.ride_visited AND visit_date >= ?
      GROUP BY 
      Rides.ride_id;`
      const rideData = await pool.query(sqlQuery, [start_date])
      res.status(202).json({ rideData: rideData[0] })
    } else if (req.body.end_date) {
      const { end_date } = req.body
      const sqlQuery = `SELECT 
      Rides.name, 
      CASE WHEN Rides.broken = 0 THEN 'No' ELSE 'Yes' END AS broken,
      Rides.age_restriction,
      Rides.height_restriction,
      CASE WHEN Rides.rained_out = 0 THEN 'No' ELSE 'Yes' END AS rained_out,
      COUNT(Ride_Visited.ride_visited) AS person_usage
      FROM Rides
      LEFT JOIN
      Ride_Visited ON Rides.ride_id = Ride_Visited.ride_visited AND visit_date <= ?
      GROUP BY
      Rides.ride_id;`
      const rideData = await pool.query(sqlQuery, [end_date])
      res.status(202).json({ rideData: rideData[0] })
    } else {
      const sqlQuery = `SELECT 
      Rides.name, 
      CASE WHEN Rides.broken = 0 THEN 'No' ELSE 'Yes' END AS broken,
      Rides.age_restriction,
      Rides.height_restriction,
      CASE WHEN Rides.rained_out = 0 THEN 'No' ELSE 'Yes' END AS rained_out,
      COUNT(Ride_Visited.ride_id) AS person_usage
      FROM 
      Rides
      LEFT JOIN 
      Ride_Visited ON Rides.ride_id = Ride_Visited.ride_id
      GROUP BY 
      Rides.ride_id;`
      const rideData = await pool.query(sqlQuery)
      res.status(202).json({ rideData: rideData[0] })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export const GetGameData = async (req, res) => {
  const { type, item_id, start_date, end_date } = req.body
  console.log(req.body)
  try {
    if (type === 'rides') {
      if (item_id === '*') {
        const sqlQuery = `SELECT 
    U.first_name,
    U.last_name,
    U.email,
    DATE_FORMAT(RV.visit_date, '%Y-%m-%d') AS date,
    R.name AS name,
    SUM(RV.cost) AS total_spent,
    RV.num_tickets AS total_tickets
FROM
    Ride_Visited RV
JOIN
    Rides R ON RV.ride_id = R.ride_id
JOIN
    User_Account U ON RV.account_id = U.account_id
WHERE
    RV.visit_date BETWEEN ? AND ?
GROUP BY
    U.account_id, U.first_name, U.last_name, U.email, RV.visit_date, R.name
`
        const Data = await pool.query(sqlQuery, [start_date, end_date])
        console.log(Data[0])
        res.status(202).json({ Data: Data[0] })
      } else {
        const sql = `SELECT 
    DATE_FORMAT(RV.visit_date,'%Y-%m-%d') AS date,
    U.first_name,
    U.last_name,
    U.email,
    R.name AS name,
    SUM(RV.cost) AS total_spent,
    RV.num_tickets AS total_tickets
FROM
    Ride_Visited RV
JOIN
    Rides R ON RV.ride_id = R.ride_id
JOIN
    User_Account U ON RV.account_id = U.account_id
WHERE
    RV.ride_id = ?
    AND RV.visit_date BETWEEN ? AND ?
GROUP BY
    U.account_id, U.first_name, U.last_name, U.email, R.name, RV.visit_date

`
        const Data = await pool.query(sql, [item_id, start_date, end_date])
        console.log(Data[0])
        res.status(202).json({ Data: Data[0] })
      }
    }
    if (type === 'games') {
      if (item_id === '*') {
        const sqlQuery = `SELECT
    DATE_FORMAT(GV.date_visited, '%Y-%m-%d') AS date,
    U.first_name,
    U.last_name,
    U.email,
    G.name AS name,
    SUM(GV.cost) AS total_spent,
    GV.num_tickets AS total_tickets
FROM
    Game_Visited GV
JOIN
    Games G ON GV.game_id = G.game_id
JOIN
    User_Account U ON GV.account_id = U.account_id
WHERE
    GV.date_visited BETWEEN ? AND ?
GROUP BY
    U.account_id, U.first_name, U.last_name, U.email, G.name, GV.date_visited;
        `
        const Data = await pool.query(sqlQuery, [start_date, end_date])
        res.status(202).json({ Data: Data[0] })
      } else {
        const sql = `SELECT
    DATE_FORMAT(GV.date_visited,'%Y-%m-%d') AS date,
    U.first_name,
    U.last_name,
    U.email,
    G.name AS name,
    SUM(GV.cost) AS total_spent,
    GV.num_tickets AS total_tickets
FROM
    Game_Visited GV
JOIN
    Games G ON GV.game_id = G.game_id
JOIN
    User_Account U ON GV.account_id = U.account_id
WHERE
    GV.game_id = ? AND
    GV.date_visited BETWEEN ? AND ?
GROUP BY
    U.account_id, U.first_name, U.last_name, U.email, G.name, GV.date_visited;
  `
        const Data = await pool.query(sql, [item_id, start_date, end_date])
        console.log(Data[0])
        res.status(202).json({ Data: Data[0] })
      }
    } else if (type === 'attractions') {
      if (item_id === '*') {
        const sqlQuery = `SELECT
        DATE_FORMAT(AV.visit_date,'%Y-%m-%d') AS date,
        U.first_name,
        U.last_name,
        U.email,
        A.name AS name,
        SUM(AV.cost) AS total_spent,
        AV.num_tickets AS total_tickets
        FROM
        Attraction_Visited AV
        JOIN
        Attraction A ON AV.attraction_id = A.attraction_id
        JOIN
        User_Account U ON AV.account_id = U.account_id
        WHERE
        AV.visit_date BETWEEN ? AND ?
        GROUP BY
        U.account_id, U.first_name, U.last_name, U.email, A.name, AV.visit_date;`
        const Data = await pool.query(sqlQuery, [start_date, end_date])
        console.log(Data[0])
        res.status(202).json({ Data: Data[0] })
      } else {
        const sql = `SELECT
          DATE_FORMAT(AV.visit_date,'%Y-%m-%d') AS date,
          U.first_name,
          U.last_name,
          U.email,
          A.name AS name,
          SUM(AV.cost) AS total_spent,
          AV.num_tickets AS total_tickets
          FROM
          Attraction_Visited AV
          JOIN
          Attraction A ON AV.attraction_id = A.attraction_id
          JOIN
          User_Account U ON AV.account_id = U.account_id
          WHERE
          AV.attraction_id = ? AND
          AV.visit_date BETWEEN ? AND ?
          GROUP BY
          U.account_id, U.first_name, U.last_name, U.email, A.name, AV.visit_date;
        `
        const Data = await pool.query(sql, [item_id, start_date, end_date])
        console.log(Data[0])
        res.status(202).json({ Data: Data[0] })
      }
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send(err.message)
  }
}
export const GetActivityChart = async (req, res) => {
  try {
    const { type, item_id, start_date, end_date } = req.body
    console.log(req.body)
    if (type === 'rides') {
      if (item_id === '*') {
        const sqlQuery = `SELECT
        R.name AS name,
        SUM(RV.num_tickets) AS tickets
        FROM
        Rides R
        JOIN
        Ride_Visited RV ON R.ride_id = RV.ride_id
        WHERE
        RV.visit_date BETWEEN ? AND ?
        GROUP BY
        R.name;
        `
        const activityData = await pool.query(sqlQuery, [start_date, end_date])
        res.status(203).json({ activityData: activityData[0] })
      } else {
        const sqlQuery = `SELECT
      DATE_FORMAT(RV.visit_date, '%Y-%m-%d') AS updatedDate,
      SUM(RV.num_tickets) AS tickets
      FROM
      Ride_Visited RV
      WHERE
      RV.visit_date BETWEEN ? AND ? AND
      RV.ride_id = ?
      GROUP BY
      RV.visit_date;
      `
        const activityData = await pool.query(sqlQuery, [
          start_date,
          end_date,
          item_id
        ])
        console.log(activityData[0])
        res.status(202).json({ activityData: activityData[0] })
      }
    } else if (type === 'games') {
      if (item_id === '*') {
        const sqlQuery = `SELECT
      G.name AS name,
      SUM(GV.num_tickets) AS tickets
      FROM
      Games G
      JOIN
      Game_Visited GV ON G.game_id = GV.game_id
      WHERE
      GV.date_visited BETWEEN ? AND ?
      GROUP BY
      G.name;
      `
        const activityData = await pool.query(sqlQuery, [start_date, end_date])
        res.status(203).json({ activityData: activityData[0] })
      } else {
        const sqlQuery = `SELECT
    DATE_FORMAT(GV.date_visited,'%Y-%m-%d') AS updatedDate,
    SUM(GV.num_tickets) AS tickets
    FROM
    Game_Visited GV
    WHERE
    GV.date_visited BETWEEN ? AND ? AND
    GV.game_id = ?
    GROUP BY
    GV.date_visited;
    `
        const activityData = await pool.query(sqlQuery, [
          start_date,
          end_date,
          item_id
        ])
        res.status(202).json({ activityData: activityData[0] })
      }
    } else {
      if (item_id === '*') {
        const sqlQuery = `SELECT
    A.name AS name,
    SUM(AV.num_tickets) AS tickets
    FROM
    Attraction A
    JOIN
    Attraction_Visited AV ON A.attraction_id = AV.attraction_id
    WHERE
    AV.visit_date BETWEEN ? AND ?
    GROUP BY
    A.name;
    `
        const activityData = await pool.query(sqlQuery, [start_date, end_date])
        res.status(203).json({ activityData: activityData[0] })
      } else {
        const sqlQuery = `SELECT
  DATE_FORMAT(AV.visit_date,'%Y-%m-%d') AS updatedDate,
  SUM(AV.num_tickets) AS tickets
  FROM
  Attraction_Visited AV
  WHERE
  AV.visit_date BETWEEN ? AND ? AND
  AV.attraction_id = ?
  GROUP BY
  AV.visit_date;
  `
        const activityData = await pool.query(sqlQuery, [
          start_date,
          end_date,
          item_id
        ])
        res.status(202).json({ activityData: activityData[0] })
      }
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export const GetMaintenanceReport = async (req, res) => {
  console.log(req.body)
  const { type, first_name, last_name, name, start_date, end_date, broken } =
    req.body
  try {
    if (type === 'rides') {
      const sqlQuery2 = `
    SELECT
        DATE_FORMAT(RMR.fixed_date, '%Y-%m-%d') AS fixed_date,
        DATE_FORMAT(RMR.breakdown_date, '%Y-%m-%d') AS breakdown_date,
        Ride.name AS ride_name,
        CASE WHEN Ride.rained_out = 0 THEN 'No' ELSE 'Yes' END AS rained_out,
        Maintainer.first_name AS maintainer_firstname,
        Maintainer.last_name AS maintainer_lastname,
        Maintainer.email AS maintainer_email,
        Requester.first_name AS requester_firstname,
        Requester.last_name AS requester_lastname,
        Requester.email AS requester_email
    FROM
        Ride_Maintenance_Request AS RMR
    JOIN
        Rides AS Ride ON RMR.ride_id = Ride.ride_id
    LEFT JOIN
        User_Account AS Maintainer ON RMR.maintainer_id = Maintainer.account_id
    LEFT JOIN
        User_Account AS Requester ON RMR.requester_id = Requester.account_id
    WHERE
        (? IS NULL OR RMR.ride_id = ?) AND
        (? IS NULL OR Maintainer.first_name LIKE ?) AND
        (? IS NULL OR Maintainer.last_name LIKE ?) AND
        (? IS NULL OR DATE_FORMAT(RMR.breakdown_date, '%Y-%m-%d') >= ?) AND
        (? IS NULL OR DATE_FORMAT(RMR.breakdown_date, '%Y-%m-%d') <= ?) AND
        (? IS NULL OR Ride.broken = ?);
`

      const maintenanceReport = await pool
        .query(sqlQuery2, [
          name === '*' ? null : name,
          name === '*' ? null : name,
          first_name || null,
          first_name || null,
          last_name || null,
          last_name || null,
          start_date || null,
          start_date || null,
          end_date || null,
          end_date || null,
          broken || null,
          broken || null
        ])
        .catch(err => console.log(err))
      res.status(202).json({ maintenanceReport: maintenanceReport[0] })
    } else if (type === 'games') {
      const sqlQuery2 = ` SELECT
    DATE_FORMAT(GMR.fixed_date, '%Y-%m-%d') AS fixed_date,
    DATE_FORMAT(GMR.breakdown_date, '%Y-%m-%d') AS breakdown_date,
    Game.name AS game_name,
    Maintainer.first_name AS maintainer_firstname,
    Maintainer.last_name AS maintainer_lastname,
    Maintainer.email AS maintainer_email,
    Requester.first_name AS requester_firstname,
    Requester.last_name AS requester_lastname,
    Requester.email AS requester_email
FROM
    Game_Maintenance_Request AS GMR
JOIN
    Games AS Game ON GMR.game_id = Game.game_id
LEFT JOIN
    User_Account AS Maintainer ON GMR.maintainer_id = Maintainer.account_id
LEFT JOIN
    User_Account AS Requester ON GMR.requester_id = Requester.account_id
WHERE
    (? IS NULL OR GMR.game_id = ?)AND
    (? IS NULL OR Maintainer.first_name LIKE ?) AND
    (? IS NULL OR Maintainer.last_name LIKE ?) AND
    (? IS NULL OR DATE_FORMAT(GMR.breakdown_date, '%Y-%m-%d') <= ?) AND
    (? IS NULL OR DATE_FORMAT(GMR.breakdown_date, '%Y-%m-%d') >= ?) AND
    (? IS NULL OR Game.broken = ?);
      `
      const maintenanceReport = await pool
        .query(sqlQuery2, [
          name === '*' ? null : name,
          name === '*' ? null : name,
          first_name || null,
          first_name || null,
          last_name || null,
          last_name || null,
          start_date || null,
          start_date || null,
          end_date || null,
          end_date || null,
          broken || null,
          broken || null
        ])
        .catch(err => console.log(err))
      res.status(202).json({ maintenanceReport: maintenanceReport[0] })
    } else {
      const sqlQuery2 = `SELECT
      DATE_FORMAT(AMR.fixed_date, '%Y-%m-%d') AS fixed_date,
      DATE_FORMAT(AMR.breakdown_date, '%Y-%m-%d') AS breakdown_date,
      Attraction.name AS attraction_name,
      Maintainer.first_name AS maintainer_firstname,
      Maintainer.last_name AS maintainer_lastname,
      Maintainer.email AS maintainer_email,
      Requester.first_name AS requester_firstname,
      Requester.last_name AS requester_lastname,
      Requester.email AS requester_email
  FROM
      Attraction_Maintenance_Request AS AMR
  JOIN
      Attraction AS Attraction ON AMR.attraction_id = Attraction.attraction_id
  LEFT JOIN
      User_Account AS Maintainer ON AMR.maintainer_id = Maintainer.account_id
  LEFT JOIN
      User_Account AS Requester ON AMR.requester_id = Requester.account_id
  WHERE
      (? IS NULL OR AMR.attraction_id = ?) AND
      (? IS NULL OR Maintainer.first_name LIKE ?) AND
      (? IS NULL OR Maintainer.last_name LIKE ?) AND
      (? IS NULL OR DATE_FORMAT(AMR.breakdown_date, '%Y-%m-%d') >= ?) AND
      (? IS NULL OR DATE_FORMAT(AMR.breakdown_date, '%Y-%m-%d') <= ?) AND
      (? IS NULL OR Attraction.broken = ?);
`
      const maintenanceReport = await pool
        .query(sqlQuery2, [
          name === '*' ? null : name,
          name === '*' ? null : name,
          first_name || null,
          first_name || null,
          last_name || null,
          last_name || null,
          start_date || null,
          start_date || null,
          end_date || null,
          end_date || null,
          broken || null,
          broken || null
        ])
        .catch(err => console.log(err))
      res.status(202).json({ maintenanceReport: maintenanceReport[0] })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export const AddEmployee = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    dob,
    user_type,
    phone,
    wage
  } = req.body
  try {
    const sqlDOB = new Date(dob).toISOString().slice(0, 10).replace('T', ' ')
    var existingUser = await pool.query(
      'SELECT * FROM User_Account WHERE email = ?',
      [email]
    )
    if (existingUser[0].length !== 0) {
      return res.status(401).json('Email already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newEmployee = await pool.query(
      'INSERT INTO User_Account (first_name, last_name, email, password, dob, user_type, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        first_name,
        last_name,
        email.toLowerCase(),
        hashedPassword,
        sqlDOB,
        user_type,
        phone
      ]
    )
    console.log(newEmployee[0])
    const sql2 = `INSERT INTO Employee_Salary (account_id, wage) VALUES (?, ?)`
    await pool.query(sql2, [newEmployee[0].insertId, wage])
    res.status(202).json(newEmployee[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const GetAttractionNames = async (req, res) => {
  try {
    const attractionNames = await pool.query(
      'SELECT name, attraction_id FROM Attraction'
    )
    res.status(202).json({ attractionNames: attractionNames[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const submitRainout = async (req, res) => {
  const { type, account_id, first_name, last_name, item_id, date_rainout } =
    req.body
  try {
    if (type === 'rides') {
      if (item_id === '*') {
        const ride_ids = await pool.query(
          'SELECT ride_id FROM Rides WHERE rained_out = 0'
        )
        ride_ids[0].map(async ride => {
          console.log(ride)
          await pool.query(
            'INSERT INTO Ride_Rainout (ride_id, date_rainout, attendant_id) VALUES (?, ?, ?)',
            [ride.ride_id, date_rainout, account_id]
          )
          await pool.query(
            'UPDATE Rides SET rained_out = 1 WHERE ride_id = ?',
            [ride.ride_id]
          )
        })
      } else {
        console.log(item_id, date_rainout, account_id)
        const newRideRainout = await pool.query(
          'INSERT INTO Ride_Rainout (ride_id, date_rainout, attendant_id) VALUES (?, ?, ?)',
          [item_id, date_rainout, account_id]
        )
        await pool.query('UPDATE Rides SET rained_out = 1 WHERE ride_id = ?', [
          item_id
        ])
      }
      res.status(202).json({ message: 'Ride rainout request submitted' })
    } else if (type === 'games') {
      if (item_id === '*') {
        const game_ids = await pool.query(
          'SELECT game_id FROM Games WHERE rained_out = 0'
        )
        game_ids[0].map(async game => {
          await pool.query(
            'INSERT INTO Game_Rainout (game_id, date_rainout, attendant_id) VALUES (?, ?, ?)',
            [game.game_id, date_rainout, account_id]
          )
          await pool.query(
            'UPDATE Games SET rained_out = 1 WHERE game_id = ?',
            [game.game_id]
          )
        })
      } else {
        const newGameRainout = await pool.query(
          'INSERT INTO Game_Rainout (game_id, date_rainout, attendant_id) VALUES (?, ?, ?)',
          [item_id, date_rainout, account_id]
        )
        await pool.query('UPDATE Games SET rained_out = 1 WHERE game_id = ?', [
          item_id
        ])
        res.status(202).json({ message: 'Game rainout request submitted' })
      }
    } else {
      if (item_id === '*') {
        attraction_ids = await pool.query(
          'SELECT attraction_id FROM Attraction'
        )
        attraction_ids[0].map(async attraction => {
          await pool.query(
            'INSERT INTO Attraction_Rainout (attraction_id, date_rainout, attendant_id) VALUES (?, ?, ?)',
            [attraction.attraction_id, date_rainout, account_id]
          )
          await pool.query(
            'UPDATE Attraction SET rained_out = 1 WHERE attraction_id = ?',
            [attraction.attraction_id]
          )
        })
      } else {
        const newAttractionRainout = await pool.query(
          'INSERT INTO Attraction_Rainout (attraction_id, date_rainout, attendant_id) VALUES (?, ?, ?)',
          [item_id, date_rainout, account_id]
        )
        await pool.query(
          'UPDATE Attraction SET rained_out = 1 WHERE attraction_id = ?',
          [item_id]
        )
        res
          .status(202)
          .json({ message: 'Attraction rainout request submitted' })
      }
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const GetEmp = async (req, res) => {
  const { first_name, last_name } = req.body
  console.log(first_name, last_name)
  try {
    const sqlQuery = `SELECT account_id, first_name, last_name, email, phone, user_type, dob
FROM 
User_Account 
WHERE first_name LIKE ? 
AND last_name LIKE ?
AND (user_type = 3 OR user_type = 4 OR user_type = 2)
;
`
    const emp = await pool.query(sqlQuery, [first_name, last_name])
    emp[0].forEach(e => {
      e.dob = e.dob.toISOString().slice(0, 10)
    })
    res.status(202).json({ emp: emp[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const DeleteEmp = async (req, res) => {
  const { account_id } = req.body
  try {
    const sqlQuery = `DELETE FROM User_Account WHERE account_id = ?`
    await pool.query(sqlQuery, [account_id])
    res.status(202).json({ message: 'Employee deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export const adminchart1 = async (req, res) => {
  const dateNow = new Date(Date.now())
  try {
    const sqlQuery = `SELECT 
    WEEKDAY(entry_date) AS day_of_week, 
    COUNT(entry_pass_id) AS passes_purchased
FROM 
    Entry_Pass
WHERE 
    entry_date >= CURDATE() - INTERVAL 7 DAY
GROUP BY 
    WEEKDAY(entry_date)
ORDER BY 
    entry_date DESC;
`
    const chartData = await pool.query(sqlQuery, [dateNow])
    res.status(202).json({ chartData: chartData[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const chart2rides = async (req, res) => {
  const dateNow = new Date(Date.now())
  try {
    const sqlQuery = `SELECT 
    WEEKDAY(visit_date) AS day_of_week, 
    SUM(num_tickets) AS rides_visited
FROM 
    Ride_Visited
WHERE 
    visit_date >= CURDATE() - INTERVAL 7 DAY
GROUP BY 
    WEEKDAY(visit_date)
ORDER BY 
    WEEKDAY(visit_date) ASC;
    `
    const chartData = await pool.query(sqlQuery, [dateNow])
    res.status(202).json({ chartData: chartData[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const chart2games = async (req, res) => {
  const dateNow = new Date(Date.now())
  try {
    const sqlQuery = `SELECT 
    WEEKDAY(date_visited) AS day_of_week, 
    SUM(num_tickets) AS games_visited
FROM 
    Game_Visited
WHERE 
    date_visited >= CURDATE() - INTERVAL 7 DAY
GROUP BY 
    WEEKDAY(date_visited)
ORDER BY 
    WEEKDAY(date_visited) ASC;

    `
    const chartData = await pool.query(sqlQuery, [dateNow])
    res.status(202).json({ chartData: chartData[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const chart2attractions = async (req, res) => {
  const dateNow = new Date(Date.now())
  try {
    const sqlQuery = `SELECT 
    WEEKDAY(visit_date) AS day_of_week, 
    SUM(num_tickets) AS attractions_visited
FROM 
    Attraction_Visited
WHERE 
    visit_date >= CURDATE() - INTERVAL 7 DAY
GROUP BY 
    WEEKDAY(visit_date)
ORDER BY 
    WEEKDAY(visit_date) ASC;
    `
    const chartData = await pool.query(sqlQuery, [dateNow])
    console.log(chartData[0])
    res.status(202).json({ chartData: chartData[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const brokenGames = async (req, res) => {
  try {
    const sqlQuery = `SELECT COUNT(*) AS count FROM Games WHERE broken = 1`
    const count = await pool.query(sqlQuery)
    res.status(202).json({ count: count[0][0]['count'] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const BrokenRideChart = async (req, res) => {
  try {
    const sqlQuery = `SELECT 
    R.name AS ride_name,
    RMR.breakdown_date AS ride_breakdown_date,
    RMR.requester_id AS ride_requester_id,
    RMR.description AS ride_description
  FROM
    Rides AS R
  LEFT JOIN
    Ride_Maintenance_Request AS RMR ON R.ride_id = RMR.ride_id
  WHERE
    R.broken = 1 AND
    RMR.maintainer_id IS NULL;

     `
    const breakdowntab = await pool.query(sqlQuery)
    res.status(202).json({ breakdowntab: breakdowntab[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const brokenGameschart = async (req, res) => {
  try {
    const sqlQuery = ` SELECT 
      G.name AS game_name,
      GMR.breakdown_date AS game_breakdown_date,
      GMR.requester_id AS game_requester_id,
      GMR.description AS game_description
    FROM
      Games AS G
    LEFT JOIN
      Game_Maintenance_Request AS GMR ON G.game_id = GMR.game_id
    WHERE
      G.broken = 1 AND
      GMR.maintainer_id IS NULL;`
    const breakdowntab = await pool.query(sqlQuery)
    res.status(202).json({ breakdowntab: breakdowntab[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const brokenAttractionchart = async (req, res) => {
  try {
    const sqlQuery = `SELECT
  A.name AS attraction_name,
  AMR.breakdown_date AS attraction_breakdown_date,
  AMR.requester_id AS attraction_requester_id,
  AMR.description AS attraction_description
FROM
  Attraction AS A
LEFT JOIN
  Attraction_Maintenance_Request AS AMR ON A.attraction_id = AMR.attraction_id
WHERE
  A.broken = 1 AND
  AMR.maintainer_id IS NULL;
  `
    const breakdowntab = await pool.query(sqlQuery)
    res.status(202).json({ breakdowntab: breakdowntab[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const getAllEmployees = async (req, res) => {
  try {
    const sql = `SELECT first_name, last_name, account_id FROM User_Account WHERE user_type = 'attendant'`
    var allEmployees = await pool.query(sql)
    res.status(200).json({ employees: allEmployees[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const AddShift = async (req, res) => {
  const { type, name, employee_id, shift, date } = req.body
  const currentDate = new Date(date)

  // Add one day to the current updatedDate
  currentDate.setDate(currentDate.getDate() + 1)

  // Convert the updated updatedDate back to the desired format (e.g., YYYY-MM-DD)
  const updatedDate = currentDate.toISOString().split('T')[0]

  console.log(req.body)
  if (type === 'rides') {
    try {
      const hours = await pool.query(
        `SELECT COUNT(*) AS count 
FROM Attendent_Schedule 
WHERE attendant_id = ? 
  AND shift_date >= DATE_SUB(NOW(), INTERVAL WEEKDAY(NOW()) DAY) 
  AND shift_date < DATE_ADD(DATE_SUB(NOW(), INTERVAL WEEKDAY(NOW()) DAY), INTERVAL 7 DAY);
`,
        [employee_id]
      )
      const TotalHours = hours[0][0].count * 4
      if (TotalHours >= 37) {
        return res.status(404).json({ message: 'Employee is over 40 Hours' })
      }

      const count = await pool.query(
        'SELECT COUNT(*) AS count FROM Attendent_Schedule WHERE ride_id = ? AND shift_date = ? AND shifts = ?',
        [name, updatedDate, shift]
      )
      if (count[0][0].count > 4) {
        return res
          .status(404)
          .json({ message: 'Too many people on specific shift' })
      }
      const hasShift = await pool.query(
        `SELECT COUNT(*) AS count FROM Attendent_Schedule WHERE attendant_id = ? AND shift_date = ? AND shifts = ?`,
        [employee_id, updatedDate, shift]
      )
      if (hasShift[0][0].count > 0) {
        return res
          .status(404)
          .json({ message: 'Employee already has a shift at that time' })
      }
      const isRainedout = await pool.query(
        'SELECT COUNT(*) AS count FROM Rides WHERE ride_id = ? AND rained_out = 1',
        [name]
      )
      if (isRainedout[0][0].count > 0) {
        return res.status(404).json({ message: 'Ride is rained out' })
      }
      const isBroken = await pool.query(
        'SELECT COUNT(*) AS count FROM Rides WHERE ride_id = ? AND broken = 1',
        [name]
      )
      if (isBroken[0][0].count > 0) {
        return res.status(404).json({ message: 'Ride is broken' })
      }
      const sql = `INSERT INTO Attendent_Schedule (ride_id, attendant_id, shifts, shift_date) VALUES (?, ?, ?, ?)`
      await pool.query(sql, [name, employee_id, shift, updatedDate])
      res.status(200).json({ message: 'Shift added' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
  if (type === 'games') {
    try {
      const hours = await pool.query(
        `SELECT COUNT(*) AS count 
FROM Attendent_Schedule 
WHERE attendant_id = ? 
  AND shift_date >= DATE_SUB(NOW(), INTERVAL WEEKDAY(NOW()) DAY) 
  AND shift_date < DATE_ADD(DATE_SUB(NOW(), INTERVAL WEEKDAY(NOW()) DAY), INTERVAL 7 DAY);
`,
        [employee_id]
      )
      const TotalHours = hours[0][0].count * 4
      if (TotalHours >= 37) {
        return res.status(404).json({ message: 'Employee is over 40 Hours' })
      }

      const count = await pool.query(
        'SELECT COUNT(*) AS count FROM Attendent_Schedule WHERE game_id = ? AND shift_date = ? AND shifts = ?',
        [name, updatedDate, shift]
      )
      if (count[0][0].count > 4) {
        return res
          .status(404)
          .json({ message: 'Too many people on specific shift' })
      }
      const hasShift = await pool.query(
        `SELECT COUNT(*) AS count FROM Attendent_Schedule WHERE attendant_id = ? AND shift_date = ? AND shifts = ?`,
        [employee_id, updatedDate, shift]
      )
      if (hasShift[0][0].count > 0) {
        return res
          .status(404)
          .json({ message: 'Employee already has at that time' })
      }
      const isRainedout = await pool.query(
        'SELECT COUNT(*) AS count FROM Games WHERE game_id = ? AND rained_out = 1',
        [name, updatedDate]
      )
      if (isRainedout[0][0].count > 0) {
        return res.status(404).json({ message: 'Game is rained out' })
      }
      const isBroken = await pool.query(
        'SELECT COUNT(*) AS count FROM Games WHERE game_id = ? AND broken = 1',
        [name]
      )
      if (isBroken[0][0].count > 0) {
        return res.status(404).json({ message: 'Game is broken' })
      }
      const sql = `INSERT INTO Attendent_Schedule (game_id, attendant_id, shifts, shift_date) VALUES (?, ?, ?, ?)`
      await pool.query(sql, [name, employee_id, shift, updatedDate])
      res.status(200).json({ message: 'Shift added' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  } else {
    try {
      const hours = await pool.query(
        `SELECT COUNT(*) AS count
FROM Attendent_Schedule
WHERE attendant_id = ?
  AND shift_date >= DATE_SUB(NOW(), INTERVAL WEEKDAY(NOW()) DAY)
  AND shift_date < DATE_ADD(DATE_SUB(NOW(), INTERVAL WEEKDAY(NOW()) DAY), INTERVAL 7 DAY);
`,
        [employee_id]
      )
      const TotalHours = hours[0][0].count * 4
      if (TotalHours >= 37) {
        return res.status(404).json({ message: 'Employee is over 40 Hours' })
      }

      const count = await pool.query(
        'SELECT COUNT(*) AS count FROM Attendent_Schedule WHERE attraction_id = ? AND shift_date = ? AND shifts = ?',
        [name, updatedDate, shift]
      )
      if (count[0][0].count > 4) {
        return res
          .status(404)
          .json({ message: 'Too many people on specific shift' })
      }
      const hasShift = await pool.query(
        `SELECT COUNT(*) AS count FROM Attendent_Schedule WHERE attendant_id = ? AND shift_date = ? AND shifts = ?`,
        [employee_id, updatedDate, shift]
      )
      if (hasShift[0][0].count > 0) {
        return res
          .status(404)
          .json({ message: 'Employee already has at that time' })
      }
      const isRainedout = await pool.query(
        'SELECT COUNT(*) AS count FROM Attraction WHERE attraction_id = ? AND rained_out = 1',
        [name]
      )
      if (isRainedout[0][0].count > 0) {
        return res.status(404).json({ message: 'Attraction is rained out' })
      }
      const isBroken = await pool.query(
        'SELECT COUNT(*) AS count FROM Attraction WHERE attraction_id = ? AND broken = 1',
        [name]
      )
      if (isBroken[0][0].count > 0) {
        return res.status(404).json({ message: 'Attraction is broken' })
      }
      const sql = `INSERT INTO Attendent_Schedule (attraction_id, attendant_id, shifts, shift_date) VALUES (?, ?, ?, ?)`
      await pool.query(sql, [name, employee_id, shift, updatedDate])
      res.status(200).json({ message: 'Shift added' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
}
export const Notifications = async (req, res) => {
  const { account_id } = req.body
  try {
    const sql = `SELECT 
    t.updatedDate, 
    r.name, 
    t.trigger_id, 
    t.type,
    t.broken AS status
FROM 
    Trigger_RideMaintenance AS t 
LEFT JOIN 
    RideMaintenanceSeen AS s ON t.trigger_id = s.trigger_id AND s.user_id = ? 
LEFT JOIN
    Rides AS r ON t.ride_id = r.ride_id
WHERE 
    (s.seen_id IS NULL  OR s.seen_id = 0)
    AND t.broken = 1
UNION
SELECT
    t.updatedDate, 
    g.name, 
    t.trigger_id, 
    t.type,
    t.broken
FROM
    Trigger_GameMaintenance AS t
LEFT JOIN
    GameMaintenanceSeen AS s ON t.trigger_id = s.trigger_id AND s.user_id = ?
LEFT JOIN
    Games AS g ON t.game_id = g.game_id
WHERE
    (s.seen_id IS NULL OR s.seen_id = 0)
    AND t.broken = 1
UNION
SELECT
    t.updatedDate, 
    a.name, 
    t.trigger_id, 
    t.type,
    t.rainout as status
FROM
    Trigger_AttractionRainout AS t
LEFT JOIN
    AttractionRainoutSeen AS s ON t.trigger_id = s.trigger_id AND s.user_id = ?
LEFT JOIN
    Attraction AS a ON t.attraction_id = a.attraction_id
WHERE
    (s.seen_id IS NULL OR s.seen_id = 0)
    AND t.rainout = 1
UNION
SELECT
    t.updatedDate, 
    r.name, 
    t.trigger_id, 
    t.type,
    t.rainout AS status
FROM
    Trigger_RideRainout AS t
LEFT JOIN
    RideRainoutSeen AS s ON t.trigger_id = s.trigger_id AND s.user_id = ?
LEFT JOIN
    Rides AS r ON t.ride_id = r.ride_id
WHERE
    (s.seen_id IS NULL OR s.seen_id = 0)
    AND t.rainout = 1
UNION
SELECT
    t.updatedDate, 
    g.name, 
    t.trigger_id, 
    t.type,
    t.rainout AS status
FROM
    Trigger_GameRainout AS t
LEFT JOIN
    GameRainoutSeen AS s ON t.trigger_id = s.trigger_id AND s.user_id = ?
LEFT JOIN
    Games AS g ON t.game_id = g.game_id
WHERE
    (s.seen_id IS NULL OR s.seen_id = 0)
    AND t.rainout = 1
UNION
SELECT
    t.updatedDate, 
    a.name, 
    t.trigger_id, 
    t.type,
    t.broken AS status
FROM
    Trigger_AttractionMaintenance AS t
LEFT JOIN
    AttractionMaintenanceSeen AS s ON t.trigger_id = s.trigger_id AND s.user_id = ?
LEFT JOIN
    Attraction AS a ON t.attraction_id = a.attraction_id
WHERE
    (s.seen_id IS NULL OR s.seen_id = 0)
    AND t.broken = 1
ORDER BY updatedDate DESC;
`

    const notifications = await pool.query(sql, [
      account_id,
      account_id,
      account_id,
      account_id,
      account_id,
      account_id
    ])
    res.status(200).json({ notifications: notifications[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const SeenNotifications = async (req, res) => {
  const { account_id, trigger_id, type } = req.body
  try {
    if (type === 'RM') {
      const sql = `INSERT INTO RideMaintenanceSeen (user_id, trigger_id, seen ) VALUES (?, ?, 1)`
      await pool.query(sql, [account_id, trigger_id])
    }
    if (type === 'GM') {
      const sql = `INSERT INTO GameMaintenanceSeen (user_id, trigger_id, seen ) VALUES (?, ?, 1)`
      await pool.query(sql, [account_id, trigger_id])
    }
    if (type === 'AR') {
      const sql = `INSERT INTO AttractionRainoutSeen (user_id, trigger_id, seen ) VALUES (?, ?, 1)`
      await pool.query(sql, [account_id, trigger_id])
    }
    if (type === 'RR') {
      const sql = `INSERT INTO RideRainoutSeen (user_id, trigger_id, seen ) VALUES (?, ?, 1)`
      await pool.query(sql, [account_id, trigger_id])
    }
    if (type === 'GR') {
      const sql = `INSERT INTO GameRainoutSeen (user_id, trigger_id, seen ) VALUES (?, ?, 1)`
      await pool.query(sql, [account_id, trigger_id])
    }
    if (type === 'AM') {
      const sql = `INSERT INTO AttractionMaintenanceSeen (user_id, trigger_id, seen ) VALUES (?, ?, 1)`
      await pool.query(sql, [account_id, trigger_id])
    }
    res.status(200).json({ message: 'Notification seen' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const GetAttractionNameRO = async (req, res) => {
  const sql = 'SELECT name, attraction_id FROM Attraction WHERE rained_out = 1'
  const attractionNames = await pool.query(sql)
  console.log(attractionNames[0])
  res.status(202).json({ attractionNames: attractionNames[0] })
}
export const GetRideNameRO = async (req, res) => {
  const sql = 'SELECT name, ride_id FROM Rides WHERE rained_out = 1'
  const rideNames = await pool.query(sql)
  res.status(202).json({ rideNames: rideNames[0] })
}
export const GetGameNameRO = async (req, res) => {
  const sql = 'SELECT name, game_id FROM Games WHERE rained_out = 1'
  const gameNames = await pool.query(sql)
  res.status(202).json({ gameNames: gameNames[0] })
}
export const EndRainout = async (req, res) => {
  const { type, account_id, first_name, last_name, item_id, end_date } =
    req.body
  try {
    if (type === 'rides') {
      if (item_id === '*') {
        const ride_ids = await pool.query(
          'SELECT ride_id FROM Rides WHERE rained_out = 1'
        )
        console.log(ride_ids[0])
        ride_ids[0].map(async ride => {
          await pool.query(
            'UPDATE Ride_Rainout SET date_end = ? WHERE ride_id = ? AND (date_end IS NULL OR date_end > ?)',
            [end_date, ride.ride_id, end_date]
          )
          await pool.query(
            'UPDATE Rides SET rained_out = 0 WHERE ride_id = ?',
            [ride.ride_id]
          )
        })
      } else {
        const newRideRainout = await pool.query(
          'UPDATE Ride_Rainout SET date_end = ? WHERE ride_id = ? AND (date_end IS NULL OR date_end > ?)',
          [end_date, item_id, end_date]
        )
        await pool.query('UPDATE Rides SET rained_out = 0 WHERE ride_id = ?', [
          item_id
        ])
      }
      res.status(202).json({ message: 'Ride rainout ended' })
    }
    if (type === 'games') {
      if (item_id === '*') {
        const game_ids = await pool.query(
          'SELECT game_id FROM Games WHERE rained_out = 1'
        )
        game_ids[0].map(async game => {
          await pool.query(
            'UPDATE Game_Rainout SET date_end = ? WHERE game_id = ? AND (date_end IS NULL OR date_end > ?)',
            [end_date, game.game_id, end_date]
          )
          await pool.query(
            'UPDATE Games SET rained_out = 0 WHERE game_id = ?',
            [game.game_id]
          )
        })
      } else {
        const newGameRainout = await pool.query(
          'UPDATE Game_Rainout SET date_end = ? WHERE game_id = ? AND (date_end IS NULL OR date_end > ?)',
          [end_date, item_id, end_date]
        )
        await pool.query('UPDATE Games SET rained_out = 0 WHERE game_id = ?', [
          item_id
        ])
        res.status(202).json({ message: 'Game rainout ended' })
      }
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const GetAttractionNameFRO = async (req, res) => {
  const sql = 'SELECT name, attraction_id FROM Attraction WHERE rained_out = 0'
  const attractionNames = await pool.query(sql)
  res.status(202).json({ attractionNames: attractionNames[0] })
}
export const GetRideNameFRO = async (req, res) => {
  const sql = 'SELECT name, ride_id FROM Rides WHERE rained_out = 0'
  const rideNames = await pool.query(sql)
  res.status(202).json({ rideNames: rideNames[0] })
}
export const GetGameNameFRO = async (req, res) => {
  const sql = 'SELECT name, game_id FROM Games WHERE rained_out = 0'
  const gameNames = await pool.query(sql)
  res.status(202).json({ gameNames: gameNames[0] })
}

export const GetEmployees = async (req, res) => {
  try {
    const sql = `SELECT first_name, last_name, account_id, email, phone, user_type FROM User_Account WHERE user_type = 'attendant' OR user_type = 'admin' OR user_type = 'maintenance'`
    const employees = await pool.query(sql)
    res.status(200).json({ employees: employees[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const GetRainouts = async (req, res) => {
  try {
    const sql = `SELECT
    AU.first_name AS requester_first_name,
    AU.last_name AS requester_last_name,
    AU.email AS requester_email,
    R.name AS name,
    DATE_FORMAT(RR.date_rainout, '%Y-%m-%d') AS date_rainout
    FROM
    Ride_Rainout AS RR
    JOIN
    Rides AS R ON RR.ride_id = R.ride_id
    JOIN
    User_Account AS AU ON RR.attendant_id = AU.account_id
    WHERE
    RR.date_end IS NULL
    UNION
    SELECT
    AU.first_name AS requester_first_name,
    AU.last_name AS requester_last_name,
    AU.email AS requester_email,
    G.name AS name,
    DATE_FORMAT(GR.date_rainout, '%Y-%m-%d') AS date_rainout
    FROM
    Game_Rainout AS GR
    JOIN
    Games AS G ON GR.game_id = G.game_id
    JOIN
    User_Account AS AU ON GR.attendant_id = AU.account_id
    WHERE
    GR.date_end IS NULL
    UNION
    SELECT
    AU.first_name AS requester_first_name,
    AU.last_name AS requester_last_name,
    AU.email AS requester_email,
    A.name AS name,
    DATE_FORMAT(AR.date_rainout, '%Y-%m-%d') AS date_rainout
    FROM
    Attraction_Rainout AS AR
    JOIN
    Attraction AS A ON AR.attraction_id = A.attraction_id
    JOIN
    User_Account AS AU ON AR.attendant_id = AU.account_id
    WHERE
    AR.date_end IS NULL
    ORDER BY date_rainout DESC;
    `
    const rainouts = await pool.query(sql)
    res.status(200).json({ rainouts: rainouts[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export const EditRide = async (req, res) => {
  const { name, description, cost, height_restriction } = req.body
  const { RideID } = req.params
  try {
    const sql = `UPDATE Rides SET name = ?, description = ?, cost = ?, height_restriction = ? WHERE ride_id = ?`
    await pool.query(sql, [name, description, cost, height_restriction, RideID])
    res.status(200).json({ message: 'Ride updated' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const EditGame = async (req, res) => {
  const { name, description, cost } = req.body
  const { GameID } = req.params
  try {
    const sql = `UPDATE Games SET name = ?, description = ?, cost = ? WHERE game_id = ?`
    await pool.query(sql, [name, description, cost, GameID])
    res.status(200).json({ message: 'Game updated' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const EditAttraction = async (req, res) => {
  const { name, description, cost, age_restriction } = req.body
  const { AttractionID } = req.params
  console.log(AttractionID)
  console.log(req.body)
  try {
    const sql = `UPDATE Attraction SET name = ?, description = ?, cost = ?, age_restriction = ? WHERE attraction_id = ?`
    const check = await pool.query(sql, [
      name,
      description,
      cost,
      age_restriction,
      AttractionID
    ])
    console.log(check[0])
    res.status(200).json({ message: 'Attraction updated' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const GetRevenueReports = async (req, res) => {
  try {
    const { start_date, end_date, type } = req.body
    if (type === 'rides') {
      const sql = `SELECT 
    DATE_FORMAT(RV.visit_date, '%Y-%m-%d') AS date,
    R.name AS name,
    SUM(RV.num_tickets) AS quantity,
    SUM(RV.cost) AS revenue
FROM
    Ride_Visited AS RV
JOIN
    Rides AS R ON RV.ride_id = R.ride_id
WHERE
    RV.visit_date >= ? AND RV.visit_date <= ?
GROUP BY
    DATE(RV.visit_date), R.name
ORDER BY
    DATE(RV.visit_date) DESC;
`
      const revenueReport = await pool.query(sql, [start_date, end_date])
      res.status(200).json({ revenueReport: revenueReport[0] })
    }
    if (type === 'games') {
      const sql = `SELECT
    DATE_FORMAT(GV.date_visited, '%Y-%m-%d') AS date,
    G.name AS name,
    SUM(GV.num_tickets) AS quantity,
    SUM(GV.cost) AS revenue
FROM
    Game_Visited AS GV
JOIN
    Games AS G ON GV.game_id = G.game_id
WHERE
    GV.date_visited >= ? AND GV.date_visited <= ?
GROUP BY
    DATE(GV.date_visited), G.name
ORDER BY
    DATE(GV.date_visited) DESC;
`
      const revenueReport = await pool.query(sql, [start_date, end_date])
      res.status(200).json({ revenueReport: revenueReport[0] })
    }
    if (type === 'attractions') {
      const sql = `SELECT
    DATE_FORMAT(AV.visit_date,'%Y-%m-%d') AS date,
    A.name AS name,
    SUM(AV.num_tickets) AS quantity,
    SUM(AV.cost) AS revenue
FROM
    Attraction_Visited AS AV
JOIN
    Attraction AS A ON AV.attraction_id = A.attraction_id
WHERE
    AV.visit_date >= ? AND AV.visit_date <= ?
GROUP BY
    DATE(AV.visit_date), A.name
ORDER BY
    DATE(AV.visit_date) DESC;
`
      const revenueReport = await pool.query(sql, [start_date, end_date])
      res.status(200).json({ revenueReport: revenueReport[0] })
    }
    if (type === 'gifts') {
      const sql = `SELECT
    DATE_FORMAT(GC.date,'%Y-%m-%d') AS date,
    GI.name AS name,
    SUM(GC.quantity) AS quantity,
    SUM(GC.cost) AS revenue
FROM
    Gift_Cart AS GC
JOIN
    Gift_Items AS GI ON GC.gift_id = GI.gift_id
WHERE
    GC.date >= ? AND GC.date <= ?
    AND
    GC.purchased = 1
GROUP BY
    DATE(GC.date), GI.name
ORDER BY
    DATE(GC.date) DESC;
`
      const revenueReport = await pool.query(sql, [start_date, end_date])
      res.status(200).json({ revenueReport: revenueReport[0] })
    }
    if (type === '*') {
      const sql = `SELECT
    DATE_FORMAT(RV.visit_date,'%Y-%m-%d') AS date,
    R.name AS name,
    SUM(RV.num_tickets) AS quantity,
    SUM(RV.cost) AS revenue
FROM
    Ride_Visited AS RV
JOIN
    Rides AS R ON RV.ride_id = R.ride_id
WHERE
    RV.visit_date >= ? AND RV.visit_date <= ?
GROUP BY
    DATE(RV.visit_date), R.name
UNION
SELECT
    DATE_FORMAT(GV.date_visited,'%Y-%m-%d') AS date,
    G.name AS name,
    SUM(GV.num_tickets) AS quantity,
    SUM(GV.cost) AS revenue
FROM
    Game_Visited AS GV
JOIN
    Games AS G ON GV.game_id = G.game_id
WHERE
    GV.date_visited >= ? AND GV.date_visited <= ?
GROUP BY
    DATE(GV.date_visited), G.name
UNION
SELECT
    DATE_FORMAT(AV.visit_date,'%Y-%m-%d') AS date,
    A.name AS name,
    SUM(AV.num_tickets) AS quantity,
    SUM(AV.cost) AS revenue
FROM
    Attraction_Visited AS AV
JOIN
    Attraction AS A ON AV.attraction_id = A.attraction_id
WHERE
    AV.visit_date >= ? AND AV.visit_date <= ?
GROUP BY
    DATE(AV.visit_date), A.name
UNION
SELECT
    DATE_FORMAT(GC.date,'%Y-%m-%d') AS date,
    GI.name AS name,
    SUM(GC.quantity) AS quantity,
    SUM(GC.cost) AS revenue
FROM
    Gift_Cart AS GC
JOIN
    Gift_Items AS GI ON GC.gift_id = GI.gift_id
WHERE
    GC.date >= ? AND GC.date <= ?
    AND
    GC.purchased = 1
GROUP BY
    DATE(GC.date), GI.name
ORDER BY
    DATE DESC;
`
      const revenueReport = await pool.query(sql, [
        start_date,
        end_date,
        start_date,
        end_date,
        start_date,
        end_date,
        start_date,
        end_date
      ])
      res.status(200).json({ revenueReport: revenueReport[0] })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const GetRevenueGraph = async (req, res) => {
  try {
    const { start_date, end_date, type } = req.body
    if (type === 'rides') {
      const sql = `SELECT
      R.name AS name,
      SUM(RV.cost) AS revenue
    FROM
      Ride_Visited AS RV
    JOIN
      Rides AS R ON RV.ride_id = R.ride_id
    WHERE
      RV.visit_date >= ? AND RV.visit_date <= ?
    GROUP BY
      R.name
    ORDER BY
      SUM(RV.cost) DESC;
`
      const revenueGraph = await pool.query(sql, [start_date, end_date])
      res.status(200).json({ revenueGraph: revenueGraph[0] })
    }
    if (type === 'games') {
      const sql = `SELECT
      G.name AS name,
      SUM(GV.cost) AS revenue
    FROM
      Game_Visited AS GV
    JOIN
      Games AS G ON GV.game_id = G.game_id
    WHERE
      GV.date_visited >= ? AND GV.date_visited <= ?
    GROUP BY
      G.name
    ORDER BY
      SUM(GV.cost) DESC;
`
      const revenueGraph = await pool.query(sql, [start_date, end_date])
      res.status(200).json({ revenueGraph: revenueGraph[0] })
    }
    if (type === 'attractions') {
      const sql = `SELECT
      A.name AS name,
      SUM(AV.cost) AS revenue
    FROM
      Attraction_Visited AS AV
    JOIN
      Attraction AS A ON AV.attraction_id = A.attraction_id
    WHERE
      AV.visit_date >= ? AND AV.visit_date <= ?
    GROUP BY
      A.name
    ORDER BY
      SUM(AV.cost) DESC;
`
      const revenueGraph = await pool.query(sql, [start_date, end_date])
      res.status(200).json({ revenueGraph: revenueGraph[0] })
    }
    if (type === 'gifts') {
      const sql = `SELECT
      GI.name AS name,
      SUM(GC.cost) AS revenue
    FROM
      Gift_Cart AS GC
    JOIN
      Gift_Items AS GI ON GC.gift_id = GI.gift_id
    WHERE
      GC.date >= ? AND GC.date <= ?
      AND
      GC.purchased = 1
    GROUP BY
      GI.name
    ORDER BY
      SUM(GC.cost) DESC;
`
      const revenueGraph = await pool.query(sql, [start_date, end_date])
      res.status(200).json({ revenueGraph: revenueGraph[0] })
    }
    if (type === '*') {
      const sql = `SELECT
      R.name AS name,
      SUM(RV.cost) AS revenue
    FROM
      Ride_Visited AS RV
    JOIN
      Rides AS R ON RV.ride_id = R.ride_id
    WHERE
      RV.visit_date >= ? AND RV.visit_date <= ?
    GROUP BY
      R.name
    UNION
    SELECT
      G.name AS name,
      SUM(GV.cost) AS revenue
    FROM
      Game_Visited AS GV
    JOIN
      Games AS G ON GV.game_id = G.game_id
    WHERE
      GV.date_visited >= ? AND GV.date_visited <= ?
    GROUP BY
      G.name
    UNION
    SELECT
      A.name AS name,
      SUM(AV.cost) AS revenue
    FROM
      Attraction_Visited AS AV
    JOIN
      Attraction AS A ON AV.attraction_id = A.attraction_id
    WHERE
      AV.visit_date >= ? AND AV.visit_date <= ?
    GROUP BY
      A.name
    UNION
    SELECT
      GI.name AS name,
      SUM(GC.cost) AS revenue
    FROM
      Gift_Cart AS GC
    JOIN
      Gift_Items AS GI ON GC.gift_id = GI.gift_id
    WHERE
      GC.date >= ? AND GC.date <= ?
      AND
      GC.purchased = 1
    GROUP BY
      GI.name
`
      const revenueGraph = await pool.query(sql, [
        start_date,
        end_date,
        start_date,
        end_date,
        start_date,
        end_date,
        start_date,
        end_date
      ])
      res.status(200).json({ revenueGraph: revenueGraph[0] })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const GetInventory = async (req, res) => {
  try {
    const sql = `SELECT
    GI.name AS name,
    GI.cost AS cost,
    I.inventory,
    I.size
FROM
    Gift_Items AS GI
JOIN
    Inventory AS I ON GI.gift_id = I.gift_id
ORDER BY
    GI.name;
    `
    const inventory = await pool.query(sql)
    res.status(200).json({ inventory: inventory[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const DeleteAttraction = async (req, res) => {
  const { AttractionID } = req.params
  try {
    const sql = `DELETE FROM Attraction WHERE attraction_id = ?`
    await pool.query(sql, [AttractionID])
    res.status(200).json({ message: 'Attraction deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const DeleteGame = async (req, res) => {
  const { GameID } = req.params
  try {
    const sql = `DELETE FROM Games WHERE game_id = ?`
    await pool.query(sql, [GameID])
    res.status(200).json({ message: 'Game deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const DeleteRide = async (req, res) => {
  const { RideID } = req.params
  try {
    const sql = `DELETE FROM Rides WHERE ride_id = ?`
    await pool.query(sql, [RideID])
    res.status(200).json({ message: 'Ride deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const addToParkRide = async (req, res) => {
  try {
    const {
      name,
      description,
      cost,
      height_restriction,
      type,
      age_restriction
    } = req.body
    console.log(req.body)
    const picture = '/rides/basepicture.jpeg'
    const sql = `INSERT INTO Rides (name, description, cost, height_restriction, broken, rained_out, picture) VALUES (?, ?, ?, ?, 0, 0, ?)`
    await pool.query(sql, [
      name,
      description,
      cost,
      height_restriction,
      picture
    ])
    res.status(200).json({ message: 'Ride added' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const addToParkGame = async (req, res) => {
  try {
    const {
      name,
      description,
      cost,
      type,
      age_restriction,
      height_restriction
    } = req.body
    const picture = '/rides/basepicture.jpeg'
    const sql = `INSERT INTO Games (name, description, cost, broken, rained_out, picture) VALUES (?, ?, ?, 0, 0, ?)`
    await pool.query(sql, [name, description, cost, picture])
    res.status(200).json({ message: 'Game added' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const addToParkAttraction = async (req, res) => {
  try {
    const {
      name,
      description,
      cost,
      age_restriction,
      type,
      height_restriction
    } = req.body
    const picture = '/rides/basepicture.jpeg'
    const sql = `INSERT INTO Attraction (name, description, cost, age_restriction, broken, rained_out, picture) VALUES (?, ?, ?, ?, 0, 0, ?)`
    await pool.query(sql, [name, description, cost, age_restriction, picture])
    res.status(200).json({ message: 'Attraction added' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const LargeRevenueStats = async (req, res) => {
  try {
    const { start_date, end_date, type } = req.body
    if (type === 'rides') {
      const sql = `SELECT
      SUM(RV.cost) AS revenue
    FROM
      Ride_Visited AS RV
    WHERE
      RV.visit_date >= ? AND RV.visit_date <= ?
      `
      const revenue = await pool.query(sql, [start_date, end_date])
      res.status(200).json({ revenue: revenue[0] })
    }
    if (type === 'games') {
      const sql = `SELECT
      SUM(GV.cost) AS revenue
    FROM
      Game_Visited AS GV
    WHERE
      GV.date_visited >= ? AND GV.date_visited <= ?
      `
      const revenue = await pool.query(sql, [start_date, end_date])
      res.status(200).json({ revenue: revenue[0] })
    }
    if (type === 'attractions') {
      const sql = `SELECT
      SUM(AV.cost) AS revenue
    FROM
      Attraction_Visited AS AV
    WHERE
      AV.visit_date >= ? AND AV.visit_date <= ?
      `
      const revenue = await pool.query(sql, [start_date, end_date])
      res.status(200).json({ revenue: revenue[0] })
    }
    if (type === 'gifts') {
      const sql = `SELECT
      SUM(GC.cost) AS revenue
    FROM
      Gift_Cart AS GC
    WHERE
      GC.date >= ? AND GC.date <= ?
      AND
      GC.purchased = 1
      `
      const revenue = await pool.query(sql, [start_date, end_date])
      res.status(200).json({ revenue: revenue[0] })
    }
    if (type === '*') {
      const sql = `SELECT SUM(revenue) AS revenue
FROM (
    SELECT SUM(RV.cost) AS revenue
    FROM Ride_Visited AS RV
    WHERE RV.visit_date >= ? AND RV.visit_date <= ?

    UNION ALL

    SELECT SUM(GV.cost) AS revenue
    FROM Game_Visited AS GV
    WHERE GV.date_visited >= ? AND GV.date_visited <= ?

    UNION ALL

    SELECT SUM(AV.cost) AS revenue
    FROM Attraction_Visited AS AV
    WHERE AV.visit_date >= ? AND AV.visit_date <= ?

    UNION ALL

    SELECT SUM(GC.cost) AS revenue
    FROM Gift_Cart AS GC
    WHERE GC.date >= ? AND GC.date <= ? AND GC.purchased = 1
) AS revenue
      `
      const revenue = await pool.query(sql, [
        start_date,
        end_date,
        start_date,
        end_date,
        start_date,
        end_date,
        start_date,
        end_date
      ])
      res.status(200).json({ revenue: revenue[0] })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export const GetInventoryInfo = async (req, res) => {
  try {
    const sql = `SELECT
    GI.name AS name,
    I.inventory AS inventory,
    I.size AS size, 
    I.inventory_id AS inventory_id
FROM
    Inventory AS I
JOIN
    Gift_Items AS GI ON I.gift_id = GI.gift_id
ORDER BY
    GI.name;
`
    const inventory = await pool.query(sql)
    res.status(200).json({ inventory: inventory[0] })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
export const EditInventory = async (req, res) => {
  const { inventory_id, quantity } = req.body
  try {
    const sql = `UPDATE Inventory SET inventory = ? WHERE inventory_id = ?`
    await pool.query(sql, [quantity, inventory_id])
    res.status(200).json({ message: 'Inventory updated' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
