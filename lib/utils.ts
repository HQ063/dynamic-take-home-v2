
import { auth } from "@/auth";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status} ${res.statusText}`);
  }
  return res.json();
});

export const getUserEmail = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    throw new Error('User not authenticated');
  }
  return session.user.email;
}