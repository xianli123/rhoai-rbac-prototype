import * as React from 'react';
import {
  Modal,
  ModalVariant,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
  Form,
  FormGroup,
  TextInput,
} from '@patternfly/react-core';

interface DeleteAllAPIKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  keyCount: number;
}

const DeleteAllAPIKeysModal: React.FunctionComponent<DeleteAllAPIKeysModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  keyCount,
}) => {
  const [revokeConfirmation, setRevokeConfirmation] = React.useState('');
  const [isRevoking, setIsRevoking] = React.useState(false);

  const isRevokeEnabled = revokeConfirmation === 'revoke';

  React.useEffect(() => {
    if (!isOpen) {
      setRevokeConfirmation('');
      setIsRevoking(false);
    }
  }, [isOpen]);

  const handleRevokeConfirm = () => {
    if (!isRevokeEnabled) return;

    setIsRevoking(true);
    
    // Simulate revocation delay
    setTimeout(() => {
      onDelete();
      setIsRevoking(false);
      onClose();
    }, 1000);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && isRevokeEnabled) {
      handleRevokeConfirm();
    }
  };

  return (
    <Modal
      id="revoke-all-api-keys-modal"
      variant={ModalVariant.small}
      isOpen={isOpen}
      onClose={onClose}
      aria-labelledby="revoke-all-api-keys-modal-title"
      aria-describedby="revoke-all-api-keys-modal-description"
    >
      <ModalHeader
        title="Revoke all API keys?"
        labelId="revoke-all-api-keys-modal-title"
      />
      <ModalBody id="revoke-all-api-keys-modal-description">
        <Alert
          id="revoke-all-api-keys-alert"
          variant="danger"
          title="This action cannot be undone"
          isInline
          style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}
        >
          Revoking all API keys will immediately remove endpoint access to any applications currently using them.
          This will revoke {keyCount} {keyCount === 1 ? 'key' : 'keys'}.
        </Alert>
        
        <p style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
          To confirm revocation, type <strong>revoke</strong> below:
        </p>
        
        <Form>
          <FormGroup 
            label="Confirmation" 
            isRequired 
            fieldId="revoke-all-confirmation-input"
          >
            <TextInput
              id="revoke-all-confirmation-input"
              value={revokeConfirmation}
              onChange={(_event, value) => setRevokeConfirmation(value)}
              onKeyDown={handleKeyDown}
              placeholder="Type 'revoke' to confirm"
              isDisabled={isRevoking}
              aria-label="Type 'revoke' to confirm revocation of all API keys"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          id="confirm-revoke-all-button"
          variant="danger"
          onClick={handleRevokeConfirm}
          isDisabled={!isRevokeEnabled}
          isLoading={isRevoking}
        >
          {isRevoking ? 'Revoking...' : 'Revoke keys'}
        </Button>
        <Button
          id="cancel-revoke-all-button"
          variant="link"
          onClick={onClose}
          isDisabled={isRevoking}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export { DeleteAllAPIKeysModal };

