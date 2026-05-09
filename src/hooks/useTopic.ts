import { useState, useEffect } from 'react';
import client from '../api/client';
import { TopicDetail } from '../types';

interface UseTopicReturn {
  topic: TopicDetail | null;
  isLoading: boolean;
  error: string | null;
}

export const useTopic = (topicId: string): UseTopicReturn => {
  const [topic, setTopic] = useState<TopicDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!topicId) return;

    const fetchTopic = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await client.get<TopicDetail>(`/topics/${topicId}`);
        setTopic(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to load topic';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopic();
  }, [topicId]);

  return { topic, isLoading, error };
};