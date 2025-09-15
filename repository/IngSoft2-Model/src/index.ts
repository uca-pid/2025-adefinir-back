const { PrismaClient } = require('@prisma/client');
const express  = require('express')
import type { NextFunction, Request, Response } from 'express'
import addRoutes from './routes'

// correr con npm start

const app = express()
const port = 3000
const prisma = new PrismaClient();

app.use(express.json());
addRoutes(app, prisma)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 


function logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  next(err);
}

app.use(logErrors)

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};

app.use(logErrors)
app.use(errorHandler)

const server = app.listen(port, () =>
  console.log(`🚀 Server ready on port ${port}`))
