import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  IsUUID,
  AllowNull,
  Unique,
  CreatedAt,
  UpdatedAt,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Student } from "./student-model.js";
import { Enrollment } from "./enrollments-model.js";

@Table({ tableName: "courses", timestamps: true })
export class Course extends Model {
  // course id
  @PrimaryKey
  @IsUUID(4)
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  // course Title
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare title: string;

  // course description
  @AllowNull(true)
  @Column(DataType.STRING)
  declare description: string;

  // Define Many ro Many Connection 
  @BelongsToMany(() => Student, () => Enrollment)
  declare courses: Course[];

  // Timestamps
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
