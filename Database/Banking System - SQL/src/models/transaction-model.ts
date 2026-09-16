import {
  Table,
  Column,
  Model,
  Default,
  IsUUID,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  DataType,
  ForeignKey,
  Index,
  BelongsTo,
  PrimaryKey,
  Min,
} from "sequelize-typescript";
import { Account } from "./account-model.js";
import { v4 as uuidv4 } from "uuid";

@Table({ tableName: "transactions", timestamps: true })
export class Transaction extends Model {
  // transaction id
  @PrimaryKey
  @IsUUID(4)
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare transaction_id: string;
  // reference id for other user money transfer.
  @IsUUID(4)
  @AllowNull(true)
  @Index({ name: "ref-acc" })
  @Column(DataType.UUID)
  declare reference_id: string;

  // account id  Many - One
  @ForeignKey(() => Account)
  @AllowNull(false)
  @Index({ name: "ref-acc" })
  @Column(DataType.UUID)
  declare account_id: string;

  // transaction method.
  @AllowNull(false)
  @Column(DataType.ENUM("BANK-TRANSFER", "ATM", "UPI", "CASH"))
  declare method: "BANK-TRANSFER" | "ATM" | "UPI" | "CASH";

  // transaction type.
  @AllowNull(false)
  @Column(DataType.ENUM("DEPOSIT", "WITHDRAWAL"))
  declare type: "DEPOSIT" | "WITHDRAWAL";

  // transaction amount
  @AllowNull(false)
  @Min(0)
  @Column(DataType.FLOAT)
  declare amount: number;

  // transaction status.
  @Default(false)
  @Column(DataType.BOOLEAN)
  declare is_complete: boolean;

  // One - Many with user.
  @BelongsTo(() => Account)
  declare user: Account;

  // Timestamps
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
