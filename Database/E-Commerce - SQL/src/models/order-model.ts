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
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user-model.js";
import { OrderItem } from "./orderitem-model.js";
@Table({ tableName: "orders", timestamps: true })
export class Order extends Model {
  // student id
  @PrimaryKey
  @IsUUID(4)
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare isComplete: boolean;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare totalPrice: number;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare UserId: string;

  @BelongsTo(() => User)
  declare student: User;

  @HasMany(() => OrderItem)
  declare orderItem :OrderItem[]

  // Timestamps
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
