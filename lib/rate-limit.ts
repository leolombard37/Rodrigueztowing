import { LRUCache } from "lru-cache";

type RateLimitResult = {
  success: boolean;
  remaining: number;
  reset: number;
};

// Cache to store request timestamps per IP
const rateLimitCache = new LRUCache<string, number[]>({
  max: 10000, // Max 10k unique IPs tracked
  ttl: 60 * 1000, // 1 minute TTL
});

function parseWindow(window: string): number {
  const match = window.match(/^(\d+)(s|m|h)$/);
  if (!match) return 60 * 1000; // Default 1 minute

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    default:
      return 60 * 1000;
  }
}

export const rateLimit = {
  /**
   * Check if a request should be rate limited
   * @param key - Unique identifier (usually IP address)
   * @param limit - Maximum number of requests allowed
   * @param window - Time window (e.g., "1m", "5m", "1h")
   */
  check: async (
    key: string,
    limit: number,
    window: string
  ): Promise<RateLimitResult> => {
    const windowMs = parseWindow(window);
    const now = Date.now();
    const requests = rateLimitCache.get(key) || [];

    // Filter to only requests within the current window
    const recentRequests = requests.filter((time) => now - time < windowMs);

    if (recentRequests.length >= limit) {
      const oldestRequest = Math.min(...recentRequests);
      const resetTime = oldestRequest + windowMs;

      return {
        success: false,
        remaining: 0,
        reset: resetTime,
      };
    }

    // Add current request
    recentRequests.push(now);
    rateLimitCache.set(key, recentRequests);

    return {
      success: true,
      remaining: limit - recentRequests.length,
      reset: now + windowMs,
    };
  },

  /**
   * Get client IP from headers
   */
  getClientIP: (headers: Headers): string => {
    return (
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headers.get("x-real-ip") ||
      "unknown"
    );
  },
};
