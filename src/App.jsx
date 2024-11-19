import React, { useEffect, useMemo, Suspense, lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import LayoutHome from "./components/GlobalLayout/GlobalLayout";
import { validateJWT } from "./services/expenseService";
import useUserStore from "./store/userStore";
import Spinner from './components/Spinner/Spinner';

// Lazy load components
const HomePage = lazy(() => import("./pages/HomePage/homepage"));
const AboutUs = lazy(() => import("./pages/AboutUs/aboutus"));
const ContachUs = lazy(() => import("./pages/ContactUs/contactus"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/pageNotFound"));
const Login = lazy(() => import("./pages/Login/login"));
const ExpensePage = lazy(() => import("./pages/ExpensePage/expensepage"));
const ProtectedRoute = lazy(() => import("./services/auth"));

const App = () => {
  const addUserData = useUserStore(state => state.addUserData);

  useEffect(() => {
    validateJWT()
      .then(res => {
        if (res?.user) {
          addUserData(res?.user)
          localStorage.setItem('jwtToken', response?.token);
          localStorage.setItem('userInfo', response?.user?.username);
        } else {
          console.log("No user logged in!")
        }
      }).catch(err => {
        console.log("No user logged in!")
      })
  }, [])

  const router = useMemo(() => createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LayoutHome />}>
        <Route index element={
          <Suspense fallback={<Spinner />}>
            <HomePage />
          </Suspense>
        } />
        <Route path='about' element={
          <Suspense fallback={<Spinner />}>
            <AboutUs />
          </Suspense>
        } />
        <Route path='contact' element={
          <Suspense fallback={<Spinner />}>
            <ContachUs />
          </Suspense>
        } />
        <Route path='login' element={
          <Suspense fallback={<Spinner />}>
            <Login />
          </Suspense>
        } />
        <Route element={
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute />
          </Suspense>
        }>
          <Route path='expense' element={
            <Suspense fallback={<Spinner />}>
              <ExpensePage />
            </Suspense>
          } />
        </Route>
        <Route path='*' element={
          <Suspense fallback={<Spinner />}>
            <PageNotFound />
          </Suspense>
        } />
      </Route>
    )
  ), []);

  return (
    <main className="overflow-x-hidden">
      <RouterProvider router={router} />
    </main>
  );
};

export default App;