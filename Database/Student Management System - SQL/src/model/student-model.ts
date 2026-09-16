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
  BelongsToMany,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Course } from "./course-model.js";
import { Enrollment } from "./enrollments-model.js";

@Table({ tableName: "students", timestamps: true })
export class Student extends Model {
    // student id 
  @PrimaryKey
  @IsUUID(4)
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

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

// Define Many ro Many Connection 
  @BelongsToMany(() => Course, () => Enrollment)
  declare courses: Course[];

  // Timestamps
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
