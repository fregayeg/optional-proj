/**
 * FRE - Here is a test config:
 *  - to run RTKQ fetchBaseQuery;
 *  - to mock some parts in the app like session storage;
 *  - to mock fetch API for tests;
 */
const { AbortController } = require('abortcontroller-polyfill/dist/cjs-ponyfill');
import { fetch, Headers, Request, Response } from 'cross-fetch';
import mockApiServer  from "@app/tests/mock-server";
import "@testing-library/jest-native/extend-expect";

// FRE - this is a polyfill to some global objects related to fetch
// for details : https://github.com/reduxjs/redux-toolkit/issues/1271
global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.AbortController = AbortController;

// Enable the mocking in tests.
beforeAll(() => {mockApiServer.listen()})

// Reset any runtime handlers tests may use.
afterEach(() => {mockApiServer.resetHandlers()})

// Clean up once the tests are done. 
afterAll(() => {mockApiServer.close()})

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
