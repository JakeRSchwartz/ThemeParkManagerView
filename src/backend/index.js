import 'dotenv/config'
import { urlencoded, json } from './httpServer.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import AuthRoutes from './routes/auth.routes.js'
import MaintenanceRoutes from './routes/maintenance.routes.js'
import AdminRoutes from './routes/admin.routes.js'
import TriggersRoutes from './routes/triggers.routes.js'
import CustomerRoutes from './routes/customer.routes.js'
import AttendantRoutes from './routes/attendant.routes.js'
import { initializeServer } from './httpServer.js'

initializeServer().then(app => {
  app.use(json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(urlencoded({ extended: true }))
  app.use(cors())
  app.use(bodyParser.json())
  app.use('/auth', AuthRoutes)
  app.use('/maintenance', MaintenanceRoutes)
  app.use('/admin', AdminRoutes)
  app.use('/customer', CustomerRoutes)
  app.use('/attendant', AttendantRoutes)
  const port = 3000 
  app.use('/triggers', TriggersRoutes)
    app.listen(port, () => {
      console.log('Server is running on port 3000.')
    })
    .on('error', err => {
      console.log('Error: ', err)
    })
})
