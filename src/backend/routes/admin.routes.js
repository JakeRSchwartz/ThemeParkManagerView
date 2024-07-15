import {
  BrokenRideChart,
  LargeRevenueStats,
  NumTicketNow,
  adminchart1,
  brokenGameschart,
  chart2attractions,
  chart2games,
  chart2rides,
  getAllEmployees
} from '../controllers/admin.controllers/admin.controller.js'
import { createRouter } from '../httpServer.js'
import { NumRidesBroken } from '../controllers/admin.controllers/admin.controller.js'
import { NumRainouts } from '../controllers/admin.controllers/admin.controller.js'
import { NumEmpNow } from '../controllers/admin.controllers/admin.controller.js'
import { GetRideData } from '../controllers/admin.controllers/admin.controller.js'
import { GetGameData } from '../controllers/admin.controllers/admin.controller.js'
import { GetRideName } from '../controllers/admin.controllers/admin.controller.js'
import { GetGameName } from '../controllers/admin.controllers/admin.controller.js'
import { GetAttractionName } from '../controllers/admin.controllers/admin.controller.js'
import { GetMaintenanceReport } from '../controllers/admin.controllers/admin.controller.js'
import { AddEmployee } from '../controllers/admin.controllers/admin.controller.js'
import { GetAttractionNames } from '../controllers/admin.controllers/admin.controller.js'
import { submitRainout } from '../controllers/admin.controllers/admin.controller.js'
import { GetEmp } from '../controllers/admin.controllers/admin.controller.js'
import { DeleteEmp } from '../controllers/admin.controllers/admin.controller.js'
import { brokenGames } from '../controllers/admin.controllers/admin.controller.js'
import { AddShift } from '../controllers/admin.controllers/admin.controller.js'
import { Notifications } from '../controllers/admin.controllers/admin.controller.js'
import { SeenNotifications } from '../controllers/admin.controllers/admin.controller.js'
import { GetRideNameRO } from '../controllers/admin.controllers/admin.controller.js'
import { GetGameNameRO } from '../controllers/admin.controllers/admin.controller.js'
import { GetAttractionNameRO } from '../controllers/admin.controllers/admin.controller.js'
import { EndRainout } from '../controllers/admin.controllers/admin.controller.js'
import { GetRideNameFRO } from '../controllers/admin.controllers/admin.controller.js'
import { GetGameNameFRO } from '../controllers/admin.controllers/admin.controller.js'
import { GetAttractionNameFRO } from '../controllers/admin.controllers/admin.controller.js'
import { GetEmployees } from '../controllers/admin.controllers/admin.controller.js'
import { brokenAttractionchart } from '../controllers/admin.controllers/admin.controller.js'
import { GetRainouts } from '../controllers/admin.controllers/admin.controller.js'
import { EditAttraction } from '../controllers/admin.controllers/admin.controller.js'
import { EditGame } from '../controllers/admin.controllers/admin.controller.js'
import { EditRide } from '../controllers/admin.controllers/admin.controller.js'
import { GetRevenueReports } from '../controllers/admin.controllers/admin.controller.js'
import { GetRevenueGraph } from '../controllers/admin.controllers/admin.controller.js'
import { GetActivityChart } from '../controllers/admin.controllers/admin.controller.js'
import { GetInventory } from '../controllers/admin.controllers/admin.controller.js'
import { DeleteAttraction } from '../controllers/admin.controllers/admin.controller.js'
import { DeleteGame } from '../controllers/admin.controllers/admin.controller.js'
import { DeleteRide } from '../controllers/admin.controllers/admin.controller.js'
import {addToParkRide} from '../controllers/admin.controllers/admin.controller.js'
import { GetInventoryInfo } from '../controllers/admin.controllers/admin.controller.js'
import { EditInventory } from '../controllers/admin.controllers/admin.controller.js'
import {addToParkGame} from '../controllers/admin.controllers/admin.controller.js'
import { addToParkAttraction } from '../controllers/admin.controllers/admin.controller.js'
const initializeRoutes = async () => {
  try {
    const router = await createRouter()
    router.get('/NumTicketsNow', NumTicketNow)
    router.get('/NumRidesBroken', NumRidesBroken)
    router.get('/NumRainouts', NumRainouts)
    router.get('/NumEmpNow', NumEmpNow)
    router.post('/GetRideData', GetRideData)
    router.post('/GetGameData', GetGameData)
    router.get('/GetRideNames', GetRideName)
    router.get('/GetGameNames', GetGameName)
    router.get('/GetAttractionNames', GetAttractionName)
    router.post('/GetMaintenanceReport', GetMaintenanceReport)
    router.post('/AddEmployee', AddEmployee)
    router.get('/GetAttractionNames', GetAttractionNames)
    router.post('/submitRainout', submitRainout)
    router.post('/getEmp', GetEmp)
    router.delete('/deleteEmp', DeleteEmp)
    router.post('/adminchart1', adminchart1)
    router.post('/chart2rides', chart2rides)
    router.post('/chart2games', chart2games)
    router.post('/chart2attractions', chart2attractions)
    router.post('/brokenGames', brokenGames)
    router.post('/brokenRideChart', BrokenRideChart)
    router.post('/brokenGameschart', brokenGameschart)
    router.post('/brokenAttractionchart', brokenAttractionchart)
    router.get('/getAllEmployees', getAllEmployees)
    router.post('/AddShift', AddShift)
    router.post('/Notifications', Notifications)
    router.patch('/SeenNotifications', SeenNotifications)
    router.post('/GetRideNamesRO', GetRideNameRO)
    router.post('/GetGameNamesRO', GetGameNameRO)
    router.post('/GetAttractionNamesRO', GetAttractionNameRO)
    router.post('/EndRainout', EndRainout)
    router.post('/GetRideNamesFRO', GetRideNameFRO)
    router.post('/GetGameNamesFRO', GetGameNameFRO)
    router.post('/GetAttractionNamesFRO', GetAttractionNameFRO)
    router.get('/GetEmployees', GetEmployees)
    router.get('/GetRainouts', GetRainouts)
    router.put('/EditAttraction/:AttractionID', EditAttraction)
    router.put('/EditGame/:GameID', EditGame)
    router.put('/EditRide/:RideID', EditRide)
    router.post('/GetRevenueReport', GetRevenueReports)
    router.post('/GetRevenueGraph', GetRevenueGraph)
    router.post('/GetActivityGraph', GetActivityChart)
    router.get('/GetInventory', GetInventory)
    router.delete('/DeleteAttraction/:AttractionID', DeleteAttraction)
    router.delete('/DeleteGame/:GameID', DeleteGame)
    router.delete('/DeleteRide/:RideID', DeleteRide)
    router.post('/addToParkRide', addToParkRide)
    router.post('/addToParkGame', addToParkGame)
    router.post('/addToParkAttraction', addToParkAttraction)
    router.post('/LargeRevenueStats', LargeRevenueStats)
    router.get('/GetInventoryInfo', GetInventoryInfo)
    router.put('/EditInventory', EditInventory)

    
    return router
  } catch (error) {
    console.error('Failed to create router:', error)
    throw error
  }
}

const router = await initializeRoutes() // Using async/await to initialize routes

export default router
