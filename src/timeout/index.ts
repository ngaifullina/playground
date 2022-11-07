import { Timeout, sleep } from "./lib";

const TIMEOUT_MILLIS = 2000;

/**
@function
@throws {Timeout} if argument exceeds 2 seconds
*/
const sleepLTE2Sec = (milliseconds: number): Promise<number> =>
  Timeout.attempt(() => sleep(milliseconds), TIMEOUT_MILLIS);

sleepLTE2Sec(3000)
  .then((ms) => console.log(`Slept for ${ms}ms`))
  .catch((e) => console.error(e.message));
