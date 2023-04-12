import "express-async-errors";
import express, { json } from "express";
import cors from "cors";
import routes from "./routes";
import { handleApplicationErrors } from "middlewares/errorMiddleware";

const app = express();
app.use(json());
app.use(cors());
app.use(routes);
app.use(handleApplicationErrors);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));
