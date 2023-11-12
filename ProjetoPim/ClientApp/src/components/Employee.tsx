import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/Employee';
import { moneyMask } from '../utils/mask'

class Employee extends React.PureComponent<any> {
  constructor(context: any, props: any) {
    super(context, props)
    this.state = {
      Selected: [],
      IsOpen: 0,
      IsLoading: false,
      Departament: []
    };
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  public componentDidMount() {
    this.ensureDataFetched();
  }

  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    const { deleted } = nextProps;
    const { departament } = this.props;
    const { IsLoading } = nextState;

    if (IsLoading && deleted) {
      this.setState({ IsLoading: false });
      this.ensureDataFetched();
      return false;
    }

    if (nextProps.departament !== departament && nextProps.departament && nextProps.departament.length) {
      this.setState({ Departament: nextProps.departament })
    }

    return true
  }

  handleDelete(event: any, id: any) {
    event.preventDefault();

    this.props.requestDeleteEmployee(id);
    this.setState({ IsLoading: true })
  }

  handleDropdown(event: any, id: number) {
    event.preventDefault();

    const state: any = this.state;
    const { IsOpen } = state;

    this.setState({ IsOpen: IsOpen === id ? 0 : id });
  }

  private ensureDataFetched() {
    this.props.requestDepartament();
    this.props.requestWeatherForecasts();
  }


  render() {
    const state: any = this.state;
    const props: any = this.props;
    const { Selected, IsOpen, Departament } = state;
    const { employee } = props;

    return (
      <div className="app">
        <Row>
          <Col>
            <Card>
              <CardHeader className="p-0">
                <Breadcrumb listClassName="m-0 p-3" listTag="div" className="m-0">
                  <BreadcrumbItem
                    href="/"
                    tag="a"
                  >
                    Home
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    active
                    tag="span"
                  >
                    Funcionários
                  </BreadcrumbItem>
                </Breadcrumb>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className='d-flex justify-content-end'>
                    <Button type='button' onClick={() => window.open("/funcionarios/incluir-funcionario", "_self")}>Incluir funcionário</Button>
                    <Button type='button' color="primary" className='ms-3'>Gerar folha de pagamento</Button>
                  </Col>
                </Row>
                <Row>
                  <Col className="overflow-auto">
                    <Table className='mt-5' bordered striped>
                      <thead>
                        <tr>
                          <th />
                          <th>
                            Id
                          </th>
                          <th>
                            Nome
                          </th>
                          <th>
                            Sobrenome
                          </th>
                          <th>
                            CPF
                          </th>
                          <th>
                            Cargo
                          </th>
                          <th >
                            Departamento
                          </th>
                          <th>
                            Salário
                          </th>
                          <th className='text-center'>
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {employee && employee.length && employee.map((func: any) => (
                          <tr>
                            <td>
                              <Input
                                type='checkbox'
                                checked={Selected.includes(func.id)}
                                onClick={() => {
                                  const selected = Selected;

                                  const index = selected.indexOf(func.id);
                                  index !== -1 ? selected.splice(index, 1) : selected.push(func.id);
                                  this.setState({ Selected: [...selected] });
                                }}
                              />
                            </td>
                            <td>{func.id}</td>
                            <td>{func.name}</td>
                            <td>{func.surname}</td>
                            <td>{func.cpf}</td>
                            <td>{func.responsability}</td>
                            <td>{Departament && Departament.length && Departament.find((dep: any) => func.departament === dep.id).name}</td>
                            <td>{func && func.salary ? moneyMask(func.salary.toString()) : 0}</td>
                            <td className='text-center'>
                              <Dropdown isOpen={IsOpen === func.id} toggle={(e: any) => this.handleDropdown(e, func.id)} direction="start">
                                <DropdownToggle tag="span" className='button-dropdown'><FontAwesomeIcon icon={faEllipsisVertical} color='link' className="me-2" /></DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem>Editar</DropdownItem>
                                  <DropdownItem onClick={(e) => this.handleDelete(e, func.id)}>Excluir</DropdownItem>
                                  <DropdownItem>Gerar folha</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.weatherForecasts,
  WeatherForecastsStore.actionCreators
)(Employee);
