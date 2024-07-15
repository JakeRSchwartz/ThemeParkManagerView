import { createRouter } from '../httpServer.js'
import { GetAttendantShifts } from '../controllers/attendant.controllers/attendant.controller.js'
import { GetYourShifts } from '../controllers/attendant.controllers/attendant.controller.js'
import { GetProfile } from '../controllers/attendant.controllers/attendant.controller.js'
import { UpdateProfile } from '../controllers/attendant.controllers/attendant.controller.js'
const initializeRoutes = async () => {
  try {
    const router = await createRouter()
    router.get('/GetAttendantShifts', GetAttendantShifts);
    router.get('/GetYourShifts/:account_id', GetYourShifts);
    router.get('/GetProfile/:account_id', GetProfile);
    router.put('/UpdateProfile/:account_id', UpdateProfile);
    return router
  } catch (error) {
    console.error('Failed to create router:', error)
    throw error
  }
}

const router = await initializeRoutes() // Using async/await to initialize routes

export default router
