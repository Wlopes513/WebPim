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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => 10),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => 10),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const Home = () => (
  <div className="app app-home">
    <Row>
      <Col>
        <Card>
          <CardHeader>Gráfico 1</CardHeader>
          <CardBody>
            <Bar options={options} data={data} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
);

export default connect()(Home);
