import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export interface ErrorProps {
  error: string;
  desc?: string;
}

export const isError = <T>(result: T | ErrorProps): result is ErrorProps => {
  return (result as ErrorProps).error !== undefined;
};
