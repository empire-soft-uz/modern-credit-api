import { Request, Response } from 'express'
import { Product } from '../entities/product'

//Method GET
//get all products
export const getAllProducts = async (req: Request, res: Response) => {
  const data = await Product.find()
  res.status(200).json({ status: '200ok', data })
}

//Method GET
//get one product
export const getOneProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  const data = await Product.findOneBy({id: parseInt(id, 10)})
  res.status(200).json({ status: '200ok', data })
}

//Method POST
//Add a new product
export const addNewProduct = async (req: Request, res: Response) => {
  const {
    name,
    price,
    photoUrl,
    imei,
    iCloudLogin,
    iCloudPassword,
    description
  } = req.body
  try{
  const newProduct = Product.create({
    name:name,
    price:price,
    photoUrl:photoUrl,
    imei:imei,
    iCloudLogin:iCloudLogin,
    iCloudPassword:iCloudPassword,
    description:description

  })
  await newProduct.save()
  res.status(201).json({ status: '201 ok', data: newProduct })
  }catch(error){
  res.json({msg:error});
  }
}


//Method DELETE
//Delete a product
export const deleteOneProduct = async (req: Request, res: Response) => {
    const {id} = req.params
    try{
    const deleteProduct = Product.delete(parseInt(id))
    res.status(200).json({ status: '200ok', msg:"Product deleted succesfully" })
    }catch(error){
      res.json({msg:error})
    }
}


// Method PUT
//Update a product
export const updateOneProduct = async (req:Request,res:Response) =>{
  const {id} = req.params
  const {name,price,photoUrl,imei,iCloudLogin,iCloudPassword,description} = req.body
try{
  const updatedProduct = Product.update(parseInt(id),{
    name:name,
    price:price,
    photoUrl:photoUrl,
    imei:imei,
    iCloudLogin:iCloudLogin,
    iCloudPassword:iCloudPassword,
    description:description
  }) 

  res.status(200).json({status:'200 ok', msg:"Product updated successfully"})
}catch(error){
  res.json({msg:error})
}
}