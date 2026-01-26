'use client';

interface CreatorInfoProps {
  name: string;
  bio: string;
  image: string | null;
}

export default function CreatorInfo({ name, bio, image }: CreatorInfoProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center gap-4 mb-4">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <span className="text-sm text-gray-500">Creator</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm">{bio}</p>
    </div>
  );
}
