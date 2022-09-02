export default function getNonce() {
  const bpSettingsPage = document.getElementById("bp-settings-page");
  const nonce = bpSettingsPage?.getAttribute("data-nonce") || "";
  return nonce;
}
