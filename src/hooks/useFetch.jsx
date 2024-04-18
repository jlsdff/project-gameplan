"use client";
import React, { useState, useEffect } from "react";

export default function useFetch({ fetchFunction, dependencies }) {
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      await fetchFunction()
        .then((res) => {
          setData(res);
          setIsFetching(false);
        })
        .catch((err) => {
          console.error(err);
          alert("Error fetching data");
        });
    };

    fetchdata();
  }, [dependencies]);

  return { isFetching, data };
}
