export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | { [key: string]: boolean | undefined | null };

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const process = (val: ClassValue): void => {
    if (!val) return;
    if (typeof val === "string" || typeof val === "number") {
      classes.push(String(val));
    } else if (Array.isArray(val)) {
      for (const item of val) process(item);
    } else if (typeof val === "object") {
      for (const [key, active] of Object.entries(val)) {
        if (active) classes.push(key);
      }
    }
  };

  for (const input of inputs) {
    process(input);
  }

  return classes.join(" ");
}

