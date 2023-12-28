import { EChartsOption } from "echarts-for-react";

export type DailyTreasuryInfo = {
  Date: string;
  "1 Mo": number;
  "2 Mo": number;
  "3 Mo": number;
  "4 Mo": number;
  "6 Mo": number;
  "1 Yr": number;
  "2 Yr": number;
  "3 Yr": number;
  "5 Yr": number;
  "7 Yr": number;
  "10 Yr": number;
  "20 Yr": number;
  "30 Yr": number;
};

export interface State {
  option: EChartsOption;
}
