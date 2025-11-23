import { useState, useCallback } from 'react';
import axios from 'axios';
import { TM_BASE, TICKETMASTER_API_KEY } from '../config';
import { showErrorToast } from '../utils/toast';

export function useEvents() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (keyword = '', city = '') => {
    try {
      setLoading(true);
      setError(null);
      const params: any = { apikey: TICKETMASTER_API_KEY };
      if (keyword) params.keyword = keyword;
      if (city) params.city = city;
      const url = `${TM_BASE}events.json`;
      const res = await axios.get(url, { params });
      const items = res.data?._embedded?.events || [];
      setEvents(items);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch');
       showErrorToast(err.message, "Failed to fetch");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, events, error, search, setEvents };
}
