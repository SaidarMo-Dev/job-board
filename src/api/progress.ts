import NProgress from "nprogress";

// Configure NProgress
NProgress.configure({
  showSpinner: false,
});

// Track how many requests are active
let requestCount = 0;

/**
 * Starts the progress bar if no requests are active.
 */
export const startProgress = (): void => {
  if (requestCount === 0) NProgress.start();
  requestCount++;
};

/**
 * Stops the progress bar when all requests are complete.
 */
export const stopProgress = (): void => {
  requestCount--;
  if (requestCount <= 0) {
    NProgress.done();
    requestCount = 0;
  }
};
