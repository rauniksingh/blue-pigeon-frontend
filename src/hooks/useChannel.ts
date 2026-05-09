import { useState, useEffect } from 'react';
import client from '../api/client';
import { ChannelDetail } from '../types';

interface UseChannelReturn {
  channel: ChannelDetail | null;
  isLoading: boolean;
  error: string | null;
}

export const useChannel = (channelId: string): UseChannelReturn => {
  const [channel, setChannel] = useState<ChannelDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!channelId) return;

    const fetchChannel = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await client.get<ChannelDetail>(
          `/channels/${channelId}`,
        );
        setChannel(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to load channel';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannel();
  }, [channelId]);

  return { channel, isLoading, error };
};