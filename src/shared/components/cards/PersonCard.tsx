import { Star, MapPin, Send, MoreVertical } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { SearchPersonResult } from "@/modules/tasks/repository/SearchDtos";
import { useReverseGeocode } from "@/shared/hooks/useReverseGeocode";
import userDefaultImg from "@/assets/user.jpg";

type Props = {
  person: SearchPersonResult;
};

export function PersonCard({ person }: Props) {
  const avatarUrl =
    person.avatar && person.avatar !== "null"
      ? person.avatar
      : person.assets?.find((a) => a.url && a.url !== "null")?.url ||
        userDefaultImg;

  const rating = person.ratingAvg ?? person.rating ?? 0;
  const displayName = person.name?.trim() || "Anonymous User";
  const { locationName, isLoading: locationLoading } = useReverseGeocode(
    person.latitude,
    person.longitude,
  );
  const displayLocation =
    locationName || person.location?.trim() || "Location not set";
  const skills = person.skills
    ? person.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <div
      className="bg-white rounded-2xl p-1 border border-blue-200 w-full"
      style={{ maxWidth: 915, minHeight: 264, borderRadius: 16 }}
    >
      <div className="flex items-start gap-4 p-5">
        <Link to="/user-profile/$userId" params={{ userId: person.id }}>
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-18 h-18 rounded-full object-cover border-2 border-gray-100 shrink-0"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Link
                  to="/user-profile/$userId"
                  params={{ userId: person.id }}
                  className="hover:underline"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {displayName}
                  </h3>
                </Link>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-amber-500 font-semibold">
                    {rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-1 text-sm text-brand-purple font-medium">
                <MapPin size={14} className="text-brand-purple" />
                <span>{locationLoading ? "Loading..." : displayLocation}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/chat"
                className="w-10 h-10 rounded-full bg-brand-purple flex items-center justify-center hover:bg-purple-700 transition-colors"
              >
                <Send size={18} className="text-white -rotate-12" />
              </Link>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-3">
            {person.about?.trim() || "This user hasn't added a bio yet."}
          </p>

          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-full border border-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-4 py-1.5 text-sm text-gray-400 italic">
                No skills listed
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
