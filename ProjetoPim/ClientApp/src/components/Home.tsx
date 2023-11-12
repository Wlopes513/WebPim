import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/Employee';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

class Home extends React.PureComponent<any> {
  constructor(context: any, props: any) {
    super(context, props)
    this.state = {
    };
  }

  public componentDidMount() {
    this.ensureDataFetched();
  }

  private ensureDataFetched() {
    this.props.getHistoric();
  }

  render() {
    const { historic } = this.props as any;
    let dadosAgrupadosPorMes;
    let data = {
      labels: [],
      datasets: []
    } as any;
    let options;

    console.log('historic');
    console.log(historic);

    if (historic) {
      dadosAgrupadosPorMes = historic && historic.reduce((acc: any, item: any) => {
        const monthYear = item.date.substring(3, 10);
        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(item);
        return acc;
      }, {});

      data = {
        labels: Object.keys(dadosAgrupadosPorMes),
        datasets: [
          {
            label: 'Valores',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.6)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: Object.values(dadosAgrupadosPorMes).map((mes: any) => mes.reduce((sum: any, item: any) => sum + item.value, 0))
          }
        ]
      };

      options = {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mês/Ano'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Valor'
            }
          }
        }
      };
    }

    return (
      <div className="app app-home">
        <Row>
          <Col>
            <Card>
              <CardHeader>Gastos Mensais</CardHeader>
              <CardBody>
                {historic && (
                  <Bar options={options} data={data} />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  (state: ApplicationState) => state.weatherForecasts,
  WeatherForecastsStore.actionCreators
)(Home);
