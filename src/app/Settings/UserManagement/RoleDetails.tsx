import * as React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  PageSection,
  Title,
  Content,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  FlexItem,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
  MenuToggleElement,
  Tabs,
  Tab,
  TabTitleText,
  Card,
  CardBody,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Label,
} from '@patternfly/react-core';
import { OutlinedQuestionCircleIcon, EllipsisVIcon } from '@patternfly/react-icons';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';

// Mock data - should match Roles.tsx
interface Role {
  id: string;
  name: string;
  openshiftName?: string;
  description: string;
  category: string;
  roleType: 'openshift-default' | 'openshift-custom' | 'regular';
}

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    openshiftName: 'openshift-io:project:admin',
    description: 'User can edit the project and manage user access. User can view and manage any project resource.',
    category: 'Project Management',
    roleType: 'openshift-default',
  },
  {
    id: '2',
    name: 'Contributor',
    openshiftName: 'openshift-io:project:contributor',
    description: 'User can view and manage any project resource. Users with this role can manage all resources in the namespace, including workbenches, model deployments, and cluster storage, except for permissions controlling.',
    category: 'Project Management',
    roleType: 'openshift-default',
  },
  {
    id: '3',
    name: 'Deployment maintainer',
    openshiftName: 'openshift-io:deployment:maintainer',
    description: 'User can view and manage all model deployments.',
    category: 'Deployment Management',
    roleType: 'regular',
  },
  {
    id: '4',
    name: 'Deployment reader',
    openshiftName: 'openshift-io:deployment:reader',
    description: 'User can view and open model deployments without modifying their configuration.',
    category: 'Deployment Management',
    roleType: 'regular',
  },
  {
    id: '5',
    name: 'Deployment updater',
    openshiftName: 'openshift-io:deployment:updater',
    description: 'User can view model deployments and update existing deployments.',
    category: 'Deployment Management',
    roleType: 'regular',
  },
  {
    id: '6',
    name: 'Pipeline maintainer',
    openshiftName: 'openshift-io:pipeline:maintainer',
    description: 'User can view and manage all pipelines.',
    category: 'Pipeline Management',
    roleType: 'regular',
  },
  {
    id: '7',
    name: 'Pipeline reader',
    openshiftName: 'openshift-io:pipeline:reader',
    description: 'User can view and open pipelines without modifying their configuration.',
    category: 'Pipeline Management',
    roleType: 'regular',
  },
  {
    id: '8',
    name: 'Pipeline updater',
    openshiftName: 'openshift-io:pipeline:updater',
    description: 'User can view pipelines and modify their configuration, but cannot create or delete them.',
    category: 'Pipeline Management',
    roleType: 'regular',
  },
  {
    id: '9',
    name: 'Workbench maintainer',
    openshiftName: 'openshift-io:workbench:maintainer',
    description: 'User can view and manage all workbenches. Applies to all workbenches.',
    category: 'Workbench Management',
    roleType: 'regular',
  },
  {
    id: '10',
    name: 'Workbench reader',
    openshiftName: 'openshift-io:workbench:reader',
    description: 'User can view and open workbenches without modifying their configuration.',
    category: 'Workbench Management',
    roleType: 'regular',
  },
  {
    id: '11',
    name: 'Workbench updater',
    openshiftName: 'openshift-io:workbench:updater',
    description: 'User can view workbenches and modify their configuration, but cannot create or delete them.',
    category: 'Workbench Management',
    roleType: 'regular',
  },
];

const RoleDetails: React.FunctionComponent = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);

  useDocumentTitle('Role Details');

  const role = React.useMemo(() => {
    return mockRoles.find(r => r.id === roleId || r.name === roleId);
  }, [roleId]);

  if (!role) {
    return (
      <PageSection>
        <Title headingLevel="h1">Role not found</Title>
        <Content>
          <Button variant="link" onClick={() => navigate('/settings/user-management/roles')}>
            Back to Roles
          </Button>
        </Content>
      </PageSection>
    );
  }

  const roleDisplayName = role.openshiftName || role.name;
  const createdDate = '2024-01-15T10:30:00Z';
  const origin = role.roleType === 'openshift-default' || role.roleType === 'openshift-custom' 
    ? 'OpenShift' 
    : 'User created';

  return (
    <>
      <div className="pf-v6-c-page__main-breadcrumb">
        <div style={{ padding: 'var(--pf-v5-global--spacer--lg) var(--pf-v5-global--spacer--lg)' }}>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/settings/user-management/roles">Roles</Link>
            </BreadcrumbItem>
            <BreadcrumbItem isActive>{roleDisplayName}</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <PageSection>
        <Flex
          direction={{ default: 'row' }}
          alignItems={{ default: 'alignItemsCenter' }}
          justifyContent={{ default: 'justifyContentSpaceBetween' }}
        >
          <FlexItem>
            <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
              <FlexItem>
                <Title headingLevel="h1" size="2xl">
                  {roleDisplayName}
                </Title>
              </FlexItem>
              <FlexItem>
                <OutlinedQuestionCircleIcon style={{ color: 'var(--pf-v5-global--Color--200)' }} />
              </FlexItem>
            </Flex>
          </FlexItem>
          <FlexItem>
            <Dropdown
              isOpen={isActionsOpen}
              onSelect={() => setIsActionsOpen(false)}
              onOpenChange={(isOpen: boolean) => setIsActionsOpen(isOpen)}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  onClick={() => setIsActionsOpen(!isActionsOpen)}
                  isExpanded={isActionsOpen}
                  variant="secondary"
                >
                  Actions
                </MenuToggle>
              )}
            >
              <DropdownList>
                <DropdownItem key="edit" onClick={() => navigate(`/settings/user-management/roles/${roleId}/edit`)}>
                  Edit Role
                </DropdownItem>
                <DropdownItem key="duplicate">Duplicate role</DropdownItem>
                <DropdownItem key="delete">Delete</DropdownItem>
              </DropdownList>
            </Dropdown>
          </FlexItem>
        </Flex>
      </PageSection>

      <PageSection type="tabs" padding={{ default: 'noPadding' }}>
        <Tabs
          activeKey={activeTabKey}
          onSelect={(_event, tabIndex) => setActiveTabKey(tabIndex)}
          aria-label="Role details tabs"
          role="region"
        >
          <Tab eventKey={0} title={<TabTitleText>General</TabTitleText>} />
          <Tab eventKey={1} title={<TabTitleText>YAML</TabTitleText>} />
          <Tab eventKey={2} title={<TabTitleText>Permissions</TabTitleText>} />
          <Tab eventKey={3} title={<TabTitleText>Role assignments</TabTitleText>} />
        </Tabs>
      </PageSection>

      <PageSection isFilled>
          {activeTabKey === 0 && (
            <Card>
              <CardBody>
                <Title headingLevel="h2" size="lg" style={{ marginBottom: 'var(--pf-v5-global--spacer--md)' }}>
                  Information
                </Title>
                <DescriptionList isHorizontal>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Category</DescriptionListTerm>
                    <DescriptionListDescription>
                      <Label color="blue" variant="filled">
                        {role.category}
                      </Label>
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Origin</DescriptionListTerm>
                    <DescriptionListDescription>{origin}</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Created</DescriptionListTerm>
                    <DescriptionListDescription>{createdDate}</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Description</DescriptionListTerm>
                    <DescriptionListDescription>{role.description}</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Annotations</DescriptionListTerm>
                    <DescriptionListDescription>
                      <Content component="p">
                        <strong>description:</strong> {role.description}
                      </Content>
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
            </Card>
          )}

          {activeTabKey === 1 && (
            <Card>
              <CardBody>
                <Title headingLevel="h2" size="lg" style={{ marginBottom: 'var(--pf-v5-global--spacer--md)' }}>
                  YAML
                </Title>
                <Content>
                  YAML content will be displayed here.
                </Content>
              </CardBody>
            </Card>
          )}

          {activeTabKey === 2 && (
            <Card>
              <CardBody>
                <Title headingLevel="h2" size="lg" style={{ marginBottom: 'var(--pf-v5-global--spacer--md)' }}>
                  Permissions
                </Title>
                <Content>
                  Permissions content will be displayed here.
                </Content>
              </CardBody>
            </Card>
          )}

          {activeTabKey === 3 && (
            <Card>
              <CardBody>
                <Title headingLevel="h2" size="lg" style={{ marginBottom: 'var(--pf-v5-global--spacer--md)' }}>
                  Role assignments
                </Title>
                <Content>
                  Role assignments content will be displayed here.
                </Content>
              </CardBody>
            </Card>
          )}
      </PageSection>
    </>
  );
};

export { RoleDetails };
