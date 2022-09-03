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
  const [hideLoadMore, setHideLoadMore] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const limit = 20;
  const [skip, setSkip] = useState<number>(0);

  // Fetch history from API
  const fetchHistory = () => {
    const nonce = getNonce();
    fetch(`/wp-json/bp-deploy/v1/history?limit=${limit}&skip=${skip}`, {
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

  const loadMore = () => {
    setSkip(skip + limit);
    setLoadingMore(true);
    const nonce = getNonce();
    fetch(`/wp-json/bp-deploy/v1/history?limit=${limit}&skip=${skip}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": nonce,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.history);
        if (data.history.length === 0) {
          setHideLoadMore(true);
        }
        setHistory([...history, ...data.history]);
        setLoaded(true);
        setLoadingMore(false);
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

          {history.length >= limit && !hideLoadMore ? (
            <button
              className="bp__button bp__button--load-more"
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          ) : null}
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
