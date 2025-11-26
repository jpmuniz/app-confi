import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { getNotifications } from "../application/getNotifications.js";
import { markNotificationAsRead } from "../application/markAsRead.js";
import { removeNotification } from "../application/removeNotification.js";

export function useNotifications({ userId, services } = {}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cancelledRef = useRef(false);

  const resolvedServices = useMemo(
    () =>
      services ?? {
        getNotifications,
        markNotificationAsRead,
        removeNotification
      },
    [services]
  );

  const load = useCallback(async () => {
    cancelledRef.current = false;
    setLoading(true);
    setError(null);

    try {
      const list = await resolvedServices.getNotifications();
      
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
  }, [userId, resolvedServices]);

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
        await resolvedServices.markNotificationAsRead(id);
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
    [resolvedServices]
  );

  const handleRemove = useCallback(
    async (id) => {
      try {
        await resolvedServices.removeNotification(id);
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      } catch (err) {
        setError(err);
      }
    },
    [resolvedServices]
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
