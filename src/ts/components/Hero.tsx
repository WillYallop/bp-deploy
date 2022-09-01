import { useState, useEffect } from "react";

interface HeroProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Hero: React.FC<HeroProps> = ({ activeTab, setActiveTab }) => {
  const [activeIndicator, setActiveIndicator] = useState({
    left: 0,
    width: 0,
  });

  const updateActiveIndicator = (tab: string) => {
    const tabElement = document.querySelector(`[ data-bp-nav="${tab}"]`);
    const tabNavEle = document.getElementById("bp-tab-nav");
    if (tabElement && tabNavEle) {
      // get the left position of the element relative to the tabNavEle
      const left =
        tabElement.getBoundingClientRect().left -
        tabNavEle.getBoundingClientRect().left;
      const width = tabElement.getBoundingClientRect().width;
      setActiveIndicator({ left, width });
    }
  };

  const navigateTo = (tab: string) => {
    // add a url param tab to the url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.set("tab", tab);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
    setActiveTab(tab);
    updateActiveIndicator(tab);
  };

  useEffect(() => {
    updateActiveIndicator(activeTab);
  }, [activeTab]);

  return (
    <div className="bp__hero-root">
      <div className="bp__wrapper">
        <h1>BP Deploy</h1>
        <nav id="bp-tab-nav" className="bp__hero-root__nav">
          <ul>
            <li
              data-bp-nav={"deploy"}
              className={activeTab === "deploy" ? "active" : ""}
            >
              <button onClick={() => navigateTo("deploy")}>Deploy</button>
            </li>
            <li
              data-bp-nav={"history"}
              className={activeTab === "history" ? "active" : ""}
            >
              <button onClick={() => navigateTo("history")}>History</button>
            </li>
            <li
              data-bp-nav={"settings"}
              className={activeTab === "settings" ? "active" : ""}
            >
              <button onClick={() => navigateTo("settings")}>Settings</button>
            </li>
          </ul>
          <span
            style={{
              left: activeIndicator.left,
              width: activeIndicator.width,
            }}
            className="bp__hero-root__nav__active-ind"
          ></span>
        </nav>
      </div>
    </div>
  );
};

export default Hero;
