import * as React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { cpf } from 'cpf-cnpj-validator';
import { cpfMask, moneyMask } from '../utils/mask'
import ModalConfirm from './ModalConfirm';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/Employee';

class RegisterEmployee extends React.PureComponent<any> {
  constructor(context: any, props: any) {
    super(context, props)
    this.state = {
      Name: "",
      Surname: "",
      Address: "",
      Cpf: "",
      BaseSalary: "",
      BonusSalary: "",
      BenefitsSalary: "",
      TaxesDiscount: "",
      SecureDiscount: "",
      OtherDiscount: "",
      Responsability: "",
      Departament: "",
      IsOpen: false,
      IsLoading: false,
      Blocked: false,
      Departaments: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    const { departament } = this.props;
    const { IsLoading } = nextState;
    const { postEmployeeIsLoading } = nextProps;

    if (nextProps.departament !== departament && nextProps.departament && nextProps.departament.length) {
      this.setState({ Departaments: nextProps.departament });
    }

    if (postEmployeeIsLoading === false && IsLoading) {
      this.setState({ IsLoading: false });
      window.open("/funcionarios", "_self");
    }

    return true
  }


  public componentDidMount() {
    this.ensureDataFetched();
  }

  private ensureDataFetched() {
    this.props.requestDepartament();
  }

  handleSubmit(event: any) {
    event.preventDefault();

    const request = this.state as any;

    request.BaseSalary = request.BaseSalary.replace("R$ ", "").replaceAll(".", "").replaceAll(",", ".");
    request.BonusSalary = request.BonusSalary.replace("R$ ", "").replaceAll(".", "").replaceAll(",", ".");
    request.BenefitsSalary = request.BenefitsSalary.replace("R$ ", "").replaceAll(".", "").replaceAll(",", ".");
    request.TaxesDiscount = request.TaxesDiscount.replace("R$ ", "").replaceAll(".", "").replaceAll(",", ".");
    request.SecureDiscount = request.SecureDiscount.replace("R$ ", "").replaceAll(".", "").replaceAll(",", ".");
    request.OtherDiscount = request.OtherDiscount.replace("R$ ", "").replaceAll(".", "").replaceAll(",", ".");
    request.Departament = parseInt(request.Departament, 10);

    this.props.postEmployee(request);
    this.setState({ IsLoading: true, Blocked: true });
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
      Responsability,
      Departament,
      IsOpen,
      BaseSalary,
      BonusSalary,
      BenefitsSalary,
      TaxesDiscount,
      SecureDiscount,
      OtherDiscount,
      Departaments,
      Blocked,
    } = state;

    return (
      <div className="app">
        <ModalConfirm isOpen={IsOpen} disabled={Blocked} toggle={this.handleModal} handleSubmit={this.handleSubmit} />
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
                        <Input disabled={Blocked} value={Name} required={true} onChange={(e) => this.setState({ Name: e.target.value })} placeholder="Nome" id="Name" />
                        <Label for="Name">Nome</Label>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input disabled={Blocked} value={Surname} required={true} onChange={(e) => this.setState({ Surname: e.target.value })} placeholder="Sobrenome" id="Surname" />
                        <Label for="Surname">Sobrenome</Label>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input disabled={Blocked} value={Address} required={true} onChange={(e) => this.setState({ Address: e.target.value })} placeholder="Endereço" id="Address" />
                        <Label for="Address">Endereço</Label>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input disabled={Blocked} invalid={!cpf.isValid(Cpf) && Cpf.length === 14} required={true} value={Cpf} onChange={(e) => this.setState({ Cpf: cpfMask(e.target.value) })} placeholder="CPF" id="Cpf" />
                        <Label for="Cpf">CPF</Label>
                        <FormFeedback>
                          Cpf inválido
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col xl={2}>
                      <FormGroup floating>
                        <Input disabled={Blocked} value={Departament} required={true} onChange={(e) => this.setState({ Departament: e.target.value })} placeholder="Departamento" id="Departament" type='select'>
                          <option value="" defaultValue="" disabled hidden>Selecione...</option>
                          {Departaments && Departaments.length && Departaments.map((dp: any) => (
                            <option value={dp.id} key={`Departament-${dp.id}`}>{dp.name}</option>
                          ))}
                        </Input>
                        <Label for="Departament">Departamento</Label>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input disabled={Blocked} value={Responsability} required={true} onChange={(e) => this.setState({ Responsability: e.target.value })} placeholder="Cargo" id="Responsability" type='select' >
                          <option value="" defaultValue="" disabled hidden>Selecione...</option>
                          <option value="Desenvolvedor">Desenvolvedor</option>
                          <option value="PO">PO</option>
                          <option value="Arquiteto">Arquiteto</option>
                          <option value="DBA">DBA</option>
                          <option value="Analista">Analista</option>
                          <option value="Gerente administrativo">Gerente administrativo</option>
                          <option value="Analista de testes - QA">Analista de testes - QA</option>
                        </Input>
                        <Label for="Responsability">Cargo</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input disabled={Blocked} value={BaseSalary.length > 0 ? moneyMask(BaseSalary) : ''} required={true} onChange={(e) => this.setState({ BaseSalary: e.target.value })} placeholder="Salário Base" id="BaseSalary" />
                        <Label for="BaseSalary">Salário Base</Label>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input disabled={Blocked} value={BonusSalary.length > 0 ? moneyMask(BonusSalary) : ''} required={true} onChange={(e) => this.setState({ BonusSalary: e.target.value })} placeholder="Bônus" id="BonusSalary" />
                        <Label for="BonusSalary">Bônus</Label>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input disabled={Blocked} value={BenefitsSalary.length > 0 ? moneyMask(BenefitsSalary) : ''} required={true} onChange={(e) => this.setState({ BenefitsSalary: e.target.value })} placeholder="Benefícios" id="BenefitsSalary" />
                        <Label for="BenefitsSalary">Benefícios</Label>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input disabled={Blocked} value={TaxesDiscount.length > 0 ? moneyMask(TaxesDiscount) : ''} required={true} onChange={(e) => this.setState({ TaxesDiscount: e.target.value })} placeholder="Impostos" id="TaxesDiscount" />
                        <Label for="TaxesDiscount">Impostos</Label>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input disabled={Blocked} value={SecureDiscount.length > 0 ? moneyMask(SecureDiscount) : ''} required={true} onChange={(e) => this.setState({ SecureDiscount: e.target.value })} placeholder="Seguros" id="SecureDiscount" />
                        <Label for="SecureDiscount">Seguros</Label>
                      </FormGroup>
                    </Col>
                    <Col xl={2} xs={12}>
                      <FormGroup floating>
                        <Input disabled={Blocked} value={OtherDiscount.length > 0 ? moneyMask(OtherDiscount) : ''} required={true} onChange={(e) => this.setState({ OtherDiscount: e.target.value })} placeholder="Outros descontos" id="OtherDiscount" />
                        <Label for="OtherDiscount">Outros descontos</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className='mt-5'>
                    <Col>
                      <Button type="submit" color='success' className='me-3' disabled={!cpf.isValid(Cpf) || Cpf.length < 14 || Blocked}>
                        Adicionar
                      </Button>
                      <Button disabled={Blocked} type='button' color='danger' onClick={() => window.open("/funcionarios", "_self")}>
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

export default connect(
  (state: ApplicationState) => state.weatherForecasts,
  WeatherForecastsStore.actionCreators
)(RegisterEmployee);