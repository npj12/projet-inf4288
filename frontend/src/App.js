import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Service from './pages/Service';
import Service2 from './pages/Service2';
import Authentification from './components/Authentification';
import CreationActe from './components/CreationActe';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from './admin/theme';

import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './admin/layouts/dashboard';
import { usePathname } from './admin/routes/hooks';

export const IndexPage = lazy(() => import('./admin/pages/app'));
/* export const BlogPage = lazy(() => import('./admin/pages/blog')); */
export const UserPage = lazy(() => import('./admin/pages/user'));
export const CreatePage = lazy(() => import('./admin/pages/create_agent'));
export const IndividualPage = lazy(() => import('./admin/pages/individual'));
// export const Page404 = lazy(() => import('./admin/pages/page-not-found'));

function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');
  return (
    <AuthProvider>
        {isAdminRoute ? null :< Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route element={<PrivateRoute />}>
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/authentification" element={<Authentification />} />
            <Route path="/service2" element={<Service2 />} />
            <Route path="/creation-acte" element={<CreationActe />} />
          </Route>
          <Route element={
                          <HelmetProvider>
                              <Suspense>
                                <ThemeProvider>
                                  <DashboardLayout>
                                    <Suspense>
                                      <Outlet /> 
                                    </Suspense>
                                  </DashboardLayout>
                                </ThemeProvider>
                              </Suspense>
                          </HelmetProvider>
                      }>
            <Route path="/admin" element={<IndexPage />}/>   
            <Route path="/admin/user" element={<UserPage />} />  
            <Route path="/admin/individual" element={<IndividualPage />} />
            <Route path="/admin/create_agent" element={<CreatePage />} />
          </Route> 
        </Routes>
        {isAdminRoute ? null :<Footer />}
    </AuthProvider>
  );
}


export default App;
