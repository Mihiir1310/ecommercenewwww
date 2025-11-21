import { useState, useEffect, useCallback } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type Method = "GET" | "POST" | "PUT"  | "DELETE";


interface FetchOptions<TBody> {
  method?: Method;
  body?: TBody;
  headers?: Record<string, string>;
  url?: string; 
}

export function useFetch<T>(baseUrl: string, autoFetch: boolean = true) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  
  const request = useCallback(
    async <TBody = unknown>({method = "GET",body,headers,url,} :FetchOptions<TBody> = {}) => {
      const finalUrl = url || baseUrl;
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const res = await fetch(finalUrl, {
          method,
          headers: { "Content-Type": "application/json", ...headers },
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = (await res.json()) as T;
        setState({ data, loading: false, error: null });
        return data;
      } catch {
        setState({ data: null, loading: false, error: "Request failed" });
        return null;
      }
    },
    [baseUrl]
  );


  useEffect(() => {
    if (autoFetch) request({ method: "GET" });
  }, [autoFetch, request]);

  // CRUD operations
  const getData = () => request({ method: "GET" });
  const postData = <TBody>(body: TBody) => request({ method: "POST", body });
  const putData = <TBody>(id: string | number, body: TBody) =>
    request({ method: "PUT", body, url: `${baseUrl}/${id}` });
  const deleteData = (id: string | number) =>
    request({ method: "DELETE", url: `${baseUrl}/${id}` });

  return { ...state, getData, postData, putData, deleteData };
}
