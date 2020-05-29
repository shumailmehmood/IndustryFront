
import React, { Component } from "react";
import { Grid, Col, Row } from "react-bootstrap";
// react component used to create charts
import ChartistGraph from "react-chartist";
// react components used to create a SVG / Vector map
import { VectorMap } from "react-jvectormap";

import Card from "components/Card/Card.jsx";
import StatsCard from "components/Card/StatsCard.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import { get_DashBoardMonthPerDayEarning, get_DashBoardUsers, get_DashBoardtodayEarning, get_DashBoardMonthEarning } from "../api/api";
import {

  responsiveSales,
  dataBar,
  optionsBar,
  responsiveBar,
  table_data
} from "variables/Variables.jsx";
const tooltip = require('chartist-plugin-tooltip');

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};
const percentageCalculator = (...args) => {
  let array1 = [], array2 = [], value = 0, total = 0;

  total = args.reduce((a, b) => a + b)
  args.forEach(element => {
    value = Math.abs(Math.ceil((element / total) * 100))
    array1.push(value + "%");
    array2.push(value);
  })
  return {
    labels: array1,
    series: array2
  };
}
const salesData = (array) => {
  let array1 = [], array2 = [];
  array.forEach(element => {
    array1.push(element._id);
    array2.push(element.total)
  })

  return {
    labels: array1,
    series: [array2],
    max: Math.max(...array2)
  }
}
class Dashboard extends Component {
  state = {
    dataPie: {},
    percent: 0,
    basic: 0,
    today: 0,
    month: 0,
    dataSales: {},
    optionsSales: {
      low: 0,
      high: 10000,
      showArea: false,

      height: "245px",
      axisX: {
        showGrid: false
      },
      lineSmooth: true,
      showLine: true,
      showPoint: true,
      fullWidth: true,
      chartPadding: {
        right: 50
      },
       plugins:[ tooltip()]

    }
  }

  componentDidMount() {
    get_DashBoardUsers().then(res => {
      if (res.error) {

      } else {

        this.setState({
          percent: res.data.Percentage,
          basic: res.data.Basic,
          dataPie: percentageCalculator(res.data.Percentage, res.data.Basic)
        })
      }
    })
    get_DashBoardtodayEarning().then(res => {
      if (res.error) {

      } else {

        this.setState({
          today: res.data.total
        })
      }
    })
    get_DashBoardMonthEarning().then(res => {
      if (res.error) {

      } else {

        this.setState({
          month: res.data.total
        })
      }
    })
    get_DashBoardMonthPerDayEarning().then(res => {
      if (res.error) {

      } else {
        let { optionsSales } = this.state;
        let result = salesData(res.data);
        optionsSales['high'] = result.max;
        delete result.max;
        this.setState({
          dataSales: result,
          optionsSales
        })
      }
    })
  }
  createTableData() {
    var tableRows = [];
    for (var i = 0; i < table_data.length; i++) {
      tableRows.push(
        <tr key={i}>
          <td>
            <div className="flag">
              <img src={table_data[i].flag} alt="us_flag" />
            </div>
          </td>
          <td>{table_data[i].country}</td>
          <td className="text-right">{table_data[i].count}</td>
          <td className="text-right">{table_data[i].percentage}</td>
        </tr>
      );
    }
    return tableRows;
  }
  render() {
    const { dataPie, month, today, percent, basic, dataSales, optionsSales } = this.state;

    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Capacity"
                statsValue="105GB"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Revenue"
                statsValue={`RS${month}`}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="This Month Earning so Far"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Earning"
                statsValue={`RS${today}`}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="Today Earning So Far"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-registered text-info" />}
                statsText="Registered"
                statsValue={percent + basic}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Global Sales by Top Locations"
                category="All products that were shipped"
                content={
                  <Row>
                    <Col md={5}>
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>{this.createTableData()}</tbody>
                        </table>
                      </div>
                    </Col>
                    <Col md={6} mdOffset={1}>
                      <VectorMap
                        map={"world_mill"}
                        backgroundColor="transparent"
                        zoomOnScroll={false}
                        containerStyle={{
                          width: "100%",
                          height: "280px"
                        }}
                        containerClassName="map"
                        regionStyle={{
                          initial: {
                            fill: "#e4e4e4",
                            "fill-opacity": 0.9,
                            stroke: "none",
                            "stroke-width": 0,
                            "stroke-opacity": 0
                          }
                        }}
                        series={{
                          regions: [
                            {
                              values: mapData,
                              scale: ["#AAAAAA", "#444444"],
                              normalizeFunction: "polynomial"
                            }
                          ]
                        }}
                      />
                    </Col>
                  </Row>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Card
                title="Users Statistics"
                category="No of Catagorical users"
                content={<ChartistGraph data={dataPie} type="Pie" />}
                legend={
                  <div>
                    <i className="fa fa-circle text-info" />On Percentage {percent}
                    <i className="fa fa-circle text-danger" /> On Basic Pay {basic}

                  </div>
                }
                stats={
                  <div>
                    <i className="fa fa-clock-o" /> Campaign sent 2 days ago
                  </div>
                }
              />
            </Col>
            <Col md={8}>
              <Card
                title="Monthly Sale"
                category="Monthly per day sale"
                content={
                  <ChartistGraph
                    data={dataSales}
                    type="Line"
                    options={optionsSales}
                    responsiveOptions={responsiveSales}
                  />
                }
                legend={
                  <div>
                    <i className="fa fa-circle text-info" /> Open
                    <i className="fa fa-circle text-danger" /> Click
                    <i className="fa fa-circle text-warning" /> Click Second
              Time
                  </div>
                }
                stats={
                  <div>
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card
                title="2014 Sales"
                category="All products including Taxes"
                content={
                  <ChartistGraph
                    data={dataBar}
                    type="Bar"
                    options={optionsBar}
                    responsiveOptions={responsiveBar}
                  />
                }
                legend={
                  <div>
                    <i className="fa fa-circle text-info" /> Tesla Model S
                    <i className="fa fa-circle text-danger" /> BMW 5 Series
                  </div>
                }
                stats={
                  <div>
                    <i className="fa fa-check" /> Data information certified
                  </div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                content={
                  <table className="table">
                    <Tasks />
                  </table>
                }
                stats={
                  <div>
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
