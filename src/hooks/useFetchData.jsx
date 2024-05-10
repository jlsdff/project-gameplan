"use client";
import React, { useEffect, useState } from "react";

export default function useFetchData(fetchfunction, dependencies) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetchfunction() 
          .catch(err => {
            throw new Error(err)
          })
        setData(res);
      }
      fetchData();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchfunction, dependencies]);

  return {data, loading, error};
}
