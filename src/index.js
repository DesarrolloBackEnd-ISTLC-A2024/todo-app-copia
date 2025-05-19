import express from "express";
import cors from "cors";
import routerTODOS from "./routes/todo.routes.js";
import { seqLoggerMiddleware } from "./middleware/logger.middleware.js";

const app = express();

app.use(seqLoggerMiddleware);
app.use(cors());
app.use(express.json());
app.use(routerTODOS);

app.listen(4000, () => {
    console.log("Server is running on port 4000");


});

// Al final del index.js
app.use((err, req, res, next) => {
    console.error("Error no controlado:", err);
    res.status(500).json({ mensaje: "Error interno del servidor" });
});
