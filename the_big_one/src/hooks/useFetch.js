import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(
    function () {
      async function fetchData() {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      }

      fetchData();
    },
    [url]
  );

  return data;
};
export default useFetch;
