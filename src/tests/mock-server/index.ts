import { setupServer } from 'msw/native'
import { handlers } from './mockServerHandlers'

const server = setupServer(...handlers);

export default server;
