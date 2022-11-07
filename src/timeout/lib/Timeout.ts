import { sleep } from ".";

class Timeout extends Error {
  constructor(ms: number, message?: string) {
    let msg = `Timeout of ${ms}ms exceeded`;
    if (message && message.length) {
      msg += `. Message: ${message}`;
    }
    super(msg);
  }

  /**
   * @throws {Timeout} Timeout occured.
   */
  static promise<T = never>(ms: number, message?: string): Promise<T> {
    return sleep(ms).then(() => Promise.reject(new Timeout(ms, message)));
  }

  /**
   * @throws {Timeout} Timeout occured.
   */
  static attempt<T>(
    operation: () => Promise<T>,
    timeoutMs: number,
    message?: string
  ): Promise<T> {
    return Promise.race([operation(), Timeout.promise(timeoutMs, message)]);
  }
}

export default Timeout;
