import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button, Col, Form, Input, Row } from 'reactstrap';
import FooterImage from '../assets/footer.svg';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/Employee';

type WeatherForecastProps =
  WeatherForecastsStore.WeatherForecastsState
  & typeof WeatherForecastsStore.actionCreators
  & RouteComponentProps<{ startDateIndex: string }>;

class Login extends React.PureComponent<WeatherForecastProps> {
  constructor(context: any, props: any) {
    super(context, props)
    this.state = {
      Email: "",
      Password: "",
      Error: false
      };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: any) {
    event.preventDefault();

    const state: any = this.state;
      const { Email, Password } = state;

      console.log(Email);
      console.log(Password);

    if (Email === "admin@admin.com" && Password === "admin") {
        localStorage.setItem("isLogged", "true");

      window.open("/", "_self");
    } else {
      this.setState({ Error: true });
    }
  }

  public render() {
    const state: any = this.state;
    const { Email } = state;

    return (
      <React.Fragment>
        <div className="app-login">
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Row>
            <Col>
              <h1>Logo empresa</h1>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col>
              <p>Realize seu login para acessar as funcionalidades</p>
            </Col>
          </Row>
          <Row className='mt-3 justify-content-center'>
            <Col xs={5}>
              <Input type="email" value={Email} placeholder='Usuário' onChange={(e) => this.setState({ Email: e.target.value })} />
            </Col>
          </Row>
          <Row className='mt-3 justify-content-center'>
            <Col xs={5}>
              <Input type="password" placeholder='Senha' onChange={(e) => this.setState({ Password: e.target.value })} />
            </Col>
          </Row>
          <Row className='mt-5 justify-content-center'>
            <Col xs={5}>
              <Button type="submit">Login</Button>
            </Col>
          </Row>
        </Form>
        </div>
        <footer>
          <img src={FooterImage} alt="Footer Image" />
        </footer>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.weatherForecasts,
  WeatherForecastsStore.actionCreators
)(Login as any); 