import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  FlexItem,
  PageSection,
  Content,
  ContentVariants,
  Divider,
} from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';
import { APIKey } from '../types';
import { DeleteAPIKeyModal } from './DeleteAPIKeyModal';

interface APIKeySettingsTabProps {
  apiKey: APIKey;
}

const APIKeySettingsTab: React.FunctionComponent<APIKeySettingsTabProps> = ({ apiKey }) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Navigate back to API keys list after deletion
    navigate('/gen-ai-studio/api-keys');
  };

  return (
    <>
      <PageSection>
        <Divider style={{ marginTop: '1rem', marginBottom: '2rem' }} />
        
        <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }} style={{ marginBottom: '1rem' }}>
          <FlexItem>
            <ExclamationTriangleIcon style={{ color: 'var(--pf-t--global--icon--color--status--danger--default)' }} />
          </FlexItem>
          <FlexItem>
            <Content component={ContentVariants.h2} id="danger-zone-heading">
              Danger zone
            </Content>
          </FlexItem>
        </Flex>
        
        <div style={{ fontSize: '0.875rem', color: 'var(--pf-t--global--text--color--subtle)', marginBottom: '1rem' }}>
          Permanently delete this API key. This action cannot be undone and will immediately revoke access for any applications using this key.
        </div>
        
        <Button 
          id="delete-api-key-button"
          variant="danger"
          onClick={handleDeleteClick}
        >
          Delete API key
        </Button>
      </PageSection>

      <DeleteAPIKeyModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        apiKey={apiKey}
        onDelete={handleDeleteConfirm}
      />
    </>
  );
};

export { APIKeySettingsTab };
