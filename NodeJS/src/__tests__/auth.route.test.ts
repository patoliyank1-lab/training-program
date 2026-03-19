import request from "supertest";
import { jest } from "@jest/globals"; 
import { app } from "../server.js"; // your express app
import { AuthService } from "../service/authService.js";

// Mock the service
jest.mock("../service/authService");

describe("Auth Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  // ✅ get properly typed mocked version
const mockedAuthService = jest.mocked(AuthService);

  // ✅ Register Test
  describe("POST /api/auth/register", () => {
    it("should register a user successfully", async () => {
     mockedAuthService.register.mockResolvedValue({
      user: {
        _id: "507f1f77bcf86cd799439011" as any,
        email: "test@example.com",
        name: "Test User",
        username: "testuser",
        phone: "1234567890",
        role: "user",
        isVerify: true,
        avatar: "avatar.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      },
    });


      const res = await request(app).post("/api/auth/register").send({
        name: "Test Name",
        username: "testuser12",
        email: "testuser12@gmail.com",
        password: "Password123",
        confirmpassword: "Password123",
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("email", "test@example.com");
    });

    it("should fail if email is missing", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test Name",
        username: "testuser12",
        password: "Password123",
        confirmpassword: "Password123",
      });

      expect(res.status).toBe(400);
    });
  });

  // ✅ Login Test
  describe("POST /api/auth/login", () => {
    it("should login successfully", async () => {
      mockedAuthService.login.mockResolvedValue({
      user: {
        _id: "507f1f77bcf86cd799439011" as any,
        email: "test@example.com",
        name: "Test User",
        username: "testuser",
        phone: "1234567890",
        role: "user",
        isVerify: true,
        avatar: "avatar.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      },
      token:"4564464564656456",
    });

      const res = await request(app).post("/api/auth/login").send({
        email: "testuser1@gmail.com",
        password: "Password123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should fail with wrong credentials", async () => {
      mockedAuthService.login.mockRejectedValue(
        new Error("Invalid credentials"),
      );

      const res = await request(app).post("/api/auth/login").send({
        email: "wrong@example.com",
        password: "Password123",
      });

      expect(res.status).toBe(401);
    });
  });
});
