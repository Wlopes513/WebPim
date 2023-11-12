import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class ModalPayment extends React.PureComponent<any> {
  constructor(context: any, props: any) {
    super(context, props)
    this.state = {
      Information: "",
    };
  }

  public render() {
    const props: any = this.props;
    const { isOpen, toggle, disabled, action, employee } = props;
    const { Information } = this.state as any;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <Form onSubmit={(e) => action(e, employee, Information)}>
          <ModalHeader toggle={toggle} disabled={disabled}>Dados gerais</ModalHeader>
          <ModalBody>
            <p>Adicione um comentário caso desejar!</p>
            <p>Caso contrário apenas clique em continuar.</p>
            <FormGroup floating>
              <Input disabled={disabled} value={Information} onChange={(e) => this.setState({ Information: e.target.value })} placeholder="Information" id="Information" />
              <Label for="Information">Informações adicionais</Label>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type='submit' disabled={disabled}>
              Confirmar
            </Button>{' '}
            <Button color="danger" type='button' onClick={toggle} disabled={disabled}>
              Cancelar
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default connect()(ModalPayment); 