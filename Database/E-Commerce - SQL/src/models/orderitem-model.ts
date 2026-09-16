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
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Order } from "./order-model.js";
import { Product } from "./product-model.js";

@Table({ tableName: "orderitems", timestamps: true })
export class OrderItem extends Model {
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
  declare price: number;

  @ForeignKey(() => Order)
  @Column(DataType.UUID)
  declare OrderId: string;

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  declare ProductId: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare quantity: number;

  @BelongsTo(() => Order)
  declare student: Order;

  @BelongsTo(() => Product)
  declare product: Product;


  // Timestamps
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
