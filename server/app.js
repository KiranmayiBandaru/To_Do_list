import express from 'express' ;
import cors from "cors";

const app = express();

let port = 3000;

app.use(cors());
app.use(express.json());
app.listen(port , () => {
    console.log(`the serve is alive on the localhost ${port}`);
})