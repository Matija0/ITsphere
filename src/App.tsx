import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout";
import Signin from "./_root/pages/Signin";
import Signup from "./_root/pages/Signup";
import CreatePost from "./_root/pages/CreatePost";
import Home from "./_root/pages/Home";

function App() {
  const user = JSON.parse(localStorage.getItem("user") || 'null');
  return (
    <main className="flex h-screen no-scroll">
       <Routes>
        {user ? (
          <>
            <Route path="/" element={<RootLayout><Home /></RootLayout>} />
            <Route path="/create-post" element={<RootLayout><CreatePost /></RootLayout>} />
          </>
        ) : (
          <>
            <Route path="/login" element={<AuthLayout><Signin /></AuthLayout>} />
            <Route path="/register" element={<AuthLayout><Signup /></AuthLayout>} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </main>
  );
}

export default App;
