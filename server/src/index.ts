import app from "./middleware/expressApp";
import dotenv from "dotenv";

dotenv.config();
const PORT = Number(process.env.PORT);
const IP_SERVER = String(process.env.IP_SERVER);

app.listen(PORT, IP_SERVER, () => {
  console.log("Server is running");
});
