import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/AppointmentRouter.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

app.listen(PORT, () => {
	console.log(`Server Running on PORT: ${PORT}`);
});
