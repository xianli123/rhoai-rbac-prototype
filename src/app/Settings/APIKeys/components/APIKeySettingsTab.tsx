import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  PageSection,
  Content,
  ContentVariants,
  Alert,
} from '@patternfly/react-core';
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
        <Content component={ContentVariants.h2} id="settings-heading" style={{ marginTop: '1rem' }}>
          Settings
        </Content>
        <div style={{ fontSize: '0.875rem', color: 'var(--pf-t--global--text--color--subtle)', marginBottom: '1rem' }}>
          Manage settings for this API key.
        </div>
        
        <Alert
          id="danger-zone-alert"
          variant="danger"
          isInline
          title="Delete API key"
          actionLinks={
            <Button 
              id="delete-api-key-button"
              variant="danger"
              onClick={handleDeleteClick}
            >
              Delete API key
            </Button>
          }
        >
          Permanently delete this API key. This action cannot be undone and will immediately revoke access for any applications using this key.
        </Alert>
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
