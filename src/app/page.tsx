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
import { builderFormatDataIntoMap } from "@/context/helper";
import { ContestStructure } from "@/context/type";
import { formatDateToYYYYMMDD } from "@/helper";
import Image from "next/image";
import NoEventsFoundImage from '../../public/noEventsFound.png';
import { Fragment, useEffect, useState } from "react";

export default function Home() {
  const { competitionMap, contestData } = useStoreContext();
  const dispatch = useStoreDispatch();
  const getApiInfo = useRequest<void, ContestInfoResponse, ErrorResponseType>();
  const [data, setData] = useState<ContestInfoResponse>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponseType>();
  const getContestData = (
    competitionMap: ContestStructure | null | undefined,
    date: number,
    contestFilter?: string
  ) => {
    console.log({ competitionMap });
    if (!competitionMap) {
      dispatch({
        type: "STORE_STATE",
        payload: {
          contestData: undefined,
        },
      });
      return;
    }
    const dateKey = formatDateToYYYYMMDD(date);

    const getAllContestOfThatDate = competitionMap.get(dateKey);
    if (!getAllContestOfThatDate) {
      dispatch({
        type: "STORE_STATE",
        payload: {
          contestData: null,
        },
      });
      return;
    }
    if (contestFilter?.trim()) {
      dispatch({
        type: "STORE_STATE",
        payload: {
          contestData: getAllContestOfThatDate?.get(contestFilter) ?? [],
        },
      });
    }

    const combined: ContestInfoResponse = Array.from(
      getAllContestOfThatDate.values()
    ).flat();

    combined.sort((a, b) => a.startTime - b.startTime);

    dispatch({
      type: "STORE_STATE",
      payload: {
        contestData: combined,
      },
    });
    return;
  };

  useEffect(() => {
    getApiInfo.makeRequest(
      "https://competeapi.vercel.app/contests/upcoming/",
      HttpMethod.GET
    );
  }, []);

  useEffect(() => {
    if (getApiInfo.apiData) {
      const updatedData = builderFormatDataIntoMap(getApiInfo.apiData);
      dispatch({
        type: "STORE_STATE",
        payload: {
          competitionMap: updatedData,
        },
      });
      const today = new Date();
      today.setDate(today.getDate());
      const start = new Date(today);
      start.setHours(0, 0, 0, 0);
      const end = new Date(today);
      end.setHours(23, 59, 59, 999);
      getContestData(competitionMap, today.getDate());
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

  const updateFilter = (timestamp: number) => {
    console.log({ timestamp });
    getContestData(competitionMap, timestamp);
  };

 

  return (
    <div className="w-[432px] h-[932px] justify-center p-4 ">
      {loading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <Heading />
          <Tabs />
          <Subcalendar updateFilter={updateFilter} />
          
          {!contestData?.length  ? (
            <div className="flex items-center justify-center flex-col">
           <Image src={NoEventsFoundImage} alt="no events " className=" p-0" />
           <div className="text-white">No events found for the selected date</div>
           </div>
          ) : (
            contestData?.map((content, index) => (
              <EventCard
                key={index}
                eventTitle={content.title}
                startTimestamp={content.startTime}
                endTimestamp={content.endTime}
                link={content.url}
              />
            ))
          )}
        </Fragment>
      )}
    </div>
  );
}
