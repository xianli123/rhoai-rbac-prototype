import * as React from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { updateUserRoles, updateGroupRoles, mockUsers, mockGroups } from './sharedPermissionsData';
import {
  PageSection,
  Title,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  Divider,
  Flex,
  FlexItem,
  Label,
  LabelGroup,
  Menu,
  MenuContainer,
  MenuContent,
  MenuItem,
  MenuList,
  MenuSearch,
  MenuSearchInput,
  Stack,
  StackItem,
  Alert,
  AlertVariant,
  SearchInput,
  FormGroup,
  Form,
  Content,
  Popover,
  Select,
  SelectList,
  SelectOption,
  MenuToggle,
  MenuToggleElement,
  Radio,
  Modal,
  ModalHeader,
  ModalBody,
  TextInput,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
  Tooltip,
  TreeView,
  TreeViewDataItem,
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ExpandableRowContent,
  ISortBy,
} from '@patternfly/react-table';
import {
  AngleDownIcon,
  AngleRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationCircleIcon,
  InfoCircleIcon,
  OutlinedQuestionCircleIcon,
  TimesIcon,
} from '@patternfly/react-icons';

interface Role {
  id: string;
  name: string;
  description: string;
  roleType: 'openshift-default' | 'openshift-custom' | 'regular';
  originallyAssigned: boolean;
  currentlyAssigned: boolean;
  rules?: RoleRule[];
}

interface RoleRule {
  actions: string[];
  apiGroups: string[];
  resources: string[];
  resourceNames?: string[];
}

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'custom-pipeline-super-user',
    description: 'Custom OpenShift role with pipeline super user permissions.',
    roleType: 'openshift-custom',
    originallyAssigned: true,
    currentlyAssigned: true,
    rules: [
      {
        actions: ['create', 'delete', 'get', 'list', 'patch', 'update', 'watch'],
        apiGroups: ['tekton.dev'],
        resources: ['Pipelines'],
        resourceNames: undefined,
      },
    ],
  },
  {
    id: '2',
    name: 'Deployment maintainer',
    description: 'User can view and manage all model deployments.',
    roleType: 'regular',
    originallyAssigned: true,
    currentlyAssigned: true,
    rules: [
      {
        actions: ['create', 'delete', 'deletecollection', 'get', 'list', 'patch', 'update', 'watch'],
        apiGroups: ['api.groups.name'],
        resources: ['ModelDeployments'],
        resourceNames: undefined,
      },
      {
        actions: ['get', 'list', 'patch'],
        apiGroups: ['api.groups.name.aa'],
        resources: ['Project'],
        resourceNames: ['project name'],
      },
    ],
  },
  {
    id: '3',
    name: 'Deployment reader',
    description: 'User can view and open model deployments without modifying their configuration.',
    roleType: 'regular',
    originallyAssigned: true,
    currentlyAssigned: true,
    rules: [
      {
        actions: ['get', 'list', 'watch'],
        apiGroups: ['api.groups.name'],
        resources: ['ModelDeployments'],
        resourceNames: undefined,
      },
    ],
  },
  {
    id: '4',
    name: 'Workbench maintainer',
    description: 'User can view and manage all workbenches. Applies to all workbenches.',
    roleType: 'regular',
    originallyAssigned: true,
    currentlyAssigned: true,
    rules: [
      { actions: ['create', 'delete', 'deletecollection', 'get', 'list', 'patch', 'update', 'watch'], apiGroups: ['api.workbench.group'], resources: ['Workbench'], resourceNames: undefined },
      { actions: ['get', 'watch', 'list'], apiGroups: [''], resources: ['namespaces'], resourceNames: undefined },
      { actions: ['*'], apiGroups: ['kubeflow.org'], resources: ['notebooks'], resourceNames: undefined },
      { actions: ['get', 'watch', 'list'], apiGroups: ['image.openshift.io'], resources: ['imagestreams'], resourceNames: undefined },
      { actions: ['*'], apiGroups: [''], resources: ['persistentvolumeclaims'], resourceNames: undefined },
      { actions: ['get', 'watch', 'list'], apiGroups: [''], resources: ['persistentvolumeclaims/status'], resourceNames: undefined },
      { actions: ['get', 'watch', 'list'], apiGroups: [''], resources: ['pods', 'statefulsets'], resourceNames: undefined },
      { actions: ['*'], apiGroups: [''], resources: ['secrets', 'configmaps'], resourceNames: undefined },
      { actions: ['get', 'watch', 'list'], apiGroups: ['infrastructure.opendatahub.io'], resources: ['hardwareprofiles'], resourceNames: undefined },
      { actions: ['get', 'watch', 'list'], apiGroups: [''], resources: ['events'], resourceNames: undefined },
    ],
  },
  {
    id: '5',
    name: 'Workbench reader',
    description: 'User can view and open workbenches without modifying their configuration.',
    roleType: 'regular',
    originallyAssigned: true,
    currentlyAssigned: false,
    rules: [
      {
        actions: ['get', 'list', 'watch'],
        apiGroups: ['api.groups.name'],
        resources: ['Workbenches'],
        resourceNames: undefined,
      },
    ],
  },
  {
    id: '6',
    name: 'Workbench updater',
    description: 'User can view workbenches and modify their configuration, but cannot create or delete them.',
    roleType: 'regular',
    originallyAssigned: false,
    currentlyAssigned: true,
    rules: [
      {
        actions: ['get', 'list', 'patch', 'update', 'watch'],
        apiGroups: ['api.groups.name'],
        resources: ['Workbenches'],
        resourceNames: undefined,
      },
      { actions: ['get', 'watch', 'list'], apiGroups: [''], resources: ['namespaces'], resourceNames: undefined },
      { actions: ['get', 'watch', 'list', 'update', 'patch'], apiGroups: ['kubeflow.org'], resources: ['notebooks'], resourceNames: undefined },
      { actions: ['get', 'watch', 'list'], apiGroups: ['image.openshift.io'], resources: ['imagestreams'], resourceNames: undefined },
      { actions: ['*'], apiGroups: [''], resources: ['persistentvolumeclaims'], resourceNames: undefined },
      { actions: ['get', 'watch', 'list'], apiGroups: [''], resources: ['persistentvolumeclaims/status'], resourceNames: undefined },
      { actions: ['get', 'watch', 'list'], apiGroups: [''], resources: ['pods', 'statefulsets'], resourceNames: undefined },
      { actions: ['*'], apiGroups: [''], resources: ['secrets', 'configmaps'], resourceNames: undefined },
      { actions: ['get', 'watch', 'list'], apiGroups: ['infrastructure.opendatahub.io'], resources: ['hardwareprofiles'], resourceNames: undefined },
      { actions: ['get', 'watch', 'list'], apiGroups: [''], resources: ['events'], resourceNames: undefined },
    ],
  },
  {
    id: '7',
    name: 'Admin',
    description: 'User can edit the project and manage user access. User can view and manage any project resource.',
    roleType: 'openshift-default',
    originallyAssigned: false,
    currentlyAssigned: false,
    rules: [
      {
        actions: ['create', 'delete', 'deletecollection', 'get', 'list', 'patch', 'update', 'watch'],
        apiGroups: ['*'],
        resources: ['*'],
        resourceNames: undefined,
      },
    ],
  },
  {
    id: '8',
    name: 'Contributor',
    description: 'User can view and manage any project resource. Users with this role can manage all resources in the namespace, including workbenches, model deployments, and cluster storage, except for permissions controlling.',
    roleType: 'openshift-default',
    originallyAssigned: false,
    currentlyAssigned: false,
    rules: [
      {
        actions: ['create', 'delete', 'get', 'list', 'patch', 'update', 'watch'],
        apiGroups: ['api.groups.name'],
        resources: ['Workbenches', 'ModelDeployments', 'Pipelines'],
        resourceNames: undefined,
      },
    ],
  },
  {
    id: '9',
    name: 'Deployment updater',
    description: 'User can view model deployments and update existing deployments.',
    roleType: 'regular',
    originallyAssigned: false,
    currentlyAssigned: false,
    rules: [
      {
        actions: ['get', 'list', 'patch', 'update', 'watch'],
        apiGroups: ['api.groups.name'],
        resources: ['ModelDeployments'],
        resourceNames: undefined,
      },
    ],
  },
  {
    id: '10',
    name: 'Pipeline maintainer',
    description: 'User can view and manage all pipelines.',
    roleType: 'regular',
    originallyAssigned: false,
    currentlyAssigned: false,
    rules: [
      {
        actions: ['create', 'delete', 'deletecollection', 'get', 'list', 'patch', 'update', 'watch'],
        apiGroups: ['tekton.dev'],
        resources: ['Pipelines'],
        resourceNames: undefined,
      },
    ],
  },
  {
    id: '11',
    name: 'Pipeline updater',
    description: 'User can view pipelines and modify their configuration, but cannot create or delete them.',
    roleType: 'regular',
    originallyAssigned: false,
    currentlyAssigned: false,
    rules: [
      {
        actions: ['get', 'list', 'patch', 'update', 'watch'],
        apiGroups: ['tekton.dev'],
        resources: ['Pipelines'],
        resourceNames: undefined,
      },
    ],
  },
  {
    id: '12',
    name: 'Pipeline reader',
    description: 'User can view and open pipelines without modifying their configuration.',
    roleType: 'regular',
    originallyAssigned: false,
    currentlyAssigned: false,
    rules: [
      {
        actions: ['get', 'list', 'watch'],
        apiGroups: ['tekton.dev'],
        resources: ['Pipelines'],
        resourceNames: undefined,
      },
    ],
  },
  {
    id: '13',
    name: 'k8sreal-name-is-here',
    description: 'Custom OpenShift role with Kubernetes specific permissions.',
    roleType: 'openshift-custom',
    originallyAssigned: false,
    currentlyAssigned: false,
    rules: [
      {
        actions: ['create', 'delete', 'get', 'list', 'patch', 'update', 'watch'],
        apiGroups: [''],
        resources: ['pods', 'services'],
        resourceNames: undefined,
      },
    ],
  },
  {
    id: '14',
    name: 'k8s-custom-role',
    description: 'Custom OpenShift role with advanced Kubernetes permissions.',
    roleType: 'openshift-custom',
    originallyAssigned: false,
    currentlyAssigned: false,
    rules: [
      {
        actions: ['create', 'delete', 'get', 'list', 'patch', 'update', 'watch'],
        apiGroups: ['apps'],
        resources: ['deployments', 'replicasets'],
        resourceNames: undefined,
      },
    ],
  },
  {
    id: '15',
    name: 'Deployments access',
    description: 'User can access and interact with deployments.',
    roleType: 'regular',
    originallyAssigned: false,
    currentlyAssigned: false,
    rules: [
      {
        actions: ['get', 'list', 'watch'],
        apiGroups: ['api.groups.name'],
        resources: ['Deployments'],
        resourceNames: undefined,
      },
    ],
  },
];

const MOCK_WORKBENCHES: { id: string; name: string; description: string }[] = [
  { id: 'WB1', name: 'WB1', description: 'This is a description' },
  { id: 'WB2', name: 'WB2', description: 'This is a description' },
  { id: 'WB3', name: 'WB3', description: 'This is a description' },
  { id: 'WB4', name: 'WB4', description: 'This is a description' },
  { id: 'WB5', name: 'WB5', description: 'This is a description' },
];

const ALL_WORKBENCHES_VALUE = '__all_workbenches__';
const ALL_PIPELINES_VALUE = '__all_pipelines__';
const ALL_DEPLOYMENTS_VALUE = '__all_deployments__';

const MOCK_PIPELINES = [
  { id: 'PL1', name: 'Pipeline 1', description: 'Pipeline description one' },
  { id: 'PL2', name: 'Pipeline 2', description: 'Pipeline description two' },
  { id: 'PL3', name: 'Pipeline 3', description: 'Pipeline description three' },
  { id: 'PL4', name: 'Pipeline 4', description: 'Pipeline description four' },
  { id: 'PL5', name: 'Pipeline 5', description: 'Pipeline description five' },
];

const MOCK_DEPLOYMENTS = [
  { id: 'DP1', name: 'Deployment 1', description: 'Deployment description one' },
  { id: 'DP2', name: 'Deployment 2', description: 'Deployment description two' },
  { id: 'DP3', name: 'Deployment 3', description: 'Deployment description three' },
  { id: 'DP4', name: 'Deployment 4', description: 'Deployment description four' },
  { id: 'DP5', name: 'Deployment 5', description: 'Deployment description five' },
];

type ResourceSelection = { type: 'all' } | { type: 'specific'; selectedIds: string[] };

const EditRolesPage: React.FunctionComponent = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const subjectType = searchParams.get('subjectType') || 'User';
  const subjectName = searchParams.get('subjectName') || '';
  const designOptionFromUrl = searchParams.get('designOption');
  
  // Get current shared data dynamically (will be updated when roles are saved)
  const getMockUsersData = () => mockUsers.map(u => ({ name: u.name, roles: u.roles }));
  const getMockGroupsData = () => mockGroups.map(g => ({ name: g.name, roles: g.roles }));
  
  // Get subject's current roles from Permissions tab data (reads from shared data)
  const getSubjectRoles = (): string[] => {
    if (subjectType === 'User') {
      const user = mockUsers.find(u => u.name === subjectName);
      return user?.roles.map(r => r.role) || [];
    } else {
      const group = mockGroups.find(g => g.name === subjectName);
      return group?.roles.map(r => r.role) || [];
    }
  };
  
  // Check if subject has any OpenShift custom roles
  const subjectHasOpenShiftCustomRole = (): boolean => {
    if (subjectType === 'User') {
      const user = mockUsers.find(u => u.name === subjectName);
      return user?.roles.some(r => r.roleType === 'openshift-custom') || false;
    } else {
      const group = mockGroups.find(g => g.name === subjectName);
      return group?.roles.some(r => r.roleType === 'openshift-custom') || false;
    }
  };
  
  // Initialize roles with correct originallyAssigned status based on Permissions tab data
  const initializeRoles = (): Role[] => {
    const subjectRoles = getSubjectRoles();
    
    // Get the specific OpenShift custom roles that the subject has
    const subjectOpenShiftCustomRoles = subjectRoles.filter(roleName => {
      const role = mockRoles.find(r => r.name === roleName);
      return role?.roleType === 'openshift-custom';
    });
    
    // Filter roles: exclude OpenShift custom roles that the subject doesn't have
    const filteredRoles = mockRoles.filter(role => {
      // If it's not an OpenShift custom role, always include it
      if (role.roleType !== 'openshift-custom') {
        return true;
      }
      // If it's an OpenShift custom role, only include it if the subject has it
      return subjectOpenShiftCustomRoles.includes(role.name);
    });
    
    // Ensure we always return roles, even if filteredRoles is empty
    if (filteredRoles.length === 0) {
      return mockRoles.map(role => ({
        ...role,
        originallyAssigned: false,
        currentlyAssigned: false,
      }));
    }
    
    return filteredRoles.map(role => {
      const isAssigned = subjectRoles.includes(role.name);
      return {
        ...role,
        originallyAssigned: isAssigned,
        currentlyAssigned: isAssigned,
      };
    });
  };
  
  const [roles, setRoles] = React.useState<Role[]>(() => {
    const initialized = initializeRoles();
    // Fallback to show all roles if initialization returns empty
    return initialized.length > 0 ? initialized : mockRoles.map(role => ({
      ...role,
      originallyAssigned: false,
      currentlyAssigned: false,
    }));
  });
  
  // Re-initialize roles when subject changes or when navigating to this page
  // This ensures we always read the latest shared data
  React.useEffect(() => {
    const initialized = initializeRoles();
    // Fallback to show all roles if initialization returns empty
    if (initialized.length > 0) {
      setRoles(initialized);
    } else {
      setRoles(mockRoles.map(role => ({
        ...role,
        originallyAssigned: false,
        currentlyAssigned: false,
      })));
    }
  }, [subjectName, subjectType, searchParams]); // Include searchParams to detect navigation
  
  const [expandedRoles, setExpandedRoles] = React.useState<Set<string>>(new Set());
  const [statusSortBy, setStatusSortBy] = React.useState<ISortBy>({
    index: 2,
    direction: 'asc',
  });
  const [roleNameSortBy, setRoleNameSortBy] = React.useState<ISortBy>({
    index: 1,
    direction: 'asc',
  });
  const [option2StatusSortBy, setOption2StatusSortBy] = React.useState<ISortBy>({
    index: 3,
    direction: 'asc',
  });
  const [option2ActiveSort, setOption2ActiveSort] = React.useState<'roleName' | 'status'>('roleName');
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedOption, setSelectedOption] = React.useState<'option3' | 'option4' | 'option5'>(() => (designOptionFromUrl === 'option3' ? 'option3' : 'option5'));
  const isOption3Or4 = true;
  const isOption2Or3Or4 = true;
  const [isDesignOptionDropdownOpen, setIsDesignOptionDropdownOpen] = React.useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = React.useState(false);
  const [selectedRoleForModal, setSelectedRoleForModal] = React.useState<Role | null>(null);
  const [rulesSortBy, setRulesSortBy] = React.useState<ISortBy>({
    index: 0,
    direction: 'asc',
  });
  const [rulesPageSize, setRulesPageSize] = React.useState(10);
  const [openPopovers, setOpenPopovers] = React.useState<Set<string>>(new Set());
  const [isSaveConfirmModalOpen, setIsSaveConfirmModalOpen] = React.useState(false);
  const [allTreeItemsExpanded, setAllTreeItemsExpanded] = React.useState(true);
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set(['assigning-roles', 'unassigning-roles']));
  const [confirmInputValue, setConfirmInputValue] = React.useState('');
  const [roleResourceSelection, setRoleResourceSelection] = React.useState<Record<string, string>>({});
  const [roleWorkbenchSelection, setRoleWorkbenchSelection] = React.useState<Record<string, ResourceSelection>>({});
  const [rolePipelineSelection, setRolePipelineSelection] = React.useState<Record<string, ResourceSelection>>({});
  const [roleDeploymentSelection, setRoleDeploymentSelection] = React.useState<Record<string, ResourceSelection>>({});
  const [openResourcesDropdownRoleId, setOpenResourcesDropdownRoleId] = React.useState<string | null>(null);
  const [workbenchSearchValue, setWorkbenchSearchValue] = React.useState('');
  const [pipelineSearchValue, setPipelineSearchValue] = React.useState('');
  const [deploymentSearchValue, setDeploymentSearchValue] = React.useState('');
  const resourceMenuRef = React.useRef<HTMLDivElement>(null);
  const resourceToggleRefMap = React.useRef<Record<string, HTMLElement | null>>({});

  const getLabelPopoverContent = (labelType: 'ai' | 'openshift-default' | 'openshift-custom', roleName?: string) => {
    switch (labelType) {
      case 'ai':
        return {
          title: 'AI Role',
          body: 'This role is an AI-generated role that provides intelligent access control based on usage patterns and requirements. AI roles are automatically created and optimized to match your project\'s specific needs.',
        };
      case 'openshift-default':
        return {
          title: 'OpenShift Default Role',
          body: 'OpenShift default roles are predefined roles provided by the OpenShift platform. These roles have standard permissions that cannot be modified. They are maintained by the platform and provide consistent access control across all projects.',
          roleName: roleName,
        };
      case 'openshift-custom':
        return {
          title: 'OpenShift Custom Role',
          body: 'OpenShift custom roles are user-defined roles created within the OpenShift platform. These roles can be customized to meet specific project requirements and provide fine-grained access control tailored to your organization\'s needs.',
          roleName: roleName,
        };
      default:
        return { title: '', body: '' };
    }
  };

  const renderAILabel = (popoverId: string) => {
    return (
      <Label
        color="grey"
        variant="outline"
        isCompact
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '2px 8px',
          borderRadius: '16px',
        }}
      >
        <svg
          className="pf-v6-svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
          role="img"
          width="1em"
          height="1em"
          style={{ width: '12px', height: '12px' }}
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            className="st1"
            d="M26.037,16.962c-5.905-.468-10.531-5.094-11-11-.042-.52-.517-.961-1.038-.961s-.997.442-1.038.962c-.468,5.905-5.094,10.531-11,11-.52.042-.961.517-.961,1.038s.442.997.962,1.038c5.905.468,10.531,5.094,11,11,.042.52.517.961,1.038.961s.997-.442,1.038-.962c.468-5.905,5.094-10.531,10.999-10.999,0,0,0,0,0,0,.52-.042.961-.517.961-1.038s-.442-.997-.962-1.038ZM14,25.764c-1.413-3.545-4.219-6.352-7.764-7.764,3.545-1.413,6.352-4.219,7.764-7.764,1.413,3.545,4.219,6.352,7.764,7.764-3.545,1.413-6.352,4.219-7.764,7.764ZM30.096,6.025c-1.55-.346-2.775-1.571-3.123-3.125-.104-.458-.504-.778-.974-.778s-.87.32-.975.781c-.346,1.55-1.571,2.775-3.125,3.123-.458.104-.778.504-.778.974s.32.87.781.975c1.55.346,2.775,1.571,3.123,3.125.104.458.504.778.974.778s.87-.32.975-.781c.346-1.55,1.571-2.775,3.122-3.122,0,0,.002,0,.003,0,.458-.104.778-.504.778-.974s-.32-.87-.781-.975ZM26,8.917c-.481-.778-1.139-1.436-1.917-1.917.778-.481,1.436-1.139,1.917-1.917.481.778,1.139,1.436,1.917,1.917-.778.481-1.436,1.139-1.917,1.917Z"
          />
        </svg>
        AI role
      </Label>
    );
  };

  const toggleRoleExpansion = (roleId: string) => {
    setExpandedRoles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(roleId)) {
        newSet.delete(roleId);
      } else {
        newSet.add(roleId);
      }
      return newSet;
    });
  };

  const getDefaultResourceLabelForRole = (role: Role): string => {
    const name = role.name.toLowerCase();
    if (name.includes('workbench')) return 'All workbenches';
    if (name.includes('deployment')) return 'All deployments';
    if (name.includes('pipeline')) return 'All pipelines';
    return 'All resources';
  };

  const isWorkbenchResourceRole = (role: Role): boolean => getDefaultResourceLabelForRole(role) === 'All workbenches';
  const isPipelineResourceRole = (role: Role): boolean => getDefaultResourceLabelForRole(role) === 'All pipelines';
  const isDeploymentResourceRole = (role: Role): boolean => getDefaultResourceLabelForRole(role) === 'All deployments';

  const getResourcesLabelForRole = (role: Role): string => {
    const name = role.name.toLowerCase();
    if (name.includes('workbench')) return 'Workbenches';
    if (name.includes('pipeline')) return 'Pipelines';
    if (name.includes('deployment')) return 'Model Deployments';
    return '-';
  };

  const getWorkbenchSelectionForRole = (roleId: string): ResourceSelection =>
    roleWorkbenchSelection[roleId] ?? { type: 'all' };
  const getPipelineSelectionForRole = (roleId: string): ResourceSelection =>
    rolePipelineSelection[roleId] ?? { type: 'all' };
  const getDeploymentSelectionForRole = (roleId: string): ResourceSelection =>
    roleDeploymentSelection[roleId] ?? { type: 'all' };

  const handleRoleToggle = (role: Role) => {
    const isEnabling = !role.currentlyAssigned;
    setRoles((prev) =>
      prev.map((r) =>
        r.id === role.id ? { ...r, currentlyAssigned: !r.currentlyAssigned } : r
      )
    );
    if (selectedOption === 'option4' && isEnabling) {
      if (isWorkbenchResourceRole(role)) {
        setRoleWorkbenchSelection((prev) => ({ ...prev, [role.id]: { type: 'all' } }));
      } else if (isPipelineResourceRole(role)) {
        setRolePipelineSelection((prev) => ({ ...prev, [role.id]: { type: 'all' } }));
      } else if (isDeploymentResourceRole(role)) {
        setRoleDeploymentSelection((prev) => ({ ...prev, [role.id]: { type: 'all' } }));
      } else {
        setRoleResourceSelection((prev) => ({ ...prev, [role.id]: getDefaultResourceLabelForRole(role) }));
      }
    }
  };

  type ResourceOption = { id: string; name: string; description: string };
  const renderResourceDropdown = (
    role: Role,
    options: ResourceOption[],
    allValue: string,
    allLabel: string,
    searchPlaceholder: string,
    selectPlaceholder: string,
    selection: ResourceSelection,
    setSelection: React.Dispatch<React.SetStateAction<Record<string, ResourceSelection>>>,
    searchValue: string,
    setSearchValue: (v: string) => void,
    isDisabled?: boolean
  ) => {
    const filteredOptions = searchValue
      ? options.filter(
          (opt) =>
            opt.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            opt.id.toLowerCase().includes(searchValue.toLowerCase())
        )
      : options;
    const selectedIds = selection.type === 'specific' ? selection.selectedIds : [];
    const maxChips = 3;
    const isOpen = openResourcesDropdownRoleId === role.id;
    const toggleRefObj = { get current() { return resourceToggleRefMap.current[role.id] ?? null; } };
    const dropdown = (
      <MenuContainer
        isOpen={isDisabled ? false : isOpen}
        onOpenChange={(open) => {
          if (isDisabled && open) return;
          setOpenResourcesDropdownRoleId(open ? role.id : null);
          if (!open) setSearchValue('');
        }}
        menuRef={resourceMenuRef}
        toggleRef={toggleRefObj as React.RefObject<HTMLElement | null>}
        menu={
          <Menu
            ref={resourceMenuRef}
            role="menu"
            isScrollable
            selected={selection.type === 'all' ? [allValue] : selectedIds}
            onSelect={(_event, value) => {
              const v = value as string;
              if (v === allValue) {
                setSelection((prev) => ({ ...prev, [role.id]: { type: 'all' } }));
              } else {
                const current = selection;
                if (current.type === 'all') {
                  setSelection((prev) => ({ ...prev, [role.id]: { type: 'specific', selectedIds: [v] } }));
                } else {
                  const newIds = current.selectedIds.includes(v)
                    ? current.selectedIds.filter((id) => id !== v)
                    : [...current.selectedIds, v];
                  setSelection((prev) => ({
                    ...prev,
                    [role.id]: newIds.length === 0 ? { type: 'all' } : { type: 'specific', selectedIds: newIds },
                  }));
                }
              }
            }}
            style={{ minWidth: '250px' }}
          >
            <MenuSearch>
              <MenuSearchInput>
                <SearchInput
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(_e, val) => setSearchValue(val)}
                  onClear={() => setSearchValue('')}
                  aria-label={searchPlaceholder}
                />
              </MenuSearchInput>
            </MenuSearch>
            <Divider />
            <MenuContent maxMenuHeight="200px">
              <MenuList>
                <MenuItem itemId={allValue} isSelected={selection.type === 'all'}>
                  {allLabel}
                </MenuItem>
                <Divider />
                {filteredOptions.map((opt) => (
                  <MenuItem
                    key={opt.id}
                    itemId={opt.id}
                    isSelected={selection.type === 'specific' && selection.selectedIds.includes(opt.id)}
                    description={opt.description}
                  >
                    {opt.name}
                  </MenuItem>
                ))}
              </MenuList>
            </MenuContent>
          </Menu>
        }
        toggle={
          <MenuToggle
            ref={(el) => { resourceToggleRefMap.current[role.id] = el; }}
            variant="typeahead"
            onClick={() => { if (isDisabled) return; setOpenResourcesDropdownRoleId(isOpen ? null : role.id); }}
            isExpanded={isOpen}
            isFullWidth
            isDisabled={isDisabled}
            style={
              isDisabled
                ? { width: '400px', minWidth: '400px', minHeight: '40px' }
                : {
                    width: '400px',
                    minWidth: '400px',
                    minHeight: '40px',
                    backgroundColor: 'var(--pf-v5-global--BackgroundColor--200)',
                    color: 'var(--pf-v5-global--Color--100)',
                  }
            }
          >
            <TextInputGroup isPlain>
              <TextInputGroupMain
                value=""
                placeholder={isDisabled ? selectPlaceholder : (selection.type === 'all' ? allLabel : selectPlaceholder)}
                aria-label={allLabel}
                inputProps={{ readOnly: true }}
                onClick={() => { if (isDisabled) return; setOpenResourcesDropdownRoleId(isOpen ? null : role.id); }}
              >
                {selection.type === 'specific' ? (
                  <LabelGroup numLabels={maxChips} aria-label="Selected resources">
                    {selectedIds.map((id) => {
                      const opt = options.find((o) => o.id === id);
                      return (
                        <Label
                          key={id}
                          variant="outline"
                          onClose={(ev) => {
                            ev.stopPropagation();
                            const newIds = selectedIds.filter((x) => x !== id);
                            setSelection((prev) => ({
                              ...prev,
                              [role.id]:
                                newIds.length === 0 ? { type: 'all' as const } : { type: 'specific' as const, selectedIds: newIds },
                            }));
                          }}
                          isCompact
                        >
                          {opt?.name ?? id}
                        </Label>
                      );
                    })}
                  </LabelGroup>
                ) : null}
              </TextInputGroupMain>
              <TextInputGroupUtilities {...(selection.type !== 'specific' ? { style: { display: 'none' } } : {})}>
                <Button
                  variant="plain"
                  aria-label="Clear all selections"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelection((prev) => ({ ...prev, [role.id]: { type: 'all' as const } }));
                  }}
                  icon={<TimesIcon />}
                />
              </TextInputGroupUtilities>
            </TextInputGroup>
          </MenuToggle>
        }
      />
    );
    return isDisabled ? (
      <Tooltip content="Check the role and then specify the resources">
        <span style={{ display: 'inline-block' }}>{dropdown}</span>
      </Tooltip>
    ) : (
      dropdown
    );
  };

  const getRoleStatus = (role: Role): string => {
    if (role.currentlyAssigned && role.originallyAssigned) {
      return 'Currently assigned';
    } else if (role.currentlyAssigned && !role.originallyAssigned) {
      return 'Assigning';
    } else if (!role.currentlyAssigned && role.originallyAssigned) {
      return 'Unassigning';
    }
    return '-';
  };

  const getStatusPriority = (status: string): number => {
    if (status === 'Currently assigned') return 1;
    if (status === 'Assigning') return 2;
    if (status === 'Unassigning') return 3;
    return 4; // '-'
  };

  const getFilteredRoles = (): Role[] => {
    if (!searchValue) return roles;
    return roles.filter((role) =>
      role.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const getSortedRolesOption1 = (): Role[] => {
    const filtered = getFilteredRoles();
    return filtered.sort((a, b) => {
      const statusA = getRoleStatus(a);
      const statusB = getRoleStatus(b);
      const priorityA = getStatusPriority(statusA);
      const priorityB = getStatusPriority(statusB);

      if (priorityA !== priorityB) {
        return statusSortBy.direction === 'asc'
          ? priorityA - priorityB
          : priorityB - priorityA;
      }
      return a.name.localeCompare(b.name);
    });
  };

  const getSortedRolesOption2 = (): Role[] => {
    const filtered = getFilteredRoles();
    return filtered.sort((a, b) => {
      if (option2ActiveSort === 'status') {
        const statusA = getRoleStatus(a);
        const statusB = getRoleStatus(b);
        
        // Special handling: "Unassigning" roles maintain their alphabetical order
        // Treat them as priority 1 (same as "Currently assigned") but keep their relative order
        const isUnassignedA = statusA === 'Unassigning';
        const isUnassignedB = statusB === 'Unassigning';
        
        // If both are "Unassigning", maintain alphabetical order
        if (isUnassignedA && isUnassignedB) {
          return a.name.localeCompare(b.name);
        }
        
        // If one is "Unassigning", treat it as priority 1 (same as "Currently assigned")
        const priorityA = isUnassignedA ? 1 : getStatusPriority(statusA);
        const priorityB = isUnassignedB ? 1 : getStatusPriority(statusB);

        if (priorityA !== priorityB) {
          return option2StatusSortBy.direction === 'asc'
            ? priorityA - priorityB
            : priorityB - priorityA;
        }
        // If status priority is the same, sort by role name as secondary
        return a.name.localeCompare(b.name);
      } else {
        // Sort by role name
        const comparison = a.name.localeCompare(b.name);
        return roleNameSortBy.direction === 'asc' ? comparison : -comparison;
      }
    });
  };

  const getSortedRoles = (): Role[] => {
    return getSortedRolesOption2();
  };

  const getStatusSortParams = () => ({
    sortBy: statusSortBy,
    onSort: (_event: any, index: number, direction: 'asc' | 'desc') => {
      setStatusSortBy({ index, direction });
    },
    columnIndex: 2,
  });

  const getRoleNameSortParams = () => ({
    sortBy: roleNameSortBy,
    onSort: (_event: any, index: number, direction: 'asc' | 'desc') => {
      setRoleNameSortBy({ index, direction });
      setOption2ActiveSort('roleName');
    },
    columnIndex: 1,
  });

  const getOption2StatusSortParams = () => {
    const statusColumnIndex = 4;
    return {
      sortBy: option2StatusSortBy,
      onSort: (_event: any, index: number, direction: 'asc' | 'desc') => {
        setOption2StatusSortBy({ index, direction });
        setOption2ActiveSort('status');
      },
      columnIndex: statusColumnIndex,
    };
  };

  const renderRoleBadge = (role: Role) => {
      if (role.roleType === 'openshift-default') {
        // For OpenShift default roles, show AI label before OpenShift default label
        const aiPopoverId = `ai-edit-${role.id}`;
        const openshiftLabel = (
          <Label 
            color="grey" 
            variant="outline" 
            isCompact
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <svg
              className="pf-v6-svg"
              viewBox="0 0 100 100"
              fill="currentColor"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              style={{ width: '12px', height: '12px' }}
            >
              <path fill="#1F1F1F" d="M29,45.3L13,51.1c0.2,2.6,0.6,5.1,1.3,7.6l15.3-5.6C29,50.6,28.8,47.9,29,45.3"/>
              <path fill="#1F1F1F" d="M100,27.5c-1.1-2.3-2.4-4.5-3.9-6.7L80,26.7c1.9,1.9,3.4,4.1,4.7,6.4L100,27.5z"/>
              <path fill="#1F1F1F" d="M64.7,23c3.3,1.6,6.2,3.7,8.7,6.2l16.1-5.8C85,17.1,78.9,11.8,71.5,8.4c-22.9-10.7-50.3-0.7-61,22.2 C7,38,5.7,45.9,6.3,53.5l16.1-5.8c0.3-3.5,1.1-7,2.7-10.3C32,22.5,49.8,16,64.7,23"/>
              <path fill="#1F1F1F" d="M15.3,58.4L0,63.9c1.4,5.6,3.8,10.8,7.2,15.5l16-5.8C19.1,69.4,16.3,64.1,15.3,58.4"/>
              <path fill="#1F1F1F" d="M81.8,52.3c-0.3,3.5-1.1,7-2.7,10.3C72.1,77.5,54.4,84,39.5,77c-3.3-1.6-6.3-3.7-8.7-6.2l-16,5.8 c4.4,6.2,10.5,11.5,17.9,14.9c22.9,10.7,50.3,0.7,61-22.2c3.5-7.4,4.7-15.3,4.1-22.9L81.8,52.3z"/>
              <path fill="#1F1F1F" d="M85.7,32.7l-15.3,5.6c2.8,5.1,4.2,10.9,3.7,16.8l16-5.8C89.8,43.5,88.3,37.9,85.7,32.7"/>
              <path fill="#1F1F1F" d="M29,48.5c0-1.1,0-2.1,0.1-3.2L13,51.1c0.1,1,0.2,2.1,0.4,3.1L29,48.5z"/>
              <path fill="#1F1F1F" d="M97.7,23.3c-0.5-0.8-1-1.6-1.6-2.4L80,26.7c0.7,0.7,1.4,1.5,2,2.3L97.7,23.3z"/>
              <path fill="#1F1F1F" d="M14.7,76.7c1.2,1.7,2.6,3.4,4.1,5l17.4-6.4c-2-1.3-3.9-2.8-5.5-4.4L14.7,76.7z M97.8,46.5l-16,5.8 c-0.2,2.3-0.6,4.6-1.4,6.9l17.4-6.4C98,50.7,98,48.6,97.8,46.5"/>
            </svg>
          <span style={{ marginLeft: '4px' }}>OpenShift default role</span>
        </Label>
        );
        
        return (
          <Flex spaceItems={{ default: 'spaceItemsXs' }} alignItems={{ default: 'alignItemsCenter' }}>
            {renderAILabel(aiPopoverId)}
            <div style={{ width: '4px' }} />
            {openshiftLabel}
          </Flex>
        );
      } else if (role.roleType === 'openshift-custom') {
        // OpenShift custom roles don't get AI label
        const openshiftLabel = (
          <Label 
            color="grey" 
            variant="outline" 
            isCompact
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <svg
              className="pf-v6-svg"
              viewBox="0 0 100 100"
              fill="currentColor"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              style={{ width: '12px', height: '12px' }}
            >
              <path fill="#1F1F1F" d="M29,45.3L13,51.1c0.2,2.6,0.6,5.1,1.3,7.6l15.3-5.6C29,50.6,28.8,47.9,29,45.3"/>
              <path fill="#1F1F1F" d="M100,27.5c-1.1-2.3-2.4-4.5-3.9-6.7L80,26.7c1.9,1.9,3.4,4.1,4.7,6.4L100,27.5z"/>
              <path fill="#1F1F1F" d="M64.7,23c3.3,1.6,6.2,3.7,8.7,6.2l16.1-5.8C85,17.1,78.9,11.8,71.5,8.4c-22.9-10.7-50.3-0.7-61,22.2 C7,38,5.7,45.9,6.3,53.5l16.1-5.8c0.3-3.5,1.1-7,2.7-10.3C32,22.5,49.8,16,64.7,23"/>
              <path fill="#1F1F1F" d="M15.3,58.4L0,63.9c1.4,5.6,3.8,10.8,7.2,15.5l16-5.8C19.1,69.4,16.3,64.1,15.3,58.4"/>
              <path fill="#1F1F1F" d="M81.8,52.3c-0.3,3.5-1.1,7-2.7,10.3C72.1,77.5,54.4,84,39.5,77c-3.3-1.6-6.3-3.7-8.7-6.2l-16,5.8 c4.4,6.2,10.5,11.5,17.9,14.9c22.9,10.7,50.3,0.7,61-22.2c3.5-7.4,4.7-15.3,4.1-22.9L81.8,52.3z"/>
              <path fill="#1F1F1F" d="M85.7,32.7l-15.3,5.6c2.8,5.1,4.2,10.9,3.7,16.8l16-5.8C89.8,43.5,88.3,37.9,85.7,32.7"/>
              <path fill="#1F1F1F" d="M29,48.5c0-1.1,0-2.1,0.1-3.2L13,51.1c0.1,1,0.2,2.1,0.4,3.1L29,48.5z"/>
              <path fill="#1F1F1F" d="M97.7,23.3c-0.5-0.8-1-1.6-1.6-2.4L80,26.7c0.7,0.7,1.4,1.5,2,2.3L97.7,23.3z"/>
              <path fill="#1F1F1F" d="M14.7,76.7c1.2,1.7,2.6,3.4,4.1,5l17.4-6.4c-2-1.3-3.9-2.8-5.5-4.4L14.7,76.7z M97.8,46.5l-16,5.8 c-0.2,2.3-0.6,4.6-1.4,6.9l17.4-6.4C98,50.7,98,48.6,97.8,46.5"/>
            </svg>
          <span style={{ marginLeft: '4px' }}>OpenShift custom role</span>
        </Label>
        );
        
        return openshiftLabel;
      } else {
        // Regular role - add AI label
        const aiPopoverId = `ai-edit-${role.id}`;
        return renderAILabel(aiPopoverId);
      }
    return null;
  };

  const renderRoleTypeLabels = (role: Role) => {
    // Only for Option 3: Render just the labels
    if (isOption3Or4) {
      if (role.roleType === 'openshift-default') {
        // For OpenShift default roles, show AI label and OpenShift default label
        const aiPopoverId = `ai-roletype-${role.id}`;
        const openshiftLabel = (
          <Label 
            color="grey" 
            variant="outline" 
            isCompact
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <svg
              className="pf-v6-svg"
              viewBox="0 0 100 100"
              fill="currentColor"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              style={{ width: '12px', height: '12px' }}
            >
              <path fill="#1F1F1F" d="M29,45.3L13,51.1c0.2,2.6,0.6,5.1,1.3,7.6l15.3-5.6C29,50.6,28.8,47.9,29,45.3"/>
              <path fill="#1F1F1F" d="M100,27.5c-1.1-2.3-2.4-4.5-3.9-6.7L80,26.7c1.9,1.9,3.4,4.1,4.7,6.4L100,27.5z"/>
              <path fill="#1F1F1F" d="M64.7,23c3.3,1.6,6.2,3.7,8.7,6.2l16.1-5.8C85,17.1,78.9,11.8,71.5,8.4c-22.9-10.7-50.3-0.7-61,22.2 C7,38,5.7,45.9,6.3,53.5l16.1-5.8c0.3-3.5,1.1-7,2.7-10.3C32,22.5,49.8,16,64.7,23"/>
              <path fill="#1F1F1F" d="M15.3,58.4L0,63.9c1.4,5.6,3.8,10.8,7.2,15.5l16-5.8C19.1,69.4,16.3,64.1,15.3,58.4"/>
              <path fill="#1F1F1F" d="M81.8,52.3c-0.3,3.5-1.1,7-2.7,10.3C72.1,77.5,54.4,84,39.5,77c-3.3-1.6-6.3-3.7-8.7-6.2l-16,5.8 c4.4,6.2,10.5,11.5,17.9,14.9c22.9,10.7,50.3,0.7,61-22.2c3.5-7.4,4.7-15.3,4.1-22.9L81.8,52.3z"/>
              <path fill="#1F1F1F" d="M85.7,32.7l-15.3,5.6c2.8,5.1,4.2,10.9,3.7,16.8l16-5.8C89.8,43.5,88.3,37.9,85.7,32.7"/>
              <path fill="#1F1F1F" d="M29,48.5c0-1.1,0-2.1,0.1-3.2L13,51.1c0.1,1,0.2,2.1,0.4,3.1L29,48.5z"/>
              <path fill="#1F1F1F" d="M97.7,23.3c-0.5-0.8-1-1.6-1.6-2.4L80,26.7c0.7,0.7,1.4,1.5,2,2.3L97.7,23.3z"/>
              <path fill="#1F1F1F" d="M14.7,76.7c1.2,1.7,2.6,3.4,4.1,5l17.4-6.4c-2-1.3-3.9-2.8-5.5-4.4L14.7,76.7z M97.8,46.5l-16,5.8 c-0.2,2.3-0.6,4.6-1.4,6.9l17.4-6.4C98,50.7,98,48.6,97.8,46.5"/>
            </svg>
          <span style={{ marginLeft: '4px' }}>OpenShift default role</span>
        </Label>
        );
        
        return (
          <Flex spaceItems={{ default: 'spaceItemsXs' }} alignItems={{ default: 'alignItemsCenter' }}>
            {renderAILabel(aiPopoverId)}
            <div style={{ width: '4px' }} />
            {openshiftLabel}
          </Flex>
        );
      } else if (role.roleType === 'openshift-custom') {
        // OpenShift custom roles don't get AI label
        const openshiftLabel = (
          <Label 
            color="grey" 
            variant="outline" 
            isCompact
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <svg
              className="pf-v6-svg"
              viewBox="0 0 100 100"
              fill="currentColor"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              style={{ width: '12px', height: '12px' }}
            >
              <path fill="#1F1F1F" d="M29,45.3L13,51.1c0.2,2.6,0.6,5.1,1.3,7.6l15.3-5.6C29,50.6,28.8,47.9,29,45.3"/>
              <path fill="#1F1F1F" d="M100,27.5c-1.1-2.3-2.4-4.5-3.9-6.7L80,26.7c1.9,1.9,3.4,4.1,4.7,6.4L100,27.5z"/>
              <path fill="#1F1F1F" d="M64.7,23c3.3,1.6,6.2,3.7,8.7,6.2l16.1-5.8C85,17.1,78.9,11.8,71.5,8.4c-22.9-10.7-50.3-0.7-61,22.2 C7,38,5.7,45.9,6.3,53.5l16.1-5.8c0.3-3.5,1.1-7,2.7-10.3C32,22.5,49.8,16,64.7,23"/>
              <path fill="#1F1F1F" d="M15.3,58.4L0,63.9c1.4,5.6,3.8,10.8,7.2,15.5l16-5.8C19.1,69.4,16.3,64.1,15.3,58.4"/>
              <path fill="#1F1F1F" d="M81.8,52.3c-0.3,3.5-1.1,7-2.7,10.3C72.1,77.5,54.4,84,39.5,77c-3.3-1.6-6.3-3.7-8.7-6.2l-16,5.8 c4.4,6.2,10.5,11.5,17.9,14.9c22.9,10.7,50.3,0.7,61-22.2c3.5-7.4,4.7-15.3,4.1-22.9L81.8,52.3z"/>
              <path fill="#1F1F1F" d="M85.7,32.7l-15.3,5.6c2.8,5.1,4.2,10.9,3.7,16.8l16-5.8C89.8,43.5,88.3,37.9,85.7,32.7"/>
              <path fill="#1F1F1F" d="M29,48.5c0-1.1,0-2.1,0.1-3.2L13,51.1c0.1,1,0.2,2.1,0.4,3.1L29,48.5z"/>
              <path fill="#1F1F1F" d="M97.7,23.3c-0.5-0.8-1-1.6-1.6-2.4L80,26.7c0.7,0.7,1.4,1.5,2,2.3L97.7,23.3z"/>
              <path fill="#1F1F1F" d="M14.7,76.7c1.2,1.7,2.6,3.4,4.1,5l17.4-6.4c-2-1.3-3.9-2.8-5.5-4.4L14.7,76.7z M97.8,46.5l-16,5.8 c-0.2,2.3-0.6,4.6-1.4,6.9l17.4-6.4C98,50.7,98,48.6,97.8,46.5"/>
            </svg>
          <span style={{ marginLeft: '4px' }}>OpenShift custom role</span>
        </Label>
        );
        
        return openshiftLabel;
      } else {
        // Regular role - add AI label
        const aiPopoverId = `ai-roletype-${role.id}`;
        return renderAILabel(aiPopoverId);
      }
    }
    
    return null;
  };

  const renderStatusBadge = (role: Role) => {
    const status = getRoleStatus(role);
    const isOpenShiftCustom = role.roleType === 'openshift-custom';
    
    // If role was originally assigned but is now deselected
    if (role.originallyAssigned && !role.currentlyAssigned) {
      const helpTextElement = isOpenShiftCustom ? (() => {
        const helpTextPopoverId = `help-text-popover-${role.id}`;
        const helpTextSpan = (
          <span
            style={{ 
              textDecoration: 'underline dashed',
              color: 'var(--pf-t--global--text--color--status--danger--default)',
              textUnderlineOffset: 'var(--pf-t--global--spacer--xs)',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpenPopovers((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(helpTextPopoverId)) {
                  newSet.delete(helpTextPopoverId);
                } else {
                  newSet.add(helpTextPopoverId);
                }
                return newSet;
              });
            }}
          >
            Role cannot be re-assigned in OpenShift AI
          </span>
        );

      return (
          <Popover
            position="bottom"
            bodyContent="OpenShift custom roles cannot be assigned in OpenShift AI. You'll need to use OpenShift to assign it again."
            showClose
            isVisible={openPopovers.has(helpTextPopoverId)}
            shouldClose={() => {
              setOpenPopovers((prev) => {
                const newSet = new Set(prev);
                newSet.delete(helpTextPopoverId);
                return newSet;
              });
              return true;
            }}
          >
            {helpTextSpan}
          </Popover>
        );
      })() : null;
      
      // For Option 3, only show "Unassigning" label
      if (isOption3Or4) {
        // For OpenShift custom roles, make the label clickable with popover
        if (isOpenShiftCustom) {
          const unassigningPopoverId = `unassigning-popover-${role.id}`;
          return (
            <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
              <Popover
                position="bottom"
                bodyContent="OpenShift custom roles cannot be assigned in OpenShift AI. You'll need to use OpenShift to assign it again."
                showClose
                isVisible={openPopovers.has(unassigningPopoverId)}
                shouldClose={() => {
                  setOpenPopovers((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(unassigningPopoverId);
                    return newSet;
                  });
                  return true;
                }}
              >
                <Label 
                  color="red" 
                  variant="filled" 
                  isCompact 
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenPopovers((prev) => {
                      const newSet = new Set(prev);
                      if (newSet.has(unassigningPopoverId)) {
                        newSet.delete(unassigningPopoverId);
                      } else {
                        newSet.add(unassigningPopoverId);
                      }
                      return newSet;
                    });
                  }}
                >
                  Unassigning
                </Label>
              </Popover>
              {helpTextElement}
            </Flex>
          );
        }
        return (
          <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
            <Label color="red" variant="outline" isCompact>Unassigning</Label>
            {helpTextElement}
          </Flex>
        );
      }
      // For other options, show both labels
      // For OpenShift custom roles, make the Unassigning label clickable with popover
      if (isOpenShiftCustom) {
        const unassigningPopoverId = `unassigning-popover-${role.id}`;
        return (
          <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
          <Label color="green" variant="outline" isCompact>Currently assigned</Label>
            <Popover
              position="bottom"
              bodyContent="OpenShift custom roles cannot be assigned in OpenShift AI. You'll need to use OpenShift to assign it again."
              showClose
              isVisible={openPopovers.has(unassigningPopoverId)}
              shouldClose={() => {
                setOpenPopovers((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(unassigningPopoverId);
                  return newSet;
                });
                return true;
              }}
            >
              <Label 
                color="red" 
                variant="filled" 
                isCompact 
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPopovers((prev) => {
                    const newSet = new Set(prev);
                    if (newSet.has(unassigningPopoverId)) {
                      newSet.delete(unassigningPopoverId);
                    } else {
                      newSet.add(unassigningPopoverId);
                    }
                    return newSet;
                  });
                }}
              >
                Unassigning
              </Label>
            </Popover>
            {helpTextElement}
          </Flex>
        );
      }
      return (
        <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
          <Label color="green" variant="outline" isCompact>Currently assigned</Label>
          <Label color="red" variant="outline" isCompact>Unassigning</Label>
          {helpTextElement}
        </Flex>
      );
    }
    
    // Otherwise show single status label
    if (status === 'Currently assigned') {
      return <Label color="green" variant="outline" isCompact>{status}</Label>;
    } else if (status === 'Assigning') {
      return <Label color="orange" variant="outline" isCompact>{status}</Label>;
    } else if (status === 'Unassigning') {
      return <Label color="red" variant="outline" isCompact>{status}</Label>;
    }
    return <span style={{ color: 'var(--pf-v5-global--Color--200)' }}>-</span>;
  };

  const handleRoleNameClick = (role: Role) => {
    setSelectedRoleForModal(role);
    setRulesPageSize(10);
    setIsRoleModalOpen(true);
  };

  const getSortedRules = (rules: RoleRule[]): RoleRule[] => {
    const sorted = [...rules];
    const columnIndex = rulesSortBy.index;
    const direction = rulesSortBy.direction;

    sorted.sort((a, b) => {
      let comparison = 0;
      
      if (columnIndex === 0) {
        // Sort by Actions
        const aActions = a.actions.join(', ');
        const bActions = b.actions.join(', ');
        comparison = aActions.localeCompare(bActions);
      } else if (columnIndex === 1) {
        // Sort by API Groups
        const aApiGroups = a.apiGroups.join(', ');
        const bApiGroups = b.apiGroups.join(', ');
        comparison = aApiGroups.localeCompare(bApiGroups);
      } else if (columnIndex === 2) {
        // Sort by Resources
        const aResources = a.resources.join(', ');
        const bResources = b.resources.join(', ');
        comparison = aResources.localeCompare(bResources);
      } else if (columnIndex === 3) {
        // Sort by Resource names
        const aResourceNames = (a.resourceNames || []).join(', ') || '-';
        const bResourceNames = (b.resourceNames || []).join(', ') || '-';
        comparison = aResourceNames.localeCompare(bResourceNames);
      }

      return direction === 'asc' ? comparison : -comparison;
    });

    return sorted;
  };

  const getRulesSortParams = (columnIndex: number) => ({
    sortBy: rulesSortBy,
    onSort: (_event: any, index: number, direction: 'asc' | 'desc') => {
      setRulesSortBy({ index, direction });
    },
    columnIndex,
  });

  const sortedRoles = getSortedRoles();
const hasRoleAssignmentChanges = roles.some((role) => {
    return role.currentlyAssigned !== role.originallyAssigned;
  });

  // For 'Concept for testing' (option5): also enable Save when resource scoping has changed
  const hasResourceScopingChanges =
    selectedOption === 'option5' &&
    roles.some((role) => {
      if (isWorkbenchResourceRole(role)) return getWorkbenchSelectionForRole(role.id).type === 'specific';
      if (isPipelineResourceRole(role)) return getPipelineSelectionForRole(role.id).type === 'specific';
      if (isDeploymentResourceRole(role)) return getDeploymentSelectionForRole(role.id).type === 'specific';
      return false;
    });

  const hasChanges = hasRoleAssignmentChanges || hasResourceScopingChanges;

  // Check if there are any role assignment changes (assigning or unassigning) — only these show the confirm modal
  const hasAnyRoleAssignmentChanges = (): boolean => {
    return roles.some(role =>
      (role.originallyAssigned && !role.currentlyAssigned) || // Being unassigned
      (!role.originallyAssigned && role.currentlyAssigned)     // Being assigned
    );
  };

  // Handle save action
  const handleSave = () => {
    // Only show confirmation modal when there are role assignment changes
    if (hasAnyRoleAssignmentChanges()) {
      setIsSaveConfirmModalOpen(true);
    } else {
      performSave();
    }
  };

  // Perform the actual save operation
  const performSave = () => {
    // Get all currently assigned roles
    const assignedRoles = roles
      .filter(role => role.currentlyAssigned)
      .map(role => role.name);
    
    // Update shared data
    if (subjectType === 'User') {
      updateUserRoles(subjectName, assignedRoles);
    } else {
      updateGroupRoles(subjectName, assignedRoles);
    }
    
    // Navigate back to permissions tab
    navigate(`/projects/${projectId}?tab=permissions`);
  };

  return (
    <>
      <style>{`
        .pf-v6-c-button.pf-m-link.pf-m-inline {
          text-decoration: none !important;
        }
        .pf-v6-c-button.pf-m-link.pf-m-inline:hover {
          text-decoration: none !important;
        }
      `}</style>
      <div style={{ 
        backgroundColor: '#f0e6ff', 
        padding: '16px',
        borderBottom: '1px solid var(--pf-v5-global--BorderColor--200)'
      }}>
        <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsLg' }}>
          <FlexItem>
            <span style={{ fontWeight: 600, fontSize: 'var(--pf-v5-global--FontSize--md)' }}>Design Option:</span>
          </FlexItem>
          <FlexItem>
            <Select
              isOpen={isDesignOptionDropdownOpen}
              onOpenChange={(isOpen) => setIsDesignOptionDropdownOpen(isOpen)}
              selected={selectedOption}
              onSelect={(_event, value) => {
                setSelectedOption(value as 'option3' | 'option4' | 'option5');
                setIsDesignOptionDropdownOpen(false);
              }}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  onClick={() => setIsDesignOptionDropdownOpen(!isDesignOptionDropdownOpen)}
                  isExpanded={isDesignOptionDropdownOpen}
                  style={{ minWidth: '450px' }}
                >
                  {selectedOption === 'option3'
                    ? 'Original design'
                    : 'Concept for testing'}
                </MenuToggle>
              )}
            >
              <SelectList>
                <SelectOption value="option3">Original design</SelectOption>
                <SelectOption value="option5">Concept for testing</SelectOption>
              </SelectList>
            </Select>
          </FlexItem>
        </Flex>
      </div>
      <div className="pf-v6-c-page__main-breadcrumb">
        <div style={{ padding: 'var(--pf-v5-global--spacer--lg) var(--pf-v5-global--spacer--lg)' }}>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/projects">Projects</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to={`/projects/${projectId}`}>{projectId}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem isActive>Manage roles</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <PageSection>
        <Title headingLevel="h1" size="2xl">
          Manage roles
        </Title>
        <Content style={{ marginTop: 'var(--pf-v5-global--spacer--sm)' }}>
          Description goes here.
        </Content>
      </PageSection>

      <PageSection isFilled>
        <div style={{ maxWidth: '840px' }}>
          <Stack hasGutter>
            <StackItem>
              <Title headingLevel="h2" size="lg">Subject</Title>
            <Form style={{ marginTop: '16px' }}>
              {!isOption2Or3Or4 && (
              <div className="pf-v6-c-form__group">
                <div className="pf-v6-c-form__group-label">
                  <label className="pf-v6-c-form__label" htmlFor="subject-type">
                      <span className="pf-v6-c-form__label-text">Subject kind</span>
                  </label>
                </div>
                <div className="pf-v6-c-form__group-control">{subjectType}</div>
              </div>
              )}
              <div className="pf-v6-c-form__group" style={{ marginTop: !isOption2Or3Or4 ? 'var(--pf-v5-global--spacer--md)' : '0px' }}>
                <div className="pf-v6-c-form__group-label">
                  <label className="pf-v6-c-form__label" htmlFor="subject-name">
                    <span className="pf-v6-c-form__label-text">
                      {subjectType === 'User' ? 'User name' : 'Group name'}
                    </span>
                    <span style={{ color: 'var(--pf-v5-global--danger-color--100)' }}> *</span>
                  </label>
                </div>
                <div className="pf-v6-c-form__group-control">
                  {isOption2Or3Or4 ? (
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: 'var(--pf-v5-global--spacer--sm) var(--pf-v5-global--spacer--md)',
                      backgroundColor: 'var(--pf-v5-global--BackgroundColor--200)',
                      border: '1px solid var(--pf-v5-global--BorderColor--300)',
                      borderRadius: 'var(--pf-v5-global--BorderRadius--sm)',
                      color: 'var(--pf-v5-global--Color--100)'
                    }}>
                      {subjectType === 'User' ? (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '16px',
                          height: '16px',
                          borderRadius: '8px',
                          background: 'var(--ai-user--BackgroundColor, #f5e6d3)',
                          color: 'var(--ai-user--IconColor, #000)',
                          flexShrink: 0
                        }}>
                          <svg className="pf-v6-svg" viewBox="0 0 36 36" fill="currentColor" aria-hidden="true" role="img" width="16px" height="16px" style={{ width: '16px', height: '16px' }}>
                            <path d="M21.32,17.8C27.8,14.41,25.42,4.39,18,4.38s-9.8,10-3.32,13.42A13.63,13.63,0,0,0,4.38,31a.61.61,0,0,0,.62.62H31a.61.61,0,0,0,.62-.62A13.63,13.63,0,0,0,21.32,17.8Zm-9.2-6.3c.25-7.76,11.51-7.76,11.76,0C23.63,19.26,12.37,19.26,12.12,11.5ZM5.64,30.38C7,14.79,29.05,14.8,30.36,30.38Z"></path>
                          </svg>
                        </div>
                      ) : (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '16px',
                          height: '16px',
                          borderRadius: '8px',
                          background: 'var(--ai-group--BackgroundColor, #f5e6d3)',
                          color: 'var(--ai-group--IconColor, #000)',
                          flexShrink: 0
                        }}>
                          <svg className="pf-v6-svg" viewBox="0 0 36 36" fill="currentColor" aria-hidden="true" role="img" width="16px" height="16px" style={{ width: '16px', height: '16px' }}>
                            <path d="m 27.87,23.29 a 3.86,3.86 0 1 0 -4.74,0 A 7.11,7.11 0 0 0 18.38,30 0.61,0.61 0 0 0 19,30.62 H 32 A 0.63,0.63 0 0 0 32.63,30 7.13,7.13 0 0 0 27.87,23.29 Z m -5,-3 a 2.62,2.62 0 0 1 5.24,0 2.62,2.62 0 0 1 -5.23,-0.04 z m -3.22,9.13 c 0.84,-6.94 10.84,-6.93 11.68,0 z M 16,19.38 a 0.62,0.62 0 0 0 0,1.24 h 4 a 0.62,0.62 0 0 0 0,-1.24 z m -2.63,-4 a 6,6 0 0 1 9.48,0.18 0.61,0.61 0 0 0 0.66,-0.07 c 1.07,-1 -2.27,-3 -3.13,-3.21 a 3.86,3.86 0 1 0 -4.76,0 c -0.86,0.25 -4.2,2.18 -3.13,3.21 a 0.62,0.62 0 0 0 0.88,-0.11 z m 2,-6.13 a 2.62,2.62 0 0 1 5.24,0 2.62,2.62 0 0 1 -5.23,0 z m -2.5,14.04 a 3.86,3.86 0 1 0 -4.74,0 A 7.11,7.11 0 0 0 3.38,30 0.61,0.61 0 0 0 4,30.62 H 17 A 0.63,0.63 0 0 0 17.63,30 7.13,7.13 0 0 0 12.87,23.29 Z m -5,-3 a 2.62,2.62 0 0 1 5.24,0 2.62,2.62 0 0 1 -5.23,-0.04 z m -3.21,9.09 c 0.84,-6.94 10.84,-6.93 11.68,0 z"></path>
                          </svg>
                        </div>
                      )}
                      <span>{subjectName || `Select ${subjectType.toLowerCase()}`}</span>
                    </div>
                  ) : (
                    <div>{subjectName || `Select ${subjectType.toLowerCase()}`}</div>
                  )}
                </div>
              </div>
            </Form>
          </StackItem>

          <StackItem style={{ marginTop: '40px' }}>
            <Title headingLevel="h2" size="lg">Role assignment</Title>
            <Content style={{ marginTop: '16px', marginBottom: '8px' }}>
              {selectedOption === 'option4'
                ? 'Check the role to grant the relevant permissions and specify the resources.'
                : 'Check the role to grant the relevant permissions.'}
            </Content>

            <div style={{ marginBottom: 'var(--pf-v5-global--spacer--md)' }}>
              <SearchInput
                placeholder="Find by name"
                value={searchValue}
                onChange={(_event, value) => setSearchValue(value)}
                onClear={() => setSearchValue('')}
                aria-label="Find by name"
              />
            </div>

            <div style={selectedOption === 'option4' ? { width: '1200px' } : selectedOption === 'option5' ? { width: '960px' } : undefined}>
            <Table
              variant="compact"
              aria-label="Roles table"
              isExpandable={selectedOption === 'option5'}
              hasAnimations={selectedOption === 'option5'}
            >
              <Thead>
                <Tr>
                  {selectedOption === 'option5' && <Th screenReaderText="Row expansion" />}
                  <Th />
                  <Th 
                    sort={isOption2Or3Or4 ? getRoleNameSortParams() : undefined}
                  >
                    {isOption2Or3Or4 ? 'Role' : 'Role name'}
                  </Th>
                  <Th style={selectedOption === 'option4' ? { width: '320px' } : undefined}>Description</Th>
                  {isOption3Or4 && (
                    <Th 
                      style={selectedOption === 'option4' ? { width: '200px' } : undefined}
                      info={{
                        popover: (
                          <Content>
                            <Content component="small" className="pf-v6-c-content--small" style={{ color: 'var(--pf-t--global--text--color--regular)', marginBottom: '8px', display: 'block' }}>
                              Roles with different labels come from different sources. The meanings of each label are defined as follows:
                            </Content>
                            <Content component="ul" className="pf-v6-c-content--ul" style={{ margin: '0px' }}>
                              <Content component="li" className="pf-v6-c-content--li">
                                <Content component="small" className="pf-v6-c-content--small" style={{ color: 'var(--pf-t--global--text--color--regular)' }}>
                                  <strong>AI:</strong> Description
                                </Content>
                              </Content>
                              <Content component="li" className="pf-v6-c-content--li">
                                <Content component="small" className="pf-v6-c-content--small" style={{ color: 'var(--pf-t--global--text--color--regular)' }}>
                                  <strong>OpenShift default:</strong> Description
                                </Content>
                              </Content>
                              <Content component="li" className="pf-v6-c-content--li">
                                <Content component="small" className="pf-v6-c-content--small" style={{ color: 'var(--pf-t--global--text--color--regular)' }}>
                                  <strong>OpenShift custom:</strong> Description
                                </Content>
                              </Content>
                            </Content>
                          </Content>
                        ),
                        ariaLabel: 'Role type labels help',
                        popoverProps: { headerContent: 'Role Labels' }
                      }}
                    >
                      Role type
                    </Th>
                  )}
                  <Th 
                    sort={getOption2StatusSortParams()} 
                    modifier="nowrap"
                        info={{
                          popover: (
                            <Content>
                              <Content component="p" style={{ marginBottom: '8px' }}>
                                Assignment status indicates the current or pending state of the role assignment:
                              </Content>
                              <Content component="ul" className="pf-v6-c-content--ul" style={{ margin: '0px', paddingLeft: '20px' }}>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>Currently assigned:</strong> The user or group has this role.
                                </Content>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>Assigning:</strong> The role will be added when you save changes.
                                </Content>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>Unassigning:</strong> The role will be removed when you save changes.
                                </Content>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>No status (-):</strong> The role is not assigned.
                                </Content>
                              </Content>
                            </Content>
                          ),
                          ariaLabel: 'Assignment status help',
                          popoverProps: { headerContent: 'Assignment Status' }
                        }}
                  >
                    Assignment status
                  </Th>
                  {selectedOption === 'option4' && (
                    <Th
                      style={{ width: '400px' }}
                      info={{
                        popover: (
                          <Content>
                            <Content component="p" style={{ marginBottom: '8px' }}>
                              Resources indicate the scope of the role assignment (e.g. all workbenches or specific resources).
                            </Content>
                          </Content>
                        ),
                        ariaLabel: 'Resources help',
                        popoverProps: { headerContent: 'Resources' }
                      }}
                    >
                      Resources
                    </Th>
                  )}
                </Tr>
              </Thead>
              {sortedRoles.length === 0 ? (
                <Tbody>
                  <Tr>
                    <Td colSpan={selectedOption === 'option4' || selectedOption === 'option5' ? 6 : (isOption3Or4 ? 5 : 4)} style={{ textAlign: 'center', padding: 'var(--pf-v5-global--spacer--xl)' }}>
                      No roles available
                    </Td>
                  </Tr>
                </Tbody>
              ) : selectedOption === 'option5' ? (
                sortedRoles.map((role, rowIndex) => {
                  const isExpanded = expandedRoles.has(role.id);
                  const status = getRoleStatus(role);
                  return (
                    <Tbody key={role.id} isExpanded={isExpanded}>
                      <Tr isContentExpanded={isExpanded}>
                        <Td
                          expand={{
                            rowIndex,
                            isExpanded,
                            onToggle: () => toggleRoleExpansion(role.id),
                            expandId: 'role-assignment-expandable',
                          }}
                        />
                        <Td>
                            <Checkbox
                              id={`role-${role.id}`}
                              isChecked={role.currentlyAssigned}
                              onChange={() => handleRoleToggle(role)}
                              aria-label={`Select role ${role.name}`}
                            />
                          </Td>
                          <Td>
                            <Button
                              variant="link"
                              onClick={() => handleRoleNameClick(role)}
                              isInline
                              style={{ padding: 0, fontSize: 'inherit', textDecoration: 'none' }}
                              className="pf-v6-c-button__text"
                            >
                              {role.name}
                            </Button>
                        </Td>
                        <Td style={(selectedOption as string) === 'option4' ? { width: '320px' } : undefined}>{role.description}</Td>
                          {isOption3Or4 && (
                            <Td style={(selectedOption as string) === 'option4' ? { width: '200px' } : undefined}>
                              {renderRoleTypeLabels(role)}
                            </Td>
                          )}
                        <Td>{renderStatusBadge(role)}</Td>
                          {(selectedOption as string) === 'option4' && (
                            <Td style={{ width: '400px' }}>
                              {status !== '-' ? (
                                isWorkbenchResourceRole(role)
                                  ? renderResourceDropdown(
                                      role,
                                      MOCK_WORKBENCHES,
                                      ALL_WORKBENCHES_VALUE,
                                      'All workbenches',
                                      'Find by workbench name',
                                      'Select a workbench',
                                      getWorkbenchSelectionForRole(role.id),
                                      setRoleWorkbenchSelection,
                                      workbenchSearchValue,
                                      setWorkbenchSearchValue
                                    )
                                  : isPipelineResourceRole(role)
                                    ? renderResourceDropdown(
                                        role,
                                        MOCK_PIPELINES,
                                        ALL_PIPELINES_VALUE,
                                        'All pipelines',
                                        'Find by pipeline name',
                                        'Select a pipeline',
                                        getPipelineSelectionForRole(role.id),
                                        setRolePipelineSelection,
                                        pipelineSearchValue,
                                        setPipelineSearchValue
                                      )
                                    : isDeploymentResourceRole(role)
                                      ? renderResourceDropdown(
                                          role,
                                          MOCK_DEPLOYMENTS,
                                          ALL_DEPLOYMENTS_VALUE,
                                          'All deployments',
                                          'Find by deployment name',
                                          'Select a deployment',
                                          getDeploymentSelectionForRole(role.id),
                                          setRoleDeploymentSelection,
                                          deploymentSearchValue,
                                          setDeploymentSearchValue
                                        )
                                      : (
                                  <Select
                                    isOpen={openResourcesDropdownRoleId === role.id}
                                    onOpenChange={(open) => setOpenResourcesDropdownRoleId(open ? role.id : null)}
                                    selected={roleResourceSelection[role.id] ?? getDefaultResourceLabelForRole(role)}
                                    onSelect={(_event, value) => {
                                      setRoleResourceSelection((prev) => ({ ...prev, [role.id]: value as string }));
                                      setOpenResourcesDropdownRoleId(null);
                                    }}
                                    toggle={(toggleRef) => (
                                      <MenuToggle
                                        ref={toggleRef}
                                        onClick={() => setOpenResourcesDropdownRoleId(openResourcesDropdownRoleId === role.id ? null : role.id)}
                                        isExpanded={openResourcesDropdownRoleId === role.id}
                                        style={{ width: '400px', minWidth: '400px', backgroundColor: 'var(--pf-v5-global--BackgroundColor--200)', color: 'var(--pf-v5-global--Color--100)' }}
                                      >
                                        {roleResourceSelection[role.id] ?? getDefaultResourceLabelForRole(role)}
                                      </MenuToggle>
                                    )}
                                  >
                                    <SelectList>
                                      <SelectOption value={getDefaultResourceLabelForRole(role)}>{getDefaultResourceLabelForRole(role)}</SelectOption>
                                    </SelectList>
                                  </Select>
                                      )
                              ) : (
                                '-'
                              )}
                            </Td>
                          )}
                      </Tr>
                      <Tr isExpanded={isExpanded}>
                        <Td
                          noPadding
                          dataLabel="Details expanded"
                          colSpan={6}
                        >
                          <ExpandableRowContent>
                            <div style={{ padding: 'var(--pf-v5-global--spacer--md)', paddingLeft: '4.5rem' }}>
                              <Content style={{ fontWeight: 600, marginBottom: 'var(--pf-v5-global--spacer--sm)', marginLeft: '16px' }}>Resource scoping</Content>
                              <Table variant="compact" aria-label="Role resources table" style={{ marginLeft: '-8px', marginBottom: '8px' }}>
                                <Thead>
                                  <Tr>
                                    <Th style={{ width: '220px' }}>Actions</Th>
                                    <Th>API groups</Th>
                                    <Th>Resources</Th>
                                    <Th>
                                      Resource names
                                      <Popover
                                        position="bottom"
                                        bodyContent="Specify the resource instances. The empty resource names mean that you don't need to configure."
                                        showClose
                                        isVisible={openPopovers.has('resource-names-header-popover')}
                                        shouldClose={() => {
                                          setOpenPopovers((prev) => {
                                            const next = new Set(prev);
                                            next.delete('resource-names-header-popover');
                                            return next;
                                          });
                                          return true;
                                        }}
                                      >
                                        <span
                                          style={{ marginLeft: '8px', color: 'var(--pf-v5-global--Color--200)', cursor: 'pointer', display: 'inline-flex' }}
                                          onClick={() => setOpenPopovers((prev) => {
                                            const next = new Set(prev);
                                            if (next.has('resource-names-header-popover')) next.delete('resource-names-header-popover');
                                            else next.add('resource-names-header-popover');
                                            return next;
                                          })}
                                          aria-label="Resource names help"
                                        >
                                          <OutlinedQuestionCircleIcon />
                                        </span>
                                      </Popover>
                                    </Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {role.rules && role.rules.length > 0 ? (
                                    role.rules.map((rule, ruleIndex) => (
                                      <Tr key={ruleIndex}>
                                        <Td style={{ width: '220px' }}>{rule.actions.includes('*') ? 'create, delete, deletecollection, get, list, patch, update, watch' : rule.actions.join(', ')}</Td>
                                        <Td>{(rule.apiGroups.length === 0 || (rule.apiGroups.length === 1 && rule.apiGroups[0] === '')) ? '*' : rule.apiGroups.join(', ')}</Td>
                                        <Td>{rule.resources.join(', ')}</Td>
                                        <Td>
                                          {(role.name === 'Admin' || role.name === 'Contributor')
                                            ? 'All resources'
                                            : rule.resources.includes('namespaces')
                                              ? projectId
                                              : ruleIndex === 0 &&
                                                (isWorkbenchResourceRole(role) || isPipelineResourceRole(role) || isDeploymentResourceRole(role))
                                                ? isWorkbenchResourceRole(role)
                                                ? renderResourceDropdown(
                                                    role,
                                                    MOCK_WORKBENCHES,
                                                    ALL_WORKBENCHES_VALUE,
                                                    'All workbenches',
                                                    'Find by workbench name',
                                                    'Select a workbench',
                                                    getWorkbenchSelectionForRole(role.id),
                                                    setRoleWorkbenchSelection,
                                                    workbenchSearchValue,
                                                    setWorkbenchSearchValue,
                                                    !role.currentlyAssigned
                                                  )
                                                : isPipelineResourceRole(role)
                                                  ? renderResourceDropdown(
                                                      role,
                                                      MOCK_PIPELINES,
                                                      ALL_PIPELINES_VALUE,
                                                      'All pipelines',
                                                      'Find by pipeline name',
                                                      'Select a pipeline',
                                                      getPipelineSelectionForRole(role.id),
                                                      setRolePipelineSelection,
                                                      pipelineSearchValue,
                                                      setPipelineSearchValue,
                                                      !role.currentlyAssigned
                                                    )
                                                  : renderResourceDropdown(
                                                      role,
                                                      MOCK_DEPLOYMENTS,
                                                      ALL_DEPLOYMENTS_VALUE,
                                                      'All deployments',
                                                      'Find by deployment name',
                                                      'Select a deployment',
                                                      getDeploymentSelectionForRole(role.id),
                                                      setRoleDeploymentSelection,
                                                      deploymentSearchValue,
                                                      setDeploymentSearchValue,
                                                      !role.currentlyAssigned
                                                    )
                                              : (rule.resourceNames?.join(', ') || '-')}
                                        </Td>
                                      </Tr>
                                    ))
                                  ) : (
                                    <Tr>
                                      <Td colSpan={4}>No rules available</Td>
                                    </Tr>
                                  )}
                                </Tbody>
                              </Table>
                            </div>
                          </ExpandableRowContent>
                        </Td>
                      </Tr>
                    </Tbody>
                  );
                })
              ) : (
                <Tbody>
                  {sortedRoles.map((role) => {
                    const status = getRoleStatus(role);
                    return (
                      <React.Fragment key={role.id}>
                        <Tr>
                          <Td>
                            <Checkbox
                              id={`role-${role.id}`}
                              isChecked={role.currentlyAssigned}
                              onChange={() => handleRoleToggle(role)}
                              aria-label={`Select role ${role.name}`}
                            />
                          </Td>
                          <Td>
                            <Button
                              variant="link"
                              onClick={() => handleRoleNameClick(role)}
                              isInline
                              style={{ padding: 0, fontSize: 'inherit', textDecoration: 'none' }}
                              className="pf-v6-c-button__text"
                            >
                              {role.name}
                            </Button>
                          </Td>
                          <Td style={selectedOption === 'option4' ? { width: '320px' } : undefined}>{role.description}</Td>
                          {isOption3Or4 && (
                            <Td style={selectedOption === 'option4' ? { width: '200px' } : undefined}>
                              {renderRoleTypeLabels(role)}
                            </Td>
                          )}
                          <Td>{renderStatusBadge(role)}</Td>
                          {selectedOption === 'option4' && (
                            <Td style={{ width: '400px' }}>
                              {status !== '-' ? (
                                isWorkbenchResourceRole(role)
                                  ? renderResourceDropdown(
                                      role,
                                      MOCK_WORKBENCHES,
                                      ALL_WORKBENCHES_VALUE,
                                      'All workbenches',
                                      'Find by workbench name',
                                      'Select a workbench',
                                      getWorkbenchSelectionForRole(role.id),
                                      setRoleWorkbenchSelection,
                                      workbenchSearchValue,
                                      setWorkbenchSearchValue
                                    )
                                  : isPipelineResourceRole(role)
                                    ? renderResourceDropdown(
                                        role,
                                        MOCK_PIPELINES,
                                        ALL_PIPELINES_VALUE,
                                        'All pipelines',
                                        'Find by pipeline name',
                                        'Select a pipeline',
                                        getPipelineSelectionForRole(role.id),
                                        setRolePipelineSelection,
                                        pipelineSearchValue,
                                        setPipelineSearchValue
                                      )
                                    : isDeploymentResourceRole(role)
                                      ? renderResourceDropdown(
                                          role,
                                          MOCK_DEPLOYMENTS,
                                          ALL_DEPLOYMENTS_VALUE,
                                          'All deployments',
                                          'Find by deployment name',
                                          'Select a deployment',
                                          getDeploymentSelectionForRole(role.id),
                                          setRoleDeploymentSelection,
                                          deploymentSearchValue,
                                          setDeploymentSearchValue
                                        )
                                      : (
                                  <Select
                                    isOpen={openResourcesDropdownRoleId === role.id}
                                    onOpenChange={(open) => setOpenResourcesDropdownRoleId(open ? role.id : null)}
                                    selected={roleResourceSelection[role.id] ?? getDefaultResourceLabelForRole(role)}
                                    onSelect={(_event, value) => {
                                      setRoleResourceSelection((prev) => ({ ...prev, [role.id]: value as string }));
                                      setOpenResourcesDropdownRoleId(null);
                                    }}
                                    toggle={(toggleRef) => (
                                      <MenuToggle
                                        ref={toggleRef}
                                        onClick={() => setOpenResourcesDropdownRoleId(openResourcesDropdownRoleId === role.id ? null : role.id)}
                                        isExpanded={openResourcesDropdownRoleId === role.id}
                                        style={{ width: '400px', minWidth: '400px', backgroundColor: 'var(--pf-v5-global--BackgroundColor--200)', color: 'var(--pf-v5-global--Color--100)' }}
                                      >
                                        {roleResourceSelection[role.id] ?? getDefaultResourceLabelForRole(role)}
                                      </MenuToggle>
                                    )}
                                  >
                                    <SelectList>
                                      <SelectOption value={getDefaultResourceLabelForRole(role)}>{getDefaultResourceLabelForRole(role)}</SelectOption>
                                    </SelectList>
                                  </Select>
                                      )
                              ) : (
                                '-'
                              )}
                            </Td>
                          )}
                        </Tr>
                      </React.Fragment>
                    );
                  })}
                </Tbody>
              )}
            </Table>
            </div>
          </StackItem>
        </Stack>
        </div>
      </PageSection>

      <PageSection className="pf-m-sticky-bottom">
        <div className="pf-v6-l-stack pf-m-gutter">
          <div className="pf-v6-l-stack__item">
            <Alert 
              variant={AlertVariant.info} 
              isInline 
              title={`Make sure to inform the specified ${subjectType.toLowerCase()} about the updated role assignments.`}
              style={{ width: '840px' }}
            >
            </Alert>
          </div>
          <div className="pf-v6-l-stack__item">
            <div className="pf-v6-l-stack pf-m-gutter">
              <div className="pf-v6-l-stack__item">
                <div className="pf-v6-c-action-list">
                  <div className="pf-v6-c-action-list__item">
                    <Button
                      variant="primary"
                      onClick={handleSave}
                      isDisabled={!hasChanges}
                      data-testid="submit-button"
                      id="save-button"
                    >
                      Save
                    </Button>
                  </div>
                  <div className="pf-v6-c-action-list__item">
                    <Button
                      variant="link"
                      onClick={() => navigate(`/projects/${projectId}?tab=permissions`)}
                      id="cancel-button"
                      data-testid="cancel-button"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Role Rules Modal for Option 2 */}
      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        variant="large"
        aria-labelledby="role-rules-modal-title"
      >
        <ModalHeader
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span id="role-rules-modal-title">{selectedRoleForModal?.name}</span>
              {selectedRoleForModal?.roleType === 'openshift-default' && (
                <Label color="blue" variant="outline">OpenShift default</Label>
              )}
              {selectedRoleForModal?.roleType === 'openshift-custom' && (
                <Label color="purple" variant="outline">OpenShift custom</Label>
              )}
            </div>
          }
        />
        <ModalBody>
          <Content style={{ marginBottom: 'var(--pf-v5-global--spacer--md)' }}>
            The table below presents the rules of this role.
          </Content>
          {selectedRoleForModal && selectedRoleForModal.rules && selectedRoleForModal.rules.length > 0 ? (
            <>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Table variant="compact" aria-label="Role rules table">
                  <Thead>
                    <Tr>
                      <Th sort={getRulesSortParams(0)}>
                        Actions
                      </Th>
                      <Th sort={getRulesSortParams(1)}>
                        API Groups
                      </Th>
                      <Th sort={getRulesSortParams(2)}>
                        Resources
                      </Th>
                      <Th sort={getRulesSortParams(3)}>
                        Resource names
                        <Popover
                          position="bottom"
                          bodyContent="Specify the resource instances. The empty resource names mean that you don't need to configure."
                          showClose
                          isVisible={openPopovers.has('resource-names-modal-popover')}
                          shouldClose={() => {
                            setOpenPopovers((prev) => {
                              const next = new Set(prev);
                              next.delete('resource-names-modal-popover');
                              return next;
                            });
                            return true;
                          }}
                        >
                          <span
                            style={{ marginLeft: 'var(--pf-v5-global--spacer--xs)', color: 'var(--pf-v5-global--Color--200)', cursor: 'pointer', display: 'inline-flex' }}
                            onClick={() => setOpenPopovers((prev) => {
                              const next = new Set(prev);
                              if (next.has('resource-names-modal-popover')) next.delete('resource-names-modal-popover');
                              else next.add('resource-names-modal-popover');
                              return next;
                            })}
                            aria-label="Resource names help"
                          >
                            <OutlinedQuestionCircleIcon />
                          </span>
                        </Popover>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {getSortedRules(selectedRoleForModal.rules)
                      .slice(0, rulesPageSize)
                      .map((rule, index) => (
                        <Tr key={index}>
                          <Td>{rule.actions.join(', ')}</Td>
                          <Td>{rule.apiGroups.join(', ')}</Td>
                          <Td>{rule.resources.join(', ')}</Td>
                          <Td>{rule.resourceNames?.join(', ') || '-'}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </div>
              {selectedRoleForModal.rules.length > rulesPageSize && (
                <div style={{ marginTop: 'var(--pf-v5-global--spacer--md)' }}>
                  <Button
                    variant="link"
                    isInline
                    onClick={() => setRulesPageSize(prev => prev + 10)}
                  >
                    View more
                  </Button>
                  <span style={{ marginLeft: 'var(--pf-v5-global--spacer--sm)', color: 'var(--pf-v5-global--Color--200)' }}>
                    Showing {Math.min(rulesPageSize, selectedRoleForModal.rules.length)}/{selectedRoleForModal.rules.length}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div style={{ color: 'var(--pf-v5-global--Color--200)', padding: 'var(--pf-v5-global--spacer--md)' }}>
              No rules available
            </div>
          )}
        </ModalBody>
      </Modal>

      {/* Save Confirmation Modal */}
      <Modal
        isOpen={isSaveConfirmModalOpen}
        onClose={() => {
          setIsSaveConfirmModalOpen(false);
          setExpandedGroups(new Set(['assigning-roles', 'unassigning-roles']));
          setConfirmInputValue('');
        }}
        variant="small"
        aria-labelledby="save-confirm-modal-title"
      >
        <ModalHeader
          title="Confirm role assignment changes?"
          titleIconVariant="warning"
        />
        <ModalBody>
          <Stack hasGutter>
            <StackItem>
              <Content>
                The roles of <span style={{ fontWeight: 600 }}>{subjectName}</span> will be changed as listed below.
              </Content>
            </StackItem>
            <StackItem>
              {(() => {
                const assigningRoles = roles.filter(role => !role.originallyAssigned && role.currentlyAssigned);
                const unassigningRoles = roles.filter(role => role.originallyAssigned && !role.currentlyAssigned);
                const unassigningOpenShiftCustomRoles = unassigningRoles.filter(role => role.roleType === 'openshift-custom');
                const isAssigningExpanded = expandedGroups.has('assigning-roles');
                const isUnassigningExpanded = expandedGroups.has('unassigning-roles');
                
                // Helper function to render role type labels
                const renderRoleTypeLabelForModal = (role: Role) => {
                  if (role.roleType === 'openshift-default') {
                    const aiPopoverId = `ai-modal-${role.id}`;
                    const openshiftLabel = (
                      <Label 
                        color="grey" 
                        variant="outline" 
                        isCompact
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <svg
                          className="pf-v6-svg"
                          viewBox="0 0 100 100"
                          fill="currentColor"
                          aria-hidden="true"
                          role="img"
                          width="1em"
                          height="1em"
                          style={{ width: '12px', height: '12px' }}
                        >
                          <path fill="#1F1F1F" d="M29,45.3L13,51.1c0.2,2.6,0.6,5.1,1.3,7.6l15.3-5.6C29,50.6,28.8,47.9,29,45.3"/>
                          <path fill="#1F1F1F" d="M100,27.5c-1.1-2.3-2.4-4.5-3.9-6.7L80,26.7c1.9,1.9,3.4,4.1,4.7,6.4L100,27.5z"/>
                          <path fill="#1F1F1F" d="M64.7,23c3.3,1.6,6.2,3.7,8.7,6.2l16.1-5.8C85,17.1,78.9,11.8,71.5,8.4c-22.9-10.7-50.3-0.7-61,22.2 C7,38,5.7,45.9,6.3,53.5l16.1-5.8c0.3-3.5,1.1-7,2.7-10.3C32,22.5,49.8,16,64.7,23"/>
                          <path fill="#1F1F1F" d="M15.3,58.4L0,63.9c1.4,5.6,3.8,10.8,7.2,15.5l16-5.8C19.1,69.4,16.3,64.1,15.3,58.4"/>
                          <path fill="#1F1F1F" d="M81.8,52.3c-0.3,3.5-1.1,7-2.7,10.3C72.1,77.5,54.4,84,39.5,77c-3.3-1.6-6.3-3.7-8.7-6.2l-16,5.8 c4.4,6.2,10.5,11.5,17.9,14.9c22.9,10.7,50.3,0.7,61-22.2c3.5-7.4,4.7-15.3,4.1-22.9L81.8,52.3z"/>
                          <path fill="#1F1F1F" d="M85.7,32.7l-15.3,5.6c2.8,5.1,4.2,10.9,3.7,16.8l16-5.8C89.8,43.5,88.3,37.9,85.7,32.7"/>
                          <path fill="#1F1F1F" d="M29,48.5c0-1.1,0-2.1,0.1-3.2L13,51.1c0.1,1,0.2,2.1,0.4,3.1L29,48.5z"/>
                          <path fill="#1F1F1F" d="M97.7,23.3c-0.5-0.8-1-1.6-1.6-2.4L80,26.7c0.7,0.7,1.4,1.5,2,2.3L97.7,23.3z"/>
                          <path fill="#1F1F1F" d="M14.7,76.7c1.2,1.7,2.6,3.4,4.1,5l17.4-6.4c-2-1.3-3.9-2.8-5.5-4.4L14.7,76.7z M97.8,46.5l-16,5.8 c-0.2,2.3-0.6,4.6-1.4,6.9l17.4-6.4C98,50.7,98,48.6,97.8,46.5"/>
                        </svg>
                        <span style={{ marginLeft: '4px' }}>OpenShift default role</span>
                      </Label>
                    );
                    return (
                      <Flex spaceItems={{ default: 'spaceItemsXs' }} alignItems={{ default: 'alignItemsCenter' }}>
                        {renderAILabel(aiPopoverId)}
                        <div style={{ width: '4px' }} />
                        {openshiftLabel}
                      </Flex>
                    );
                  } else if (role.roleType === 'openshift-custom') {
                    const isUnassigning = role.originallyAssigned && !role.currentlyAssigned;
                    const openshiftLabel = (
                      <Label 
                        color="grey" 
                        variant="outline" 
                        isCompact
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <svg
                          className="pf-v6-svg"
                          viewBox="0 0 100 100"
                          fill="currentColor"
                          aria-hidden="true"
                          role="img"
                          width="1em"
                          height="1em"
                          style={{ width: '12px', height: '12px' }}
                        >
                          <path fill="#1F1F1F" d="M29,45.3L13,51.1c0.2,2.6,0.6,5.1,1.3,7.6l15.3-5.6C29,50.6,28.8,47.9,29,45.3"/>
                          <path fill="#1F1F1F" d="M100,27.5c-1.1-2.3-2.4-4.5-3.9-6.7L80,26.7c1.9,1.9,3.4,4.1,4.7,6.4L100,27.5z"/>
                          <path fill="#1F1F1F" d="M64.7,23c3.3,1.6,6.2,3.7,8.7,6.2l16.1-5.8C85,17.1,78.9,11.8,71.5,8.4c-22.9-10.7-50.3-0.7-61,22.2 C7,38,5.7,45.9,6.3,53.5l16.1-5.8c0.3-3.5,1.1-7,2.7-10.3C32,22.5,49.8,16,64.7,23"/>
                          <path fill="#1F1F1F" d="M15.3,58.4L0,63.9c1.4,5.6,3.8,10.8,7.2,15.5l16-5.8C19.1,69.4,16.3,64.1,15.3,58.4"/>
                          <path fill="#1F1F1F" d="M81.8,52.3c-0.3,3.5-1.1,7-2.7,10.3C72.1,77.5,54.4,84,39.5,77c-3.3-1.6-6.3-3.7-8.7-6.2l-16,5.8 c4.4,6.2,10.5,11.5,17.9,14.9c22.9,10.7,50.3,0.7,61-22.2c3.5-7.4,4.7-15.3,4.1-22.9L81.8,52.3z"/>
                          <path fill="#1F1F1F" d="M85.7,32.7l-15.3,5.6c2.8,5.1,4.2,10.9,3.7,16.8l16-5.8C89.8,43.5,88.3,37.9,85.7,32.7"/>
                          <path fill="#1F1F1F" d="M29,48.5c0-1.1,0-2.1,0.1-3.2L13,51.1c0.1,1,0.2,2.1,0.4,3.1L29,48.5z"/>
                          <path fill="#1F1F1F" d="M97.7,23.3c-0.5-0.8-1-1.6-1.6-2.4L80,26.7c0.7,0.7,1.4,1.5,2,2.3L97.7,23.3z"/>
                          <path fill="#1F1F1F" d="M14.7,76.7c1.2,1.7,2.6,3.4,4.1,5l17.4-6.4c-2-1.3-3.9-2.8-5.5-4.4L14.7,76.7z M97.8,46.5l-16,5.8 c-0.2,2.3-0.6,4.6-1.4,6.9l17.4-6.4C98,50.7,98,48.6,97.8,46.5"/>
                        </svg>
                        <span style={{ marginLeft: '4px' }}>OpenShift custom role</span>
                      </Label>
                    );
                    
                    if (isUnassigning) {
                      return (
                        <Flex spaceItems={{ default: 'spaceItemsXs' }} alignItems={{ default: 'alignItemsCenter' }}>
                          {openshiftLabel}
                          <Tooltip content="Role can only be re-assigned in OpenShift">
                            <ExclamationCircleIcon style={{ color: 'var(--pf-t--global--text--color--status--danger--default)', fontSize: '16px' }} />
                          </Tooltip>
                        </Flex>
                      );
                    }
                    
                    return openshiftLabel;
                  } else {
                    const aiPopoverId = `ai-modal-${role.id}`;
                    return renderAILabel(aiPopoverId);
                  }
                };
                
                return (
                  <Stack hasGutter>
                    {/* Assigning roles group */}
                    {assigningRoles.length > 0 && (
                      <StackItem>
                        <Stack hasGutter>
                          <StackItem>
                            <Button
                              variant="link"
                              isInline
                              onClick={() => {
                                setExpandedGroups(prev => {
                                  const newSet = new Set(prev);
                                  if (newSet.has('assigning-roles')) {
                                    newSet.delete('assigning-roles');
                                  } else {
                                    newSet.add('assigning-roles');
                                  }
                                  return newSet;
                                });
                              }}
                              style={{ padding: 0, fontSize: 'inherit' }}
                            >
                              {isAssigningExpanded ? <AngleDownIcon /> : <AngleRightIcon />}
                              <span style={{ marginLeft: '4px' }}>Assigning roles</span>
                              <Label isCompact style={{ marginLeft: '8px' }}>{assigningRoles.length}</Label>
                            </Button>
                          </StackItem>
                          {isAssigningExpanded && (
                            <StackItem style={{ marginLeft: '24px' }}>
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {assigningRoles.map((role) => (
                                  <li key={role.id} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>{role.name}</span>
                                    {renderRoleTypeLabelForModal(role)}
                                  </li>
                                ))}
                              </ul>
                            </StackItem>
                          )}
                        </Stack>
                      </StackItem>
                    )}
                    
                    {/* Unassigning roles group */}
                    {unassigningRoles.length > 0 && (
                      <StackItem>
                        <Stack hasGutter>
                          <StackItem>
                            <Button
                              variant="link"
                              isInline
                              onClick={() => {
                                setExpandedGroups(prev => {
                                  const newSet = new Set(prev);
                                  if (newSet.has('unassigning-roles')) {
                                    newSet.delete('unassigning-roles');
                                  } else {
                                    newSet.add('unassigning-roles');
                                  }
                                  return newSet;
                                });
                              }}
                              style={{ padding: 0, fontSize: 'inherit' }}
                            >
                              {isUnassigningExpanded ? <AngleDownIcon /> : <AngleRightIcon />}
                              <span style={{ marginLeft: '4px' }}>Unassigning roles</span>
                              <Label isCompact style={{ marginLeft: '8px' }}>{unassigningRoles.length}</Label>
                            </Button>
                          </StackItem>
                          {isUnassigningExpanded && (
                            <StackItem style={{ marginLeft: '24px' }}>
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {unassigningRoles.map((role) => (
                                  <li key={role.id} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>{role.name}</span>
                                    {renderRoleTypeLabelForModal(role)}
                                  </li>
                                ))}
                              </ul>
                            </StackItem>
                          )}
                          {/* Alert for OpenShift custom roles under Unassigning roles group */}
                          {unassigningOpenShiftCustomRoles.length > 0 && (
                            <StackItem>
                              <Alert
                                variant="danger"
                                isInline
                                title="The OpenShift custom roles were assigned from OpenShift. You need to contact your admin to reassign them outside the OpenShift AI once you unassign them."
                              />
                            </StackItem>
                          )}
                        </Stack>
                      </StackItem>
                    )}
                  </Stack>
                );
              })()}
            </StackItem>
            
            {/* Type-to-confirm section - show if all currently assigned roles are being unassigned */}
            {(() => {
              const originallyAssignedRoles = roles.filter(role => role.originallyAssigned);
              const currentlyAssignedRoles = roles.filter(role => role.currentlyAssigned);
              const willLoseAllRoles = originallyAssignedRoles.length > 0 && currentlyAssignedRoles.length === 0;
              
              if (willLoseAllRoles) {
                return (
                  <>
                    <StackItem>
                      <Content>
                        <span style={{ fontWeight: 600 }}>{subjectName}</span> will lose all permissions and be removed from the current project. Type <span style={{ fontWeight: 600 }}>{subjectName}</span> to confirm deletion:
                      </Content>
                    </StackItem>
                    <StackItem>
                      <FormGroup fieldId="confirm-input">
                        <TextInput
                          id="confirm-input"
                          value={confirmInputValue}
                          onChange={(_, value) => setConfirmInputValue(value)}
                          aria-label="Confirmation input"
                        />
                      </FormGroup>
                    </StackItem>
                  </>
                );
              }
              return null;
            })()}
            <StackItem>
              <Alert variant={AlertVariant.info} isInline title="Make sure to inform the specified user about the updated role assignments." />
            </StackItem>
          </Stack>
        </ModalBody>
        <div style={{ padding: '24px' }}>
          <div className="pf-v6-c-action-list">
            <div className="pf-v6-c-action-list__item">
              <Button
                variant="primary"
                onClick={() => {
                  const originallyAssignedRoles = roles.filter(role => role.originallyAssigned);
                  const currentlyAssignedRoles = roles.filter(role => role.currentlyAssigned);
                  const willLoseAllRoles = originallyAssignedRoles.length > 0 && currentlyAssignedRoles.length === 0;
                  
                  if (willLoseAllRoles && confirmInputValue !== subjectName) {
                    return; // Don't proceed if confirmation doesn't match
                  }
                  
                  setIsSaveConfirmModalOpen(false);
                  setExpandedGroups(new Set(['assigning-roles', 'unassigning-roles']));
                  setConfirmInputValue('');
                  performSave();
                }}
                isDisabled={(() => {
                  const originallyAssignedRoles = roles.filter(role => role.originallyAssigned);
                  const currentlyAssignedRoles = roles.filter(role => role.currentlyAssigned);
                  const willLoseAllRoles = originallyAssignedRoles.length > 0 && currentlyAssignedRoles.length === 0;
                  return !!(willLoseAllRoles && confirmInputValue !== subjectName);
                })()}
              >
                Confirm
              </Button>
            </div>
            <div className="pf-v6-c-action-list__item">
              <Button
                variant="link"
                onClick={() => {
                  setIsSaveConfirmModalOpen(false);
                  setExpandedGroups(new Set(['assigning-roles', 'unassigning-roles']));
                  setConfirmInputValue('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export { EditRolesPage };
