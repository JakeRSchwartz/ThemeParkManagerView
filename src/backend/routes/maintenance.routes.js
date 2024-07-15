import { createRouter } from '../httpServer.js'
import {
  MaintenanceFixed,
  PickupMaintenanceRequestGames,
  maintenanceRequest,
  updateMaintenanceRequestGames
} from '../controllers/maintenance.controllers/maintenance.controller.js'
import { rideFixedDate } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { gameFixedDate } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { getRideMaintenanceRequest } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { getGameMaintenanceRequest } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { allRideMaintenanceRequests } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { allGameMaintenanceRequests } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { MyRideMaintenanceRequests } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { MyGameMaintenanceRequests } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { MyAttractionMaintenanceRequests } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { updateMaintenanceRequest } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { FreeMaintReq } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { PickupMaintenanceRequest } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { MyGamesFixed } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { FreeMaintReqGames } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { MyAttractionsFixed } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { PickupMaintenanceRequestAttractions } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { FreeMaintReqAttractions } from '../controllers/maintenance.controllers/maintenance.controller.js'
import { updateMaintenanceRequestAttractions } from '../controllers/maintenance.controllers/maintenance.controller.js'

const initializeRoutes = async () => {
  try {
    const router = await createRouter()

    router.post('/maintenanceRequest', maintenanceRequest)

    //Update the date a certain ride maintenance request was completed
    //input: fixed_date, breakdown_id
    router.patch('/rideFixedDate', rideFixedDate)

    //Update the date a certain game maintenance request was completed
    //input: fixed_date, breakdown_id
    router.patch('/gameFixedDate', gameFixedDate)

    //get ride maintenance request
    //input: breakdown_id
    router.get('/getRideMaintenanceRequest', getRideMaintenanceRequest)

    //get game maintenance request
    //input: breakdown_id
    router.get('/getGameMaintenanceRequest', getGameMaintenanceRequest)

    //get all ride maintenance requests
    router.get('/allRideMaintenanceRequests', allRideMaintenanceRequests)

    //get all game maintenance requests
    router.get('/allGameMaintenanceRequests', allGameMaintenanceRequests)

    router.post('/MyRideMaintenanceRequests', MyRideMaintenanceRequests)

    router.post('/MyGameMaintenanceRequests', MyGameMaintenanceRequests)
    router.post('/MyAttractionMaintenanceRequests', MyAttractionMaintenanceRequests)

    router.post('/MyFixedMaintenanceRequests', MaintenanceFixed)

    router.patch('/updateMaintenanceRequest', updateMaintenanceRequest)

    router.patch('/updateMaintenanceRequestAttractions', updateMaintenanceRequestAttractions)

    router.post('/FreeMaintReq', FreeMaintReq)

    router.post('/PickupMaintenanceRequest', PickupMaintenanceRequest)

    router.post('/MyFixedGames', MyGamesFixed)

    router.post('/MyFixedAttractions', MyAttractionsFixed)

    router.patch(
      '/updateMaintenanceRequestGames',
      updateMaintenanceRequestGames
    )

    router.post('/FreeMaintReqGames', FreeMaintReqGames)
    router.post('/FreeMaintReqAttractions', FreeMaintReqAttractions)

    router.post('/PickupMaintenanceRequestGames', PickupMaintenanceRequestGames)
    router.post(
      '/PickupMaintenanceRequestAttractions',
      PickupMaintenanceRequestAttractions
    )

    return router
  } catch (error) {
    console.error('Failed to create router:', error)
    throw error
  }
}

const router = await initializeRoutes() // Using async/await to initialize routes

export default router
