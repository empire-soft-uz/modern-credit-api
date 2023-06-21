import { Router } from 'express'
import { Products } from '../controller'

const productRouter = Router()

productRouter.get('/products', Products.getAllProducts)
productRouter.get('/products/:id', Products.getOneProduct)
productRouter.post('/products', Products.addNewProduct)
productRouter.delete('/products/:id', Products.deleteOneProduct)
productRouter.put('product/:id', Products.updateOneProduct)

export { productRouter }