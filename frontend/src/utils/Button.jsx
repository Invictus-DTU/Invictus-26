import { useState } from 'react'
import { subscribeToPush } from '@/utils/pushSubscribe'

export default function NotifyButton() {
  const [loading, setLoading] = useState(false)

  const SUBSCRIPTION_KEY = "notification-subscribed";
  const EXPIRY_MS = 2 * 24 * 60 * 60 * 1000; // 2 days

  const hasValidSubscriptionFlag = () => {
  if (typeof window === "undefined") return false;

  const raw = localStorage.getItem("notification-subscribed");
  if (!raw) return false;

  try {
    const { timestamp } = JSON.parse(raw);
    if (!timestamp) return false;

    const expired = Date.now() - timestamp > EXPIRY_MS;

    if (expired) {
      localStorage.removeItem("notification-subscribed");
      return false;
    }

    return true;
  } catch {
    localStorage.removeItem("notification-subscribed");
    return false;
  }
};

  const PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY
  const BACKEND_URL = process.env.NEXT_PUBLIC_IEEE_BACKEND_URL
  const [disabledByCooldown, setDisabledByCooldown] = useState(() =>
        hasValidSubscriptionFlag()
    );
    
  const handleClick = async () => {
    try {
      setLoading(true)

      const status = await subscribeToPush({
        publicVapidKey: PUBLIC_VAPID_KEY,
        backendUrl: BACKEND_URL,
      })

if (status === 201) {
  alert('Subscribed to Invictus updates 🔔');

  localStorage.setItem(
    SUBSCRIPTION_KEY,
    JSON.stringify({ timestamp: Date.now() })
  );
  setDisabledByCooldown(true);
} else if (status === 400) {
  alert('Already subscribed');

  localStorage.setItem(
    SUBSCRIPTION_KEY,
    JSON.stringify({ timestamp: Date.now() })
  );
  setDisabledByCooldown(true);
}

    } catch (err) {
      console.error(err)
      alert(err.message || 'Subscription failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || disabledByCooldown}
      className="px-4 py-2 rounded-md invictus-text uppercase tracking-widest font-[800] bg-[#ffffff] border-2 border-[#b19965]
                transition hover:bg-[#745a309b] hover:text-black active:scale-95 "
    >
      {loading ? 'Enabling...' : 'Get Notified'}
    </button>
  )
}
