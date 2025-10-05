import { ContestInfoResponse } from "@/api/types";

type CalendarViewModeType = "week" | "day";

type DateFilterType = {
  startTimestamp?: number;
  endTimestamp?: number;
};

enum ContestPlatformType {
  Leetcode = "leetcode",
  Codeforces = "codeforces",
  Codechef = "codechef",
};

type DateListType = {
  date: Date;
  dateNumeric: string;
  month: string;
};

type StoreType = {
  calendarViewMode?: CalendarViewModeType | null;
  competitionMap?: ContestStructure | null;
  contestData?: ContestInfoResponse | null;
  specificPlatformContestInfo?: string | null; // TODO
  dateFilter?: DateFilterType | null;
  contestFilter?: ContestPlatformType | null;
  baseDate?: Date;
  selectedDate?: Date;
};

type Action = {
  type: "STORE_STATE" | "RESET_STORE";
  payload?: StoreType;
};

type DispatchType = (action: Action) => void;

// export type ActionDispatchType = (action:Action) => void;
export type {
  StoreType,
  Action,
  DispatchType,
  CalendarViewModeType,
  DateFilterType,
  ContestPlatformType,
  DateListType
};

export type ContestStructure = Map<string, Map<string, ContestInfoResponse>>;
