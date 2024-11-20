import React, { useEffect, useMemo, Suspense, lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import LayoutHome from "./components/GlobalLayout/GlobalLayout";
import { validateJWT } from "./services/expenseService";
import useUserStore from "./store/userStore";
import Spinner from './components/Spinner/Spinner';

// Lazy load components optimsed strategy
const HomePage = lazy(() => import("./pages/HomePage/homepage"));
const AboutUs = lazy(() => import("./pages/AboutUs/aboutus"));
const ContachUs = lazy(() => import("./pages/ContactUs/contactus"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/pageNotFound"));
const Login = lazy(() => import("./pages/Login/login"));
const SignUp = lazy(() => import("./pages/SignUp/signup"));
const ExpensePage = lazy(() => import("./pages/ExpensePage/expensepage"));
const ProtectedRoute = lazy(() => import("./services/auth"));

const App = () => {
  const addUserData = useUserStore(state => state.addUserData);

  // The token can be held for years, so if the user visits the website after a long time then still he can see the expenses without loggin in if the token has not expired
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


  // This is the optimisation technique, it is used used to memoize the result of a function from which we can avoid re-renders
  // Also used Suspense for the page loading. If the API is taking time then this will handle the page apearance
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
        <Route path='signup' element={
          <Suspense fallback={<Spinner />}>
            <SignUp />
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