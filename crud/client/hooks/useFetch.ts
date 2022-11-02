import { BlobOptions } from "buffer";
import { useEffect, useState } from "react";

const useFetch = (url: string, method?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    switch (method) {
      case "DELETE": {
        fetch(url, { signal: controller.signal, method: "DELETE" })
          .then(() => setData("success"))
          .catch(setError)
          .finally(() => setLoading(false));
      };
      default: {
        fetch(url, { signal: controller.signal })
        .then((res) => res.json())
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
      }
    }
    
    return () => {
      controller.abort();
    };
  }, [url]);
  return { loading, data, error };
};

export default useFetch;
