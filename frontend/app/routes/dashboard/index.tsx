import React from "react";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/provider/auth-context";

const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
};

export default Dashboard;
