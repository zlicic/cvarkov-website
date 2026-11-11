import { useMemo, useState } from 'react';
import { slugify } from '../lib/slugify';

type EpisodeType = 'episode' | 'teaser' | 'season-announcement';

interface Episode {
  id: string;
  title: string;
  series: string;
  season: number;
  episodeNumber: number;
  region: string;
  village?: string;
  releaseDate: string;
  youtubeUrl?: string;
  thumbnail?: string;
  description: string;
  type: EpisodeType;
}

interface SeasonTabsProps {
  episodes: Episode[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('sr-Latn-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function isReleased(releaseDate: string) {
  return new Date(releaseDate).getTime() <= Date.now();
}

export default function SeasonTabs({ episodes }: SeasonTabsProps) {
  const seasons = useMemo(() => {
    const map = new Map<number, Episode[]>();
    for (const ep of episodes) {
      const list = map.get(ep.season) ?? [];
      list.push(ep);
      map.set(ep.season, list);
    }
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [episodes]);

  const [activeSeason, setActiveSeason] = useState(seasons[0]?.[0] ?? 1);
  const activeEpisodes = seasons.find(([s]) => s === activeSeason)?.[1] ?? [];

  const { regular, teaser, announcement } = useMemo(() => {
    const regular = activeEpisodes.filter((ep) => ep.type === 'episode');
    const teaser = activeEpisodes.find((ep) => ep.type === 'teaser');
    const announcement = activeEpisodes.find((ep) => ep.type === 'season-announcement');
    regular.sort((a, b) => b.episodeNumber - a.episodeNumber);
    return { regular, teaser, announcement };
  }, [activeEpisodes]);

  const hasContent = regular.length > 0 || !!teaser || !!announcement;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Sezone">
        {seasons.map(([season]) => (
          <button
            key={season}
            role="tab"
            aria-selected={activeSeason === season}
            onClick={() => setActiveSeason(season)}
            className={`px-5 py-2.5 text-sm font-bold uppercase tracking-wide rounded border transition-colors ${
              activeSeason === season
                ? 'bg-bordo text-cream border-bordo'
                : 'bg-paper text-ink border-ink/20 hover:border-bordo'
            }`}
          >
            Sezona {season}
          </button>
        ))}
      </div>

      {hasContent ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regular.length === 0 && announcement && (
            <SeasonAnnouncementCard episode={announcement} />
          )}

          {regular.length > 0 && (
            <>
              {teaser && <NextEpisodeCard episode={teaser} />}
              {regular.map((ep) => (
                <EpisodeCard key={ep.id} episode={ep} />
              ))}
            </>
          )}
        </div>
      ) : (
        <p className="text-stone">Trenutno nema sadržaja za ovu sezonu.</p>
      )}
    </div>
  );
}

function SeasonAnnouncementCard({ episode }: { episode: Episode }) {
  return (
    <article className="group bg-paper border border-ink/10 rounded-xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
      <div className="aspect-video bg-stone/10 flex items-center justify-center">
        <span className="font-display text-2xl sm:text-3xl text-stone/60 text-center px-4">
          Najava nove sezone
        </span>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-bordo mb-2">
          <span>Sezona {episode.season}</span>
          <span>•</span>
          <span>Najava</span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl text-ink mb-1 line-clamp-2">{episode.title}</h3>
        <p className="text-sm text-stone mb-3">
          {episode.region}{episode.village ? `, ${episode.village}` : ''}
        </p>
        <p className="text-sm text-ink/80 line-clamp-3 mb-4 flex-grow">{episode.description}</p>
        <span className="mt-auto self-start inline-flex items-center gap-2 px-4 py-2 bg-hay text-stone text-sm font-bold uppercase tracking-wide rounded">
          Premijera {formatDate(episode.releaseDate)}
        </span>
      </div>
    </article>
  );
}

function NextEpisodeCard({ episode }: { episode: Episode }) {
  return (
    <article className="group bg-paper border border-ink/10 rounded-xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
      <div className="aspect-video bg-stone/10 flex items-center justify-center">
        <span className="font-display text-2xl sm:text-3xl text-stone/60 text-center px-4">
          Sledeća epizoda
        </span>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-bordo mb-2">
          <span>Sezona {episode.season}</span>
          <span>•</span>
          <span>Sledeća epizoda</span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl text-ink mb-1 line-clamp-2">{episode.title}</h3>
        <p className="text-sm text-stone mb-3">
          {episode.region}{episode.village ? `, ${episode.village}` : ''}
        </p>
        <p className="text-sm text-ink/80 line-clamp-3 mb-4 flex-grow">{episode.description}</p>
        <span className="mt-auto self-start inline-flex items-center gap-2 px-4 py-2 bg-hay text-stone text-sm font-bold uppercase tracking-wide rounded">
          Premijera {formatDate(episode.releaseDate)}
        </span>
      </div>
    </article>
  );
}

function EpisodeCard({ episode }: { episode: Episode }) {
  const released = episode.season === 1 || isReleased(episode.releaseDate);

  return (
    <article className="group bg-paper border border-ink/10 rounded-xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
      <div className="aspect-video bg-stone/10 overflow-hidden">
        {episode.thumbnail ? (
          <img
            src={episode.thumbnail}
            alt={`Naslovna slika epizode ${episode.title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-xl text-stone/60">Uskoro</span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-bordo mb-2">
          <span>Sezona {episode.season}</span>
          <span>•</span>
          <span>Epizoda {episode.episodeNumber}</span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl text-ink mb-1 line-clamp-2">{episode.title}</h3>
        <p className="text-sm text-stone mb-3">
          {episode.region}{episode.village ? `, ${episode.village}` : ''}
        </p>
        <p className="text-sm text-ink/80 line-clamp-3 mb-4 flex-grow">{episode.description}</p>
        {released ? (
          <a
            href={`/video/${slugify(episode.series)}/${slugify(episode.title)}`}
            className="mt-auto self-start inline-flex items-center gap-2 px-4 py-2 bg-bordo text-cream text-sm font-bold uppercase tracking-wide rounded hover:bg-bordo-dark transition-colors"
          >
            Gledaj epizodu
          </a>
        ) : (
          <span className="mt-auto self-start inline-flex items-center gap-2 px-4 py-2 bg-hay text-stone text-sm font-bold uppercase tracking-wide rounded">
            Premijera {formatDate(episode.releaseDate)}
          </span>
        )}
      </div>
    </article>
  );
}
