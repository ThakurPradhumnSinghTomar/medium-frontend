import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Blogs } from './Pages/Blogs';
import { SignIn } from './Pages/SignIn';
import { SignUp } from './Pages/SignUp';
import { CreateBlog } from './Pages/CreateBlog';
import { UserProfile } from './Pages/UserProfile';
import { ReadBlog } from './Pages/ReadBlog';
import { UpdateBlog } from './Pages/UpdateBlog';
import { PublicRoute } from './Components/PublicRoute';
import { PrivateRoute } from './Components/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        
        <Route
          path="/"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* Private Routes */}

        
        <Route
          path="/blog"
          element={
            <PrivateRoute>
              <Blogs />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/create"
          element={
            <PrivateRoute>
              <CreateBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/profile/:userId"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/read/:postId"
          element={
            <PrivateRoute>
              <ReadBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/update/:postId"
          element={
            <PrivateRoute>
              <UpdateBlog />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
