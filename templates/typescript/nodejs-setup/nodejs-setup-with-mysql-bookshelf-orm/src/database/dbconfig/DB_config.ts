import dotenv from "dotenv";
dotenv.config();

let ENV = {}
ENV.DB_CONNECTION=process.env.DB_CONNECTION 
ENV.DB_HOST=process.env.DB_HOST
ENV.DB_USERNAME=process.env.DB_USERNAME
ENV.DB_PASSWORD=process.env.DB_PASSWORD
ENV.DB_DATABASE=process.env.DB_DATABASE
ENV.DB_PORT=process.env.DB_PORT
ENV.APP_DEBUG = process.env.APP_DEBUG === "true" ? true : false,
export default ENV
