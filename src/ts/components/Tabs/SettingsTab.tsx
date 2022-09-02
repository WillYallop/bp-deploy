import { useEffect, useState } from "react";
// Util
import getNonce from "../../util/get-nonce";
// Components
import { Form, Input } from "../index";

const SettingsTab = () => {
  // State
  const [loaded, setLoaded] = useState(false);
  const [formState, setFormState] = useState("default");
  const [user, setUser] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [repositoryName, setRepositoryName] = useState("");
  const [branchName, setBranchName] = useState("");

  // Form inner elements
  const FormInner = (
    <>
      {/* Credentials Row */}
      <div className="bp__tab-wrapper__row">
        <h2>Credentials</h2>
        <p>
          Create a new Bitbucket app password with pipeline read and write
          access! The app password must be defined in the wp-config such as:{" "}
          <code>define('BP_APP_PASSWORD', 'THE_VALUE');</code>.
        </p>
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
  // submit form
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    const nonce = getNonce();
    // make a fetch post request
    fetch("/wp-json/bp-deploy/v1/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": nonce,
      },
      body: JSON.stringify({
        user,
        workspaceName,
        repositoryName,
        branchName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setFormState("success");
        }, 1000);
        setTimeout(() => {
          setFormState("default");
        }, 5000);
      });
  };

  // get the settings from the database
  const getSettings = () => {
    const nonce = getNonce();
    fetch("/wp-json/bp-deploy/v1/settings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": nonce,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        if (data.workspaceName) setWorkspaceName(data.workspaceName);
        if (data.repositoryName) setRepositoryName(data.repositoryName);
        if (data.branchName) setBranchName(data.branchName);
        setLoaded(true);
      });
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <div className="bp__wrapper">
      <div className="bp__tab-wrapper">
        {loaded ? (
          <Form inner={FormInner} onSubmit={submitForm} state={formState} />
        ) : (
          <div className="bp__loading-con">
            <h2>Loading...</h2>
          </div>
        )}
      </div>
    </div>
  );
};
export default SettingsTab;
