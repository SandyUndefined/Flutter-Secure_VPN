import dotenv from 'dotenv';

dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 8080;
const HOST_NAME = process.env.HOST_NAME || 'localhost';

const SERVER = {
    hostname: HOST_NAME,
    port: SERVER_PORT
};

const config = {
    server: SERVER
};

export default config;