import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
const url = new URL('http://example.com?week=1&week=2&month=5&year=2025');
const params = parseSearchParams(url.searchParams);

console.log(params);
Kết quả: 
{
  week: ["1", "2"],
  month: "5",
  year: "2025"
}
 */
export const parseSearchParams = (searchParams: URLSearchParams): Record<string, string | string[]> => {
  const params: Record<string, string | string[]> = {};

  for (const [key, value] of searchParams.entries()) {
    if (params[key] === undefined) {
      params[key] = value;
    } else {
      params[key] = Array.isArray(params[key])
        ? [...params[key], value]
        : [params[key] as string, value];
    }
  }

  return params;
}