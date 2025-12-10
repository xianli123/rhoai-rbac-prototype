import { Tier } from '@app/Settings/Tiers/types';
import { mockTiers } from '@app/Settings/Tiers/mockData';

/**
 * Mock function to get the current user's groups
 * In a real implementation, this would come from the authentication context
 */
export const getCurrentUserGroups = (): string[] => {
  // Mock: Return groups for the current user (AI Admin in this case)
  // This would typically come from Kubernetes RBAC or authentication context
  return ['standard-users', 'dev-team', 'data-science-team'];
};

/**
 * Get all tiers that apply to a user based on their group membership
 * @param userGroups - Array of group IDs the user belongs to
 * @returns Array of tiers that apply to the user
 */
export const getTiersForUser = (userGroups: string[]): Tier[] => {
  return mockTiers.filter(
    (tier) =>
      tier.status === 'Active' &&
      tier.groups.some((group) => userGroups.includes(group))
  );
};

/**
 * Get the highest tier for a user based on tier level
 * Users in multiple groups inherit the tier with the highest level
 * @param userGroups - Array of group IDs the user belongs to
 * @returns The highest level tier, or undefined if no tiers apply
 */
export const getHighestTierForUser = (userGroups: string[]): Tier | undefined => {
  const userTiers = getTiersForUser(userGroups);
  
  if (userTiers.length === 0) {
    return undefined;
  }
  
  // Return tier with highest level number
  return userTiers.reduce((highest, current) =>
    current.level > highest.level ? current : highest
  );
};

/**
 * Get the highest tier for the current user
 * @returns The highest level tier for the current user, or undefined if no tiers apply
 */
export const getCurrentUserHighestTier = (): Tier | undefined => {
  const userGroups = getCurrentUserGroups();
  return getHighestTierForUser(userGroups);
};

/**
 * Check if a user has access to MaaS models (i.e., has at least one tier assigned)
 * @param userGroups - Array of group IDs the user belongs to
 * @returns True if the user has at least one active tier
 */
export const userHasTierAccess = (userGroups: string[]): boolean => {
  return getTiersForUser(userGroups).length > 0;
};

