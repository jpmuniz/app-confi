import { useEffect, useState, useCallback, useRef } from "react";
import { getNotifications } from "../application/getNotifications";
import { markNotificationAsRead } from "../application/markAsRead";
import { removeNotification } from "../application/removeNotification";


export function useNotifications({ userId } = {}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cancelledRef = useRef(false);

  const load = useCallback(async () => {
    cancelledRef.current = false;
    setLoading(true);
    setError(null);

    try {
      const list = await getNotifications();
      
      if (!cancelledRef.current) {
        setNotifications(list);
        setLoading(false);
      }
    } catch (err) {
      if (!cancelledRef.current) {
        setError(err);
        setLoading(false);
      }
    }
  }, [userId]);

  useEffect(() => {
    cancelledRef.current = false;
    load();

    return () => {
      cancelledRef.current = true;
    };
  }, [load]);

  const handleMarkAsRead = useCallback(
    async (id) => {
      try {
        await markNotificationAsRead(id);
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === id
              ? { ...notification, status: "read" }
              : notification
          )
        );
      } catch (err) {
        setError(err);
      }
    },
    []
  );

  const handleRemove = useCallback(
    async (id) => {
      try {
        await removeNotification(id);
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      } catch (err) {
        setError(err);
      }
    },
    []
  );

  return {
    notifications,
    loading,
    error,
    reload: load,
    handleMarkAsRead,
    handleRemove
  };
}
