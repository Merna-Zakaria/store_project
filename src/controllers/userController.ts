import { Request, Response, NextFunction } from "express";
import { User, UserSrore } from "../models/user";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const store = new UserSrore();

export const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
  res.status(200).json(users);
  } catch (err) {
    res.status(400).json(`${err}`);
  }

};

export const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
      res.status(200).json(user);
  } catch (err) {
    res.status(400).json(`${err}`);
  }

};

export const create = async (req: Request, res: Response) => {
  try {
    const {first_name, last_name, password} = req.body;
    if(first_name && last_name && password){
      const user = {
        first_name,
        last_name,
        password,
      };
      const newUser = await store.create(user);
      let token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as Secret);
      res.json({
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        token,
      });
    }else{
      throw new Error(`Could not add new user.`);
    }
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

export const authenticate = async (req: Request, res: Response) => {
  try {
    const {first_name, last_name, password} = req.body;
    if(first_name && last_name && password){
      const user = {
        first_name,
        last_name,
        password,
      };
          const userLoggedIn = await store.authenticate(user);
          if (userLoggedIn) {
            let token = jwt.sign(
              { user: userLoggedIn },
              process.env.TOKEN_SECRET as Secret
            );
            res.json({
              id: userLoggedIn.id,
              first_name: userLoggedIn.first_name,
              last_name: userLoggedIn.last_name,
              token,
            });
          } 
    } else {
      throw new Error(`Invalid data entered.`);
    }
  } catch (err) {
    res.status(400).json(`${err}`);
  }
};

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token: unknown = authorizationHeader?.split(" ")[1];
    const decoded = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET as Secret
    );

    next();
  } catch (error) {
    res.status(401).json("Access denied, invalid token");
  }
};

export const destroy = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted = await store.delete(id);
  res.json(deleted);
};

// const update = async (req: Request, res: Response) => {
//   const user: User = {
//       id: parseInt(req.params.id),
//       username: req.body.username,
//       password: req.body.password,
//   }
//   try {
//       const authorizationHeader = req.headers.authorization
//       const token = authorizationHeader.split(' ')[1]
//       const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
//       if(decoded.id !== user.id) {
//           throw new Error('User id does not match!')
//       }
//   } catch(err) {
//       res.status(401)
//       res.json(err)
//       return
//   }

//   try {
//       const updated = await store.create(user)
//       res.json(updated)
//   } catch(err) {
//       res.status(400)
//       res.json(err + user)
//   }
// }
