import * as Server from "./config";
import { createServer } from "http";
import { Server as IoServer } from "socket.io";
import {SocketHandler} from "./socket";

const server = new Server.default();
const httpServer = createServer(server.app);
const io = new IoServer(httpServer);

server
    .bootstrap(httpServer)
    .then(() => {
        io.on("connection", (socket) => {
            SocketHandler(io, socket)
        });
    });
