import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  IsUUID,
  AllowNull,
  Unique,
  IsEmail,
  CreatedAt,
  UpdatedAt,
  DataType,
  Min,
  Max,
  HasOne,
  AfterUpdate,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Account } from "./account-model.js";

@Table({ tableName: "users", timestamps: true })
export class User extends Model {
  // student id
  @PrimaryKey
  @IsUUID(4)
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare user_id: string;

  // student name
  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  // student Email
  @Unique
  @AllowNull(false)
  @IsEmail
  @Column(DataType.STRING)
  declare email: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare isVerify: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare loginStatus: boolean;

  @AllowNull(false)
  @Min(8)
  @Max(16)
  @Column(DataType.STRING)
  declare password: string;

  @Default(null)
  @Column(DataType.STRING)
  declare refreshToken: string;

  @Default("USER")
  @Column(DataType.ENUM("USER", "ADMIN", "EMPLOYEE"))
  declare role: "USER" | "ADMIN" | "EMPLOYEE";

  @HasOne(() => Account)
  declare account: Account;

  @BeforeCreate
  @BeforeUpdate
  static emailLowercase(instance: User) {
    instance.email = instance.email.toLowerCase();
  }

  @AfterUpdate
  static updateTime(instance: User) {
    instance.updatedAt = new Date();
  }

  // Timestamps
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
