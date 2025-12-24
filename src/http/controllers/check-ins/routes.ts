import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt.js";
import { create } from "./create-controllers.js";
import { validate } from "./validate-controllers.js";
import { history } from "./history-controllers.js";
import { metrics } from "./metrics-controllers.js";
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gyms/:gymId/check-ins", create);

  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validate
  );
}
