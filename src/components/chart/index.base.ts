import React from "react";
import * as echarts from "echarts/lib/echarts";
import { httpsReqest } from "../../util/http";
import { State, DailyTreasuryInfo } from "./index.d";

export class ChartsBase extends React.PureComponent<any, State> {
  state = {
    option: {},
  };

  async componentDidMount() {
    const date = new Date();
    const { date: preYearDate, data: preYearData } = await this.getData(
      // daily_treasury_bill_rates
      // daily_treasury_yield_curve
      // daily_treasury_real_yield_curve
      "daily_treasury_yield_curve",
      date.getFullYear() - 1
    );
    const { date: curYearDate, data: curYearData } = await this.getData(
      "daily_treasury_yield_curve",
      date.getFullYear()
    );
    this.updateState(
      [...preYearDate, ...curYearDate],
      [...preYearData, ...curYearData]
    );
  }

  /**
   * 获取数据
   * @param curveType 类型
   * @param year 年份
   * @returns 
   */
  async getData(curveType, year) {
    const hostname = "https://home.treasury.gov"; // https://home.treasury.gov
    const url =
      hostname +
      `/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/${year}/all` +
      `?type=${curveType}&field_tdr_date_value=${year}&page&_format=csv`;
    const dailyTreasuryData = (await httpsReqest(
      url
    )) as Array<DailyTreasuryInfo>;

    let date: Array<string> = [];

    let data: Array<number> = [];

    for (var i = 0; i < dailyTreasuryData.length; i++) {
      const index = dailyTreasuryData.length - 1 - i;
      date.push(dailyTreasuryData[index].Date);
      data.push(
        dailyTreasuryData[index]["10 Yr"] - dailyTreasuryData[index]["3 Mo"]
      );
    }
    return { date, data };
  }

  /**
   * 更新数据
   * @param date 时间数组
   * @param data 数据数组
   */
  updateState(date, data) {
    this.setState({
      option: {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          text: "US Treasury Bond Trends",
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
          },
        ],
        series: [
          {
            name: "Fake Data",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "rgb(255, 70, 131)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 158, 68)",
                },
                {
                  offset: 1,
                  color: "rgb(255, 70, 131)",
                },
              ]),
            },
            data: data,
          },
        ],
      },
    });
  }
}
