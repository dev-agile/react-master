import React, { PureComponent } from 'react';
import $ from 'jquery';
import { Row, Col } from 'reactstrap';

/* eslint-disable */
import 'imports-loader?jQuery=jquery,this=>window!flot';
import 'imports-loader?jQuery=jquery,this=>window!flot.dashes/jquery.flot.dashes';
/* eslint-enable */

import Widget from '../../../../components/Widget';

export default class RevenueChart extends PureComponent {
  componentDidMount() {
    this.initChart();
    this.initEventListeners();

    window.addEventListener('resize', this.initChart.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.initChart.bind(this));
  }

  getMainChartData() { // eslint-disable-line
    function generateRandomPicks(minPoint, maxPoint, picksAmount, xMax) {
      let x = 0;
      let y = 0;
      const result = [];
      const xStep = 1;
      const smoothness = 0.3;
      const pointsPerPick = Math.ceil(xMax / ((picksAmount * 2) + 1) / 2);

      const maxValues = [];
      const minValues = [];

      for (let i = 0; i < picksAmount; i += 1) {
        const minResult = minPoint + Math.random();
        const maxResult = maxPoint - Math.random();

        minValues.push(minResult);
        maxValues.push(maxResult);
      }

      let localMax = maxValues.shift(0);
      let localMin = 0;
      let yStep = parseFloat(((localMax - localMin) / pointsPerPick).toFixed(2));

      for (let j = 0; j < Math.ceil(xMax); j += 1) {
        result.push([x, y]);

        if ((y + yStep >= localMax) || (y + yStep <= localMin)) {
          y += yStep * smoothness;
        } else if ((result[result.length - 1][1] === localMax) || (result[result.length - 1][1] === localMin)) {
          y += yStep * smoothness;
        } else {
          y += yStep;
        }

        if (y > localMax) {
          y = localMax;
        } else if (y < localMin) {
          y = localMin;
        }

        if (y === localMin) {
          localMax = maxValues.shift(0) || localMax;

          const share = (localMax - localMin) / localMax;
          const p = share > 0.5 ? Math.round(pointsPerPick * 1.2) : Math.round(pointsPerPick * share);

          yStep = parseFloat(((localMax - localMin) / p).toFixed(2));
          yStep *= Math.abs(yStep);
        }

        if (y === localMax) {
          localMin = minValues.shift(0) || localMin;

          const share = (localMax - localMin) / localMax;
          const p = share > 0.5 ? Math.round(pointsPerPick * 1.5) : Math.round(pointsPerPick * 0.5);

          yStep = parseFloat(((localMax - localMin) / p).toFixed(2));
          yStep *= -1;
        }

        x += xStep;
      }

      return result;
    }

    const d1 = generateRandomPicks(0.2, 3, 4, 90);
    const d2 = generateRandomPicks(0.4, 3.8, 4, 90);
    const d3 = generateRandomPicks(0.2, 4.2, 3, 90);

    return [d1, d2, d3];
  }

  onDrawHook() {
    this.$chartLegend
      .find('.legendColorBox > div')
      .css({
        border: 0,
        borderRadius: 0,
        paddingTop: 5
      })
      .children('div')
      .css({
        borderWidth: 1,
        borderRadius: 0,
        width: 75
      });

    this.$chartLegend.find('tbody td').css({
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: 'center'
    });

    let labels = this.$chartLegend.find('.legendLabel').detach();
    this.$chartLegend.find('tbody').prepend('<tr></tr>');
    this.$chartLegend.find('tbody tr:eq(0)').append(labels);
  }

  initChart() {
    const data = this.getMainChartData();

    const ticks = ['Dec 19', 'Dec 25', 'Dec 31', 'Jan 10', 'Jan 14',
      'Jan 20', 'Jan 27', 'Jan 30', 'Feb 2', 'Feb 8', 'Feb 15',
      'Feb 22', 'Feb 28', 'Mar 7', 'Mar 17'];

    // check the screen size and either show tick for every 4th tick on large screens, or
    // every 8th tick on mobiles
    const tickInterval = window.screen.width < 500 ? 10 : 6;
    let counter = 0;

    if (this.$chartContainer.length > 0) {
      return $.plot(this.$chartContainer, [{
        label: 'Light Blue',
        data: data[0],
        lines: {
          show: true,
          fill: 0.1,
          lineWidth: 0,
        },
        points: {
          fillColor: '#A7BEFF',
          symbol: (ctx, x, y) => {
                  // count for every 8nd point to show on line
            if (counter % 8 === 0) { ctx.arc(x, y, 2, 0, Math.PI * 2, false); }

            counter += 1;
          },
        },
        shadowSize: 0,
      }, {
        label: 'RNS App',
        data: data[1],
        dashes: {
          show: true,
          lineWidth: 1.5,
          dashLength: [5, 2],
        },
        points: {
          fillColor: '#3abf94',
        },
        shadowSize: 0,
      }, {
        label: 'Sing App',
        data: data[2],
        lines: {
          show: true,
          lineWidth: 1.5,
        },
        points: {
          fillColor: '#f55d5d',

        },
        shadowSize: 0,
      }], {
        xaxis: {
          tickColor: 'transparent',
          tickSize: tickInterval,
          tickFormatter: i => ticks[i / tickInterval],
          axisLabelColour: '#FF0000',
          font: {
            lineHeight: 11,
            weight: 400,
          },
        },
        yaxis: {
          tickColor: 'transparent',
          max: 5,
          font: {
            lineHeight: 11,
            weight: 400,
          },
        },
        points: {
          show: true,
          fill: true,
          lineWidth: 1,
          radius: 1,
          symbol: (ctx, x, y) => {
                  // show every 5th point on line
            if (counter % 5 === 0) { ctx.arc(x, y, 2, 0, Math.PI * 2, false); }

            counter += 1;
          },
        },
        grid: {
          backgroundColor: { colors: ['transparent', 'transparent'] },
          borderWidth: -1,
          borderColor: 'transparent',
          margin: 0,
          minBorderMargin: 0,
          labelMargin: 20,
          hoverable: true,
          clickable: true,
          mouseActiveRadius: 6,
          color: '#fff'
        },
        legend: {
          noColumns: 3,
          container: this.$chartLegend,
        },
        colors: ['#fff', '#3abf94', '#ffc247'],
        hooks: {
          draw: [this.onDrawHook.bind(this)],
        },
      });
    }
  }
  initEventListeners() {
    const self = this;

    this.$chartContainer.on('plothover', (event, pos, item) => {
      if (item) {
        const x = item.datapoint[0].toFixed(2);
        const y = item.datapoint[1].toFixed(2);

        self.$chartTooltip.html(`<span class="text-dark">${item.series.label} at ${x} : ${y}</span>`)
          .css({
            top: (item.pageY + 5) - window.scrollY,
            left: (item.pageX + 5) - window.scrollX,
          })
          .fadeIn(200);
      } else {
        self.$chartTooltip.hide();
      }
    });
  }

  render() {
    return (
      <Widget
        bodyClass="mt"
        className="mb-xlg"
        title={
          <Row>
            <Col xs={12} sm={5}>
              <h5>
                Daily <span className="fw-semi-bold">Line Chart</span>
              </h5>
            </Col>
            <Col xs={12} sm={7}>
              <div ref={(r) => { this.$chartLegend = $(r); }} />
            </Col>
          </Row>
        }
      >
        <div ref={(r) => { this.$chartContainer = $(r); }} style={{ width: '100%', height: '250px' }} />
        <div className="chart-tooltip" ref={(r) => { this.$chartTooltip = $(r); }} />
      </Widget>
    );
  }
}
