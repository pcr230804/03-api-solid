import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt.js";
import { search } from "./search-controllers.js";
import { nearby } from "./nearby-controllers.js";
import { create } from "./create-controllers.js";
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create);
}
