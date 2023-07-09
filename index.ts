import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 9000;

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript + Nodejs + Express Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});
