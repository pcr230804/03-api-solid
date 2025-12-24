import type { FastifyInstance } from "fastify";
import { register } from "./register-controllers.js";
import { authenticate } from "./authenticate-controllers.js";
import { profile } from "./profile-controllers.js";
import { verifyJWT } from "../../middlewares/verify-jwt.js";
import { refresh } from "./refresh.js";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  /* Authenticate user */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
