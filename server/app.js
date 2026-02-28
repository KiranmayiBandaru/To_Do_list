import express from 'express' ;
import cors from "cors";
import userRoutes from "../routes/userRoutes.js";
import taskRoutes from "../routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api" , userRoutes);
app.use("/api" , taskRoutes);

export default app;
