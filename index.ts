import express, { Express, Request, Response } from "express";
import { createClient } from "redis";

const app: Express = express();
const port = 9000;

const client = createClient({
  url: "redis://redis-server:6379",
});

client.on("error", (error) => {
  console.error(error);
});

client.connect();

client.set("number", 0);

app.get("/", async (req: Request, res: Response) => {
  const number = await client.get("number");
  if (number) client.set("number", parseInt(number) + 1);
  res.send("숫자가 1씩 올라갑니다" + number);
});

let increaseNumber = 0;

app.get("/addUser", (req: Request, res: Response) => {
  client.set(`user${increaseNumber}`, increaseNumber);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});
