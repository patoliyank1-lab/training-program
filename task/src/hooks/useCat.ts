"use client";
import { useContext } from "react";
import { CategoryContext } from "@/context/CategoryContext";

export const useCat = () => useContext(CategoryContext);
