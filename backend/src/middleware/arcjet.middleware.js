import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const arcjetProtection = asyncHandler(async (req, res, next) => {
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      //rate limiting
      throw new ApiError(429, "Too many requests. Please try again later");
    } else if (decision.reason.isBot()) {
      // generic bot detection
      throw new ApiError(403, "Bot access denied.");
    } else {
      throw new ApiError(403, "Access denied by security policies.");
    }
  }

  //spoofed bot: bots that try to mimic human behavior
  if (decision.results.some(isSpoofedBot)) {
    throw new ApiError(403, "Malicious bot activity detected");
  }

  next();
});
