import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AddFoodPage from "./pages/AddFoodPage";
import FoodPage from "./pages/FoodPage";
import AddRestaurantPage from "./pages/AddRestaurantPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ReviewPage from "./pages/ReviewPage";
import EditProfilePage from "./pages/EditProfilePage";
import RestaurantPage from "./pages/RestaurantPage";
import AddFoodMediaPage from "./pages/AddFoodMediaPage";
import EditRestaurantPage from "./pages/EditRestaurantPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "root",
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
      },
      { path: "profile/edit/:id", element: <EditProfilePage /> },
      { path: "/add", element: <AddFoodPage /> },
      { path: "/addRestaurant", element: <AddRestaurantPage /> },
      { path: "/food/:id", element: <FoodPage /> },
      { path: "/restaurant", element: <RegisterPage /> },
      { path: "/search", element: <SearchResultsPage /> },
      { path: "/review/:id", element: <ReviewPage /> },
      { path: "/restaurants/:id", element: <RestaurantPage /> },
      { path: "restaurants/edit/:id", element: <EditRestaurantPage /> },
      { path: "/foodmedia/:id", element: <AddFoodMediaPage /> },
      // { path: "/profile/edit/:id", element: <EditProfilePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
