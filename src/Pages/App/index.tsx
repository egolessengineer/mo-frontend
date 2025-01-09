import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { FullLoader } from "../../Components/Atoms/Loader";
import { AuthState } from "../../Context/auth";
import Dispute from "../../Pages/Dispute/index";
import ActivityHistory from "../ActivityHistory";
import Admin from "../Admin/index";
import CreateAccountProLancer from "../Auth/CreateAccount";
import LancerProfile from "../Auth/CreateAccount/LancerProfile";
import Forget from "../Auth/ForgetPassword";
import ResetPasswd from "../Auth/ForgetPassword/ResetPassword";
import VerifyEmail from "../Auth/ForgetPassword/ResetPasswordRequest";
import { Redirect } from "../Auth/Redirect";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import Success from "../Auth/Success";
import VerifyEmailScreen from "../Auth/VerifyEmail";
import Dashboard from "../Dashboard";
import HcsCommunication from "../HcsCommunication";
import MyTeamSpace from "../MyTeamSpace/index";
import NotFound from "../NotFound";
import CreateProject from "../Project/CreateProject";
import MyProject from "../Project/MyProject";
import ViewOrModifyProject from "../Project/ViewOrModifyProject";
import ProviderList from "../ProviderList";
import UserDetails from "../UserDetail";
import UserProfile from "../UserProfile";
import Layout from "./Layout";

const hasRequiredRole = (userRole: string, requiredRole: string[]) => {
  if (!Array.isArray(requiredRole) || !userRole) {
    return false;
  }
  return requiredRole.includes(userRole);
};

interface ProtectedRouteProps {
  children: any;
  requiredRole: string[];
  userRole: string;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  userRole,
}) => {
  const token = localStorage.getItem("access_token");
  const { user } = AuthState();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(false);
      if (!user?.role) {
        navigate("/select-role");
      } else if (!user?.isAboutComplete) {
        navigate("/details");
      } else if (user?.role === "PROVIDER" && !user?.isExperienceComplete) {
        navigate("/details");
      }
    }
  }, [user]);

  if (isLoading) {
    return token ? <FullLoader /> : <Navigate to={"/signin"} />;
  }

  if (!hasRequiredRole(userRole, requiredRole)) {
    userRole === "PROVIDER"
      ? navigate("/myproject")
      : userRole === "PURCHASER" ? navigate("/") : userRole === 'ADMIN' && navigate("/admin-analytics");
  }

  return <Outlet />;
};
const ProtecteAuthRoute = ({ Component }: any) => {
  const token = localStorage.getItem("access_token");
  return token ? <Navigate to={"/redirect"} /> : <Outlet />;
};
function App() {
  const { user } = AuthState();  
  if (process.env.REACT_APP_NODE_ENV === 'production') {
    console.log = () => { }
    // console.error = () => { }
    console.debug = () => { }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route
            path="/create-project"
            element={
              <ProtectedRoute
                requiredRole={["PURCHASER"]}
                userRole={user?.role}
              >
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<CreateProject />} />
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute
                requiredRole={["PURCHASER"]}
                userRole={user?.role}
              >
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
          </Route>
          <Route
            path="/myproject"
            element={
              <ProtectedRoute requiredRole={["PROVIDER"]} userRole={user?.role}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<MyProject />} />
          </Route>
          <Route
            path="/project/:id"
            element={
              <ProtectedRoute
                requiredRole={["PURCHASER", "PROVIDER"]}
                userRole={user?.role}
              >
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<ViewOrModifyProject />} />
          </Route>
          <Route
            path="/admin-analytics"
            element={
              <ProtectedRoute
                requiredRole={["ADMIN"]}
                userRole={user?.role}
              >
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<Admin />} />
          </Route>
          <Route
            path="/myteam-space"
            element={
              <ProtectedRoute
                requiredRole={["PURCHASER", "PROVIDER"]}
                userRole={user?.role}
              >
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<MyTeamSpace />} />
          </Route>
          <Route
            path="/provider-list"
            element={
              <ProtectedRoute
                requiredRole={["PURCHASER", "PROVIDER", "ADMIN"]}
                userRole={user?.role}
              >
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProviderList />} />
          </Route>
          <Route
            path="/hcs-communication"
            element={
              <ProtectedRoute
                requiredRole={["PURCHASER", "PROVIDER", "ADMIN"]}
                userRole={user?.role}
              >
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<HcsCommunication />} />
          </Route>
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute
                requiredRole={["PURCHASER", "PROVIDER", "ADMIN"]}
                userRole={user?.role}
              >
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserProfile />} />
          </Route>
          <Route
            path="/user-details"
            element={
              <ProtectedRoute
                requiredRole={["PURCHASER", "PROVIDER", "ADMIN"]}
                userRole={user?.role}
              >
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDetails />} />
          </Route>
          <Route
            path="/activity-history"
            element={
              <ProtectedRoute
                requiredRole={["PURCHASER", "PROVIDER", "ADMIN"]}
                userRole={user?.role}
              >
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<ActivityHistory />} />
          </Route>
          <Route
            path="/dispute"
            element={
              <ProtectedRoute
                requiredRole={["PURCHASER", "PROVIDER", "ADMIN"]}
                userRole={user?.role}
              >
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dispute />} />
          </Route>
        </Route>
        <Route
          path="/signin"
          element={
            <ProtecteAuthRoute>
              <Outlet />
            </ProtecteAuthRoute>
          }
        >
          <Route index element={<SignIn />} />
        </Route>
        <Route
          path="/redirect"
          element={
            <ProtectedRoute
              requiredRole={["PURCHASER", "PROVIDER"]}
              userRole={user?.role}
            >
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<Redirect />} />
        </Route>
        <Route
          path="/success"
          element={
            <ProtecteAuthRoute>
              <Outlet />
            </ProtecteAuthRoute>
          }
        >
          <Route index element={<Success />} />
        </Route>

        <Route
          path="select-role"
          element={
            <ProtectedRoute
              requiredRole={["PURCHASER", "PROVIDER"]}
              userRole={user?.role}
            >
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<CreateAccountProLancer />} />
        </Route>
        <Route
          path="signup"
          element={
            <ProtecteAuthRoute>
              <Outlet />
            </ProtecteAuthRoute>
          }
        >
          <Route index element={<SignUp />} />
        </Route>
        <Route
          path="verify"
          element={
            <ProtecteAuthRoute>
              <Outlet />
            </ProtecteAuthRoute>
          }
        >
          <Route index element={<VerifyEmail />} />
        </Route>
        <Route
          path="verify-email"
          element={
            <ProtecteAuthRoute>
              <Outlet />
            </ProtecteAuthRoute>
          }
        >
          <Route index element={<VerifyEmailScreen />} />
        </Route>
        {/* Nested LancerProfile route */}
        <Route
          path="details"
          element={
            <ProtectedRoute
              requiredRole={["PURCHASER", "PROVIDER"]}
              userRole={user?.role}
            >
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<LancerProfile />} />
        </Route>
        <Route
          path="forget-password"
          element={
            <ProtecteAuthRoute>
              <Outlet />
            </ProtecteAuthRoute>
          }
        >
          <Route index element={<Forget />} />
        </Route>
        <Route
          path="reset-password"
          element={
            <ProtecteAuthRoute>
              <Outlet />
            </ProtecteAuthRoute>
          }
        >
          <Route index element={<ResetPasswd />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
