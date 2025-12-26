import { randomUUID } from "node:crypto";
import "dotenv/config.js";
import type { Environment } from "vitest/environments";
import { execSync } from "node:child_process";
import { prisma } from "@/lib/prisma.js";

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL env variable");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "Prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    const databaseUrl = generateDatabaseUrl(schema);

    process.env.DATABASE_URL = databaseUrl;

    execSync("npx prisma db push --skip-generate --accept-data-loss", {
      stdio: "inherit",
    });

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );

        await prisma.$disconnect();
      },
    };
  },
};
