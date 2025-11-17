import * as React from 'react';
import {
  Button,
  ActionGroup,
  Alert,
} from '@patternfly/react-core';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import { CreateTierForm } from '../types';

interface TierYAMLEditorProps {
  formData: CreateTierForm;
  onChange: (data: CreateTierForm) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const TierYAMLEditor: React.FunctionComponent<TierYAMLEditorProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
}) => {
  const [yamlContent, setYamlContent] = React.useState('');
  const [parseError, setParseError] = React.useState<string | null>(null);

  // Convert form data to YAML
  const formDataToYAML = (data: CreateTierForm): string => {
    const yaml = `apiVersion: maas.openshift.io/v1alpha1
kind: Tier
metadata:
  name: ${data.name || 'new-tier'}
spec:
  level: ${data.level}
  ${data.description ? `description: "${data.description}"` : '# description: ""'}
  groups:${data.groups.length > 0 ? data.groups.map(g => `\n    - ${g}`).join('') : '\n    []'}
  models:${data.models.length > 0 ? data.models.map(m => `\n    - ${m}`).join('') : '\n    []'}
  limits:${data.limits.tokenLimit || data.limits.rateLimit || data.limits.apiKeyExpirationDays !== undefined ? '' : ' {}'}${data.limits.tokenLimit ? `
    tokenLimit:
      amount: ${data.limits.tokenLimit.amount}
      period: ${data.limits.tokenLimit.period}` : ''}${data.limits.rateLimit ? `
    rateLimit:
      amount: ${data.limits.rateLimit.amount}
      period: ${data.limits.rateLimit.period}` : ''}${data.limits.apiKeyExpirationDays !== undefined ? `
    apiKeyExpirationDays: ${data.limits.apiKeyExpirationDays}` : ''}
`;
    return yaml;
  };

  // Parse YAML to form data (simplified version)
  const yamlToFormData = (yaml: string): CreateTierForm | null => {
    try {
      // This is a simplified parser - in production, use a proper YAML library
      const lines = yaml.split('\n');
      const data: CreateTierForm = {
        name: '',
        description: '',
        level: 100,
        groups: [],
        models: [],
        limits: {},
      };

      let currentSection: string | null = null;
      let currentLimit: 'tokenLimit' | 'rateLimit' | null = null;

      for (const line of lines) {
        const trimmed = line.trim();
        
        if (trimmed.startsWith('name:')) {
          data.name = trimmed.split('name:')[1].trim();
        } else if (trimmed.startsWith('description:')) {
          data.description = trimmed.split('description:')[1].trim().replace(/"/g, '');
        } else if (trimmed.startsWith('level:')) {
          data.level = parseInt(trimmed.split('level:')[1].trim(), 10);
        } else if (trimmed === 'groups:') {
          currentSection = 'groups';
        } else if (trimmed === 'models:') {
          currentSection = 'models';
        } else if (trimmed === 'limits:') {
          currentSection = 'limits';
        } else if (trimmed === 'tokenLimit:') {
          currentLimit = 'tokenLimit';
          data.limits.tokenLimit = { amount: 0, period: 'hour' };
        } else if (trimmed === 'rateLimit:') {
          currentLimit = 'rateLimit';
          data.limits.rateLimit = { amount: 0, period: 'minute' };
        } else if (trimmed.startsWith('- ') && currentSection === 'groups') {
          data.groups.push(trimmed.substring(2));
        } else if (trimmed.startsWith('- ') && currentSection === 'models') {
          data.models.push(trimmed.substring(2));
        } else if (trimmed.startsWith('amount:') && currentLimit) {
          const amount = parseInt(trimmed.split('amount:')[1].trim(), 10);
          if (data.limits[currentLimit]) {
            data.limits[currentLimit]!.amount = amount;
          }
        } else if (trimmed.startsWith('period:') && currentLimit) {
          const period = trimmed.split('period:')[1].trim() as 'minute' | 'hour' | 'day';
          if (data.limits[currentLimit]) {
            data.limits[currentLimit]!.period = period;
          }
        } else if (trimmed.startsWith('apiKeyExpirationDays:')) {
          data.limits.apiKeyExpirationDays = parseInt(trimmed.split('apiKeyExpirationDays:')[1].trim(), 10);
        }
      }

      return data;
    } catch (error) {
      return null;
    }
  };

  // Initialize YAML content from form data
  React.useEffect(() => {
    setYamlContent(formDataToYAML(formData));
  }, []);

  const handleYAMLChange = (value: string) => {
    setYamlContent(value);
    setParseError(null);

    // Try to parse and update form data
    const parsed = yamlToFormData(value);
    if (parsed) {
      onChange(parsed);
    } else {
      setParseError('Invalid YAML format. Please check your syntax.');
    }
  };

  const handleSubmit = () => {
    // Validate YAML before submitting
    const parsed = yamlToFormData(yamlContent);
    if (parsed) {
      onChange(parsed);
      onSubmit();
    } else {
      setParseError('Cannot create tier: Invalid YAML format.');
    }
  };

  const isFormValid = () => {
    const parsed = yamlToFormData(yamlContent);
    return (
      parsed &&
      parsed.name.trim() !== '' &&
      parsed.level > 0 &&
      parsed.groups.length > 0 &&
      parsed.models.length > 0
    );
  };

  return (
    <div>
      {parseError && (
        <Alert
          variant="danger"
          isInline
          title="YAML parsing error"
          style={{ marginBottom: '1rem' }}
        >
          {parseError}
        </Alert>
      )}
      
      <CodeEditor
        isDarkTheme={false}
        isLineNumbersVisible
        isReadOnly={false}
        isMinimapVisible={false}
        isLanguageLabelVisible
        code={yamlContent}
        onChange={handleYAMLChange}
        language={Language.yaml}
        height="500px"
        id="tier-yaml-editor"
      />

      <ActionGroup style={{ marginTop: '1rem' }}>
        <Button
          variant="primary"
          onClick={handleSubmit}
          isDisabled={!isFormValid()}
          id="create-tier-yaml-submit"
        >
          Create tier
        </Button>
        <Button variant="link" onClick={onCancel} id="create-tier-yaml-cancel">
          Cancel
        </Button>
      </ActionGroup>
    </div>
  );
};

export { TierYAMLEditor };

