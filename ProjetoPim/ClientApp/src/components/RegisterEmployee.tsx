import * as React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { cpf } from 'cpf-cnpj-validator';
import { cpfMask, moneyMask } from '../utils/mask'
import ModalConfirm from './ModalConfirm';


class RegisterEmployee extends React.PureComponent<any> {
  constructor(context: any, props: any) {
    super(context, props)
    this.state = {
      Name: "",
      Surname: "",
      Address: "",
      Cpf: "",
      Salary: "",
      Responsability: "",
      Departament: "",
      IsOpen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleSubmit(event: any) {
    event.preventDefault();

  }

  handleModal(event: any) {
    event.preventDefault();

    const state: any = this.state;
    const { IsOpen } = state;

    this.setState({ IsOpen: !IsOpen })
  }

  render() {
    const state: any = this.state;
    const {
      Name,
      Surname,
      Address,
      Cpf,
      Salary,
      Responsability,
      Departament,
      IsOpen
    } = state;

    return (
      <div className="app">
        <ModalConfirm isOpen={IsOpen} toggle={this.handleModal} handleSubmit={this.handleSubmit} />
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
                    href="/funcionarios"
                    tag="a"
                  >
                    Funcionários
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    active
                    tag="span"
                  >
                    Incluir Funcionário
                  </BreadcrumbItem>
                </Breadcrumb>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className='d-flex'>
                    <h2>Incluir funcionário</h2>
                  </Col>
                </Row>
                <Form onSubmit={this.handleModal} className='mt-5'>
                  <Row>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input value={Name} required={true} onChange={(e) => this.setState({ Name: e.target.value })} placeholder="Nome" id="Name" />
                        <Label for="Name">Nome</Label>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input value={Surname} required={true} onChange={(e) => this.setState({ Surname: e.target.value })} placeholder="Sobrenome" id="Surname" />
                        <Label for="Surname">Sobrenome</Label>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input value={Address} required={true} onChange={(e) => this.setState({ Address: e.target.value })} placeholder="Endereço" id="Address" />
                        <Label for="Address">Endereço</Label>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input invalid={!cpf.isValid(Cpf) && Cpf.length === 14} required={true} value={Cpf} onChange={(e) => this.setState({ Cpf: cpfMask(e.target.value) })} placeholder="CPF" id="Cpf" />
                        <Label for="Cpf">CPF</Label>
                        <FormFeedback>
                          Cpf inválido
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input value={Salary.length > 0 ? moneyMask(Salary) : ''} required={true} onChange={(e) => this.setState({ Salary: e.target.value })} placeholder="Salário" id="Salary" />
                        <Label for="Salary">Salário</Label>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input value={Responsability} required={true} onSelect={(value) => this.setState({ Responsability: value })} placeholder="Cargo" id="Responsability" type='select' >
                          <option value="" selected disabled hidden>Selecione...</option>
                          <option value="test">Teste</option>
                        </Input>
                        <Label for="Responsability">Cargo</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={2}>
                      <FormGroup floating>
                        <Input value={Departament} required={true} onSelect={(value) => this.setState({ Departament: value })} placeholder="Departamento" id="Departament" type='select'>
                          <option value="" selected disabled hidden>Selecione...</option>
                          <option value="test">Teste</option>
                        </Input>
                        <Label for="Departament">Departamento</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className='mt-5'>
                    <Col>
                      <Button type="submit" color='success' className='me-3' disabled={!cpf.isValid(Cpf) || Cpf.length < 14}>
                        Adicionar
                      </Button>
                      <Button type='button' color='danger' onClick={() => window.open("/funcionarios", "_self")}>
                        Cancelar
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  };
}

export default connect()(RegisterEmployee);
