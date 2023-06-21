import { Request, Response } from 'express'
import { Client } from '../entities/client'

//Method GET
//get all clients
export const getAllClients = async (req: Request, res: Response) => {
  const data = await Client.find()
  res.status(200).json({ status: '200ok', data })
}

//Method GET
//get one client
export const getOneClient = async (req: Request, res: Response) => {
  const { id } = req.params

  const data = await Client.findOneBy({id: parseInt(id, 10)})
  res.status(200).json({ status: '200ok', data })
}

//Method POST
//Add new client
export const addNewClient = async (req: Request, res: Response) => {
  const {
    name,
    phone,
    address
  } = req.body
  try{
  const newClient = Client.create({
    name:name,
    phone:phone,
    address:address
  })
  await newClient.save()
  res.status(201).json({ status: '201 ok', data: newClient })
}catch(error){
  res.json({msg:error})
}
}


//Method DELETE
//Delete a client
export const deleteOneClient = async (req: Request, res: Response) => {
    const {id} = req.params
  try{
    const deleteClient = Client.delete(parseInt(id))
    res.status(200).json({ status: '200ok', msg:"Client deleted succesfully" })
  }catch(error){
    res.json({msg:error})
  }
}



//Method PUT
//Update a client
export const updateOneClient = async (req: Request, res: Response) => {
  const {id} = req.params
  const {name,phone,address} = req.body
  try{
  const updatedUser = Client.update(parseInt(id), {
    name:name,
    phone:phone,
    address:address
  }) 
  res.status(200).json({status:'200 ok', msg:"Client updated successfully"})
  }catch(error){
    res.json({msg:error})
  }
}