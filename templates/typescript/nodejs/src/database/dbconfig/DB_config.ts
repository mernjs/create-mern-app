import dotenv from "dotenv";
dotenv.config();

const ENV: any = {}
ENV.MONGO_URI=process.env.MONGO_URI
export default ENV
