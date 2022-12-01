import express from "express";
import cors from "cors";
import pollRouters from "./src/routers/poll.routes.js"
import choiceRouters from "./src/routers/choice.routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(pollRouters, choiceRouters);

app.listen(process.env.PORT, () => {
    console.log(`Server running in port: ${process.env.PORT}`);
});