import { Sequelize } from "sequelize";

export class Database {
  private static instance: Database;
  private sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      define: {
        timestamps: false,
        freezeTableName: true,
        underscored: false,
      },
      logging: true,
      sync: { alter: false },
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async authenticate(): Promise<void> {
    await this.sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  }

  public async close(): Promise<void> {
    await this.sequelize.close();
    console.log("Database connection has been closed successfully.");
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }
}
