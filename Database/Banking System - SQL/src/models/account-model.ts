import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  IsUUID,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  DataType,
  Index,
  Min,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user-model.js";
import { Transaction } from "./transaction-model.js";

@Table({ tableName: "accounts", timestamps: true })
export class Account extends Model {
  // account id
  @PrimaryKey
  @IsUUID(4)
  @Default(uuidv4)
  @Index({ name: "user-account" })
  @Column(DataType.UUID)
  declare account_id: string;

  // user id
  @ForeignKey(() => User)
  @AllowNull(false)
  @Index({ name: "user-account" })
  @Column(DataType.UUID)
  declare user_id: string;

  // account Type.
  @AllowNull(false)
  @Column(DataType.ENUM("SAVINGS", "CURRENT"))
  declare account_type: "SAVINGS" | "CURRENT";

  // account balance
  @Default(0)
  @Min(0)
  @Column(DataType.FLOAT)
  declare balance: number;

  // One - One with user.
  @BelongsTo(() => User)
  declare user: User;

  // Transaction Link with Account
  @HasMany(() => Transaction)
  declare transaction: Transaction[];

  // Timestamps
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
