export async function retry<T>(action: () => Promise<T>, maxAttempts: number = 10, delayMs: number = 3000) {
  let attempts: number = 0;
  while (attempts < maxAttempts) {
    try {
      return await action();
    } catch (e) {
      attempts++;
      if (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        throw new Error("Error while performing operation");
      }
    }
  }
  throw new Error("Retry logic reached an unexpected state.");

}
