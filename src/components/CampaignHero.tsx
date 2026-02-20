'use client';

interface CampaignHeroProps {
  title: string;
  tagline: string;
  projectImage: string | null;
  projectVideo: string | null;
}

function PlaceholderThumbnail({ title }: { title: string }) {
  // Generate a deterministic gradient from the title
  const hash = title.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const gradients = [
    'from-rose-500 via-pink-500 to-purple-600',
    'from-blue-500 via-cyan-500 to-teal-500',
    'from-amber-500 via-orange-500 to-red-500',
    'from-emerald-500 via-teal-500 to-cyan-600',
    'from-violet-500 via-purple-500 to-pink-500',
    'from-sky-500 via-blue-500 to-indigo-600',
    'from-lime-500 via-emerald-500 to-teal-500',
    'from-fuchsia-500 via-pink-500 to-rose-500',
  ];
  const gradient = gradients[hash % gradients.length];

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center relative`}>
      <div className="absolute inset-0 bg-black/10" />

      {/* Title text on thumbnail */}
      <h2 className="text-white text-2xl md:text-4xl font-bold text-center px-8 mb-6 relative z-10 drop-shadow-lg">
        {title}
      </h2>

      {/* Play button */}
      <div className="relative z-10 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:bg-white transition-colors group">
        <svg className="w-8 h-8 text-gray-800 ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      {/* Fake video duration */}
      <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-mono px-2 py-1 rounded z-10">
        3:47
      </div>

      {/* Fake progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
        <div className="h-full w-0 bg-red-500 rounded-r" />
      </div>
    </div>
  );
}

export default function CampaignHero({ title, tagline, projectImage, projectVideo }: CampaignHeroProps) {
  return (
    <div>
      {/* Media Section - always looks like a video player */}
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6 shadow-lg">
        {projectVideo ? (
          <video
            src={projectVideo}
            controls
            className="w-full h-full object-cover"
            poster={projectImage || undefined}
          />
        ) : projectImage ? (
          <div className="relative w-full h-full">
            <img src={projectImage} alt={title} className="w-full h-full object-cover" />
            {/* Play overlay on static image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:bg-white transition-colors group">
                <svg className="w-8 h-8 text-gray-800 ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-mono px-2 py-1 rounded">3:47</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="h-full w-0 bg-red-500 rounded-r" />
            </div>
          </div>
        ) : (
          <PlaceholderThumbnail title={title} />
        )}
      </div>

      {/* Title and Tagline */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h1>
        <p className="text-xl text-gray-600">{tagline}</p>
      </div>
    </div>
  );
}
