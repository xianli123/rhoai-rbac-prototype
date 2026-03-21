export interface SharedRole {
  id: string;
  name: string;
  openshiftName: string;
  description: string;
  category: string;
  roleType: 'openshift-default' | 'openshift-custom' | 'regular';
}

export let sharedRoles: SharedRole[] = [
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

export const addSharedRole = (role: Omit<SharedRole, 'id'>): void => {
  const newId = String(sharedRoles.length + 1);
  sharedRoles = [...sharedRoles, { ...role, id: newId }];
};
