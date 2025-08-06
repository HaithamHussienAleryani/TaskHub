import type { Workspace } from "~/types/workspace";

interface HeaderProps {
  onSelectWorkspace: (workspace: Workspace) => void;
  selectedWorkspace: Workspace | null;
  onCreateWorkspace: () => void;
}

const Header = ({
  onSelectWorkspace,
  selectedWorkspace,
  onCreateWorkspace,
}: HeaderProps) => {
  // Construct the header UI with workspace selection and creation
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg">Workspaces</span>
        <select
          className="border rounded px-2 py-1"
          value={selectedWorkspace?._id || ""}
          onChange={(e) => {
            // For demonstration, construct a dummy workspace object
            // In real usage, you would map over available workspaces
            const workspace: Workspace = {
              _id: e.target.value,
              name: e.target.options[e.target.selectedIndex].text,
              color: "#000",
              owner: "",
              members: [],
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            onSelectWorkspace(workspace);
          }}
        >
          {selectedWorkspace ? (
            <option value={selectedWorkspace._id}>
              {selectedWorkspace.name}
            </option>
          ) : (
            <option value="">Select workspace</option>
          )}
        </select>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={onCreateWorkspace}
      >
        Create Workspace
      </button>
    </header>
  );
};

export default Header;
