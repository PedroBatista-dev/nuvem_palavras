import express from "express";
import routes from "../../modules/routes"
import * as dotenv from "dotenv";


const server = express();
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // atualize para combinar com o domínio que você precisa
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
dotenv.config();
server.use(express.json());
server.use(routes);

export default server;