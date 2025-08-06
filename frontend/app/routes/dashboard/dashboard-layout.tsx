import { useState } from "react";
import { Navigate, Outlet } from "react-router";
import Header from "~/components/layout/Header";
import Loader from "~/components/ui/Loader";
import { useAuth } from "~/provider/auth-context";
import type { Workspace } from "~/types/workspace";

const DashboardLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isCreatingWorkspace, setisCreatingWorkspace] = useState(false);
  const [currentWorkspace, setcurrentWorkspace] = useState<Workspace | null>(
    null
  );
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to={"/sign-in"} />;
  }

  const handleWorkspaceSelected = (workspace: Workspace) => {
    setcurrentWorkspace(workspace);
  };
  return (
    <div className="flex  h-screen w-full">
      <div className="flex flex-1 flex-col h-full ">
        <Header
          onSelectWorkspace={handleWorkspaceSelected}
          selectedWorkspace={currentWorkspace}
          onCreateWorkspace={() => setisCreatingWorkspace(true)}
        />
        <main className="flex-1 overflow-y-auto h-full w-full">
          <div className="mx-auto container px-2 sm:px-6 lg:px-8 py-0 md:py-8 size-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
