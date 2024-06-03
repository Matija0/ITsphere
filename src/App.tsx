import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout";
import Signin from "./_root/pages/Signin";
import Signup from "./_root/pages/Signup";
import CreatePost from "./_root/pages/CreatePost";
import Home from "./_root/pages/Home";
import UpdateProfile from "./_root/pages/UpdateProfile";
import Profile from "./_root/pages/Profile";
import { useGetUser } from "./hooks/useGetUser";
import Explore from "./_root/pages/Explore";

function App() {
  const user = useGetUser();
  return (
    <main className="flex h-screen no-scroll">
       <Routes>
        {user ? (
          <>
            <Route path="/" element={<RootLayout><Home /></RootLayout>} />
            <Route path="/create-post" element={<RootLayout><CreatePost /></RootLayout>} />
            <Route path="/profile/:id" element={<RootLayout><Profile /></RootLayout>} />
            <Route path="/update-profile/:id" element={<RootLayout><UpdateProfile /></RootLayout>} />
            <Route path="/explore" element={<RootLayout><Explore /></RootLayout>} />
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
