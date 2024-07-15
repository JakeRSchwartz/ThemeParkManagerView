import pool from '../../db.js'
import 'dotenv/config'


//gets broken rides
export const brokenRides = async (req, res) => 
{
    try
    {
        //Checks if any rides are broken
        const results = await pool.query(
            'SELECT * ' +
            'FROM Trigger_RideMaintenance ' + 
            'WHERE broken = 1'
        )
        if(results[0].length === 0)
        {
            res.status(404).json('All rides are in optimal working condition')
        }
        else
        {
            res.status(200).json(results[0])
        }
        
    
    }
    catch(error)
    {
        console.error(error.message)
        res.status(500).send('Server error');
    }
}

//gets broken games
export const brokenGames = async (req, res) => 
{
    try
    {
       //Checks if any games are broken
       const results = await pool.query(
        'SELECT * ' +
        'FROM Trigger_GameMaintenance ' + 
        'WHERE broken = 1'
        )
        if(results[0].length === 0)
        {
            res.status(404).json('All games are in optimal working condition')
        }
        else
        {
            res.status(200).json(results[0])
        }

    }
    catch(error)
    {
        console.error(error.message)
        res.status(500).send('Server error');
    }
}

//gets all rides that are rainout
export const rideRainouts = async (req, res) =>
{
    try
    {
        //Checks if any rides are rainout
        const results = await pool.query(
            'SELECT * ' +
            'FROM Trigger_RideRainout ' + 
            'WHERE broken = 1'
        )
        if(results[0].length === 0)
        {
            res.status(404).json('No rides are rainout')
        }
        else
        {
            res.status(200).json(results[0])
        } 

    }
    catch(error)
    {
        console.error(error.message)
        res.status(500).send('Server error');
    }
}

//gets all games that are rainout
export const gameRainouts = async (req, res) =>
{
    try
    {
        //Checks if any games are rainout
        const results = await pool.query(
            'SELECT * ' +
            'FROM Trigger_GameRainout ' + 
            'WHERE broken = 1'
        )
        if(results[0].length === 0)
        {
            res.status(404).json('No games are rainout')
        }
        else
        {
            res.status(200).json(results[0])
        } 

    }
    catch(error)
    {
        console.error(error.message)
        res.status(500).send('Server error');
    }
}

//gets all attractions that are rainout
export const attractionRainouts = async (req, res) =>
{
    try
    {
        //Checks if any attractions are rainout
        const results = await pool.query(
            'SELECT * ' +
            'FROM Trigger_AttractionRainout ' + 
            'WHERE broken = 1'
        )
        if(results[0].length === 0)
        {
            res.status(404).json('No attractions are rainout')
        }
        else
        {
            res.status(200).json(results[0])
        } 

    }
    catch(error)
    {
        console.error(error.message)
        res.status(500).send('Server error');
    }
}