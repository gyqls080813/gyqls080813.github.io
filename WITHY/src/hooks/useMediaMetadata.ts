import { useState, useCallback } from 'react';
import { fetchYoutubeMetadataAction, YoutubeMetadata } from '@/app/actions/youtube';
import { fetchNetflixMetadataAction, NetflixMetadata } from '@/app/actions/netflix';

export type Platform = 'youtube' | 'netflix' | 'unknown';

export interface MediaMetadata {
  title?: string;
  contentId?: string;
  finalUrl?: string; // Netflix redirect URL etc.
  genres?: string[]; // Netflix specific
  platform: Platform;
}

interface UseMediaMetadataResult {
  metadata: MediaMetadata | null;
  loading: boolean;
  error: string | null;
  fetchMetadata: (url: string) => Promise<void>;
  reset: () => void;
}

export function useMediaMetadata(): UseMediaMetadataResult {
  const [metadata, setMetadata] = useState<MediaMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectPlatform = (url: string): Platform => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('netflix.com')) return 'netflix';
    return 'unknown';
  };

  const reset = useCallback(() => {
    setMetadata(null);
    setLoading(false);
    setError(null);
  }, []);

  const fetchMetadata = useCallback(async (url: string) => {
    if (!url) return;

    setLoading(true);
    setError(null);

    const platform = detectPlatform(url);

    try {
      if (platform === 'youtube') {
        const result: YoutubeMetadata = await fetchYoutubeMetadataAction(url);
        if (result.success) {
          setMetadata({
            title: result.contentTitle,
            contentId: result.contentId,
            platform: 'youtube',
          });
        } else {
          setError(result.error || 'Failed to fetch YouTube metadata');
        }
      } else if (platform === 'netflix') {
        const result: NetflixMetadata = await fetchNetflixMetadataAction(url);
        if (result.success) {
          setMetadata({
            title: result.contentTitle,
            contentId: result.contentId,
            finalUrl: result.finalUrl,
            genres: result.genres,
            platform: 'netflix',
          });
        } else {
          setError(result.error || 'Failed to fetch Netflix metadata');
        }
      } else {
        setError('Unsupported platform');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return { metadata, loading, error, fetchMetadata, reset };
}
