import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  IsUUID,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  DataType,
  Index,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Student } from "./student-model.js";
import { Course } from "./course-model.js";

@Table({ tableName: "enrollments", timestamps: true })
export class Enrollment extends Model {
  // enrollment id
  @PrimaryKey
  @IsUUID(4)
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  // ForeignKey from User
  @ForeignKey(() => Student)
  @Index({ name: "Student-enroll" })
  @Column(DataType.UUID)
  declare StudentId: string;

  // ForeignKey from courses
  @ForeignKey(() => Course)
  @Index({ name: "Student-enroll" })
  @Column(DataType.UUID)
  declare CourseId: string;

  @BelongsTo(() => Student)
  declare student: Student;

  @BelongsTo(() => Course)
  declare course: Course;

  // Timestamps
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
