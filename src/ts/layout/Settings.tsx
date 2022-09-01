import react, { useEffect, useState } from "react";
// Components
import { Hero, SettingsTab, DeployTab, HistoryTab } from "../components/index";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("deploy");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const tab = urlParams.get("tab");
    switch (tab) {
      case "deploy":
        setActiveTab("deploy");
        break;
      case "settings":
        setActiveTab("settings");
        break;
      case "history":
        setActiveTab("history");
        break;
      default:
        setActiveTab("deploy");
        break;
    }
  }, []);

  return (
    <div className="bp">
      <Hero activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "deploy" && <DeployTab />}
      {activeTab === "settings" && <SettingsTab />}
      {activeTab === "history" && <HistoryTab />}
    </div>
  );
};
export default Settings;
