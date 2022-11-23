import express from "express";

const img1 = (req: express.Request, res: express.Response): void => {
  res.send('img1')
};

const img2 = (req: express.Request, res: express.Response): void => {
    res.send('img2')
  };

export {
    img1, img2
}