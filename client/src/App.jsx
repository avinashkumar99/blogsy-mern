import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import PostDetails from "./components/PostDetails";
import CreatePost from "./components/CreatePost";
import NewUserComponent from "./components/NewUserComponent";
import UpdatePost from "./components/UpdatePost";
import AuthProvider from "./AuthContext";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <main className="minimum-height">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/post/create" element={<CreatePost />} />
              <Route path="/user/register" element={<NewUserComponent />} />
              <Route path="/post/update/:id" element={<UpdatePost />} />
            </Routes>
          </main>

          <Footer />
        </AuthProvider>
      </Router>
      {/* <h1 className="text-lg text-orange-800">Hello world!</h1> */}
    </>
  );
}

export default App;
