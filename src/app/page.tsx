"use client";
import { useRequest } from "@/api/customHook";
import {
  ContestInfoResponse,
  ErrorResponseType,
  HttpMethod,
} from "@/api/types";
import EventCard from "@/components/EventCard";
import Heading from "@/components/Heading";
import Subcalendar from "@/components/Subcalendar";
import Tabs from "@/components/Tabs";
import { useStoreContext, useStoreDispatch } from "@/context";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

export default function Home() {
  const { competitionInfo } = useStoreContext();
  const dispatch = useStoreDispatch();
  const getApiInfo = useRequest<void, ContestInfoResponse, ErrorResponseType>();
  const [data, setData] = useState<ContestInfoResponse>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponseType>();
  const handleClick = () => {
    if (!competitionInfo) {
      getApiInfo.makeRequest(
        "https://competeapi.vercel.app/contests/upcoming/",
        HttpMethod.GET
      );
    }
  };
  useEffect(() => {
    if (getApiInfo.apiData) {
      dispatch({
        type: "STORE_STATE",
        payload: {
          competitionInfo: getApiInfo.apiData,
        },
      });
      setData(getApiInfo.apiData);
    }
  }, [getApiInfo.apiData]);

  useEffect(() => {
    setLoading(getApiInfo.loading);
  }, [getApiInfo.loading]);

  useEffect(() => {
    if (getApiInfo.error) {
      setError(getApiInfo.error);
    }
  }, [getApiInfo.error]);

  return (
    <div className="w-[432px] h-[932px] justify-center p-4 ">
      <button onClick={handleClick} className="bg-white">
        test
      </button>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <Heading />
          <Tabs />
          <Subcalendar />
          {data?.map((content, index) => (
            <EventCard
              key={index}
              eventTitle={content.title}
              startTimestamp={content.startTime}
              endTimestamp={content.endTime}
              link={content.url}
            />
          ))}
        </Fragment>
      )}
    </div>
  );
}
