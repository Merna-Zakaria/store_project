import { Request, Response } from 'express'
import {User, UserSrore} from "../models/user"

const store = new UserSrore()

export const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
  }

export const show = async (req: Request, res: Response) => {
    const user = await store.show(req.params.id)
    res.json(user)
 }

export const create = async (req: Request, res: Response) => { 
  try {
      const user = {
          first_name: req.body.first_name,
          seconde_name: req.body.seconde_name,
          password: req.body.password
      }

      const newUser = await store.create(user)
      res.json(newUser)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

export const authenticate = async (req: Request, res: Response) => { 
  try {
      const user = {
          first_name: req.body.first_name,
          seconde_name: req.body.seconde_name,
          password: req.body.password
      }

      const userLoggedIn = await store.authenticate(user)
      res.json(userLoggedIn)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

export const destroy = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const deleted = await store.delete(id)
  res.json(deleted)
}