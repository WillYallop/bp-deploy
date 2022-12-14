// Util
import { useState } from "react";
import getNonce from "../../util/get-nonce";
interface DeployTabProps {
  setActiveTab: (tab: string) => void;
}
const DeployTab: React.FC<DeployTabProps> = ({ setActiveTab }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerDeploy = () => {
    const nonce = getNonce();
    setLoading(true);
    fetch("/wp-json/bp-deploy/v1/deploy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": nonce,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error") {
          setError(true);
        }
        setLoading(false);
        setActiveTab("history");
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.error("Error:", error);
      });
  };

  return (
    <div className="bp__wrapper">
      <div className="bp__tab-wrapper">
        <div className="bp__deploy-tab">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 731.67 435.03">
            <path
              d="M79.48 306.79c-3.16.34-6.6.85-10.28 1.6-15.55 3.16-15.87 13.72-15.74 16.14l-.1-.06a25.63 25.63 0 0 0-3.14 7.44l-.7-32.37c.45-.96.87-2.04 1.22-3.16 1.16 3.58 3.07 6.97 4.72 6.75 2.14-.3 3.07-6.59 2.67-11.06 2.72 3.5 7.3 7.25 9.03 6.1 1.38-.93.56-4.73-.95-8.19 3.14 1.9 6.62 3.14 7.7 1.94 1.47-1.64-2.06-7.23-5.31-10.35 4.35.4 9.89-.3 10.25-2.27.3-1.64-3-3.7-6.52-5.02 3.54-.94 6.86-2.57 6.75-4.18-.13-1.91-5.05-3.2-9.3-3.39 3.2-2.5 6.14-5.97 5.24-7.53-.82-1.44-4.67-.88-8.22.38 2.1-3 3.58-6.38 2.45-7.54-1.4-1.44-6.37 1.05-9.76 3.8.66-4.29.32-9.7-1.6-10.2-1.61-.4-3.89 2.75-5.45 6.18-.7-3.6-2.1-7.02-3.7-7.02-2.3 0-4.17 6.93-4.17 11.45 0 .26 0 .5.02.73-.23-.27-.5-.55-.8-.84-3.24-3.15-9.51-6.64-11.12-5-1.12 1.16.36 4.55 2.46 7.55-3.55-1.27-7.4-1.82-8.23-.38-1.1 1.93 3.64 6.76 7.5 9.1l-.73-.07c-4.51-.3-11.56 1.08-11.71 3.38-.11 1.6 3.2 3.24 6.75 4.17-3.53 1.33-6.83 3.39-6.53 5.02.36 1.98 5.9 2.68 10.26 2.27-3.26 3.12-6.78 8.71-5.31 10.35 1.08 1.2 4.55-.04 7.7-1.93-1.51 3.45-2.33 7.25-.95 8.18 1.82 1.22 6.82-3.03 9.46-6.68-.27 4.47.8 10.6 2.92 10.85.9.1 1.83-.84 2.68-2.3l-2.4 34.79c-.57 4.05 3.03 6.7 3.35 8.36l.52 23.56a25.44 25.44 0 0 0-2.44-5.1l-.1.07c.13-2.42-.19-12.98-15.74-16.15-3.67-.75-7.12-1.26-10.28-1.6-3.73-.4-5.19 4.7-1.81 6.36 4.88 2.39 9.47 5.4 11.86 8.96 6.12 9.12 14.58 3.85 15.78 3.03a25.06 25.06 0 0 1 2.78 6.63l.27 12.51-.12.48.13.03.67 30.28 6.18-.05-2.21-30.95c.37-1.67 1.51-7.35 0-13.26l-2.21-24.32c0-.02.12.64 0 0l-2.88-9.55c.41-2.96 1.39-6.28 3.36-9.57 1.2.81 9.66 6.08 15.78-3.03 2.4-3.57 6.99-6.58 11.87-8.97 3.37-1.65 1.91-6.75-1.82-6.35Zm-28.23 71.64-.12-5.3c.24 2 .22 3.81.12 5.3Z"
              fill="#f2f2f2"
            />
            <path
              d="M0 414.29c0 .66.53 1.19 1.19 1.19h729.29c.66 0 1.19-.53 1.19-1.2 0-.65-.53-1.18-1.19-1.18H1.19c-.66 0-1.19.53-1.19 1.19Z"
              fill="#3f3d56"
            />
            <circle cx="442.58" cy="361.34" r="54" fill="#3f3d56" />
            <circle cx="442.58" cy="361.34" r="36" fill="#fff" />
            <circle cx="442.58" cy="361.34" r="20.5" fill="#3f3d56" />
            <circle cx="130.58" cy="361.34" r="54" fill="#3f3d56" />
            <circle cx="130.58" cy="361.34" r="36" fill="#fff" />
            <path
              d="M516.45 335.66c-7.03-17.73-31.61-71.9-75.39-89.83-.33-.13-.69-.23-1.05-.28l-140.4-20.11a4.29 4.29 0 0 0-4.84 3.56l-2.46 15.2a4.27 4.27 0 0 0 .62 3c7.13 11.06 52.83 86.14-20.35 86.14-72.03 0-93.35-52.37-96.55-61.61a4.28 4.28 0 0 1-.04-2.7l22.19-70.25c.4-1.25.17-2.53-.46-3.55l9.75-18.11 17.86 10.11 9.25.11 31.57 16.5 6.43-10.5-65.11-32.47s.1-7.53-20.9-13.53l-33-15-4 5 10 8 1 6 7 2 14 27-4 7.74 4.86 2.37-1.39-.32c-2-.46-4.06.58-4.88 2.46l-22.06 50.57c-.34.77-.9 1.43-1.6 1.88l-7.87 5.07a4.29 4.29 0 0 0-1.64 1.97l-8.97 21.78a4.25 4.25 0 0 0-.3 2.07c-11.18 2.12-44.08 11.28-62.14 47.41l21 17s32.92-21.3 87.32.88c9.46 14.72 23.25 26.94 43.17 28.09 52.5 3.03 139.5 6.03 149.5-5.97a337.57 337.57 0 0 1 14.63-16.58 4.27 4.27 0 0 1 2.96-1.32l122.44-3.9a4.29 4.29 0 0 0 3.85-5.88Z"
              fill="#6319ec"
            />
            <circle cx="178.58" cy="162.34" r="16" fill="#3f3d56" />
            <path
              d="M434.81 245.9c-.19 0-.38 0-.57-.02l-133.78-5.17c-5.92-.23-10.99-4-12.91-9.6l-1.83-5.33c-1.5-4.35-.85-9 1.78-12.77a14.1 14.1 0 0 1 11.36-6.1l138.21-3.18a14.24 14.24 0 0 1 14.32 16.9l-2.6 13.69a14.15 14.15 0 0 1-13.98 11.58Z"
              fill="#3f3d56"
            />
            <circle cx="130.58" cy="361.34" r="20.5" fill="#3f3d56" />
            <path
              d="M488.56 302.98a9 9 0 0 1-7.88-4.66l-10.13-18.34a8.9 8.9 0 0 1 .24-9.13 8.88 8.88 0 0 1 8.1-4.22l18.39.94a9.06 9.06 0 0 1 7.84 5.49l5.37 12.7a8.93 8.93 0 0 1-.07 7.17 8.92 8.92 0 0 1-5.3 4.86l-13.62 4.7c-.97.33-1.96.49-2.94.49ZM256 424.87l-.45-.03-4.08-.45a4.18 4.18 0 0 1-3.17-2.06 4.18 4.18 0 0 1-.25-3.77l21.24-50.43.46.19-.46-.2a4.23 4.23 0 0 1 7.14-1.02 4.2 4.2 0 0 1 .73 4L260.01 422a4.24 4.24 0 0 1-4 2.87Z"
              fill="#3f3d56"
            />
            <path
              d="M366.28 72.88s-7.77-15.54-6.22-29.52l-25.86 13.4 1 25.45 31.08-9.33Z"
              fill="#a0616a"
            />
            <circle cx="350.23" cy="40.61" r="23.33" fill="#a0616a" />
            <path
              fill="#a0616a"
              d="M374.06 406.93h-14.24l-6.77-54.91h21.01v54.91z"
            />
            <path
              d="M325.29 406.6c-.45.75-.68 3.16-.68 4.03a4.83 4.83 0 0 0 4.83 4.83h44.08a3.3 3.3 0 0 0 3.3-3.3v-1.83S379 404.8 374.5 398c0 0-5.58 5.33-13.92-3.01l-2.46-4.46-17.8 13.02-9.86 1.22c-2.16.26-4.07-.05-5.18 1.82Z"
              fill="#2f2e41"
            />
            <path
              d="m332.09 72.88 34.19-4.66 26.41 12.43 1.56 96.34s-64.99 7.77-75.23-2.33c-10.24-10.1-2.47-90.9-2.47-90.9l15.54-10.88Z"
              fill="#e6e6e6"
            />
            <path
              d="M344.4 46.55h-6.28s-5.44-6.7-4.7-2.61c.73 4.08-2.2 8.47-2.2 8.47l-4.4-1.46S318.05 14 344.4 11.98c26.36-2.03 32.21 18.47 32.21 18.47s-1.46 10.25-4.4 7.32-19.02-4.4-19.02-4.4l-8.79 13.18Z"
              fill="#2f2e41"
            />
            <path
              fill="#a0616a"
              d="m316.26 298.22-13.02 5.76-28.4-47.47 19.22-8.5 22.2 50.21z"
            />
            <path
              d="M271.53 317.66c-.1.86.66 3.16 1.01 3.95a4.83 4.83 0 0 0 6.37 2.46l40.32-17.83a3.3 3.3 0 0 0 1.68-4.35l-.74-1.67s-.24-5.93-7.1-10.33c0 0-2.95 7.12-13.95 2.87l-4.05-3.08-11 19.1-8.54 5.1c-1.87 1.12-3.74 1.62-4 3.78Z"
              fill="#2f2e41"
            />
            <path
              d="m389.58 167.67 4.67 14.1v48.45l-15.23 43.9 1.24 102.34h-27.32l-3.08-104.4 2.43-51.56-18.65-7.77-48.98 3.03 22.9 56.3-25.2 16.82s-37.7-85.92-32.05-94.24c5.64-8.32 71.68-23 71.68-23s67.6-2.42 67.6-3.97Z"
              fill="#2f2e41"
            />
            <path
              d="m403.57 111.73 7.51 12.3s10.62 41.75 0 41.92c-10.62.17-32.06-21.28-32.06-21.28l2.8-11.19 7.76 3.11-1.55-24.86h15.54Z"
              fill="#a0616a"
            />
            <path
              d="M380.26 80.46s24.86-4.38 27.2 11.89c2.33 16.27 3.62 31.68 3.62 31.68l-26.93 2.24-3.89-45.81Z"
              fill="#e6e6e6"
            />
            <ellipse
              cx="374.23"
              cy="135.17"
              rx="7.02"
              ry="14.03"
              transform="rotate(-54.54 374.23 135.17)"
              fill="#a0616a"
            />
            <path
              d="M590.48 306.79c-3.16.34-6.6.85-10.28 1.6-15.55 3.16-15.87 13.72-15.74 16.14l-.1-.06a25.63 25.63 0 0 0-3.14 7.44l-.7-32.37c.45-.96.87-2.04 1.22-3.16 1.16 3.58 3.07 6.97 4.72 6.75 2.14-.3 3.07-6.59 2.67-11.06 2.72 3.5 7.3 7.25 9.03 6.1 1.38-.93.56-4.73-.95-8.19 3.14 1.9 6.62 3.14 7.7 1.94 1.47-1.64-2.06-7.23-5.31-10.35 4.35.4 9.89-.3 10.25-2.27.3-1.64-3-3.7-6.52-5.02 3.54-.94 6.86-2.57 6.75-4.18-.13-1.91-5.05-3.2-9.3-3.39 3.2-2.5 6.14-5.97 5.24-7.53-.82-1.44-4.67-.88-8.22.38 2.1-3 3.58-6.38 2.45-7.54-1.4-1.44-6.37 1.05-9.76 3.8.66-4.29.32-9.7-1.6-10.2-1.61-.4-3.89 2.75-5.45 6.18-.7-3.6-2.1-7.02-3.7-7.02-2.3 0-4.17 6.93-4.17 11.45 0 .26 0 .5.02.73-.23-.27-.5-.55-.8-.84-3.24-3.15-9.51-6.64-11.12-5-1.12 1.16.36 4.55 2.46 7.55-3.55-1.27-7.4-1.82-8.23-.38-1.1 1.93 3.64 6.76 7.5 9.1l-.73-.07c-4.51-.3-11.56 1.08-11.71 3.38-.11 1.6 3.2 3.24 6.75 4.17-3.53 1.33-6.83 3.39-6.53 5.02.36 1.98 5.9 2.68 10.26 2.27-3.26 3.12-6.78 8.71-5.31 10.35 1.08 1.2 4.55-.04 7.7-1.93-1.51 3.45-2.33 7.25-.95 8.18 1.82 1.22 6.82-3.03 9.46-6.68-.27 4.47.8 10.6 2.92 10.85.9.1 1.83-.84 2.68-2.3l-2.4 34.79c-.57 4.05 3.03 6.7 3.35 8.36l.52 23.56a25.44 25.44 0 0 0-2.44-5.1l-.1.07c.13-2.42-.19-12.98-15.74-16.15-3.67-.75-7.12-1.26-10.28-1.6-3.73-.4-5.19 4.7-1.81 6.36 4.88 2.39 9.47 5.4 11.86 8.96 6.12 9.12 14.58 3.85 15.78 3.03a25.06 25.06 0 0 1 2.78 6.63l.27 12.51-.12.48.13.03.67 30.28 6.18-.05-2.21-30.95c.37-1.67 1.51-7.35 0-13.26l-2.21-24.32c0-.02.12.64 0 0l-2.88-9.55c.41-2.96 1.39-6.28 3.36-9.57 1.2.81 9.66 6.08 15.78-3.03 2.4-3.57 6.99-6.58 11.87-8.97 3.37-1.65 1.91-6.75-1.82-6.35Zm-28.23 71.64-.12-5.3c.24 2 .22 3.81.12 5.3Z"
              fill="#f2f2f2"
            />
            <path
              fill="#a0616a"
              d="m518.51 409.07 10.75-2.32-3.85-42.54-15.85 3.42 8.95 41.44z"
            />
            <path
              d="M555.27 400.88c.46.49 1.03 2.27 1.17 2.92.43 2.02-.85 4-2.86 4.44l-33.27 7.19a2.55 2.55 0 0 1-3.03-1.95l-.3-1.39s-2.54-3.8-.26-9.67c0 0 5.08 3.1 10-4.55l1.14-3.76 15.56 6.92 7.64-.69c1.67-.15 3.07-.7 4.2.54h.01Z"
              fill="#2f2e41"
            />
            <path
              fill="#a0616a"
              d="m537.73 405.82 8.96-6.36-20.27-37.6-13.23 9.39 24.54 34.57z"
            />
            <path
              d="M568.3 383.82c.6.27 1.83 1.68 2.22 2.23 1.2 1.68.8 4.01-.88 5.2l-27.76 19.7a2.55 2.55 0 0 1-3.55-.6l-.82-1.15s-3.84-2.5-4.05-8.8c0 0 5.9.87 7.42-8.11l-.45-3.9 17.03.24 6.76-3.65c1.47-.8 2.54-1.84 4.08-1.16ZM408.6 195.47s-16.7 22.73 16.72 48.28l68.25-21.81-24.38-50.84-21.58-11.84-39 36.21Z"
              fill="#2f2e41"
            />
            <path
              fill="#2f2e41"
              d="m493.57 221.94 26.46 51.53 16.72 107.26-20.89 1.39-20.9-101.68-36.91-55.02 25.77-11.84"
            />
            <path
              d="M425.32 227.56v16.19l47.36 52.01s0 39 18.1 57.1l20.9 32.04 18.1-9.75-26.46-93.32-47.36-61.28-30.64 7Z"
              fill="#2f2e41"
            />
            <path
              d="m458.97 67.07-8.92 34.01-34.01-6.69s23.73-24.47 20.39-35.62l22.54 8.3Z"
              fill="#a0616a"
            />
            <path
              d="m432.98 72.2 20.9 9.75s10.74 6.57 10.94 10.95-1.2 25.27-1.2 25.27 8.36 8.36 2.79 25.07l2.78 27.86-62.67 33.43 5.57-58.5-2.79-54.33 23.68-19.5Z"
              fill="#3f3d56"
            />
            <g>
              <path
                d="M414.23 230.72c2.44 5.6 7.32 8.9 10.9 7.34 3.56-1.56 4.48-7.37 2.03-12.99a15.32 15.32 0 0 0-4.3-5.82L412.2 195.6l-11 5.24 11.68 22.76c-.12 2.45.34 4.89 1.35 7.12Z"
                fill="#a0616a"
              />
              <path
                d="M425.32 95.19s-15.32-9.75-20.9 1.39c-5.57 11.14-18.1 68.25-18.1 68.25l18.1 54.32 16.72-6.96-14.62-58.46 18.8-58.54Z"
                fill="#3f3d56"
              />
            </g>
            <g>
              <path
                d="M503.85 221.95c4.34 4.31 10.08 5.57 12.83 2.8 2.75-2.75 1.45-8.5-2.89-12.81a15.32 15.32 0 0 0-6.14-3.83l-18.63-18.06-8.29 8.92 19.25 16.86c.78 2.32 2.1 4.42 3.87 6.12Z"
                fill="#a0616a"
              />
              <path
                d="M464.23 91.86s-26.71-1.09-27.79 11.32c-1.07 12.42 17.19 67.8 17.19 67.8l36.85 43.83 12.97-12.63-35.14-48.97-4.08-61.35Z"
                fill="#3f3d56"
              />
            </g>
            <g>
              <path
                d="m437.94 172.62-22.3-67.73c-18.05-15.9-37.62 22.38-90.15.68l16.53 76.61c39.71-21.47 73.9-29.88 95.92-9.56Z"
                fill="#fff"
              />
              <path
                d="M342.02 183.18a1 1 0 0 1-.98-.79l-16.52-76.6a1 1 0 0 1 1.36-1.14c29.84 12.32 49.1 4.98 63.16-.37 10.7-4.08 19.13-7.3 27.25-.14a1 1 0 0 1 .3.44l22.3 67.73a1 1 0 0 1-1.62 1.04c-19.37-17.86-49.48-14.77-94.78 9.71a1 1 0 0 1-.47.12Zm-15.15-75.98 15.84 73.47c43.46-23.27 73.23-26.86 93.17-11.13l-21.11-64.08c-7.15-6.12-14.66-3.26-25.02.69-14.1 5.37-33.3 12.69-62.88 1.05Z"
                fill="#3f3d56"
              />
            </g>
            <g>
              <path
                d="m298.59 112.73-7.51 12.3s-10.62 41.75 0 41.92c10.62.17 32.06-21.28 32.06-21.28l-2.8-11.19-7.77 3.11 1.56-24.86h-15.54Z"
                fill="#a0616a"
              />
              <path
                d="M321.9 81.46s-24.87-4.38-27.2 11.89c-2.33 16.27-3.62 31.68-3.62 31.68l26.93 2.24 3.89-45.81Z"
                fill="#e6e6e6"
              />
              <ellipse
                cx="327.93"
                cy="136.17"
                rx="14.03"
                ry="7.02"
                transform="rotate(-35.46 327.93 136.17)"
                fill="#a0616a"
              />
            </g>
            <circle cx="585.63" cy="413.5" r="8.44" fill="#3f3d56" />
            <circle cx="596.88" cy="426.59" r="8.44" fill="#3f3d56" />
            <circle cx="681.26" cy="426.59" r="8.44" fill="#3f3d56" />
            <path
              d="M609.24 300.29v-91.65c0-10.26 8.58-12.8 18.84-12.8 5.03 0 7.47-.58 11 3 3.53 3.59 7.45 5.07 7.37 10.1l-1.47 89.93-35.74 1.42Zm19.84-98.45c-9.16 0-17.84-2.36-17.84 6.8v89.57l31.77-1.26 1.44-88.04c.08-4.49-7.22-3.87-10.37-7.07-3.15-3.2-.51 0-5 0Z"
              fill="#3f3d56"
            />
            <path
              d="m584.12 299.18-1.28 100.13a7.7 7.7 0 0 0 .9 3.7l9.45 17.87a7.7 7.7 0 0 0 7.15 4.09l83.06-3.66a7.7 7.7 0 0 0 7.35-8.05l-5.2-114.33a7.7 7.7 0 0 0-7.7-7.35h-86.03a7.7 7.7 0 0 0-7.7 7.6Z"
              fill="#e6e6e6"
            />
            <path
              d="m616.86 344.37-2-.1.75-14.82a15.4 15.4 0 0 1 14.96-14.57l35.37-.82a13.14 13.14 0 0 1 13.45 12.44l.76 13.55-2 .1-.75-13.54a11.14 11.14 0 0 0-11.41-10.55l-35.38.82a13.39 13.39 0 0 0-13 12.67l-.75 14.82ZM615.45 416.15l-1.99-.2 4.32-42.07c.8-7.78 7.29-13.9 15.1-14.26l34.5-1.54c4.34-.2 8.47 1.34 11.63 4.33a15.76 15.76 0 0 1 4.97 11.38l.39 36.62-2 .02-.39-36.62c-.04-3.8-1.58-7.34-4.34-9.95s-6.39-3.96-10.17-3.79l-34.5 1.55c-6.83.3-12.5 5.66-13.2 12.46l-4.32 42.07Z"
              fill="#3f3d56"
            />
            <path
              d="m599.99 413.24-2-.02 1.26-96.12a12.2 12.2 0 0 1 11.87-12.07l68-2 .06 2-68 2a10.2 10.2 0 0 0-9.93 10.1L600 413.23Z"
              fill="#3f3d56"
            />
            <path
              d="M600.17 399.55h-1.4V312a5.03 5.03 0 0 0-5.02-5.03h-7.77v-2h7.77a7.04 7.04 0 0 1 7.03 7.03v41.45l-.61 46.09Z"
              fill="#3f3d56"
            />
            <g>
              <path
                d="M473.49 48.89a23.2 23.2 0 1 1-46.41 0 23.2 23.2 0 0 1 46.41 0Z"
                fill="#a0616a"
              />
              <path
                d="M448.43 17.69c.67.39 1.57-.2 1.79-.95.21-.75-.04-1.54-.29-2.28l-1.25-3.7c-.89-2.64-1.83-5.36-3.75-7.36-2.9-3.02-7.52-3.79-11.67-3.23-5.33.71-10.6 3.6-13.07 8.38s-1.43 11.43 3.05 14.41c-6.38 7.32-8.6 15.48-8.26 25.19.35 9.7 10.93 18.64 17.83 25.47 1.54-.93 2.94-5.3 2.1-6.9-.85-1.59.36-3.43-.69-4.9-1.05-1.46-1.92.88-.86-.58.67-.92-1.95-3.03-.95-3.58 4.81-2.66 6.41-8.66 9.43-13.25a22.58 22.58 0 0 1 16.49-9.92c3.64-.34 7.48.28 10.46 2.4 2.98 2.1 4.91 5.88 4.22 9.46a8.55 8.55 0 0 0 2.35-7 8.55 8.55 0 0 0-4.1-6.16c1.34-4.43.2-9.53-2.92-12.96-3.1-3.43-15.72-2.84-20.26-1.94l.35-.6Z"
                fill="#2f2e41"
              />
              <path
                d="M447.73 34.63c-6.01.64-10.35 5.85-14.02 10.66-2.11 2.77-4.33 5.83-4.27 9.32.05 3.52 2.4 6.55 3.53 9.88a14.9 14.9 0 0 1-4.33 15.7c4.33.82 9-2.43 9.75-6.77.87-5.06-2.96-9.93-2.5-15.04.4-4.5 3.94-7.97 6.96-11.33 3.01-3.37 5.84-7.83 4.46-12.13l.42-.3Z"
                fill="#2f2e41"
              />
            </g>
          </svg>
          <h2>Deploy Website</h2>
          <p>This typically takes 3 minutes to complete!</p>
          {error ? (
            <div className="bp__deploy-tab__error">
              <p>
                There was an error! Please check the plugin, repository settings
                and pipeline for misconfiguration.
              </p>
            </div>
          ) : null}
          <button
            className="bp__button"
            onClick={triggerDeploy}
            disabled={loading}
          >
            {loading ? "Triggering deploy..." : "Deploy"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeployTab;
