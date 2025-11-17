import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageSection,
  Content,
  ContentVariants,
  Breadcrumb,
  BreadcrumbItem,
  PageBreadcrumb,
  ToggleGroup,
  ToggleGroupItem,
} from '@patternfly/react-core';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { TierForm } from './components/TierForm';
import { TierYAMLEditor } from './components/TierYAMLEditor';
import { CreateTierForm } from './types';

type ViewMode = 'form' | 'yaml';

const CreateTier: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = React.useState<ViewMode>('form');
  const [formData, setFormData] = React.useState<CreateTierForm>({
    name: '',
    description: '',
    level: 1,
    groups: [],
    models: [],
    limits: {
      apiKeyExpirationDays: 4 / 24, // Default expiration time: 4 hours (stored as fractional days)
    },
  });

  useDocumentTitle('Create Tier');

  const breadcrumb = (
    <PageBreadcrumb>
      <Breadcrumb>
        <BreadcrumbItem to="/settings/tiers">Tiers</BreadcrumbItem>
        <BreadcrumbItem isActive>Create tier</BreadcrumbItem>
      </Breadcrumb>
    </PageBreadcrumb>
  );

  const handleFormDataChange = (data: CreateTierForm) => {
    setFormData(data);
  };

  const handleSubmit = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate new tier ID
    const tierId = formData.name.toLowerCase().replace(/\s+/g, '-');
    
    // Navigate to the new tier details page
    navigate(`/settings/tiers/${tierId}`);
  };

  const handleCancel = () => {
    navigate('/settings/tiers');
  };

  return (
    <>
      {breadcrumb}
      <PageSection>
        <Content component={ContentVariants.h1}>Create tier</Content>
        <Content component={ContentVariants.p} style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
          Create a new tier to control which models users can access based on their group membership.
        </Content>

        <div style={{ marginBottom: '1rem' }}>
          <ToggleGroup aria-label="View mode">
            <ToggleGroupItem
              text="Form"
              buttonId="view-mode-form"
              isSelected={viewMode === 'form'}
              onChange={() => setViewMode('form')}
            />
            <ToggleGroupItem
              text="YAML"
              buttonId="view-mode-yaml"
              isSelected={viewMode === 'yaml'}
              onChange={() => setViewMode('yaml')}
            />
          </ToggleGroup>
        </div>

        {viewMode === 'form' ? (
          <TierForm
            formData={formData}
            onChange={handleFormDataChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <TierYAMLEditor
            formData={formData}
            onChange={handleFormDataChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </PageSection>
    </>
  );
};

export { CreateTier };

