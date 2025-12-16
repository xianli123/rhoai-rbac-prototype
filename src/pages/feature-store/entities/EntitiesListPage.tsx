import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageSection,
  Title,
  Content,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  SearchInput,
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  LabelGroup,
  Label,
  Flex,
  FlexItem,
  Button,
  MenuToggle,
  MenuToggleElement,
  Select,
  SelectList,
  SelectOption,
  Pagination,
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import { SearchIcon } from '@patternfly/react-icons';
import { mockEntities, Entity } from '../../../mockData/entities';

/**
 * EntitiesListPage Component
 * Displays a list of Feature Store entities with search and filtering capabilities
 */
export const EntitiesListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('Entities');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Format date to match design (e.g., "Jan 2020, 23:33 UTC")
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
    return `${month} ${year}, ${time} UTC`;
  };

  // Mock data for owner and feature views count (would come from API in production)
  const getEntityExtras = (entityId: string) => {
    const extras: Record<string, { owner: string; featureViewsCount: number }> = {
      'entity-001': { owner: 'acorvin@redhat.com', featureViewsCount: 2 },
      'entity-002': { owner: 'acorvin@redhat.com', featureViewsCount: 1 },
      'entity-003': { owner: 'jsmith@redhat.com', featureViewsCount: 3 },
      'entity-004': { owner: 'acorvin@redhat.com', featureViewsCount: 1 },
      'entity-005': { owner: 'mjones@redhat.com', featureViewsCount: 2 },
    };
    return extras[entityId] || { owner: 'unknown@redhat.com', featureViewsCount: 0 };
  };

  // Filter entities based on search value and selected filter column
  const filteredEntities = useMemo(() => {
    if (!searchValue) {
      return mockEntities;
    }
    const searchLower = searchValue.toLowerCase();
    return mockEntities.filter(entity => {
      const extras = getEntityExtras(entity.id);
      switch (selectedFilter) {
        case 'Entities':
          return entity.name.toLowerCase().includes(searchLower) ||
                 entity.description.toLowerCase().includes(searchLower);
        case 'Tags':
          return entity.tags.some(tag => tag.toLowerCase().includes(searchLower));
        case 'Join key':
          return entity.joinKey.toLowerCase().includes(searchLower);
        case 'Value type':
          return entity.valueType.toLowerCase().includes(searchLower);
        case 'Feature views':
          return extras.featureViewsCount.toString().includes(searchLower);
        case 'Created':
          return formatDate(entity.created).toLowerCase().includes(searchLower);
        case 'Updated':
          return formatDate(entity.lastUpdated).toLowerCase().includes(searchLower);
        case 'Owner':
          return extras.owner.toLowerCase().includes(searchLower);
        default:
          return true;
      }
    });
  }, [searchValue, selectedFilter]);

  // Pagination logic
  const paginatedEntities = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return filteredEntities.slice(start, end);
  }, [filteredEntities, page, perPage]);

  const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
    setPage(newPage);
  };

  const onPerPageSelect = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  // Handle navigation to entity detail page
  const handleEntityClick = (entityId: string) => {
    navigate(`/develop-and-train/feature-store/entities/${entityId}`);
  };

  // Column definitions
  const columns = [
    'Entities',
    'Tags',
    'Join key',
    'Value type',
    'Feature views',
    'Created',
    'Updated',
    'Owner',
  ];

  return (
    <>
      {/* Page Header Section */}
      <PageSection>
        <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsSm' }}>
          <FlexItem>
            <Title headingLevel="h1" size="2xl">
              Entities
            </Title>
          </FlexItem>
          <FlexItem>
            <Content component="p">
              Manage and discover feature entities.
            </Content>
          </FlexItem>
        </Flex>
      </PageSection>

      {/* Toolbar Section */}
      <PageSection padding={{ default: 'noPadding' }}>
        <Toolbar id="entities-toolbar" clearAllFilters={() => setSearchValue('')}>
          <ToolbarContent>
            <ToolbarItem>
              <Select
                aria-label="Select filter attribute"
                isOpen={isFilterDropdownOpen}
                selected={selectedFilter}
                onSelect={(_event, value) => {
                  setSelectedFilter(value as string);
                  setIsFilterDropdownOpen(false);
                  setPage(1);
                }}
                onOpenChange={(isOpen) => setIsFilterDropdownOpen(isOpen)}
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                    isExpanded={isFilterDropdownOpen}
                    aria-label="Select filter attribute"
                  >
                    {selectedFilter}
                  </MenuToggle>
                )}
                shouldFocusToggleOnSelect
              >
                <SelectList>
                  {columns.map((column) => (
                    <SelectOption key={column} value={column} />
                  ))}
                </SelectList>
              </Select>
            </ToolbarItem>
            <ToolbarItem>
              <SearchInput
                placeholder={`Filter by ${selectedFilter}`}
                value={searchValue}
                onChange={(_event, value) => {
                  setSearchValue(value);
                  setPage(1);
                }}
                onClear={() => {
                  setSearchValue('');
                  setPage(1);
                }}
                aria-label={`Filter entities by ${selectedFilter}`}
              />
            </ToolbarItem>
            <ToolbarItem variant="pagination">
              <Pagination
                itemCount={filteredEntities.length}
                perPage={perPage}
                page={page}
                onSetPage={onSetPage}
                onPerPageSelect={onPerPageSelect}
                variant="top"
                isCompact
              />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </PageSection>

      {/* Table Section */}
      <PageSection>
        {filteredEntities.length === 0 ? (
          // Empty State
          <EmptyState variant={EmptyStateVariant.sm} icon={SearchIcon}>
            <Title headingLevel="h2" size="lg">
              No results found
            </Title>
            <EmptyStateBody>
              No entities match your search criteria. Try adjusting your search term.
            </EmptyStateBody>
            <Button variant="link" onClick={() => setSearchValue('')}>
              Clear search
            </Button>
          </EmptyState>
        ) : (
          <>
            {/* Data Table */}
            <Table aria-label="Entities table" variant="compact">
              <Thead>
                <Tr>
                  {columns.map((column, index) => (
                    <Th key={index}>{column}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {paginatedEntities.map((entity) => {
                const extras = getEntityExtras(entity.id);
                return (
                  <Tr key={entity.id}>
                    {/* Entities Column - Name with Description */}
                    <Td dataLabel="Entities">
                      <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsNone' }}>
                        <FlexItem>
                          <Button
                            variant="link"
                            isInline
                            onClick={() => handleEntityClick(entity.id)}
                          >
                            {entity.name}
                          </Button>
                        </FlexItem>
                        <FlexItem>
                          <Content component="small">
                            {entity.description}
                          </Content>
                        </FlexItem>
                      </Flex>
                    </Td>

                    {/* Tags Column */}
                    <Td dataLabel="Tags">
                      <LabelGroup numLabels={2}>
                        {entity.tags.map((tag, index) => (
                          <Label key={index} color="blue">
                            {tag}
                          </Label>
                        ))}
                      </LabelGroup>
                    </Td>

                    {/* Join Key Column */}
                    <Td dataLabel="Join key">{entity.joinKey}</Td>

                    {/* Value Type Column */}
                    <Td dataLabel="Value type">{entity.valueType}</Td>

                    {/* Feature Views Column */}
                    <Td dataLabel="Feature views">
                      <Button
                        variant="link"
                        isInline
                        onClick={() => handleEntityClick(entity.id)}
                      >
                        {extras.featureViewsCount} feature view{extras.featureViewsCount !== 1 ? 's' : ''}
                      </Button>
                    </Td>

                    {/* Created Column */}
                    <Td dataLabel="Created">{formatDate(entity.created)}</Td>

                    {/* Updated Column */}
                    <Td dataLabel="Updated">{formatDate(entity.lastUpdated)}</Td>

                    {/* Owner Column */}
                    <Td dataLabel="Owner">{extras.owner}</Td>
                  </Tr>
                );
              })}
              </Tbody>
            </Table>
            {/* Bottom Pagination */}
            <Flex justifyContent={{ default: 'justifyContentFlexEnd' }}>
              <FlexItem>
                <Pagination
                  itemCount={filteredEntities.length}
                  perPage={perPage}
                  page={page}
                  onSetPage={onSetPage}
                  onPerPageSelect={onPerPageSelect}
                  variant="bottom"
                  isCompact
                />
              </FlexItem>
            </Flex>
          </>
        )}
      </PageSection>
    </>
  );
};

export default EntitiesListPage;



