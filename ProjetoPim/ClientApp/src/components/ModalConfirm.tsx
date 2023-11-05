import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class ModalConfirm extends React.PureComponent<any> {
  constructor(context: any, props: any) {
    super(context, props)
  }

  public render() {
    const props: any = this.props;
    const { isOpen, toggle, handleSubmit } = props;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Tem certeza que deseja incluir funcionário?</ModalHeader>
        <ModalBody>
          <p className='m-0'>
            Tem certeza que deseja realizar esta ação?
          </p>
          <p className='m-0'>
            Esta alteração não poderá ser desfeita!
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleSubmit}>
            Sim, confirmar
          </Button>{' '}
          <Button color="danger" onClick={toggle}>
            Não, cancelar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect()(ModalConfirm); 