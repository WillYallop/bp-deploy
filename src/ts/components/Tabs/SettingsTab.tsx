import { useState } from "react";
// Components
import { Form, Input } from "../index";

const SettingsTab = () => {
  // State
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [repositoryName, setRepositoryName] = useState("");
  const [branchName, setBranchName] = useState("");

  // Form inner
  const FormInner = (
    <>
      {/* Credentials Row */}
      <div className="bp__tab-wrapper__row">
        <h2>Credentials</h2>
        <p>
          Create a new Bitbucket app password with pipeline read and write
          access!
        </p>
        <div className="bp__tab-wrapper__row__col">
          <Input
            value={user}
            onChange={setUser}
            type={"text"}
            required={true}
            label={"User"}
            name={"bp_userInp"}
            error={"This field is required"}
          />
        </div>
        <div className="bp__tab-wrapper__row__col">
          <Input
            value={password}
            onChange={setPassword}
            type={"password"}
            required={true}
            label={"Password"}
            name={"bp_passwordInp"}
            error={"This field is required"}
          />
        </div>
      </div>
      {/* Deployment Settings Row */}
      <div className="bp__tab-wrapper__row">
        <h2>Deployment Settings</h2>
        <p>Configure your target repository and branch pipeline!</p>
        <Input
          value={workspaceName}
          onChange={setWorkspaceName}
          type={"text"}
          required={true}
          label={"Workspace name"}
          name={"bp_workspaceNameInp"}
          error={"This field is required"}
        />
        <Input
          value={repositoryName}
          onChange={setRepositoryName}
          type={"text"}
          required={true}
          label={"Repository name"}
          name={"bp_repositoryNameInp"}
          error={"This field is required"}
        />
        <Input
          value={branchName}
          onChange={setBranchName}
          type={"text"}
          required={true}
          label={"Branch name"}
          name={"bp_branchNameInp"}
          error={"This field is required"}
        />
      </div>
    </>
  );

  return (
    <div className="bp__wrapper">
      <div className="bp__tab-wrapper">
        <Form inner={FormInner} />
      </div>
    </div>
  );
};
export default SettingsTab;
