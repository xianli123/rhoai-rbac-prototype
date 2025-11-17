import * as React from 'react';
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  Button,
  NumberInput,
  FormHelperText,
  HelperText,
  HelperTextItem,
  ActionGroup,
  Checkbox,
  Select,
  SelectOption,
  SelectList,
  MenuToggle,
  MenuToggleElement,
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import { CreateTierForm } from '../types';
import { mockGroups, mockMaaSModels } from '../mockData';

interface TierFormProps {
  formData: CreateTierForm;
  onChange: (data: CreateTierForm) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const TierForm: React.FunctionComponent<TierFormProps> = ({ formData, onChange, onSubmit, onCancel }) => {
  const [isGroupsOpen, setIsGroupsOpen] = React.useState(false);
  const [isModelsOpen, setIsModelsOpen] = React.useState(false);
  const [isPeriodSelectOpen, setIsPeriodSelectOpen] = React.useState<{ [key: string]: boolean }>({});

  const [tokenLimitEnabled, setTokenLimitEnabled] = React.useState(!!formData.limits.tokenLimit);
  const [rateLimitEnabled, setRateLimitEnabled] = React.useState(!!formData.limits.rateLimit);
  const [apiKeyExpirationEnabled, setApiKeyExpirationEnabled] = React.useState(
    formData.limits.apiKeyExpirationDays !== undefined
  );

  const handleInputChange = (field: keyof CreateTierForm, value: any) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  const handleLimitChange = (
    limitType: 'tokenLimit' | 'rateLimit',
    field: 'amount' | 'period',
    value: any
  ) => {
    onChange({
      ...formData,
      limits: {
        ...formData.limits,
        [limitType]: {
          ...(formData.limits[limitType] || { amount: 0, period: 'hour' }),
          [field]: value,
        },
      },
    });
  };

  const handleApiKeyExpirationChange = (value: number) => {
    onChange({
      ...formData,
      limits: {
        ...formData.limits,
        apiKeyExpirationDays: value,
      },
    });
  };

  const handleTokenLimitToggle = (checked: boolean) => {
    setTokenLimitEnabled(checked);
    if (!checked) {
      const { tokenLimit, ...otherLimits } = formData.limits;
      onChange({
        ...formData,
        limits: otherLimits,
      });
    } else {
      onChange({
        ...formData,
        limits: {
          ...formData.limits,
          tokenLimit: { amount: 10000, period: 'hour' },
        },
      });
    }
  };

  const handleRateLimitToggle = (checked: boolean) => {
    setRateLimitEnabled(checked);
    if (!checked) {
      const { rateLimit, ...otherLimits } = formData.limits;
      onChange({
        ...formData,
        limits: otherLimits,
      });
    } else {
      onChange({
        ...formData,
        limits: {
          ...formData.limits,
          rateLimit: { amount: 100, period: 'minute' },
        },
      });
    }
  };

  const handleApiKeyExpirationToggle = (checked: boolean) => {
    setApiKeyExpirationEnabled(checked);
    if (!checked) {
      const { apiKeyExpirationDays, ...otherLimits } = formData.limits;
      onChange({
        ...formData,
        limits: otherLimits,
      });
    } else {
      onChange({
        ...formData,
        limits: {
          ...formData.limits,
          apiKeyExpirationDays: 90,
        },
      });
    }
  };

  const handleGroupSelect = (_event: React.MouseEvent | undefined, selection: string | number | undefined) => {
    if (!selection) return;
    const groupId = selection as string;
    const newGroups = formData.groups.includes(groupId)
      ? formData.groups.filter(g => g !== groupId)
      : [...formData.groups, groupId];
    handleInputChange('groups', newGroups);
  };

  const handleModelSelect = (_event: React.MouseEvent | undefined, selection: string | number | undefined) => {
    if (!selection) return;
    const modelId = selection as string;
    const newModels = formData.models.includes(modelId)
      ? formData.models.filter(m => m !== modelId)
      : [...formData.models, modelId];
    handleInputChange('models', newModels);
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.level > 0 &&
      formData.groups.length > 0 &&
      formData.models.length > 0
    );
  };

  const getSelectedGroupsText = () => {
    if (formData.groups.length === 0) return 'Select groups';
    if (formData.groups.length === 1) {
      const group = mockGroups.find(g => g.id === formData.groups[0]);
      return group?.name || formData.groups[0];
    }
    return `${formData.groups.length} groups selected`;
  };

  const getSelectedModelsText = () => {
    if (formData.models.length === 0) return 'Select models';
    if (formData.models.length === 1) {
      const model = mockMaaSModels.find(m => m.id === formData.models[0]);
      return model?.name || formData.models[0];
    }
    return `${formData.models.length} models selected`;
  };

  return (
    <Form id="create-tier-form">
      <FormGroup label="Name" isRequired fieldId="tier-name">
        <TextInput
          isRequired
          type="text"
          id="tier-name"
          name="tier-name"
          value={formData.name}
          onChange={(_event, value) => handleInputChange('name', value)}
        />
        <FormHelperText>
          <HelperText>
            <HelperTextItem>A descriptive name for this tier (e.g., "Premium Tier")</HelperTextItem>
          </HelperText>
        </FormHelperText>
      </FormGroup>

      <FormGroup label="Description" fieldId="tier-description">
        <TextArea
          id="tier-description"
          name="tier-description"
          value={formData.description}
          onChange={(_event, value) => handleInputChange('description', value)}
          rows={3}
        />
        <FormHelperText>
          <HelperText>
            <HelperTextItem>Optional description of this tier's purpose and target users</HelperTextItem>
          </HelperText>
        </FormHelperText>
      </FormGroup>

      <FormGroup label="Level" isRequired fieldId="tier-level">
        <NumberInput
          value={formData.level}
          min={1}
          max={9999}
          onMinus={() => handleInputChange('level', Math.max(1, formData.level - 100))}
          onChange={(event) => {
            const value = Number((event.target as HTMLInputElement).value);
            if (!isNaN(value) && value >= 1) {
              handleInputChange('level', value);
            }
          }}
          onPlus={() => handleInputChange('level', formData.level + 100)}
          inputName="tier-level"
          inputAriaLabel="Tier level"
          minusBtnAriaLabel="Decrease level"
          plusBtnAriaLabel="Increase level"
          id="tier-level"
          widthChars={6}
        />
        <FormHelperText>
          <HelperText>
            <HelperTextItem>
              Higher numbers indicate higher priority. Users in multiple tiers will use the highest level.
              <br />
              Example values: 100 (Standard), 200 (Premium), 300 (Enterprise)
            </HelperTextItem>
          </HelperText>
        </FormHelperText>
      </FormGroup>

      <FormGroup label="Groups" isRequired fieldId="tier-groups">
        <Select
          id="tier-groups"
          isOpen={isGroupsOpen}
          selected={formData.groups}
          onSelect={handleGroupSelect}
          onOpenChange={(isOpen) => setIsGroupsOpen(isOpen)}
          toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
            <MenuToggle
              ref={toggleRef}
              onClick={() => setIsGroupsOpen(!isGroupsOpen)}
              isExpanded={isGroupsOpen}
              id="tier-groups-toggle"
            >
              {getSelectedGroupsText()}
            </MenuToggle>
          )}
        >
          <SelectList>
            {mockGroups.map((group) => (
              <SelectOption
                key={group.id}
                value={group.id}
                hasCheckbox
                isSelected={formData.groups.includes(group.id)}
              >
                {group.name}
              </SelectOption>
            ))}
          </SelectList>
        </Select>
        <FormHelperText>
          <HelperText>
            <HelperTextItem>This tier will apply to all users in these groups</HelperTextItem>
          </HelperText>
        </FormHelperText>
      </FormGroup>

      <FormGroup label="Models" isRequired fieldId="tier-models">
        <Select
          id="tier-models"
          isOpen={isModelsOpen}
          selected={formData.models}
          onSelect={handleModelSelect}
          onOpenChange={(isOpen) => setIsModelsOpen(isOpen)}
          toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
            <MenuToggle
              ref={toggleRef}
              onClick={() => setIsModelsOpen(!isModelsOpen)}
              isExpanded={isModelsOpen}
              id="tier-models-toggle"
            >
              {getSelectedModelsText()}
            </MenuToggle>
          )}
        >
          <SelectList>
            {mockMaaSModels.length === 0 ? (
              <SelectOption isDisabled>No AI Asset models available</SelectOption>
            ) : (
              mockMaaSModels.map((model) => (
                <SelectOption
                  key={model.id}
                  value={model.id}
                  hasCheckbox
                  isSelected={formData.models.includes(model.id)}
                >
                  {model.name}
                </SelectOption>
              ))
            )}
          </SelectList>
        </Select>
        <FormHelperText>
          <HelperText>
            <HelperTextItem>
              Only models published as AI Assets can be assigned to tiers
              {mockMaaSModels.length === 0 && (
                <span style={{ color: 'var(--pf-t--global--color--status--warning--default)' }}>
                  <br />
                  No AI Asset models available. Publish a model deployment as an AI Asset first.
                </span>
              )}
            </HelperTextItem>
          </HelperText>
        </FormHelperText>
      </FormGroup>

      <FormGroup label="Token limit" fieldId="tier-token-limit">
        <Checkbox
          id="enable-token-limit"
          label="Enable token limit"
          isChecked={tokenLimitEnabled}
          onChange={(_event, checked) => handleTokenLimitToggle(checked)}
        />
        {tokenLimitEnabled && (
          <Flex style={{ marginTop: '0.5rem' }}>
            <FlexItem>
              <NumberInput
                value={formData.limits.tokenLimit?.amount || 0}
                min={1}
                onMinus={() =>
                  handleLimitChange('tokenLimit', 'amount', Math.max(1, (formData.limits.tokenLimit?.amount || 0) - 1000))
                }
                onChange={(event) => {
                  const value = Number((event.target as HTMLInputElement).value);
                  if (!isNaN(value) && value >= 1) {
                    handleLimitChange('tokenLimit', 'amount', value);
                  }
                }}
                onPlus={() =>
                  handleLimitChange('tokenLimit', 'amount', (formData.limits.tokenLimit?.amount || 0) + 1000)
                }
                inputName="token-limit-amount"
                inputAriaLabel="Token limit amount"
                minusBtnAriaLabel="Decrease tokens"
                plusBtnAriaLabel="Increase tokens"
                id="token-limit-amount"
                widthChars={8}
              />
            </FlexItem>
            <FlexItem style={{ paddingTop: '0.5rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
              per
            </FlexItem>
            <FlexItem>
              <Select
                id="token-limit-period"
                isOpen={isPeriodSelectOpen['token'] || false}
                selected={formData.limits.tokenLimit?.period || 'hour'}
                onSelect={(_event, selection) => {
                  handleLimitChange('tokenLimit', 'period', selection as string);
                  setIsPeriodSelectOpen({ ...isPeriodSelectOpen, token: false });
                }}
                onOpenChange={(isOpen) => setIsPeriodSelectOpen({ ...isPeriodSelectOpen, token: isOpen })}
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={() => setIsPeriodSelectOpen({ ...isPeriodSelectOpen, token: !isPeriodSelectOpen['token'] })}
                    isExpanded={isPeriodSelectOpen['token'] || false}
                    id="token-period-toggle"
                  >
                    {formData.limits.tokenLimit?.period || 'hour'}
                  </MenuToggle>
                )}
              >
                <SelectList>
                  <SelectOption value="minute">minute</SelectOption>
                  <SelectOption value="hour">hour</SelectOption>
                  <SelectOption value="day">day</SelectOption>
                </SelectList>
              </Select>
            </FlexItem>
          </Flex>
        )}
        <FormHelperText>
          <HelperText>
            <HelperTextItem>Example: 50,000 tokens per hour for standard tier</HelperTextItem>
          </HelperText>
        </FormHelperText>
      </FormGroup>

      <FormGroup label="Rate limit" fieldId="tier-rate-limit">
        <Checkbox
          id="enable-rate-limit"
          label="Enable rate limit"
          isChecked={rateLimitEnabled}
          onChange={(_event, checked) => handleRateLimitToggle(checked)}
        />
        {rateLimitEnabled && (
          <Flex style={{ marginTop: '0.5rem' }}>
            <FlexItem>
              <NumberInput
                value={formData.limits.rateLimit?.amount || 0}
                min={1}
                onMinus={() =>
                  handleLimitChange('rateLimit', 'amount', Math.max(1, (formData.limits.rateLimit?.amount || 0) - 100))
                }
                onChange={(event) => {
                  const value = Number((event.target as HTMLInputElement).value);
                  if (!isNaN(value) && value >= 1) {
                    handleLimitChange('rateLimit', 'amount', value);
                  }
                }}
                onPlus={() =>
                  handleLimitChange('rateLimit', 'amount', (formData.limits.rateLimit?.amount || 0) + 100)
                }
                inputName="rate-limit-amount"
                inputAriaLabel="Rate limit amount"
                minusBtnAriaLabel="Decrease requests"
                plusBtnAriaLabel="Increase requests"
                id="rate-limit-amount"
                widthChars={8}
              />
            </FlexItem>
            <FlexItem style={{ paddingTop: '0.5rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
              requests per
            </FlexItem>
            <FlexItem>
              <Select
                id="rate-limit-period"
                isOpen={isPeriodSelectOpen['rate'] || false}
                selected={formData.limits.rateLimit?.period || 'minute'}
                onSelect={(_event, selection) => {
                  handleLimitChange('rateLimit', 'period', selection as string);
                  setIsPeriodSelectOpen({ ...isPeriodSelectOpen, rate: false });
                }}
                onOpenChange={(isOpen) => setIsPeriodSelectOpen({ ...isPeriodSelectOpen, rate: isOpen })}
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={() => setIsPeriodSelectOpen({ ...isPeriodSelectOpen, rate: !isPeriodSelectOpen['rate'] })}
                    isExpanded={isPeriodSelectOpen['rate'] || false}
                    id="rate-period-toggle"
                  >
                    {formData.limits.rateLimit?.period || 'minute'}
                  </MenuToggle>
                )}
              >
                <SelectList>
                  <SelectOption value="minute">minute</SelectOption>
                  <SelectOption value="hour">hour</SelectOption>
                  <SelectOption value="day">day</SelectOption>
                </SelectList>
              </Select>
            </FlexItem>
          </Flex>
        )}
        <FormHelperText>
          <HelperText>
            <HelperTextItem>Example: 1,000 requests per minute for standard tier</HelperTextItem>
          </HelperText>
        </FormHelperText>
      </FormGroup>

      <FormGroup label="API key expiration" fieldId="tier-api-key-expiration">
        <Checkbox
          id="enable-api-key-expiration"
          label="Enable API key expiration"
          isChecked={apiKeyExpirationEnabled}
          onChange={(_event, checked) => handleApiKeyExpirationToggle(checked)}
        />
        {apiKeyExpirationEnabled && (
          <Flex style={{ marginTop: '0.5rem' }}>
            <FlexItem>
              <NumberInput
                value={formData.limits.apiKeyExpirationDays || 0}
                min={0}
                onMinus={() =>
                  handleApiKeyExpirationChange(Math.max(0, (formData.limits.apiKeyExpirationDays || 0) - 30))
                }
                onChange={(event) => {
                  const value = Number((event.target as HTMLInputElement).value);
                  if (!isNaN(value) && value >= 0) {
                    handleApiKeyExpirationChange(value);
                  }
                }}
                onPlus={() =>
                  handleApiKeyExpirationChange((formData.limits.apiKeyExpirationDays || 0) + 30)
                }
                inputName="api-key-expiration-days"
                inputAriaLabel="API key expiration days"
                minusBtnAriaLabel="Decrease days"
                plusBtnAriaLabel="Increase days"
                id="api-key-expiration-days"
                widthChars={6}
              />
            </FlexItem>
            <FlexItem style={{ paddingTop: '0.5rem', paddingLeft: '0.5rem' }}>
              days {formData.limits.apiKeyExpirationDays === 0 && '(Never expires)'}
            </FlexItem>
          </Flex>
        )}
        <FormHelperText>
          <HelperText>
            <HelperTextItem>
              API keys created by users in this tier will expire after this period. Set to 0 for no expiration.
              <br />
              Default: 90 days
            </HelperTextItem>
          </HelperText>
        </FormHelperText>
      </FormGroup>

      <ActionGroup>
        <Button variant="primary" onClick={onSubmit} isDisabled={!isFormValid()} id="create-tier-submit">
          Create tier
        </Button>
        <Button variant="link" onClick={onCancel} id="create-tier-cancel">
          Cancel
        </Button>
      </ActionGroup>
    </Form>
  );
};

export { TierForm };

