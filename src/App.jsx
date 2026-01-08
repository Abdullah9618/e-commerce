// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// User pages
import Home from "./pages/Home";
import ProductGrid from "./components/ProductGrid";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";

// Admin pages
// import AdminLogin from "./pages/admin/AdminLogin";
// import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import AddProduct from "./pages/admin/AddProduct";
import AdminProductList from "./pages/admin/AdminProductList";
import EditProduct from "./pages/admin/EditProduct";
import Categories from "./pages/admin/Categories";

// Admin Layout
import AdminLayout from "./components/AdminLayout";

import ErrorBoundary from "./components/ErrorBoundary";
import Loading from "./components/Loading";

// Layout wrapper: shows user header/navbar only on non-admin pages
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  return <>{children}</>;
};

// Admin protection removed: all users can access admin panel

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <Routes>
            {/* User Routes - No Auth Required */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductGrid />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-success" element={<OrderSuccess />} />

            {/* Admin Routes */}
            {/* <Route path="/admin-login" element={<AdminLogin />} /> */}

            {/* Admin Layout with nested routes */}
            <Route
              path="/admin/*"
              element={<AdminLayout />}
            >
              {/* Default dashboard shows welcome message */}
              <Route index element={<></>} />

              {/* Product CRUD */}
              <Route path="products" element={<AdminProductList />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route path="add-product" element={<AddProduct />} /> 

              {/* Categories CRUD */}
              <Route path="categories" element={<Categories />} />

              {/* Orders */}
              <Route path="orders" element={<Orders />} />
            </Route>

            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
                    <p className="text-gray-600 text-lg">Page Not Found</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
