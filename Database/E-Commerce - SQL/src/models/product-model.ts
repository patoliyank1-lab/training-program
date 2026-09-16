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
  HasOne,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user-model.js";
import { OrderItem } from "./orderitem-model.js";

@Table({ tableName: "products", timestamps: true })
export class Product extends Model {
  // student id
  @PrimaryKey
  @IsUUID(4)
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare title: string;

  //user Id
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare createdBy: string;

  @AllowNull(false)
  @Column(DataType.ENUM("Electronics", "Fashion", "Beauty", "Home", "Health"))
  declare category: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare stock: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare price: number;

  @BelongsTo(() => User)
  declare user: User;

  @HasOne(() => OrderItem)
  declare orderItem: OrderItem;

  // Timestamps
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
