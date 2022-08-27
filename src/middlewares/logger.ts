import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger({ collapsed: true });
export default loggerMiddleware;
