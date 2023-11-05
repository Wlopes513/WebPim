import * as React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

const values = [{
  id: 1,
  name: "Eu",
  surname: "Talvez",
  cpf: "123.456.789-50",
  responsability: "Desenvolvedor",
  departament: 1,
  salary: "R$ 1.000,00",
}, {
  id: 2,
  name: "Voce",
  surname: "Talvez",
  cpf: "123.456.789-50",
  responsability: "Desenvolvedor",
  departament: 1,
  salary: "R$ 2.000,00",
}]


class Employee extends React.PureComponent<any> {
  constructor(context: any, props: any) {
    super(context, props)
    this.state = {
      Selected: [],
      IsOpen: 0,
    };
    this.handleDropdown = this.handleDropdown.bind(this);
  }

  handleDropdown(event: any, id: number) {
    event.preventDefault();

    const state: any = this.state;
    const { IsOpen } = state;

    this.setState({ IsOpen: IsOpen === id ? 0 : id });
  }

  render() {
    const state: any = this.state;
    const { Selected, IsOpen } = state;

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
                        {values.map((func) => (
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
                            <td>{func.departament}</td>
                            <td>{func.salary}</td>
                            <td className='text-center'>
                              <Dropdown isOpen={IsOpen === func.id} toggle={(e: any) => this.handleDropdown(e, func.id)} direction="start">
                                <DropdownToggle tag="span"><FontAwesomeIcon icon={faEllipsisVertical} color='link' className="me-2" /></DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem>Editar</DropdownItem>
                                  <DropdownItem>Excluir</DropdownItem>
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

export default connect()(Employee);
