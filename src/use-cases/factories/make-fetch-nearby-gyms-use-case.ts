import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms.js";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js";

export function makeFecthNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
