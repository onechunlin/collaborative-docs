import express from "express";
import { getObject, uploadObject } from "./lib/utils";

const app = express();

app.get("/os/:objKey", (req, res) => {
  const objKey = req.params.objKey;
  getObject(res, objKey);
});

app.post("/os/upload", (req, res) => {
  uploadObject(req, res);
});

app.listen(3000, () => {
  console.log("object storage server listening on http://localhost:3000");
});
