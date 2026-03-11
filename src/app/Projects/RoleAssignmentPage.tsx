import * as React from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
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
  Stack,
  StackItem,
  Alert,
  AlertVariant,
  Radio,
  Form,
  FormGroup,
  Content,
  HelperText,
  HelperTextItem,
  SearchInput,
  Modal,
  ModalHeader,
  ModalBody,
  Popover,
  TextInput,
  Tooltip,
  TreeView,
  TreeViewDataItem,
  Tabs,
  Tab,
  TabTitleText,
  Select,
  SelectList,
  SelectOption,
  MenuToggle,
  Menu,
  MenuContainer,
  MenuContent,
  MenuItem,
  MenuList,
  MenuSearch,
  MenuSearchInput,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from '@patternfly/react-core';
import {
  AngleDownIcon,
  AngleRightIcon,
  ExclamationCircleIcon,
  OutlinedQuestionCircleIcon,
  TimesIcon,
} from '@patternfly/react-icons';
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

interface RoleAssignee {
  subject: string;
  subjectType: 'User' | 'Group';
  roleBinding: string;
  dateCreated: string;
}

// All available roles (same as EditRolesPage)
const mockAvailableRoles: Role[] = [
  {
    id: '1',
    name: 'custom-pipeline-super-user',
    description: 'Custom OpenShift role with pipeline super user permissions.',
    roleType: 'openshift-custom',
    originallyAssigned: false,
    currentlyAssigned: false,
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
    originallyAssigned: false,
    currentlyAssigned: false,
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
    originallyAssigned: false,
    currentlyAssigned: false,
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
    originallyAssigned: false,
    currentlyAssigned: false,
    rules: [
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
    originallyAssigned: false,
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
    currentlyAssigned: false,
    rules: [
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

const ALL_IMAGESTREAMS_VALUE = '__all_imagestreams__';
const MOCK_IMAGESTREAMS = [
  { id: 'IS1', name: 'IS1', description: 'This is a description' },
  { id: 'IS2', name: 'IS2', description: 'This is a description' },
  { id: 'IS3', name: 'IS3', description: 'This is a description' },
  { id: 'IS4', name: 'IS4', description: 'This is a description' },
  { id: 'IS5', name: 'IS5', description: 'This is a description' },
];

const ALL_PVCS_VALUE = '__all_pvcs__';
const MOCK_PVCS = [
  { id: 'PVC1', name: 'PVC1', description: 'This is a description' },
  { id: 'PVC2', name: 'PVC2', description: 'This is a description' },
  { id: 'PVC3', name: 'PVC3', description: 'This is a description' },
  { id: 'PVC4', name: 'PVC4', description: 'This is a description' },
  { id: 'PVC5', name: 'PVC5', description: 'This is a description' },
];

const ALL_PODS_VALUE = '__all_pods__';
const MOCK_PODS = [
  { id: 'POD1', name: 'POD1', description: 'This is a description' },
  { id: 'POD2', name: 'POD2', description: 'This is a description' },
  { id: 'POD3', name: 'POD3', description: 'This is a description' },
  { id: 'POD4', name: 'POD4', description: 'This is a description' },
  { id: 'POD5', name: 'POD5', description: 'This is a description' },
];

const ALL_ENV_VARS_VALUE = '__all_env_vars__';
const MOCK_ENV_VARS = [
  { id: 'EV1', name: 'EV1', description: 'This is a description' },
  { id: 'EV2', name: 'EV2', description: 'This is a description' },
  { id: 'EV3', name: 'EV3', description: 'This is a description' },
  { id: 'EV4', name: 'EV4', description: 'This is a description' },
  { id: 'EV5', name: 'EV5', description: 'This is a description' },
];

const ALL_HARDWARE_PROFILES_VALUE = '__all_hardware_profiles__';
const MOCK_HARDWARE_PROFILES = [
  { id: 'HP1', name: 'HP1', description: 'This is a description' },
  { id: 'HP2', name: 'HP2', description: 'This is a description' },
  { id: 'HP3', name: 'HP3', description: 'This is a description' },
  { id: 'HP4', name: 'HP4', description: 'This is a description' },
  { id: 'HP5', name: 'HP5', description: 'This is a description' },
];

type ResourceSelection = { type: 'all' } | { type: 'specific'; selectedIds: string[] };

const getRoleAssignees = (roleName: string): RoleAssignee[] => {
  // Mock data - in real app, this would come from API
  if (roleName === 'Workbench maintainer') {
    return [
      { subject: 'Deena', subjectType: 'User', roleBinding: 'rb-wb-updater', dateCreated: '30 Oct 2024' },
      { subject: 'Diana', subjectType: 'User', roleBinding: 'rb-wb-updater', dateCreated: '30 Oct 2024' },
      { subject: 'Jeff', subjectType: 'User', roleBinding: 'rb-wb-updater', dateCreated: '30 Oct 2024' },
      { subject: 'workbench team', subjectType: 'Group', roleBinding: 'rb-wb-updater', dateCreated: '30 Oct 2024' },
      { subject: 'youth team', subjectType: 'Group', roleBinding: 'rb-wb-updater-in-cli', dateCreated: '30 Oct 2024' },
    ];
  }
  // Default assignees for other roles - use shared data directly
  const userAssignees: RoleAssignee[] = mockUsers
    .filter(u => u.roles.some(r => r.role === roleName))
    .map(u => ({ subject: u.name, subjectType: 'User' as const, roleBinding: `rb-${roleName.toLowerCase().replace(/\s+/g, '-')}`, dateCreated: u.dateCreated }));
  
  const groupAssignees: RoleAssignee[] = mockGroups
    .filter(g => g.roles.some(r => r.role === roleName))
    .map(g => ({ subject: g.name, subjectType: 'Group' as const, roleBinding: `rb-${roleName.toLowerCase().replace(/\s+/g, '-')}`, dateCreated: g.dateCreated }));
  
  return [...userAssignees, ...groupAssignees];
};

const RoleAssignmentPage: React.FunctionComponent = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Check if this is Option 2 flow (read-only subject)
  const isOption2 = searchParams.get('option') === '2';
  const option2SubjectType = searchParams.get('subjectType') as 'User' | 'Group' | null;
  const option2SubjectName = searchParams.get('subjectName');
  
  const [subjectType, setSubjectType] = React.useState<'User' | 'Group'>(
    isOption2 && option2SubjectType ? option2SubjectType : 'User'
  );
  const [selectedSubject, setSelectedSubject] = React.useState<string | undefined>(
    isOption2 && option2SubjectName ? decodeURIComponent(option2SubjectName) : undefined
  );
  const [roles, setRoles] = React.useState<Role[]>(mockAvailableRoles.map(role => ({ 
    ...role, 
    originallyAssigned: false, 
    currentlyAssigned: false 
  })));
  const [roleNameSortBy, setRoleNameSortBy] = React.useState<ISortBy>({
    index: 1,
    direction: 'asc',
  });
  const [option2StatusSortBy, setOption2StatusSortBy] = React.useState<ISortBy>({
    index: 4,
    direction: 'asc',
  });
  const [option2ActiveSort, setOption2ActiveSort] = React.useState<'roleName' | 'status'>('roleName');
  const [searchValue, setSearchValue] = React.useState('');
  const [isRoleModalOpen, setIsRoleModalOpen] = React.useState(false);
  const [selectedRoleForModal, setSelectedRoleForModal] = React.useState<Role | null>(null);
  const [roleModalTabKey, setRoleModalTabKey] = React.useState<string | number>(0);
  const [rulesSortBy, setRulesSortBy] = React.useState<ISortBy>({
    index: 0,
    direction: 'asc',
  });
  const [rulesPageSize, setRulesPageSize] = React.useState(10);
  const [assigneesSortBy, setAssigneesSortBy] = React.useState<ISortBy>({
    index: 0,
    direction: 'asc',
  });
  const [openPopovers, setOpenPopovers] = React.useState<Set<string>>(new Set());
  const [typeaheadInputValue, setTypeaheadInputValue] = React.useState<string>('');
  const [isDiscardModalOpen, setIsDiscardModalOpen] = React.useState(false);
  const [pendingSubject, setPendingSubject] = React.useState<string | undefined>(undefined);
  const [pendingSubjectType, setPendingSubjectType] = React.useState<'User' | 'Group' | undefined>(undefined);
  const [shouldPreserveRoles, setShouldPreserveRoles] = React.useState(false);
  const [customTypeaheadOpen, setCustomTypeaheadOpen] = React.useState(false);
  const [isSaveConfirmModalOpen, setIsSaveConfirmModalOpen] = React.useState(false);
  const [allTreeItemsExpanded, setAllTreeItemsExpanded] = React.useState(true);
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set(['assigning-roles', 'unassigning-roles']));
  const [confirmInputValue, setConfirmInputValue] = React.useState('');
  const [assignRolesVariant, setAssignRolesVariant] = React.useState<'option1' | 'option2'>(() => (searchParams.get('option') === '1' ? 'option1' : 'option2'));
  const [isAssignRolesVariantDropdownOpen, setIsAssignRolesVariantDropdownOpen] = React.useState(false);
  const [expandedRoles, setExpandedRoles] = React.useState<Set<string>>(new Set());
  const [roleResourceSelection, setRoleResourceSelection] = React.useState<Record<string, string>>({});
  const [roleWorkbenchSelection, setRoleWorkbenchSelection] = React.useState<Record<string, ResourceSelection>>({});
  const [rolePipelineSelection, setRolePipelineSelection] = React.useState<Record<string, ResourceSelection>>({});
  const [roleDeploymentSelection, setRoleDeploymentSelection] = React.useState<Record<string, ResourceSelection>>({});
  const [openResourcesDropdownRoleId, setOpenResourcesDropdownRoleId] = React.useState<string | null>(null);
  const [workbenchSearchValue, setWorkbenchSearchValue] = React.useState('');
  const [pipelineSearchValue, setPipelineSearchValue] = React.useState('');
  const [deploymentSearchValue, setDeploymentSearchValue] = React.useState('');
  const [roleImagestreamSelection, setRoleImagestreamSelection] = React.useState<Record<string, ResourceSelection>>({});
  const [imagestreamSearchValue, setImagestreamSearchValue] = React.useState('');
  const [rolePVCSelection, setRolePVCSelection] = React.useState<Record<string, ResourceSelection>>({});
  const [pvcSearchValue, setPVCSearchValue] = React.useState('');
  const [rolePodSelection, setRolePodSelection] = React.useState<Record<string, ResourceSelection>>({});
  const [podSearchValue, setPodSearchValue] = React.useState('');
  const [roleEnvVarSelection, setRoleEnvVarSelection] = React.useState<Record<string, ResourceSelection>>({});
  const [envVarSearchValue, setEnvVarSearchValue] = React.useState('');
  const [roleHardwareProfileSelection, setRoleHardwareProfileSelection] = React.useState<Record<string, ResourceSelection>>({});
  const [hardwareProfileSearchValue, setHardwareProfileSearchValue] = React.useState('');
  const resourceMenuRefMap = React.useRef<Record<string, { current: HTMLDivElement | null }>>({});
  const resourceToggleRefMap = React.useRef<Record<string, HTMLElement | null>>({});

  // Get available subjects based on type
  const getAvailableSubjects = (): string[] => {
    if (subjectType === 'User') {
      return mockUsers.map(u => u.name);
    } else {
      return mockGroups.map(g => g.name);
    }
  };

  // Check if a subject is an existing user/group
  const isExistingSubject = (subjectName: string): boolean => {
    const availableSubjects = getAvailableSubjects();
    return availableSubjects.includes(subjectName);
  };

  // Handle subject type change with confirmation if there are changes
  const handleSubjectTypeChange = (newType: 'User' | 'Group') => {
    // If there are changes and a subject is selected, show confirmation modal
    if (hasChanges && selectedSubject) {
      setPendingSubjectType(newType);
      setIsDiscardModalOpen(true);
    } else {
      // No changes or no subject, change directly
      setSubjectType(newType);
    }
  };

  // Check if there are any changes (assigning or unassigning)
  const hasAnyChanges = (): boolean => {
    return roles.some(role => 
      (role.originallyAssigned && !role.currentlyAssigned) || // Being unassigned
      (!role.originallyAssigned && role.currentlyAssigned)     // Being assigned
    );
  };

  // Handle save action
  const handleSave = () => {
    // Always show confirmation modal if there are any changes
    if (hasAnyChanges()) {
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
    if (subjectType === 'User' && selectedSubject) {
      updateUserRoles(selectedSubject, assignedRoles);
    } else if (subjectType === 'Group' && selectedSubject) {
      updateGroupRoles(selectedSubject, assignedRoles);
    }
    
    // Navigate back to permissions tab
    navigate(`/projects/${projectId}?tab=permissions`);
  };

  // Create typeahead options
  const filteredSubjectsForTypeahead = React.useMemo<string[]>(() => {
    const subjects = getAvailableSubjects();
    if (!typeaheadInputValue) return subjects;
    return subjects.filter((s) => s.toLowerCase().includes(typeaheadInputValue.toLowerCase()));
  }, [subjectType, selectedSubject, typeaheadInputValue]);

  // Reset when subject kind changes (only if not Option 2)
  React.useEffect(() => {
    if (!isOption2) {
      setSelectedSubject(undefined);
    setSearchValue('');
      setRoles(mockAvailableRoles.map(role => ({ 
        ...role, 
        originallyAssigned: false, 
        currentlyAssigned: false 
      })));
      setShouldPreserveRoles(false);
    }
  }, [subjectType, isOption2]);

  // Initialize roles when subject is selected
  React.useEffect(() => {
    if (selectedSubject) {
      // If we should preserve roles (switching from new user to new user), skip reset
      if (shouldPreserveRoles) {
        setShouldPreserveRoles(false); // Reset the flag
        return;
      }
      
      // Get subject's current roles from shared data
      let subjectRoles: string[] = [];
      let isExistingSubject = false;
      if (subjectType === 'User') {
        const user = mockUsers.find(u => u.name === selectedSubject);
        isExistingSubject = !!user;
        subjectRoles = user?.roles.map(r => r.role) || [];
      } else {
        const group = mockGroups.find(g => g.name === selectedSubject);
        isExistingSubject = !!group;
        subjectRoles = group?.roles.map(r => r.role) || [];
      }
      
      // Get the specific OpenShift custom roles that the subject has
      const subjectOpenShiftCustomRoles = subjectRoles.filter(roleName => {
        const role = mockAvailableRoles.find(r => r.name === roleName);
        return role?.roleType === 'openshift-custom';
      });
      
      // Filter roles: exclude OpenShift custom roles that the subject doesn't have
      const filteredRoles = mockAvailableRoles.filter(role => {
        // If it's not an OpenShift custom role, always include it
        if (role.roleType !== 'openshift-custom') {
          return true;
        }
        // If it's an OpenShift custom role, only include it if the subject has it
        return subjectOpenShiftCustomRoles.includes(role.name);
      });
      
      setRoles(filteredRoles.map(role => {
        const isAssigned = subjectRoles.includes(role.name);
        return {
          ...role,
          originallyAssigned: isAssigned,
          currentlyAssigned: isAssigned,
        };
      }));
    } else {
      setRoles(mockAvailableRoles.map(role => ({ 
        ...role, 
        originallyAssigned: false, 
        currentlyAssigned: false 
      })));
    }
  }, [selectedSubject, subjectType]);

  const handleRoleToggle = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    const isEnabling = role ? !role.currentlyAssigned : false;
    setRoles((prev) =>
      prev.map((r) =>
        r.id === roleId ? { ...r, currentlyAssigned: !r.currentlyAssigned } : r
      )
    );
    if (assignRolesVariant === 'option2' && role && isEnabling) {
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

  const getRoleStatus = (role: Role): string => {
    if (role.currentlyAssigned && role.originallyAssigned) {
      return 'Assigned';
    } else if (role.currentlyAssigned && !role.originallyAssigned) {
      return 'Assigning';
    } else if (!role.currentlyAssigned && role.originallyAssigned) {
      return 'Unassigning';
    }
    return '-';
  };

  const getStatusPriority = (status: string): number => {
    if (status === 'Assigned') return 1;
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

  const getSortedRoles = (): Role[] => {
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

  const getRoleNameSortParams = () => ({
    sortBy: roleNameSortBy,
    onSort: (_event: any, index: number, direction: 'asc' | 'desc') => {
      setRoleNameSortBy({ index, direction });
      setOption2ActiveSort('roleName');
    },
    columnIndex: 1,
  });

  const getOption2StatusSortParams = () => {
    // Status column index: 4 (because Role type column is always present)
    return {
      sortBy: option2StatusSortBy,
      onSort: (_event: any, index: number, direction: 'asc' | 'desc') => {
        setOption2StatusSortBy({ index, direction });
        setOption2ActiveSort('status');
      },
      columnIndex: 4,
    };
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
  const getImagestreamSelectionForRole = (roleId: string): ResourceSelection =>
    roleImagestreamSelection[roleId] ?? { type: 'all' };
  const getPVCSelectionForRole = (roleId: string): ResourceSelection =>
    rolePVCSelection[roleId] ?? { type: 'all' };
  const getPodSelectionForRole = (roleId: string): ResourceSelection =>
    rolePodSelection[roleId] ?? { type: 'all' };
  const getEnvVarSelectionForRole = (roleId: string): ResourceSelection =>
    roleEnvVarSelection[roleId] ?? { type: 'all' };
  const getHardwareProfileSelectionForRole = (roleId: string): ResourceSelection =>
    roleHardwareProfileSelection[roleId] ?? { type: 'all' };

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
    isDisabled?: boolean,
    dropdownId?: string
  ) => {
    const did = dropdownId ?? role.id;
    if (!resourceMenuRefMap.current[did]) {
      resourceMenuRefMap.current[did] = { current: null };
    }
    const menuRef = resourceMenuRefMap.current[did];
    const filteredOptions = searchValue
      ? options.filter(
          (opt) =>
            opt.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            opt.id.toLowerCase().includes(searchValue.toLowerCase())
        )
      : options;
    const selectedIds = selection.type === 'specific' ? selection.selectedIds : [];
    const maxChips = 3;
    const isOpen = openResourcesDropdownRoleId === did;
    const toggleRefObj = { get current() { return resourceToggleRefMap.current[did] ?? null; } };
    const dropdown = (
      <MenuContainer
        isOpen={isDisabled ? false : isOpen}
        onOpenChange={(open) => {
          if (isDisabled && open) return;
          setOpenResourcesDropdownRoleId(open ? did : null);
          if (!open) setSearchValue('');
        }}
        menuRef={menuRef as React.RefObject<HTMLDivElement>}
        toggleRef={toggleRefObj as React.RefObject<HTMLElement | null>}
        menu={
          <Menu
            ref={menuRef as React.RefObject<HTMLDivElement>}
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
            ref={(el) => { resourceToggleRefMap.current[did] = el; }}
            variant="typeahead"
            onClick={() => { if (isDisabled) return; setOpenResourcesDropdownRoleId(isOpen ? null : did); }}
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
                onClick={() => { if (isDisabled) return; setOpenResourcesDropdownRoleId(isOpen ? null : did); }}
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
          height: '18px',
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

  const renderRoleTypeLabels = (role: Role) => {
    if (role.roleType === 'openshift-default') {
      // For OpenShift default roles, show AI label and OpenShift default label
      const aiPopoverId = `ai-assign-${role.id}`;
      const openshiftLabel = (
        <Label 
          color="grey" 
          variant="outline" 
          isCompact
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', height: '18px' }}
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
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', height: '18px' }}
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
      const aiPopoverId = `ai-assign-${role.id}`;
      return renderAILabel(aiPopoverId);
    }
  };

  const renderStatusBadge = (role: Role) => {
    const status = getRoleStatus(role);
    
    // If role was originally assigned but is now deselected, only show "Unassigning" label
    if (role.originallyAssigned && !role.currentlyAssigned) {
      const isOpenShiftCustom = role.roleType === 'openshift-custom';
      
      if (isOpenShiftCustom) {
        const unassigningPopoverId = `unassigning-popover-${role.id}`;
        const helpTextPopoverId = `help-text-popover-${role.id}`;
        const helpTextElement = (
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
              {helpTextElement}
            </Popover>
          </Flex>
        );
      }
      
      return <Label color="red" variant="outline" isCompact>Unassigning</Label>;
    }
    
    // Otherwise show single status label
    if (status === 'Assigned') {
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
    setRoleModalTabKey(0);
    setIsRoleModalOpen(true);
  };

  const getAssigneesSortParams = (columnIndex: number) => ({
    sortBy: assigneesSortBy,
    onSort: (_event: any, index: number, direction: 'asc' | 'desc') => {
      setAssigneesSortBy({ index, direction });
    },
    columnIndex,
  });

  const getSortedAssignees = (assignees: RoleAssignee[]): RoleAssignee[] => {
    const sorted = [...assignees];
    const columnIndex = assigneesSortBy.index;
    const direction = assigneesSortBy.direction;

    sorted.sort((a, b) => {
      let comparison = 0;
      
      if (columnIndex === 0) {
        // Sort by Subject
        comparison = a.subject.localeCompare(b.subject);
      } else if (columnIndex === 1) {
        // Sort by Subject kind
        comparison = a.subjectType.localeCompare(b.subjectType);
      } else if (columnIndex === 2) {
        // Sort by Role binding
        comparison = a.roleBinding.localeCompare(b.roleBinding);
      } else if (columnIndex === 3) {
        // Sort by Date created
        comparison = a.dateCreated.localeCompare(b.dateCreated);
      }

      return direction === 'asc' ? comparison : -comparison;
    });

    return sorted;
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
  const hasChanges = roles.some((role) => {
    // Check if the role's currentlyAssigned state differs from its originallyAssigned state
    return role.currentlyAssigned !== role.originallyAssigned;
  });

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
      {/* Assign roles comparison bar */}
      <div style={{
        backgroundColor: '#f0e6ff',
        padding: '16px',
        borderBottom: '1px solid var(--pf-v5-global--BorderColor--200)'
      }}>
        <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsLg' }}>
          <FlexItem>
            <span style={{ fontWeight: 600, fontSize: 'var(--pf-v5-global--FontSize--md)' }}>Assign roles comparison</span>
          </FlexItem>
          <FlexItem>
            <Select
              isOpen={isAssignRolesVariantDropdownOpen}
              onOpenChange={(isOpen) => setIsAssignRolesVariantDropdownOpen(isOpen)}
              selected={assignRolesVariant}
              onSelect={(_event, value) => {
                setAssignRolesVariant(value as 'option1' | 'option2');
                setIsAssignRolesVariantDropdownOpen(false);
              }}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  onClick={() => setIsAssignRolesVariantDropdownOpen(!isAssignRolesVariantDropdownOpen)}
                  isExpanded={isAssignRolesVariantDropdownOpen}
                  style={{ minWidth: '320px' }}
                >
                  {assignRolesVariant === 'option1' ? 'Option 1 (original design)' : 'Option 2 (Concept for testing)'}
                </MenuToggle>
              )}
            >
              <SelectList>
                <SelectOption value="option1">Option 1 (original design)</SelectOption>
                <SelectOption value="option2">Option 2 (Concept for testing)</SelectOption>
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
            <BreadcrumbItem isActive>Manage permissions</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <PageSection>
        <Title headingLevel="h1" size="2xl">
          Manage permissions
        </Title>
        <Content style={{ marginTop: 'var(--pf-v5-global--spacer--sm)' }}>
          Choose a user or group, then assign or manage roles to define their permissions.
        </Content>
      </PageSection>

      <PageSection isFilled>
        <div style={{ maxWidth: '840px' }}>
          <Stack hasGutter>
            <StackItem>
              <Title headingLevel="h2" size="lg">Subject</Title>
              <Content style={{ marginTop: '8px' }}>
                Select a subject with existing roles or enter a new subject.
              </Content>
              <Form style={{ marginTop: '16px' }}>
                {!isOption2 && (
                  <FormGroup label="Subject kind" fieldId="subject-type">
                <Flex spaceItems={{ default: 'spaceItemsLg' }}>
                  <Radio
                    id="subject-type-user"
                    name="subject-type"
                    label="User"
                    isChecked={subjectType === 'User'}
                    onChange={() => handleSubjectTypeChange('User')}
                  />
                  <Radio
                    id="subject-type-group"
                    name="subject-type"
                    label="Group"
                    isChecked={subjectType === 'Group'}
                    onChange={() => handleSubjectTypeChange('Group')}
                  />
                </Flex>
              </FormGroup>
                )}

                <FormGroup 
                  label={subjectType === 'User' ? 'User name' : 'Group name'}
                  fieldId="subject-name"
                  isRequired
                >
                  {isOption2 ? (
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
                      <span>{selectedSubject || `Select ${subjectType.toLowerCase()}`}</span>
                  </div>
                  ) : (
                    <>
                      <Select
                        isOpen={customTypeaheadOpen}
                        onOpenChange={(open) => {
                          setCustomTypeaheadOpen(open);
                          if (!open) setTypeaheadInputValue('');
                        }}
                        onSelect={(_ev, value) => {
                          const selValue = String(value);
                          if (selValue === '__group_header__' || selValue === '__no_results__') return;
                          let selectedValue = selValue;
                          const isCreateOption = selValue.startsWith('Assign role to "') && selValue.endsWith('"');
                          if (isCreateOption) {
                            selectedValue = selValue.slice('Assign role to "'.length, -1);
                          }
                          setCustomTypeaheadOpen(false);
                          setTypeaheadInputValue('');
                          let shouldShowModal = false;
                          let preserveRoles = false;
                          if (hasChanges && selectedSubject) {
                            const currentIsExisting = isExistingSubject(selectedSubject);
                            const newIsExisting = isExistingSubject(selectedValue);
                            if (!currentIsExisting && !newIsExisting) {
                              preserveRoles = true;
                            } else {
                              shouldShowModal = true;
                            }
                          }
                          if (shouldShowModal) {
                            setPendingSubject(selectedValue);
                            setIsDiscardModalOpen(true);
                          } else {
                            if (preserveRoles) setShouldPreserveRoles(true);
                            setSelectedSubject(selectedValue);
                          }
                        }}
                        toggle={(toggleRef) => (
                          <MenuToggle
                            ref={toggleRef}
                            variant="typeahead"
                            aria-label="Typeahead menu toggle"
                            onClick={() => setCustomTypeaheadOpen(!customTypeaheadOpen)}
                            isExpanded={customTypeaheadOpen}
                            isFullWidth
                          >
                            <TextInputGroup isPlain>
                              <TextInputGroupMain
                                value={typeaheadInputValue !== '' ? typeaheadInputValue : (selectedSubject || '')}
                                onChange={(_e, val) => {
                                  setTypeaheadInputValue(val);
                                  setCustomTypeaheadOpen(true);
                                }}
                                onClick={() => setCustomTypeaheadOpen(true)}
                                placeholder={`Select ${subjectType.toLowerCase()}`}
                                autoComplete="off"
                                role="combobox"
                                isExpanded={customTypeaheadOpen}
                                aria-controls="typeahead-subject-listbox"
                              />
                              {(typeaheadInputValue !== '' || selectedSubject) && (
                                <TextInputGroupUtilities>
                                  <Button
                                    variant="plain"
                                    onClick={() => {
                                      if (hasChanges && selectedSubject) {
                                        setPendingSubject(undefined);
                                        setIsDiscardModalOpen(true);
                                      } else {
                                        setSelectedSubject(undefined);
                                        setTypeaheadInputValue('');
                                        setShouldPreserveRoles(false);
                                      }
                                      setCustomTypeaheadOpen(false);
                                    }}
                                    aria-label="Clear input value"
                                    icon={<TimesIcon />}
                                  />
                                </TextInputGroupUtilities>
                              )}
                            </TextInputGroup>
                          </MenuToggle>
                        )}
                      >
                        <SelectList id="typeahead-subject-listbox">
                          {typeaheadInputValue && (
                            <SelectOption value={`Assign role to "${typeaheadInputValue}"`}>
                              Assign role to &quot;{typeaheadInputValue}&quot;
                            </SelectOption>
                          )}
                          {filteredSubjectsForTypeahead.length > 0 && (
                            <>
                              <SelectOption
                                isAriaDisabled
                                value="__group_header__"
                                style={{
                                  fontSize: 'var(--pf-v6-global--FontSize--sm, 12px)',
                                  fontWeight: 700,
                                  color: 'var(--pf-v6-global--Color--200, #6a6e73)',
                                  pointerEvents: 'none',
                                }}
                              >
                                {subjectType === 'User' ? 'Users with existing assignment' : 'Groups with existing assignment'}
                              </SelectOption>
                              {filteredSubjectsForTypeahead.map((subject) => (
                                <SelectOption key={subject} value={subject} isSelected={subject === selectedSubject}>
                                  {subject}
                                </SelectOption>
                              ))}
                            </>
                          )}
                          {typeaheadInputValue && filteredSubjectsForTypeahead.length === 0 && (
                            <SelectOption isAriaDisabled value="__no_results__">
                              No {subjectType.toLowerCase()} was found for &quot;{typeaheadInputValue}&quot;
                            </SelectOption>
                          )}
                        </SelectList>
                      </Select>
                      <HelperText>
                        <HelperTextItem>
                          {subjectType === 'User' 
                            ? 'Only users with existing roles are listed. To add someone new, enter their username.'
                            : 'Only groups with existing roles are listed. To add someone new, enter their group name.'}
                        </HelperTextItem>
                      </HelperText>
                    </>
                  )}
              </FormGroup>
            </Form>
          </StackItem>

          {/* Role assignment section - always takes up space, but content is hidden when no subject selected */}
          <StackItem style={{ marginTop: '40px', visibility: selectedSubject ? 'visible' : 'hidden' }}>
            <Title headingLevel="h2" size="lg">Role assignment</Title>
            <Content style={{ marginTop: '16px', marginBottom: '8px' }}>
              Check the role to grant the relevant permissions.
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

            {assignRolesVariant === 'option1' ? (
              <Table variant="compact" aria-label="Roles table">
                  <Thead>
                    <Tr>
                      <Th />
                      <Th sort={getRoleNameSortParams()}>Role</Th>
                      <Th>Description</Th>
                      <Th
                        info={{
                          popover: (
                            <Content>
                              <Content component="ul" className="pf-v6-c-content--ul" style={{ margin: '0px' }}>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>AI roles</strong> are intended for use in, and can be assigned from, OpenShift AI.
                                </Content>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>OpenShift default roles</strong> are OOTB OpenShift roles that can be assigned from OpenShift or OpenShift AI.
                                </Content>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>OpenShift custom roles</strong> are admin-created roles that can only be assigned from OpenShift.
                                </Content>
                              </Content>
                            </Content>
                          ),
                          ariaLabel: 'Role type labels help',
                          popoverProps: {}
                        }}
                      >
                        Role type
                      </Th>
                      <Th
                        sort={getOption2StatusSortParams()}
                        modifier="nowrap"
                        info={{
                          popover: (
                            <Content>
                              <Content component="ul" className="pf-v6-c-content--ul" style={{ margin: '0px', paddingLeft: '20px' }}>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>Assigned:</strong> The role is applied to the user or group.
                                </Content>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>Assigning:</strong> The role will be applied when changes are saved.
                                </Content>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>Unassigning:</strong> The role will be revoked when changes are saved.
                                </Content>
                              </Content>
                            </Content>
                          ),
                          ariaLabel: 'Assignment status help',
                          popoverProps: {}
                        }}
                      >
                        Assignment status
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {sortedRoles.length === 0 ? (
                      <Tr>
                        <Td colSpan={5} style={{ textAlign: 'center', padding: 'var(--pf-v5-global--spacer--xl)' }}>
                          No roles available
                        </Td>
                      </Tr>
                    ) : (
                      sortedRoles.map((role) => (
                        <Tr key={role.id}>
                          <Td>
                            <Checkbox
                              id={`role-${role.id}`}
                              isChecked={role.currentlyAssigned}
                              onChange={() => handleRoleToggle(role.id)}
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
                          <Td>{role.description}</Td>
                          <Td>{renderRoleTypeLabels(role)}</Td>
                          <Td>{renderStatusBadge(role)}</Td>
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>
            ) : (
              <div key="option2-role-table" style={{ width: '960px' }}>
                <Table variant="compact" aria-label="Roles table" isExpandable hasAnimations>
                  <Thead>
                    <Tr>
                      <Th screenReaderText="Row expansion" />
                      <Th />
                      <Th sort={getRoleNameSortParams()}>Role name</Th>
                      <Th>Description</Th>
                      <Th
                        info={{
                          popover: (
                            <Content>
                              <Content component="ul" className="pf-v6-c-content--ul" style={{ margin: '0px' }}>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>AI roles</strong> are intended for use in, and can be assigned from, OpenShift AI.
                                </Content>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>OpenShift default roles</strong> are OOTB OpenShift roles that can be assigned from OpenShift or OpenShift AI.
                                </Content>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>OpenShift custom roles</strong> are admin-created roles that can only be assigned from OpenShift.
                                </Content>
                              </Content>
                            </Content>
                          ),
                          ariaLabel: 'Role type labels help',
                          popoverProps: {}
                        }}
                      >
                        Role type
                      </Th>
                      <Th
                        sort={getOption2StatusSortParams()}
                        modifier="nowrap"
                        info={{
                          popover: (
                            <Content>
                              <Content component="ul" className="pf-v6-c-content--ul" style={{ margin: '0px', paddingLeft: '20px' }}>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>Assigned:</strong> The role is applied to the user or group.
                                </Content>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>Assigning:</strong> The role will be applied when changes are saved.
                                </Content>
                                <Content component="li" className="pf-v6-c-content--li">
                                  <strong>Unassigning:</strong> The role will be revoked when changes are saved.
                                </Content>
                              </Content>
                            </Content>
                          ),
                          ariaLabel: 'Assignment status help',
                          popoverProps: {}
                        }}
                      >
                        Assignment status
                      </Th>
                    </Tr>
                  </Thead>
                  {sortedRoles.length === 0 ? (
                  <Tbody>
                      <Tr>
                        <Td colSpan={6} style={{ textAlign: 'center', padding: 'var(--pf-v5-global--spacer--xl)' }}>
                          No roles available
                        </Td>
                      </Tr>
                    </Tbody>
                  ) : (
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
                                  onChange={() => handleRoleToggle(role.id)}
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
                            <Td>{role.description}</Td>
                            <Td>{renderRoleTypeLabels(role)}</Td>
                            <Td>{renderStatusBadge(role)}</Td>
                          </Tr>
                            <Tr isExpanded={isExpanded}>
                            <Td noPadding dataLabel="Details expanded" colSpan={6}>
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
                                                  : isWorkbenchResourceRole(role)
                                                    ? rule.resources.some(r => r === 'Workbench')
                                                      ? renderResourceDropdown(role, MOCK_WORKBENCHES, ALL_WORKBENCHES_VALUE, 'All workbenches', 'Find by workbench name', 'Select a workbench', getWorkbenchSelectionForRole(role.id), setRoleWorkbenchSelection, workbenchSearchValue, setWorkbenchSearchValue, !role.currentlyAssigned)
                                                      : rule.resources.some(r => r === 'notebooks')
                                                        ? renderResourceDropdown(role, MOCK_WORKBENCHES, ALL_WORKBENCHES_VALUE, 'All workbenches', 'Find by workbench name', 'Select a workbench', getWorkbenchSelectionForRole(role.id), setRoleWorkbenchSelection, workbenchSearchValue, setWorkbenchSearchValue, !role.currentlyAssigned, `${role.id}-${ruleIndex}`)
                                                        : rule.resources.some(r => r === 'imagestreams')
                                                          ? renderResourceDropdown(role, MOCK_IMAGESTREAMS, ALL_IMAGESTREAMS_VALUE, 'All imagestreams', 'Find by imagestream name', 'Select an imagestream', getImagestreamSelectionForRole(role.id), setRoleImagestreamSelection, imagestreamSearchValue, setImagestreamSearchValue, !role.currentlyAssigned, `${role.id}-${ruleIndex}`)
                                                          : rule.resources.some(r => r === 'persistentvolumeclaims')
                                                            ? renderResourceDropdown(role, MOCK_PVCS, ALL_PVCS_VALUE, 'All PVCs', 'Find by PVC name', 'Select a PVC', getPVCSelectionForRole(role.id), setRolePVCSelection, pvcSearchValue, setPVCSearchValue, !role.currentlyAssigned, `${role.id}-${ruleIndex}`)
                                                            : rule.resources.some(r => r === 'pods' || r === 'statefulsets')
                                                              ? renderResourceDropdown(role, MOCK_PODS, ALL_PODS_VALUE, 'All pods', 'Find by pod name', 'Select a pod', getPodSelectionForRole(role.id), setRolePodSelection, podSearchValue, setPodSearchValue, !role.currentlyAssigned, `${role.id}-${ruleIndex}`)
                                                              : rule.resources.some(r => r === 'secrets' || r === 'configmaps')
                                                                ? renderResourceDropdown(role, MOCK_ENV_VARS, ALL_ENV_VARS_VALUE, 'All environment variables', 'Find by name', 'Select an environment variable', getEnvVarSelectionForRole(role.id), setRoleEnvVarSelection, envVarSearchValue, setEnvVarSearchValue, !role.currentlyAssigned, `${role.id}-${ruleIndex}`)
                                                                : rule.resources.some(r => r === 'hardwareprofiles')
                                                                  ? renderResourceDropdown(role, MOCK_HARDWARE_PROFILES, ALL_HARDWARE_PROFILES_VALUE, 'All hardware profiles', 'Find by profile name', 'Select a hardware profile', getHardwareProfileSelectionForRole(role.id), setRoleHardwareProfileSelection, hardwareProfileSearchValue, setHardwareProfileSearchValue, !role.currentlyAssigned, `${role.id}-${ruleIndex}`)
                                                                  : (rule.resourceNames?.join(', ') || '-')
                                                    : ruleIndex === 0 && isPipelineResourceRole(role)
                                                      ? renderResourceDropdown(role, MOCK_PIPELINES, ALL_PIPELINES_VALUE, 'All pipelines', 'Find by pipeline name', 'Select a pipeline', getPipelineSelectionForRole(role.id), setRolePipelineSelection, pipelineSearchValue, setPipelineSearchValue, !role.currentlyAssigned)
                                                      : ruleIndex === 0 && isDeploymentResourceRole(role)
                                                        ? renderResourceDropdown(role, MOCK_DEPLOYMENTS, ALL_DEPLOYMENTS_VALUE, 'All deployments', 'Find by deployment name', 'Select a deployment', getDeploymentSelectionForRole(role.id), setRoleDeploymentSelection, deploymentSearchValue, setDeploymentSearchValue, !role.currentlyAssigned)
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
                  )}
                </Table>
              </div>
            )}
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
                      isDisabled={!hasChanges || !selectedSubject}
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

      {/* Role Rules Modal */}
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
              <span style={{ fontWeight: 'normal' }}>{selectedRoleForModal && renderRoleTypeLabels(selectedRoleForModal)}</span>
            </div>
          }
          description={selectedRoleForModal?.description}
        />
        <ModalBody>
          <Tabs
            activeKey={roleModalTabKey}
            onSelect={(_event, tabIndex) => setRoleModalTabKey(tabIndex)}
            aria-label="Role details tabs"
          >
            <Tab eventKey={0} title={<TabTitleText>Role details</TabTitleText>}>
              <div style={{ marginTop: '24px' }}>
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
              </div>
            </Tab>
            <Tab eventKey={1} title={<TabTitleText>Assignees</TabTitleText>}>
              <div style={{ marginTop: '24px' }}>
                <Table variant="compact" aria-label="Role assignees table">
                  <Thead>
                    <Tr>
                      <Th sort={getAssigneesSortParams(0)}>
                        Subject
                      </Th>
                      <Th sort={getAssigneesSortParams(1)}>
                        Subject kind
                      </Th>
                      <Th sort={getAssigneesSortParams(2)}>
                        Role binding
                      </Th>
                      <Th 
                        sort={getAssigneesSortParams(3)}
                        info={{
                          popover: (
                            <Content>
                              <Content component="small" className="pf-v6-c-content--small" style={{ color: 'var(--pf-t--global--text--color--regular)' }}>
                                Date when the role assignment was created.
                              </Content>
                            </Content>
                          ),
                          ariaLabel: 'Date created help',
                          popoverProps: { headerContent: 'Date created' }
                        }}
                      >
                        Date created
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selectedRoleForModal && getSortedAssignees(getRoleAssignees(selectedRoleForModal.name)).map((assignee, index) => (
                      <Tr key={index}>
                        <Td>{assignee.subject}</Td>
                        <Td>{assignee.subjectType}</Td>
                        <Td>{assignee.roleBinding}</Td>
                        <Td>{assignee.dateCreated}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </ModalBody>
      </Modal>

      {/* Discard Changes Confirmation Modal */}
      <Modal
        isOpen={isDiscardModalOpen}
        onClose={() => {
          setIsDiscardModalOpen(false);
          setPendingSubject(undefined);
          setPendingSubjectType(undefined);
          setShouldPreserveRoles(false);
          setTypeaheadInputValue('');
        }}
        variant="small"
        aria-labelledby="discard-changes-modal-title"
      >
        <ModalHeader
          title="Discard changes"
          titleIconVariant="warning"
        />
        <ModalBody style={{ marginBottom: '0' }}>
          <Content>
            {pendingSubjectType
              ? `Switching the subject kind will discard any changes you've made in the Role assignment section.`
              : pendingSubject === undefined
              ? `Clearing the ${subjectType.toLowerCase()} selection will discard any changes you've made in the Role assignment section.`
              : pendingSubject && isExistingSubject(pendingSubject)
              ? `Switching to a different existing ${subjectType.toLowerCase()} will discard any changes you've made in the Role assignment section.`
              : `Switching to a new ${subjectType.toLowerCase()} will discard any changes you've made in the Role assignment section.`}
          </Content>
        </ModalBody>
        <div style={{ padding: '24px' }}>
          <div className="pf-v6-c-action-list">
            <div className="pf-v6-c-action-list__item">
              <Button
                variant="primary"
                isDanger
                onClick={() => {
                  // Proceed with the change or clear action
                  if (pendingSubjectType) {
                    // Subject type change
                    setSubjectType(pendingSubjectType);
                    setPendingSubjectType(undefined);
                  } else if (pendingSubject === undefined) {
                    // Clear action
                    setSelectedSubject(undefined);
                    setTypeaheadInputValue('');
                    setShouldPreserveRoles(false);
                  } else {
                    // Switch to new subject
                    setTypeaheadInputValue('');
                    setShouldPreserveRoles(false); // Don't preserve roles when discarding
                    setSelectedSubject(pendingSubject);
                  }
                  setIsDiscardModalOpen(false);
                  setPendingSubject(undefined);
                }}
              >
                Discard
              </Button>
            </div>
            <div className="pf-v6-c-action-list__item">
              <Button
                variant="link"
                onClick={() => {
                  setIsDiscardModalOpen(false);
                  setPendingSubject(undefined);
                  setPendingSubjectType(undefined);
                  setShouldPreserveRoles(false);
                  setTypeaheadInputValue('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
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
                The roles of <span style={{ fontWeight: 600 }}>{selectedSubject}</span> will be changed as listed below.
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
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', height: '18px' }}
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
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', height: '18px' }}
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
              
              if (willLoseAllRoles && selectedSubject) {
                return (
                  <>
                    <StackItem>
                      <Content>
                        <span style={{ fontWeight: 600 }}>{selectedSubject}</span> will lose all permissions and be removed from the current project. Type <span style={{ fontWeight: 600 }}>{selectedSubject}</span> to confirm deletion:
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
                  
                  if (willLoseAllRoles && selectedSubject && confirmInputValue !== selectedSubject) {
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
                  return !!(willLoseAllRoles && selectedSubject && confirmInputValue !== selectedSubject);
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

export { RoleAssignmentPage };
