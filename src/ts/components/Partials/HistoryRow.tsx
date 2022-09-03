import { useState, useEffect, createRef } from "react";
// Util
import getNonce from "../../util/get-nonce";

export interface HistoryProps {
  id: string;
  pipeline_id: string;
  eleID: number;
  state: string;
  time: string;
  author_name: string;
  branch: string;
  repository: string;
  workspace: string;
  commit_id: string;
  commit_url: string;
  startOpen: boolean;
  result: string | null;
}

const HistoryRow: React.FC<HistoryProps> = ({
  id,
  eleID,
  pipeline_id,
  state,
  time,
  result,
  author_name,
  branch,
  repository,
  workspace,
  commit_id,
  commit_url,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pipelineStatus, setPipelineStatus] = useState<string>(result || state);
  const [openState, setOpenState] = useState(eleID === 0 ? true : false);
  const [maxHeight, setMaxHeight] = useState<number>(1000);
  const ref = createRef();

  // Check current status
  const checkPipelineStatus = () => {
    const nonce = getNonce();
    setLoading(true);
    fetch(`/wp-json/bp-deploy/v1/check-deploy-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": nonce,
      },
      body: JSON.stringify({
        pipelineId: pipeline_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setPipelineStatus(data.result);
        else setPipelineStatus(data.status);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const toggleAccordion = (s: boolean) => {
    setOpenState(s);
    const current = ref.current as HTMLElement;
    if (s) {
      current.style.maxHeight = `${maxHeight}px`;
    } else current.style.maxHeight = `${0}px`;
  };

  useEffect(() => {
    const current = ref.current as HTMLElement;
    if (current) {
      setMaxHeight(current.scrollHeight);
      if (eleID === 0) {
        toggleAccordion(openState);
      }
    }
  }, []);

  return (
    <li className="bp__history-row">
      {/* Header */}
      <div className="bp__history-row__header">
        <div>
          <h3>Deployment</h3>
          <p>Started at {time}</p>
        </div>
        <div className="bp__history-row__header__rcol">
          <span
            className={`bp__history-row__state bp__history-row__state--${pipelineStatus}`}
          >
            {pipelineStatus === "PENDING" ? "pending" : null}
            {pipelineStatus === "COMPLETED" ? "success" : null}
            {pipelineStatus === "FAILED" ? "failed" : null}
            {pipelineStatus === "IN_PROGRESS" ? "in progress" : null}
            {pipelineStatus === "SUCCESSFUL" ? "success" : null}
            {pipelineStatus === "STOPPED" ? "stopped" : null}
          </span>
          <button
            aria-expanded={openState}
            aria-controls={`accordion-${eleID}`}
            onClick={() => toggleAccordion(!openState)}
            className={`${openState ? "active" : ""}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
            </svg>
          </button>
        </div>
      </div>
      {/* Body */}
      <div
        className="bp__history-row__body"
        id={`accordion-${eleID}`}
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <div className="bp__history-row__body__inner">
          <ul>
            <li>
              <b>Author:</b> {author_name}
            </li>
            <li>
              <b>Branch:</b> {branch}
            </li>
            <li>
              <b>Repository:</b> {repository}
            </li>
            <li>
              <b>Workspace:</b> {workspace}
            </li>
            <li>
              <b>Commit: </b>
              <a href={commit_url} target={"_blank"}>
                {commit_id}
              </a>
            </li>
          </ul>
          <button className="bp__button" onClick={checkPipelineStatus}>
            {loading ? "Loading..." : "Check status"}
          </button>
        </div>
      </div>
    </li>
  );
};

export default HistoryRow;
