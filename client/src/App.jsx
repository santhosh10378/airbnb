import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PageLayout from "./layouts/PageLayout";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import ManageProperties from "./pages/ManageProperties";
import Wishlists from "./pages/Wishlists";
import WishlistItems from "./pages/WishlistItems";
import Trips from "./pages/Trips";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Bookings from "./pages/Bookings";
import PropertyDetails from "./pages/PropertyDetails";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/properties/:id",
          element: <PropertyDetails />,
        },
        {
          path: "/account/properties",
          element: <ProtectedRoute element={<ManageProperties />} />,
        },
        {
          path: "/account/wishlists",
          element: <ProtectedRoute element={<Wishlists />} />,
        },
        {
          path: "/account/wishlists/:id",
          element: <ProtectedRoute element={<WishlistItems />} />,
        },
        {
          path: "/account/trips",
          element: <ProtectedRoute element={<Trips />} />,
        },
        {
          path: "/account/bookings",
          element: <ProtectedRoute element={<Bookings />} />,
        },
        {
          path: "/account/profile",
          element: <ProtectedRoute element={<Profile />} />,
        },
        {
          path: "/account/messages",
          element: <ProtectedRoute element={<Messages />} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
