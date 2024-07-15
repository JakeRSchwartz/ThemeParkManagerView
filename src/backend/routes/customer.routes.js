import { createRouter } from '../httpServer.js'
import { getRides } from '../controllers/customer.controllers/customer.controller.js'
import { getGames } from '../controllers/customer.controllers/customer.controller.js'
import { getAttractions } from '../controllers/customer.controllers/customer.controller.js'
import { EntryPass } from '../controllers/customer.controllers/customer.controller.js'
import { Gifts } from '../controllers/customer.controllers/customer.controller.js'
import { AddToGiftCart } from '../controllers/customer.controllers/customer.controller.js'
import { AddToAttractionCart } from '../controllers/customer.controllers/customer.controller.js'
import { AddToGameCart } from '../controllers/customer.controllers/customer.controller.js'
import { AddToRideCart } from '../controllers/customer.controllers/customer.controller.js'
import { GetGiftCart } from '../controllers/customer.controllers/customer.controller.js'
import { GetAttractionCart } from '../controllers/customer.controllers/customer.controller.js'
import { GetGameCart } from '../controllers/customer.controllers/customer.controller.js'
import { GetRideCart } from '../controllers/customer.controllers/customer.controller.js'
import { DeleteAttractionCartItem } from '../controllers/customer.controllers/customer.controller.js'
import { DeleteGameCartItem } from '../controllers/customer.controllers/customer.controller.js'
import { DeleteGiftCartItem } from '../controllers/customer.controllers/customer.controller.js'
import { DeleteRideCartItem } from '../controllers/customer.controllers/customer.controller.js'
import { DecrementAttractionCartItemandCost } from '../controllers/customer.controllers/customer.controller.js'
import { DecrementGameCartItemandCost } from '../controllers/customer.controllers/customer.controller.js'
import { DecrementGiftCartItemandCost } from '../controllers/customer.controllers/customer.controller.js'
import { DecrementRideCartItemandCost } from '../controllers/customer.controllers/customer.controller.js'
import { IncrementAttractionCartItemandCost } from '../controllers/customer.controllers/customer.controller.js'
import { IncrementGameCartItemandCost } from '../controllers/customer.controllers/customer.controller.js'
import { IncrementGiftCartItemandCost } from '../controllers/customer.controllers/customer.controller.js'
import { IncrementRideCartItemandCost } from '../controllers/customer.controllers/customer.controller.js'
import { InsertIntoAttractionVisited } from '../controllers/customer.controllers/customer.controller.js'
import { InsertIntoGameVisited } from '../controllers/customer.controllers/customer.controller.js'
import { InsertIntoRideVisited } from '../controllers/customer.controllers/customer.controller.js'
import { UpdateGiftPurchased } from '../controllers/customer.controllers/customer.controller.js'
import { GetAttractionVisited } from '../controllers/customer.controllers/customer.controller.js'
import { GetGameVisited } from '../controllers/customer.controllers/customer.controller.js'
import { GetRideVisited } from '../controllers/customer.controllers/customer.controller.js'
import { GetCustomerProfile } from '../controllers/customer.controllers/customer.controller.js'
import { UpdateCustomerProfile } from '../controllers/customer.controllers/customer.controller.js'
import { sendEmail } from '../controllers/customer.controllers/customer.controller.js'
import { RememberPayment } from '../controllers/customer.controllers/customer.controller.js'
import { GetPayment } from '../controllers/customer.controllers/customer.controller.js'
const initializeRoutes = async () => {
  try {
    const router = await createRouter()
    router.get('/rides', getRides)
    router.get('/games', getGames)
    router.get('/attractions', getAttractions)
    router.post('/entryPass', EntryPass)
    router.get('/gifts', Gifts)
    router.post('/AddToGiftCart', AddToGiftCart)
    router.post('/AddToAttractionCart', AddToAttractionCart)
    router.post('/AddToGameCart', AddToGameCart)
    router.post('/AddToRideCart', AddToRideCart)
    router.get('/GetGiftCart/:account_id', GetGiftCart)
    router.get('/GetAttractionCart/:account_id', GetAttractionCart)
    router.get('/GetGameCart/:account_id', GetGameCart)
    router.get('/GetRideCart/:account_id', GetRideCart)
    router.delete('/DeleteAttractionCartItem/:id', DeleteAttractionCartItem)
    router.delete('/DeleteGameCartItem/:id', DeleteGameCartItem)
    router.delete('/DeleteGiftCartItem/:id', DeleteGiftCartItem)
    router.delete('/DeleteRideCartItem/:id', DeleteRideCartItem)
    router.put('/DecrementAttractionCartItemandCost/:id', DecrementAttractionCartItemandCost)
    router.put('/DecrementGameCartItemandCost/:id', DecrementGameCartItemandCost)
    router.put('/DecrementGiftCartItemandCost/:id', DecrementGiftCartItemandCost)
    router.put('/DecrementRideCartItemandCost/:id', DecrementRideCartItemandCost)
    router.put('/IncrementAttractionCartItemandCost/:id', IncrementAttractionCartItemandCost)
    router.put('/IncrementGameCartItemandCost/:id', IncrementGameCartItemandCost)
    router.put('/IncrementGiftCartItemandCost/:id', IncrementGiftCartItemandCost)
    router.put('/IncrementRideCartItemandCost/:id', IncrementRideCartItemandCost)
    router.post('/InsertIntoAttractionVisited', InsertIntoAttractionVisited)
    router.post('/InsertIntoGameVisited', InsertIntoGameVisited)
    router.post('/InsertIntoRideVisited', InsertIntoRideVisited)
    router.put('/UpdateGiftPurchased', UpdateGiftPurchased)
    router.get('/GetAttractionVisited/:account_id', GetAttractionVisited)
    router.get('/GetGameVisited/:account_id', GetGameVisited)
    router.get('/GetRideVisited/:account_id', GetRideVisited)
    router.get('/GetCustomerProfile/:account_id', GetCustomerProfile)
    router.put('/UpdateCustomerProfile/:account_id', UpdateCustomerProfile)
    router.post('/sendEmail/:account_id', sendEmail)
    router.post('/RememberPayment/:account_id', RememberPayment)
    router.get('/GetPayment/:account_id', GetPayment)


    return router
  } catch (error) {
    console.error('Failed to create router:', error)
    throw error
  }
}

const router = await initializeRoutes()

export default router
