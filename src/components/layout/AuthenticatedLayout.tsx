import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useStarknetConnect } from "../../dojo/hooks/useStarknetConnect";
import LoadingScreen from "../loader/LoadingScreen";

export function AuthenticatedLayout() {
  const { status } = useStarknetConnect();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "disconnected") {
      console.log("🔒 User not connected, redirecting to login");
      navigate("/login");
    }
  }, [status, navigate]);

  // Show loading while checking connection
  if (status === "connecting") {
    return <LoadingScreen isLoading={true} progress={50} />;
  }

  // Only render children if connected
  if (status === "connected") {
    return <Outlet />;
  }

  // Return null while redirecting
  return null;
}
