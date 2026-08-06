import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { env } from "./env";

const connectionString = env.DIRECT_URL || env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private prisma: PrismaClient;
  private isConnected: boolean = false;

  private constructor() {
    this.prisma = new PrismaClient({
      log: ['info', 'warn', 'error'],
      adapter
    });
  }
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) DatabaseConnection.instance = new DatabaseConnection();
    return DatabaseConnection.instance;
  }
  public async connect(): Promise<void> {
    if (this.isConnected) return
    try {
      await this.prisma.$connect();
      this.isConnected = true;
      console.info("Database connected successfully");
    } catch (error) {
      console.error("Database connection failed: ", error);
      throw error
    }
  }
  public async disconnect(): Promise<void> {
    if (!this.isConnected) return
    try {
      await this.prisma.$disconnect();
      this.isConnected = false;
      console.info("Database disconnected successfully");
    } catch (error) {
      console.error("Database disconnection failed: ", error);
      throw error;
    }
  }
  public getPrismaClient(): PrismaClient {
    return this.prisma
  }
  public getConnectionStatus(): boolean {
    return this.isConnected
  }
}