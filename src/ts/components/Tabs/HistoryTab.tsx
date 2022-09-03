import { useState, useEffect } from "react";
// Util
import getNonce from "../../util/get-nonce";
// Types
import { HistoryProps } from "../Partials/HistoryRow";
// COmponents
import { HistoryRow } from "../index";

const HistoryTab: React.FC = ({}) => {
  const [history, setHistory] = useState<Array<HistoryProps>>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  // Fetch history from API
  const fetchHistory = () => {
    const nonce = getNonce();

    fetch("/wp-json/bp-deploy/v1/history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": nonce,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.history);
        setLoaded(true);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="bp__wrapper">
      {loaded ? (
        <div className="bp__tab-wrapper bp__tab-wrapper--history">
          <ul>
            {history.map((item, index) => {
              return <HistoryRow {...item} eleID={index} key={index} />;
            })}
          </ul>
        </div>
      ) : (
        <div className="bp__tab-wrapper">
          <div className="bp__loading-con">
            <h2>Loading...</h2>
          </div>
        </div>
      )}
    </div>
  );
};
export default HistoryTab;
