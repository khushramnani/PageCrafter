import { nanoid } from "nanoid";

export const slugify = (title: string) => {
  return `${title.toLowerCase().replace(/\s+/g, "-")}-${nanoid(6)}`;
}
