"use client";
import { useState } from "react";
import { HttpMethod } from "./types";
export const useRequest = <
  ApiRequestType,
  ApiResponseType,
  ErrorResponseType
>() => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<ApiResponseType>();
  const [error, setError] = useState<ErrorResponseType>();

  const makeRequest = (
    apiEndpoint: string,
    method: HttpMethod,
    requestBody?: ApiRequestType
  ) => {
    setLoading(true);
    fetch(apiEndpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      ...(requestBody && { body: JSON.stringify(requestBody) }),
    })
      .then((response) => {
        response.json().then((data) => {
          setApiData(data as ApiResponseType);
          setLoading(false);
        });
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };
  return { loading, error, apiData, makeRequest };
};
