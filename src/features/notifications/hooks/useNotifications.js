import { useEffect, useState, useCallback, useRef } from "react";
import { getNotifications } from "../application/getNotifications";
import { markNotificationAsRead } from "../application/markAsRead";
import { removeNotification } from "../application/removeNotification";


function useNotifications({ userId } = {}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mountedRef = useRef(true);
  useEffect(() => () => { mountedRef.current = false; }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const list = await getNotifications({ userId });
      if (!mountedRef.current) return;
      setNotifications(list);
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err);
    } finally {
      if (!mountedRef.current) return;
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleMarkAsRead = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await markNotificationAsRead(id);
        await load(); 
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    },
    [load]
  );

  const handleRemove = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await removeNotification(id);
        await load();
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    },
    [load]
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

export { useNotifications };