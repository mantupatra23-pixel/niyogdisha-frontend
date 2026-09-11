const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ||
  "https://niyogdisha.onrender.com/api/v1";

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
      ...options,
    });
    if (!res.ok) {
      console.warn(`[API] ${res.status} returned for ${url}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[API Network Error] ${url}:`, err);
    return null;
  }
}
