'use client';

interface CampaignHeroProps {
  title: string;
  tagline: string;
  projectImage: string | null;
  projectVideo: string | null;
}

export default function CampaignHero({ title, tagline, projectImage, projectVideo }: CampaignHeroProps) {
  return (
    <div>
      {/* Media Section */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
        {projectVideo ? (
          <video
            src={projectVideo}
            controls
            className="w-full h-full object-cover"
            poster={projectImage || undefined}
          />
        ) : projectImage ? (
          <img
            src={projectImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          // Placeholder when no media
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
            <svg className="w-24 h-24 mb-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-medium opacity-90">Campaign Media</p>
            <p className="text-sm opacity-75">Upload an image or video in the dashboard</p>
          </div>
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
