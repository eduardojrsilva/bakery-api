import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import "express-async-errors";

import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3333, () => {
  console.log('🚀️ Server started on port 3333!');
});