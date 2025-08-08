/** @format */
import React from "react"; // Make sure React is imported

import {
  Outlet,
  Router,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Footer, Navbar, TopHeader } from "./pages/Allpages";
import "./CSS/style.css";
import { ReactNotifications } from "react-notifications-component";
import "./CSS/mobile.css";
import { getSession } from "./Repository/Api";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "./store/authSlice";
import Loader from "./components/Loader/Loader";
import { ScrollToTop } from "./utils/utilsFunc";
import routes from "./Routes/routes";

const LazyComponent = (Component) => {
  return <Suspense fallback={<Loader />}>{Component}</Suspense>;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes.map((link) => ({
      path: link.path,
      element: (
        <Suspense fallback={<Loader />}>
          {React.isValidElement(link.component)
            ? link.component     // ✅ Already JSX (for AutheticatedRoutes wrapped components)
            : <link.component /> // ✅ Make JSX (for lazy-loaded components)
          }
        </Suspense>
      ),
    })),
  },
]);
function App() {
  const isLoggedIn = useSelector(isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSession());
    }
  }, [isLoggedIn]);

  return (
    <main>
      <ScrollToTop />
      <ReactNotifications />
      <TopHeader />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}

export default function MainApp() {
  return <RouterProvider router={appRouter} />;
}