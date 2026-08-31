import styles from "./WhatsAppButton.module.css";

// Same placeholder number used for the phone/WhatsApp links in the
// Footer — update both together once the real number is available.
const WHATSAPP_NUMBER = "910000000000";

function WhatsAppIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        fill="#ffffff"
        d="M16 3C9 3 3.3 8.7 3.3 15.7c0 2.5.7 4.9 2 7L3 29l6.5-2.2c2 1.1 4.2 1.7 6.5 1.7 7 0 12.7-5.7 12.7-12.7C28.7 8.7 23 3 16 3Zm0 23.2c-2.1 0-4.1-.6-5.9-1.6l-.4-.2-3.9 1.3 1.3-3.8-.3-.4a10.4 10.4 0 0 1-1.7-5.8c0-5.8 4.7-10.5 10.5-10.5 5.8 0 10.5 4.7 10.5 10.5 0 5.8-4.7 10.5-10.5 10.5Z"
      />
      <path
        fill="#ffffff"
        d="M21.7 18.4c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.8-1-2.4-.3-.6-.5-.6-.7-.6h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.3Z"
      />
    </svg>
  );
}

// Floating WhatsApp contact button, fixed at the bottom-left of the
// viewport on every page.
export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}
