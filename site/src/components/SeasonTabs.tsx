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
      <div className="flex flex-wrap items-end gap-x-2 border-b-2 border-ink mb-12" role="tablist" aria-label="Sezone">
        {seasons.map(([season, list]) => {
          const active = activeSeason === season;
          const region = list.find((ep) => ep.region)?.region;
          return (
            <button
              key={season}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveSeason(season)}
              className={`-mb-0.5 px-5 pt-3 pb-2.5 font-typewriter uppercase tracking-[0.12em] text-sm border-2 border-b-0 transition-colors cursor-pointer ${
                active
                  ? 'bg-ink text-cream border-ink'
                  : 'bg-cream text-ink border-hay hover:border-bordo hover:text-bordo'
              }`}
            >
              Sezona {season}
              {region && <span className={`block text-[0.7rem] tracking-[0.15em] mt-0.5 ${active ? 'text-cream/60' : 'text-stone'}`}>{region}</span>}
            </button>
          );
        })}
      </div>

      {hasContent ? (
        <div className="video-tilt grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {regular.length === 0 && announcement && <UpcomingCard episode={announcement} label="Najava sezone" />}

          {regular.length > 0 && (
            <>
              {teaser && <UpcomingCard episode={teaser} label="Sledeća epizoda" />}
              {regular.map((ep) => (
                <EpisodeCard key={ep.id} episode={ep} />
              ))}
            </>
          )}
        </div>
      ) : (
        <p className="font-typewriter text-lg text-stone border-2 border-dashed border-hay p-10 text-center">
          Trenutno nema sadržaja za ovu sezonu.
        </p>
      )}
    </div>
  );
}

function Location({ episode }: { episode: Episode }) {
  return (
    <p className="font-typewriter text-sm uppercase tracking-[0.08em] text-bordo mt-2">
      {episode.region}
      {episode.village ? ` · ${episode.village}` : ''}
    </p>
  );
}

function UpcomingCard({ episode, label }: { episode: Episode; label: string }) {
  return (
    <article>
      <div className="video-print">
        <span className="video-badge">{label}</span>
        <div className="aspect-video bg-hay paper-dots flex items-center justify-center">
          <span className="stamp" style={{ position: 'static', width: 120, height: 120, fontSize: '1rem' }}>
            Uskoro
          </span>
        </div>
        <div className="video-bar">
          <span>Sezona {episode.season}</span>
          <span>Premijera {formatDate(episode.releaseDate)}</span>
        </div>
      </div>
      <h3 className="font-slab font-bold text-2xl leading-tight text-ink mt-5 line-clamp-2">{episode.title}</h3>
      <Location episode={episode} />
      <p className="text-[0.95rem] leading-relaxed text-stone mt-2 line-clamp-3">{episode.description}</p>
    </article>
  );
}

function EpisodeCard({ episode }: { episode: Episode }) {
  const released = episode.season === 1 || isReleased(episode.releaseDate);
  const href = `/video/${slugify(episode.series)}/${slugify(episode.title)}`;

  const media = (
    <>
      <span className="video-badge">
        S{episode.season} · E{episode.episodeNumber}
      </span>
      {episode.thumbnail ? (
        <img
          src={episode.thumbnail}
          alt={`Naslovna slika epizode ${episode.title}`}
          className="aspect-video"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="aspect-video bg-hay flex items-center justify-center">
          <span className="font-slab font-bold text-xl text-stone">Uskoro</span>
        </div>
      )}
      {released && <span className="video-play" aria-hidden="true" />}
      <div className="video-bar">
        <span>{episode.series}</span>
        <span>{released ? 'Gledaj →' : `Premijera ${formatDate(episode.releaseDate)}`}</span>
      </div>
    </>
  );

  return (
    <article className="group">
      {released ? (
        <a href={href} className="video-print" aria-label={`Gledaj: ${episode.title}`}>
          {media}
        </a>
      ) : (
        <div className="video-print">{media}</div>
      )}
      <h3 className="font-slab font-bold text-2xl leading-tight text-ink mt-5 line-clamp-2">
        {released ? (
          <a href={href} className="hover:text-bordo transition-colors">
            {episode.title}
          </a>
        ) : (
          episode.title
        )}
      </h3>
      <Location episode={episode} />
      <p className="text-[0.95rem] leading-relaxed text-stone mt-2 line-clamp-3">{episode.description}</p>
    </article>
  );
}
