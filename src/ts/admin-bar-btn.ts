// on document load
document.addEventListener("DOMContentLoaded", () => {
  const adminBarBtn = document.querySelector(
    "#wp-admin-bar-bp-deploy a"
  ) as HTMLAnchorElement;
  if (adminBarBtn) {
    // add event listener to the element
    adminBarBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // get element with an id of bp__admin-bar-nonce
      const nonceEle = document.getElementById(
        "bp__admin-bar-nonce"
      ) as HTMLElement;
      const nonce = nonceEle.getAttribute("nonce") || "";
      adminBarBtn.innerText = "Triggering deploy...";
      fetch("/wp-json/bp-deploy/v1/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": nonce,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (
            data.status === "error" ||
            data.code === "rest_cookie_invalid_nonce"
          ) {
            adminBarBtn.innerText = "Unexpected error";
            setTimeout(() => {
              adminBarBtn.innerText = "Trigger Deploy";
            }, 3000);
          } else {
            // redirect to the /wp-admin/options-general.php?page=bp-deploy&tab=history
            window.location.href =
              "/wp-admin/options-general.php?page=bp-deploy&tab=history";
          }
        })
        .catch((error) => {
          adminBarBtn.innerText = "Unexpected error";
          setTimeout(() => {
            adminBarBtn.innerText = "Trigger Deploy";
          }, 3000);
          console.error("Error:", error);
        });
    });
  }
});
