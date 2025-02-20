import { createBrowserRouter, RouterProvider } from "react-router-dom"
//layouts
import MainLayout from "../layouts/MainLayout"
import AuthLayout from "../layouts/AuthLayout"
//Pages
import Home from "../pages/Home"
import Error from "../pages/Error"
import Shop from "../pages/Shop"
import AddProduct from "../pages/AddProduct"
import ProductDetails from "../pages/ProductDetails"
import About from "../pages/About"
import SignUp from "../pages/SignUp"
import SignIn from "../pages/SignIn"
// ProtectedRoute
import ProtectedRoute from "../componentes/shared/ProtectedRoute";


const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <Error />,
        element: <MainLayout />,
        children: [
           {
            index: true,
            element: <Home />
           },
           {
            path: 'shop',
            element: <Shop />,
           },
           {
            path: 'add',
            element: (
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            )
          },
           {
            path: 'about',
            element: <About />
           },
           {
            path: 'productDetails/:prefix',
            element: <ProductDetails />,
            loader: async ({ params }) => {
                const { prefix } = params;
                if (!/^[0-9]+$/.test(prefix)) {
                  throw new Response("Wrong ID", { status: 400, statusText:'Wrong ID' });
                }
                return null;
              },
           },
        ],
    },
    {
      path: '/Auth/',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <SignUp />
        },
        {
          path: 'signup',
          element: <SignUp />
        },
        {
          path: 'signin',
          element: <SignIn />
        }
      ]
    }
])

const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter