import * as express from 'express';
import debugModule from 'debug';
import * as http from 'http';
import { AddressInfo } from 'net';

function serverLoader(app: express.Application) {
  const debug = debugModule('backend:server');

  function normalizePort(portString: string | undefined): string | number | false {
    if (typeof portString === 'undefined') {
      return false;
    }
    const port = parseInt(portString, 10);
    if (Number.isNaN(port)) {
      return portString;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  }

  const port: string | number | false = normalizePort(process.env.EXPRESS_PORT);
  app.set('port', port);

  const server: http.Server = http.createServer(app);

  function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening() {
    const address: AddressInfo | string | null = server.address();
    if (typeof address === 'string') {
      debug(`Listening on pipe ${address}`);
    } else if (address !== null) {
      debug(`Listening on port ${address.port}`);
    }
  }

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}

export default serverLoader;
