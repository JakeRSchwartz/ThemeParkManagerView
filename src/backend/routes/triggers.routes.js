import { createRouter } from '../httpServer.js'
import { brokenRides } from '../controllers/triggers.controllers/triggers.controller.js'
import { brokenGames } from '../controllers/triggers.controllers/triggers.controller.js'
import { rideRainouts } from '../controllers/triggers.controllers/triggers.controller.js'
import { gameRainouts } from '../controllers/triggers.controllers/triggers.controller.js'
import { attractionRainouts } from '../controllers/triggers.controllers/triggers.controller.js'

const initializeRoutes = async () => {
  try {
    const router = await createRouter()

    //gets broken rides
    router.get('/brokenRides', brokenRides)

    //gets broken games
    router.get('/brokenGames', brokenGames)

    //gets all rides that are rainout
    router.get('/rideRainouts', rideRainouts)

    //gets all games that are rainout
    router.get('/gameRainouts', gameRainouts)

    //gets all attractions that are rainout
    router.get('/attractionRainouts', attractionRainouts)

    return router
  } catch (error) {
    console.error('Failed to create router:', error)
    throw error
  }
}

const router = await initializeRoutes() // Using async/await to initialize routes

export default router
