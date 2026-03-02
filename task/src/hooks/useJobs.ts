"use client";
import { useContext } from "react";
import { JobsContext } from "@/context/JobContext";

export const useJob = () => useContext(JobsContext);
