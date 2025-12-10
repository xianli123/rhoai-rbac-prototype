import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Page, Masthead, MastheadMain, MastheadBrand, PageSidebar, PageSidebarBody, Nav, NavList, NavItem, NavExpandable } from '@patternfly/react-core';
import { EntitiesListPage } from './pages/feature-store/entities';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeGroup, setActiveGroup] = React.useState('feature-store');
  const [activeItem, setActiveItem] = React.useState('entities');

  const Header = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>
          <div style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold', padding: '0 1rem' }}>
            Red Hat OpenShift AI
          </div>
        </MastheadBrand>
      </MastheadMain>
    </Masthead>
  );

  const Sidebar = (
    <PageSidebar>
      <PageSidebarBody>
        <Nav aria-label="Feature Store Navigation">
          <NavList>
            <NavExpandable
              title="Develop and Train"
              groupId="develop-train"
              isActive={activeGroup === 'develop-train'}
              isExpanded={true}
            >
              <NavExpandable
                title="Feature Store"
                groupId="feature-store"
                isActive={activeGroup === 'feature-store'}
                isExpanded={true}
              >
                <NavItem
                  itemId="entities"
                  isActive={activeItem === 'entities'}
                  to="/develop-and-train/feature-store/entities"
                  onClick={() => {
                    setActiveGroup('feature-store');
                    setActiveItem('entities');
                  }}
                >
                  Entities
                </NavItem>
                <NavItem
                  itemId="features"
                  isActive={activeItem === 'features'}
                  onClick={() => {
                    setActiveGroup('feature-store');
                    setActiveItem('features');
                  }}
                >
                  Features
                </NavItem>
                <NavItem
                  itemId="feature-views"
                  isActive={activeItem === 'feature-views'}
                  onClick={() => {
                    setActiveGroup('feature-store');
                    setActiveItem('feature-views');
                  }}
                >
                  Feature Views
                </NavItem>
              </NavExpandable>
            </NavExpandable>
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  );

  return (
    <Page header={Header} sidebar={Sidebar}>
      {children}
    </Page>
  );
};

const App: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/develop-and-train/feature-store/entities" replace />} />
        <Route path="/develop-and-train/feature-store/entities" element={<EntitiesListPage />} />
        <Route path="/develop-and-train/feature-store/entities/:id" element={<div style={{ padding: '2rem' }}>Entity Detail Page - Coming Soon</div>} />
      </Routes>
    </AppLayout>
  );
};

export default App;



