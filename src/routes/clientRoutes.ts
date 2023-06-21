import { Router } from 'express'
import { Clients } from '../controller'

const clientRouter = Router()

clientRouter.get('/clients', Clients.getAllClients)
clientRouter.get('/clients/:id', Clients.getOneClient)
clientRouter.post('/clients', Clients.addNewClient)
clientRouter.delete('/clients/:id', Clients.deleteOneClient)
clientRouter.put('/clients/:id', Clients.updateOneClient)

export { clientRouter }