export async function retryTransient(
  send: () => Promise<Response>,
  pause: (ms: number) => Promise<void> = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms)),
): Promise<Response> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await send();
    if ((response.status !== 429 && response.status < 500) || attempt === 2)
      return response;
    const retryAfter = Number(response.headers.get("retry-after"));
    const delay =
      Number.isFinite(retryAfter) && retryAfter > 0
        ? Math.min(10000, retryAfter * 1000)
        : 4000 * (attempt + 1);
    await pause(delay);
  }
  throw new Error("retry_exhausted");
}
