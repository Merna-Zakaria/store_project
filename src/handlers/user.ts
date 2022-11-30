import express, { Request, Response } from 'express'
import {User, UserSrore} from "../models/user"

const store = new UserSrore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
  }

  const show = async (req: Request, res: Response) => {
    const user = await store.show(req.body.id)
    res.json(user)
 }

 const create = async (req: Request, res: Response) => {
  try {
      const user: User = {
        id: 0,          /// should edit
          first_name: req.body.first_name,
          seconde_name: req.body.second_name,
          password: '1334'
      }

      const newUser = await store.create(user)
      res.json(newUser)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id)
  res.json(deleted)
}


const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.delete('/users', destroy)
}

export default userRoutes