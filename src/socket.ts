import Session from "./session";
import * as chalk from "chalk";
import * as moment from 'moment';

const logger = (message: string) => {
    console.log(`${chalk.bold.blue('[SOCKET]')} ${message} at ${moment().format('DD/MM/YYYY hh:mm:ss')}.`)
}

const LoggedHandler = async ({io, socket}, payload) => {
    logger(`${payload.pseudo}'s ${chalk.bold.green('connected')}`);
    const userId = payload._id;
    const session = Session.get(userId);
    const isAlreadyHaveSession = !!session;
    if (isAlreadyHaveSession && session?.socketId !== socket.id) {
        io.to(session.socketId).emit('disconnected');
    }
    if (userId) {
        Session.set(userId, {
            socketId: socket.id,
            userId
        });
    }

}

const LogoutHandler = ({io, socket}, payload) => {
    logger(`${payload.pseudo} has ${chalk.bold.red('disconnected')}`)
    Session.destroy(payload._id);
}

const DisconnectUserHandler = ({io, socket}, payload) => {
    logger(`${payload.pseudo} has been ${chalk.bold.red('disconnected')} by Pharmabot`)
    const session = Session.get(payload._id);
    const isAlreadyHaveSession = !!session;
    if (isAlreadyHaveSession) {
        io.to(session.socketId).emit('disconnected-user');
        Session.destroy(payload._id);
    }
}

const UpdateSessionUserHandler = ({io, socket}, payload) => {
    logger(`${payload.pseudo} has been ${chalk.bold.red('updated')}`)
    const session = Session.get(payload._id);
    if (session) {
        if (session.socketId && session.socketId !== socket.id) {
            io.to(session.socketId).emit('disconnected');
            Session.set(payload._id, {socketId: socket.id});
        }
    } else if (payload._id) {
        Session.set(payload._id, {
            socketId: socket.id,
            userId: payload._id
        });
    }
}

export const SocketHandler = (io, socket) => {
    socket.on('logged', payload => { LoggedHandler({io, socket}, payload) });
    socket.on('logout', payload => { LogoutHandler({io, socket}, payload) });
    socket.on('disconnect-user', payload => { DisconnectUserHandler({io, socket}, payload) });
    socket.on('update-socket', payload => { UpdateSessionUserHandler({io, socket}, payload) });
}
