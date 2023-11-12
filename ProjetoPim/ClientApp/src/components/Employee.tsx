import * as React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/Employee';
import { moneyMask } from '../utils/mask'
import html2pdf from "html2pdf.js";
import { paymentLeafHtml } from "../utils/paymentLeafHtml";

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
    this.handlePaymentLeaf = this.handlePaymentLeaf.bind(this);
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

  handlePaymentLeaf(event: any, data?: any) {
    event.preventDefault();

    const { Selected, Departament } = this.state as any;
    const { employee } = this.props;

    if (data) {
      const editedHtml = paymentLeafHtml
        .replace("{_NOME + _SOBRENOME}", `${data.name} ${data.surname}`)
        .replace("{_ID}", data.id).replace("{_CPF}", data.cpf)
        .replace("{_CARGO}", data.responsability)
        .replace("{_DEPARTAMENTO}", Departament && Departament.length && Departament.find((dep: any) => data.departament === dep.id).name)
        .replace("{_SALARIO_BASE}", moneyMask(data.baseSalary.toFixed(2).toString()))
        .replace("{_DESCONTOS}", moneyMask(data.taxesDiscount.toFixed(2).toString()))
        .replace("{_BONUS}", moneyMask(data.bonusSalary.toFixed(2).toString()))
        .replace("{_SEGUROS}", moneyMask(data.secureDiscount.toFixed(2).toString()))
        .replace("{_BENEFICIOS}", moneyMask(data.benefitsSalary.toFixed(2).toString()))
        .replace("{_OUTROS_DESCONTOS}", moneyMask(data.otherDiscount.toFixed(2).toString()))
        .replace("{_TOTAL_POSITIVO}", moneyMask((data.baseSalary + data.bonusSalary + data.benefitsSalary).toFixed(2).toString()))
        .replace("{_TOTAL_NEGATIVO}", moneyMask((data.taxesDiscount + data.secureDiscount + data.otherDiscount).toFixed(2).toString()))
        .replace("{_SALARIO_TOTAL}", moneyMask(data.salary.toString()));
      const pdfOptions = { margin: 10, filename: 'documento.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };

      html2pdf(editedHtml, pdfOptions);
    } else {
      Selected.forEach((id: number) => {
        const employeer = employee.find((emp: any) => emp.id === id);
        const editedHtml = paymentLeafHtml
          .replace("{_NOME + _SOBRENOME}", `${employeer.name} ${employeer.surname}`)
          .replace("{_ID}", employeer.id).replace("{_CPF}", employeer.cpf)
          .replace("{_CARGO}", employeer.responsability)
          .replace("{_DEPARTAMENTO}", Departament && Departament.length && Departament.find((dep: any) => employeer.departament === dep.id).name)
          .replace("{_SALARIO_BASE}", moneyMask(employeer.baseSalary.toFixed(2).toString()))
          .replace("{_DESCONTOS}", moneyMask(employeer.taxesDiscount.toFixed(2).toString()))
          .replace("{_BONUS}", moneyMask(employeer.bonusSalary.toFixed(2).toString()))
          .replace("{_SEGUROS}", moneyMask(employeer.secureDiscount.toFixed(2).toString()))
          .replace("{_BENEFICIOS}", moneyMask(employeer.benefitsSalary.toFixed(2).toString()))
          .replace("{_OUTROS_DESCONTOS}", moneyMask(employeer.otherDiscount.toFixed(2).toString()))
          .replace("{_TOTAL_POSITIVO}", moneyMask((employeer.baseSalary + employeer.bonusSalary + employeer.benefitsSalary).toFixed(2).toString()))
          .replace("{_TOTAL_NEGATIVO}", moneyMask((employeer.taxesDiscount + employeer.secureDiscount + employeer.otherDiscount).toFixed(2).toString()))
          .replace("{_SALARIO_TOTAL}", moneyMask(employeer.salary.toString()));
        const pdfOptions = { margin: 10, filename: 'documento.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };

        html2pdf(editedHtml, pdfOptions);
      });
    }
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
                    <Button type='button' color="primary" className='ms-3' disabled={Selected && !Selected.length} onClick={(e) => this.handlePaymentLeaf(e)}>Gerar folha de pagamento</Button>
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
                                  <DropdownItem onClick={(e) => this.handlePaymentLeaf(e, func)}>Gerar folha</DropdownItem>
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
