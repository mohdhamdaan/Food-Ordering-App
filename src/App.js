import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
// import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import Footer from "./components/Footer"

const About = lazy(()=> import("./components/About"));

const AppLayout = () => {
  const [userName, setUserName] = useState();
  useEffect(() => {
    const data = {
      name: "Mohd Hamdaan",
    };
    setUserName(data.name);
  }, []);
  return (
    <Provider store={appStore}>
    <UserContext.Provider value={{ loggedInUser: userName , setUserName}}>
      <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
            <Suspense fallback={<h1>Loading...</h1>}>
                <About/>
            </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart/>,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
