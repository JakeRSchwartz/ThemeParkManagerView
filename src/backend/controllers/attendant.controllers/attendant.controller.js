import pool from '../../db.js'
import 'dotenv/config'

export const GetAttendantShifts = async (req, res) => {
  try {
    const sql = `SELECT 
    ASch.shifts,
    ASch.shift_date,
    UA.first_name,
    UA.last_name,
    ST.start_time,
    ST.end_time,
    IFNULL(R.name, null) AS ride_name,
    IFNULL(G.name, null) AS game_name,
    IFNULL(A.name, null) AS attraction_name
FROM 
    Attendent_Schedule AS ASch
    LEFT JOIN Rides AS R ON ASch.ride_id = R.ride_id
    LEFT JOIN Games AS G ON ASch.game_id = G.game_id
    LEFT JOIN Attraction AS A ON ASch.attraction_id = A.attraction_id
    LEFT JOIN User_Account AS UA ON ASch.attendant_id = UA.account_id
    LEFT JOIN Shift_Time AS ST ON ASch.shifts = ST.shift_time_id
    ORDER BY ASch.shifts ASC;

`
    const AShifts = await pool.query(sql)
    console.log('Attendant sh:', AShifts[0])
    res.status(200).json(AShifts[0])
  } catch (error) {
    console.error('Failed to get attendant shifts:', error)
  }
}

export const GetYourShifts = async (req, res) => {
  try {
    const { account_id } = req.params
    const sql = `SELECT
    ASch.shifts,
    ASch.shift_date,
    UA.first_name,
    UA.last_name,
    ST.start_time,
    ST.end_time,
    IFNULL(R.name, null) AS ride_name,
    IFNULL(G.name, null) AS game_name,
    IFNULL(A.name, null) AS attraction_name
FROM
    Attendent_Schedule AS ASch
    LEFT JOIN Rides AS R ON ASch.ride_id = R.ride_id
    LEFT JOIN Games AS G ON ASch.game_id = G.game_id
    LEFT JOIN Attraction AS A ON ASch.attraction_id = A.attraction_id
    LEFT JOIN User_Account AS UA ON ASch.attendant_id = UA.account_id
    LEFT JOIN Shift_Time AS ST ON ASch.shifts = ST.shift_time_id
    WHERE ASch.attendant_id = ?
    ORDER BY ASch.shifts ASC;
`
    const AShifts = await pool.query(sql, [account_id])
    console.log('Attendant sh:', AShifts[0])
    res.status(200).json(AShifts[0])
  } catch (error) {
    console.error('Failed to get attendant shifts:', error)
  }
}
export const GetProfile = async (req, res) => {
  try {
    const { account_id } = req.params
    console.log('Account ID:', account_id)
    const sql = `SELECT 
    UA.first_name,
    UA.last_name,
    UA.email,
    UA.phone,
    UA.address
FROM
    User_Account AS UA
WHERE
    UA.account_id = ?;
`
    const profile = await pool.query(sql, [account_id])
    console.log('Profile:', profile[0])

    res.status(200).json(profile[0])
  } catch (error) {
    console.error('Failed to get profile:', error)
  }
}
export const UpdateProfile = async (req, res) => {
  const {first_name, last_name, email, phone, address} = req.body
  const { account_id } = req.params
  try{
    const sql = `UPDATE User_Account
    SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?
    WHERE account_id = ?;
`
    await pool.query(sql, [first_name, last_name, email, phone, address, account_id])
    res.status(200).json('Profile updated successfully')
  }
  catch(error){
    console.error('Failed to update profile:', error)
  }
}
