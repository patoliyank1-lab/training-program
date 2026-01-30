import fs from "fs/promises";
import type { Contact } from "./types.js";

export async function loadData(path: string): Promise<Contact[]> {
  const raw = await fs.readFile(path, "utf-8");
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) throw new Error("Invalid format");

  return parsed as Contact[];
}

export async function storeData(path: string, contacts : Contact[] ) {
  const jsonData = JSON.stringify(contacts, null, 2);
  fs.writeFile(path, jsonData);
}
