import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button, Col, Form, FormFeedback, Input, Row, Toast, ToastBody, ToastHeader } from 'reactstrap';
import FooterImage from '../assets/footer.svg';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/Employee';
import { localRemove, sessionSet } from '../utils/session';

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

  shouldComponentUpdate(nextProps: any, nextState: any) {
    const { Email, Password } = this.state as any;

    if ((Email !== nextState.Email || Password !== nextState.Password) && nextState.Error) {
      this.setState({ Error: false });

      return false;
    }

    return true;
  }

  componentDidMount() {
    localRemove("isLogged");
  }

  handleSubmit(event: any) {
    event.preventDefault();

    const state: any = this.state;
    const { Email, Password } = state;

    if (Email === "admin@admin.com" && Password === "admin") {
      sessionSet("isLogged", "true", 15);

      window.open("/", "_self");
    } else {
      this.setState({ Error: true });
    }
  }

  public render() {
    const state: any = this.state;
    const { Email, Error } = state;

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
                <Input type="email" value={Email} placeholder='Usuário' invalid={Error} onChange={(e) => this.setState({ Email: e.target.value })} />
              </Col>
            </Row>
            <Row className='mt-3 justify-content-center'>
              <Col xs={5}>
                <Input type="password" placeholder='Senha' invalid={Error} onChange={(e) => this.setState({ Password: e.target.value })} />
              </Col>
              <FormFeedback>
                Cpf inválido
              </FormFeedback>
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