import * as React from 'react';
import {
  Flex,
  FlexItem,
  Card,
  CardTitle,
  CardBody,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Button,
  Title,
  Grid,
  GridItem,
  PageSection,
  Select,
  SelectOption,
  SelectList,
  MenuToggle,
  MenuToggleElement,
  InputGroup,
  InputGroupItem,
} from '@patternfly/react-core';
import { 
  Chart, 
  ChartArea, 
  ChartAxis,
  ChartContainer,
  ChartLegend,
  ChartThemeColor,
  ChartTooltip,
} from '@patternfly/react-charts/victory';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { TimeRange } from '../types';
import { mockMetrics } from '../mockData';

interface APIKeyMetricsTabProps {
  keyId: string;
}

const APIKeyMetricsTab: React.FunctionComponent<APIKeyMetricsTabProps> = ({ keyId }) => {
  const [timeRange, setTimeRange] = React.useState<TimeRange>('7d');
  const [isTimeRangeOpen, setIsTimeRangeOpen] = React.useState(false);

  const metrics = mockMetrics[keyId];

  const timeRangeOptions = [
    { value: '24h', label: '24 hours' },
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
  ];

  const handleTimeRangeSelect = (
    _event?: React.MouseEvent<Element, MouseEvent>,
    selection?: string | number
  ) => {
    if (typeof selection === 'string') {
      setTimeRange(selection as TimeRange);
    }
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };

  // Filter data based on time range
  const getFilteredData = () => {
    if (!metrics?.requestsOverTime) return [];
    
    const now = new Date();
    let cutoffDate: Date;
    
    switch (timeRange) {
      case '24h':
        cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
    
    return metrics.requestsOverTime
      .filter(point => point.timestamp >= cutoffDate)
      .map((point, index) => ({ x: index + 1, y: point.value }));
  };

  const chartData = getFilteredData();

  if (!metrics) {
    return (
      <PageSection>
        <div>No metrics available for this API key</div>
      </PageSection>
    );
  }

  return (
    <PageSection>
      <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsLg' }}>
      {/* Controls */}
      <FlexItem>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <InputGroup>
                <InputGroupItem>
                  <div className="pf-v6-c-input-group__text">
                    Time range:
                  </div>
                </InputGroupItem>
                <InputGroupItem>
                  <Select
                    id="time-range-select"
                    isOpen={isTimeRangeOpen}
                    selected={timeRange}
                    onSelect={handleTimeRangeSelect}
                    onOpenChange={(isOpen) => setIsTimeRangeOpen(isOpen)}
                    toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                      <MenuToggle
                        ref={toggleRef}
                        onClick={() => setIsTimeRangeOpen(!isTimeRangeOpen)}
                        isExpanded={isTimeRangeOpen}
                        id="time-range-toggle"
                      >
                        {timeRangeOptions.find(opt => opt.value === timeRange)?.label || '7 days'}
                      </MenuToggle>
                    )}
                  >
                    <SelectList>
                      {timeRangeOptions.map((option) => (
                        <SelectOption
                          key={option.value}
                          value={option.value}
                          isSelected={timeRange === option.value}
                        >
                          {option.label}
                        </SelectOption>
                      ))}
                    </SelectList>
                  </Select>
                </InputGroupItem>
              </InputGroup>
            </ToolbarItem>
            <ToolbarItem>
              <Button
                variant="link"
                icon={<ExternalLinkAltIcon />}
                iconPosition="right"
                onClick={() => {
                  // TODO: Link to Perses Dashboard
                  console.log('Open Perses Dashboard');
                }}
              >
                View Perses Dashboard
              </Button>
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </FlexItem>

      {/* Metrics Cards */}
      <FlexItem>
        <Grid hasGutter>
          <GridItem span={3}>
            <Card>
              <CardTitle>Total Requests</CardTitle>
              <CardBody>
                <Title headingLevel="h2" size="2xl" style={{ margin: 0 }}>
                  {formatNumber(metrics.totalRequests)}
                </Title>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem span={3}>
            <Card>
              <CardTitle>Success Rate</CardTitle>
              <CardBody>
                <Title headingLevel="h2" size="2xl" style={{ margin: 0 }}>
                  {formatPercentage(metrics.successRate)}
                </Title>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem span={3}>
            <Card>
              <CardTitle>Total Tokens</CardTitle>
              <CardBody>
                <Title headingLevel="h2" size="2xl" style={{ margin: 0 }}>
                  {formatNumber(metrics.totalTokens)}
                </Title>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem span={3}>
            <Card>
              <CardTitle>Total Cost (not 3.3)</CardTitle>
              <CardBody>
                <Title headingLevel="h2" size="2xl" style={{ margin: 0 }}>
                  {formatCurrency(metrics.totalCost)}
                </Title>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </FlexItem>

      {/* Requests Over Time Chart */}
      <FlexItem>
        <Card>
          <CardTitle>Total Requests</CardTitle>
          <CardBody>
            <div style={{ height: '400px' }}>
              <Chart
                ariaDesc="Total requests over time"
                ariaTitle="Requests chart"
                containerComponent={
                  <ChartContainer
                    responsive={true}
                  />
                }
                height={350}
                width={1200}
                legendComponent={
                  <ChartLegend 
                    data={[{ name: 'Requests' }]} 
                    x={50} 
                    y={20}
                  />
                }
                legendPosition="bottom"
                padding={{
                  bottom: 75,
                  left: 100,
                  right: 50,
                  top: 50,
                }}
                themeColor={ChartThemeColor.blue}
              >
                <ChartAxis dependentAxis showGrid />
                <ChartAxis 
                  tickFormat={() => ''}
                />
                <ChartArea
                  data={chartData}
                  interpolation="cardinal"
                  labelComponent={<ChartTooltip constrainToVisibleArea />}
                  style={{
                    data: { fill: '#8BC1F7', fillOpacity: 0.6, stroke: '#519DE9', strokeWidth: 2 }
                  }}
                />
              </Chart>
            </div>
          </CardBody>
        </Card>
      </FlexItem>
      </Flex>
    </PageSection>
  );
};

export { APIKeyMetricsTab };
