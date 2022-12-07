import { Request, Response, NextFunction } from "express";
import { User, UserSrore } from "../models/user";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const store = new UserSrore();

export const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

export const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

export const create = async (req: Request, res: Response) => {
  try {
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    let token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as Secret);
    res.json(token);
  } catch (err) {
    res.status(400);
    console.log(err);
    res.json(err);
  }
};

export const authenticate = async (req: Request, res: Response) => {
  try {
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };

    const userLoggedIn = await store.authenticate(user);
    if (userLoggedIn) {
      let token = jwt.sign(
        { user: userLoggedIn },
        process.env.TOKEN_SECRET as Secret
      );
      res.json({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        token,
      });
    } else {
      res.send("Incorrect user name or password");
    }
  } catch (err) {
    res.status(400);
    res.json(err);
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
    res.status(401);
    console.log(error);
    res.json("Access denied, invalid token");
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
