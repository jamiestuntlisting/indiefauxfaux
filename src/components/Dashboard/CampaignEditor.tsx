'use client';

import { useState } from 'react';
import { useCampaign } from '@/contexts/CampaignContext';

export default function CampaignEditor() {
  const { state, updateCampaign } = useCampaign();
  const { campaign } = state;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: campaign.title,
    tagline: campaign.tagline,
    description: campaign.description,
    story: campaign.story,
    fundingGoal: campaign.fundingGoal,
    endDate: campaign.endDate.split('T')[0],
    creatorName: campaign.creatorName,
    creatorBio: campaign.creatorBio,
    projectImage: campaign.projectImage || '',
    projectVideo: campaign.projectVideo || ''
  });

  const handleSave = () => {
    updateCampaign({
      ...formData,
      endDate: new Date(formData.endDate).toISOString(),
      projectImage: formData.projectImage || null,
      projectVideo: formData.projectVideo || null
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      title: campaign.title,
      tagline: campaign.tagline,
      description: campaign.description,
      story: campaign.story,
      fundingGoal: campaign.fundingGoal,
      endDate: campaign.endDate.split('T')[0],
      creatorName: campaign.creatorName,
      creatorBio: campaign.creatorBio,
      projectImage: campaign.projectImage || '',
      projectVideo: campaign.projectVideo || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Campaign Details</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
          {isEditing ? (
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          ) : (
            <p className="text-gray-900">{campaign.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
          {isEditing ? (
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          ) : (
            <p className="text-gray-600">{campaign.tagline}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Funding Goal</label>
            {isEditing ? (
              <input
                type="number"
                value={formData.fundingGoal}
                onChange={(e) => setFormData({ ...formData, fundingGoal: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            ) : (
              <p className="text-gray-900">${campaign.fundingGoal.toLocaleString()}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            {isEditing ? (
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            ) : (
              <p className="text-gray-900">{new Date(campaign.endDate).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Image URL</label>
          {isEditing ? (
            <input
              type="url"
              value={formData.projectImage}
              onChange={(e) => setFormData({ ...formData, projectImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          ) : (
            <p className="text-gray-600 text-sm">{campaign.projectImage || 'No image set'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Video URL</label>
          {isEditing ? (
            <input
              type="url"
              value={formData.projectVideo}
              onChange={(e) => setFormData({ ...formData, projectVideo: e.target.value })}
              placeholder="https://example.com/video.mp4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          ) : (
            <p className="text-gray-600 text-sm">{campaign.projectVideo || 'No video set'}</p>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Creator Info</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.creatorName}
                  onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              ) : (
                <p className="text-gray-900">{campaign.creatorName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  value={formData.creatorBio}
                  onChange={(e) => setFormData({ ...formData, creatorBio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              ) : (
                <p className="text-gray-600 text-sm">{campaign.creatorBio}</p>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="border-t border-gray-200 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Story (Markdown supported)</label>
              <textarea
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
