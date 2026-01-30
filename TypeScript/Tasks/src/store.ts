import type { Contact } from "./types.js";
import {  storeData } from "./io.js";

export class ContactStore {
  private store: Map<string, Contact>;

  constructor(data: Contact[]) {
    const newData: Array<[string, Contact]> = data.map((contact) => {
      return [contact.id, contact];
    });
    this.store = new Map(newData);
  }

  add(contact: Contact, constructorCall?: boolean): void {
    this.store.set(contact.id, contact);
    storeData("./data/contact.json", Array.from(this.store.values()));
  }

  get(id: string) {
    return this.store.get(id);
  }

  list(): Contact[] {
    return Array.from(this.store.values());
  }

  remove(id: string) {
    if (this.store.delete(id)) {
      console.log("Contact removed.");
      storeData("./data/contact.json", Array.from(this.store.values()));
    } else {
      console.log("Contact not found.");
    }
  }

  IsHaveEmail(email: string) {
    const isHave: Contact | undefined = this.store
      .values()
      .find((user) => user.email === email);
    if (isHave) {
      return true;
    }
    return false;
  }
}
