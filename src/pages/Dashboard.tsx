
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ClientDashboard from "./dashboard/ClientDashboard";
import CoachDashboard from "./dashboard/CoachDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import { UserRole } from "@/components/layout/Header";

const Dashboard = () => {
  // In a real app, this would come from authentication
  const location = useLocation();
  const [userRole, setUserRole] = useState<UserRole>(null);
  
  useEffect(() => {
    // For demo purposes, we'll get the role from the location state
    const role = location.state?.userRole || "client";
    setUserRole(role as UserRole);
  }, [location]);

  return (
    <Layout isAuthenticated={true} userRole={userRole}>
      {userRole === "client" && <ClientDashboard />}
      {userRole === "coach" && <CoachDashboard />}
      {userRole === "admin" && <AdminDashboard />}
    </Layout>
  );
};

export default Dashboard;
