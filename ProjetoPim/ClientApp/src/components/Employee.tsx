import * as React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';


const Employee = () => (
  <div className="app">
    <Row>
      <Col>
        <Card>
          <CardHeader className="p-0">
            <Breadcrumb listClassName="m-0" listTag="div" className="m-0">
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
                Folha de pagamento
              </BreadcrumbItem>
            </Breadcrumb>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className='d-flex justify-content-end'>
                <Button type='button'>Incluir funcionário</Button>
                <Button type='button' color="primary" className='ml-3'>Gerar folha de pagamento</Button>
              </Col>
            </Row>
            <Table className='mt-5' bordered striped>
              <thead>
                <tr>
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
                  <th>
                    Departamento
                  </th>
                  <th>
                    Salário
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Eu</td>
                  <td>Talvez</td>
                  <td>645.123.894-52</td>
                  <td>Sei lá</td>
                  <td>Sei lá</td>
                  <td>R$ 1.000,00</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
);

export default connect()(Employee);
