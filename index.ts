import express, { Express, Request, Response } from "express";
import { createClient } from "redis";

const app: Express = express();
const port = 9000;

interface Obj {
  key: string;
  val: string;
}

const client = createClient({
  url: "redis://redis-server:6379",
});

client.on("error", (error) => {
  console.error(error);
});

client.connect();

// client.set("number", 0);

app.get("/", async (req: Request, res: Response) => {
  const number = await client.get("number");
  if (number) client.set("number", parseInt(number) + 1);
  res.send("숫자가 1씩 올라갑니다" + number);
});

let increaseNumber = 0;

app.get("/addData", (req: Request, res: Response) => {
  client.set(`user${increaseNumber}`, increaseNumber++);
  res.json("데이터넣기 성공!");
});

app.get("/showData", async (req: Request, res: Response) => {
  const obj: Obj[] = [];
  for await (const key of client.scanIterator()) {
    const val = await client.get(key);
    if (val) {
      const tmp: Obj = {
        key,
        val,
      };
      obj.push(tmp);
    }
  }
  res.json(obj);
});

app.get("/showDataNum", async (req: Request, res: Response) => {
  const obj: Obj[] = [];
  const keys = await client.keys("*");
  // if (keys) {
  //   const promises = keys.map((key) => {
  //     return new Promise<void>(async (resolve, reject) => {
  //       const val = await client.get(key);
  //       if (val) {
  //         const tmpObj: Obj = {
  //           key,
  //           val,
  //         };
  //         obj.push(tmpObj);
  //         resolve();
  //       }
  //       reject();
  //     });
  //   });

  //   await Promise.all(promises);
  // }
  res.json(keys.length);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});
