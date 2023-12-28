import React from "react";
import * as echarts from "echarts/lib/echarts";
import ReactECharts from "echarts-for-react";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import { ChartsBase } from "./index.base";

export class Charts extends ChartsBase {
  render() {
    const { option } = this.state;
    return <ReactECharts option={option} />;
  }
}
