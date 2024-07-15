import { createRouter } from '../httpServer.js'
import { signup } from '../controllers/auth.controllers/auth.controller.js'
import { login } from '../controllers/auth.controllers/auth.controller.js'
import { verifyJWT } from '../controllers/auth.controllers/auth.controller.js'

const initializeRoutes = async () => {
  try {
    const router = await createRouter()
    router.post('/register', signup)
    router.post('/login', login)
    router.get('/jwtAuth', verifyJWT, (req, res) => {
      res.status(200).send('User Authenticated')
    })
    return router
  } catch (error) {
    console.error('Failed to create router:', error)
    throw error
  }
}

const router = await initializeRoutes() // Using async/await to initialize routes

export default router
