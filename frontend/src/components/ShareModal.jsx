import React, { useState, useEffect } from "react";
import axios from "axios";

const ShareModal = ({ isOpen, onClose, selectedProjects = [] }) => {
  const [shareUrl, setShareUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareOption, setShareOption] = useState("all"); // 'all' or 'selected'

  useEffect(() => {
    if (isOpen) {
      setShareUrl("");
      setCopied(false);
      setError("");
    }
  }, [isOpen]);

  const createShareLink = async () => {
    setLoading(true);
    setError("");

    try {
      const projectIds =
        shareOption === "selected" && selectedProjects.length > 0
          ? selectedProjects.map((p) => p._id)
          : [];

      const response = await axios.post("/api/share/create", {
        projectIds,
      });

      if (response.data.success) {
        const fullUrl = `${window.location.origin}/shared/${response.data.shareId}`;
        setShareUrl(fullUrl);
      } else {
        setError("Failed to create share link");
      }
    } catch (err) {
      console.error("Error creating share link:", err);
      setError("Failed to create share link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOnSocialMedia = (platform) => {
    if (!shareUrl) return;

    const text = encodeURIComponent("Check out my portfolio projects!");
    const url = encodeURIComponent(shareUrl);

    let shareUrlMap = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text} ${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    window.open(shareUrlMap[platform], "_blank", "noopener,noreferrer");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Share Your Portfolio
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Generate a link to share your portfolio with others
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Share Options */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">What to share:</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="shareOption"
                  value="all"
                  checked={shareOption === "all"}
                  onChange={(e) => setShareOption(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <div>
                  <span className="text-gray-900">All published projects</span>
                  <p className="text-sm text-gray-500">
                    Share your complete portfolio
                  </p>
                </div>
              </label>

              <label
                className={`flex items-center space-x-3 cursor-pointer ${selectedProjects.length === 0 ? "opacity-50" : ""}`}
              >
                <input
                  type="radio"
                  name="shareOption"
                  value="selected"
                  checked={shareOption === "selected"}
                  onChange={(e) => setShareOption(e.target.value)}
                  disabled={selectedProjects.length === 0}
                  className="h-4 w-4 text-blue-600"
                />
                <div>
                  <span className="text-gray-900">Selected projects only</span>
                  <p className="text-sm text-gray-500">
                    {selectedProjects.length === 0
                      ? "Select projects first"
                      : `${selectedProjects.length} project${selectedProjects.length !== 1 ? "s" : ""} selected`}
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Share URL */}
          {shareUrl && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Your share link:</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="input-field flex-1 text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className={`btn-primary whitespace-nowrap ${copied ? "bg-green-600 hover:bg-green-700" : ""}`}
                >
                  {copied ? "✓ Copied!" : "Copy Link"}
                </button>
              </div>

              {/* Social Sharing */}
              <div className="pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Share on:</h4>
                <div className="flex space-x-3">
                  <button
                    onClick={() => shareOnSocialMedia("twitter")}
                    className="flex-1 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Twitter</span>
                  </button>
                  <button
                    onClick={() => shareOnSocialMedia("linkedin")}
                    className="flex-1 bg-[#0077B5] hover:bg-[#00669c] text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
          {!shareUrl ? (
            <button
              onClick={createShareLink}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Generating Link...</span>
                </span>
              ) : (
                "Generate Share Link"
              )}
            </button>
          ) : (
            <button onClick={onClose} className="btn-secondary">
              Done
            </button>
          )}

          {shareUrl && (
            <div className="text-sm text-gray-500">
              Link expires in 30 days •{" "}
              <span className="text-green-600">✓ Active</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
