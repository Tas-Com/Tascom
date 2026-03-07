import { useMemo, useState, useEffect } from "react";
import Map, { NavigationControl, Marker } from "@vis.gl/react-maplibre";
import maplibregl from "maplibre-gl";
import type { FilterSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapFilters } from "./components/MapFilters";
import { TaskCardWithCreator } from "@/shared/components/cards/TaskCardWithCreator";
import { useCurrentUser } from "@/modules/profile/hooks/useCurrentUser";
import { useNearbyTasks } from "@/modules/tasks/hooks/useTasks";
import { useLocation } from "@/shared/hooks/useLocation";
import { toTask, toTaskCardData } from "@/modules/tasks/adapters/toTask";
import { reverseGeocode } from "@/shared/utils/reverseGeocode";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { TaskResponse } from "@/modules/tasks/repository/TasksDtos";

interface MapTaskItem {
  taskId: string;
  taskTitle: string;
  description: string;
  categories: string[];
  location: string;
  duration: string;
  points: number;
  imageUrl: string;
  likes: number;
  comments: number;
  postedTime: string;
  priority: string;
  creatorId: string;
  fallbackName: string;
  fallbackRating: number;
  latitude: number;
  longitude: number;
  isLiked?: boolean;
}

export const MapPage = () => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { location } = useLocation();

  const { data: nearbyTasksResponse, isLoading: isTasksLoading } = useNearbyTasks({
    userLat: location?.latitude ?? user?.latitude,
    userLng: location?.longitude ?? user?.longitude,
    maxDistance: 500000, // 500 km in meters
    limit: 100, // Fetch more tasks for the map
  });

  // Transform API tasks to card-ready data with coordinates
  const mapTasks = useMemo(() => {
    let rawTasks: TaskResponse[] = [];
    if (nearbyTasksResponse?.data) {
      if (Array.isArray(nearbyTasksResponse.data)) {
        rawTasks = nearbyTasksResponse.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } else if (Array.isArray((nearbyTasksResponse.data as any).data)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rawTasks = (nearbyTasksResponse.data as any).data;
      }
    }

    return rawTasks.map((taskResponse: TaskResponse) => {
      const task = toTask(taskResponse);
      const cardData = toTaskCardData(task);
      return {
        ...cardData,
        creatorId: String(task.creatorId),
        fallbackName: task.creator?.name || "Unknown",
        fallbackRating: task.creator?.ratingAvg ?? task.creator?.rating ?? 0,
        latitude: task.latitude,
        longitude: task.longitude,
        isLiked: task.isLiked,
        isSaved: task.isSaved,
      };
    });
  }, [nearbyTasksResponse]);

  // Default value if user location is not available
  const initialViewState = useMemo(
    () => ({
      longitude: location?.longitude || user?.longitude || 35.2137, // Default to Palestine/Jerusalem coordinates
      latitude: location?.latitude || user?.latitude || 31.7683,
      zoom: (location?.longitude || user?.longitude) ? 12 : 2,
    }),
    [user?.longitude, user?.latitude, location?.latitude, location?.longitude],
  );

  const [locationName, setLocationName] = useState("");
  const [pointsFilter, setPointsFilter] = useState(15);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [isMobileCardExpanded, setIsMobileCardExpanded] = useState(true);

  // Reverse geocode user coordinates to a readable city name
  useEffect(() => {
    const lat = location?.latitude || user?.latitude;
    const lng = location?.longitude || user?.longitude;
    if (lat && lng) {
      reverseGeocode(lat, lng)
        .then((city) => setLocationName(city))
        .catch(() => setLocationName("Unknown Location"));
    }
  }, [user?.latitude, user?.longitude, location?.latitude, location?.longitude]);

  // Enable RTL support for Arabic labels
  useEffect(() => {
    if (maplibregl.getRTLTextPluginStatus() === "unavailable") {
      maplibregl.setRTLTextPlugin(
        "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
        true,
      );
    }
  }, []);

  const filteredTasks = useMemo(() => {
    return mapTasks.filter((task: MapTaskItem) => task.points >= pointsFilter);
  }, [mapTasks, pointsFilter]);

  // Group tasks by location
  const groupedTasks = useMemo(() => {
    const groups: Record<string, MapTaskItem[]> = {};
    filteredTasks.forEach((task) => {
      const key = `${task.latitude}_${task.longitude}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
    });
    return Object.values(groups);
  }, [filteredTasks]);

  const selectedTasks = useMemo(() => {
    return filteredTasks.filter((t: MapTaskItem) => selectedTaskIds.includes(t.taskId));
  }, [filteredTasks, selectedTaskIds]);

  const [activeTaskIdInGroup, setActiveTaskIdInGroup] = useState<string | null>(null);

  const selectedTaskToShow = useMemo(() => {
    if (activeTaskIdInGroup) {
      return selectedTasks.find(t => t.taskId === activeTaskIdInGroup);
    }
    return selectedTasks.length === 1 ? selectedTasks[0] : null;
  }, [selectedTasks, activeTaskIdInGroup]);

  if (isUserLoading || isTasksLoading || !user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <p className="text-text-secondary">Loading map...</p>
      </div>
    );
  }

  const handleMapLoad = (e: { target: maplibregl.Map }) => {
    const map = e.target;

    const layers = map.getStyle().layers;
    if (!layers) return;

    layers.forEach((layer) => {
      if (
        layer.type === "symbol" &&
        layer.layout &&
        (layer.layout as Record<string, unknown>)["text-field"]
      ) {
        try {
          const layerId = layer.id;

          // Replace sensitive names (handles both English and Arabic)
          map.setLayoutProperty(layerId, "text-field", [
            "case",
            ["==", ["get", "name:en"], "Israel"],
            "Palestine",
            ["==", ["get", "name:ar"], "إسرائيل"],
            "فلسطين",
            ["coalesce", ["get", "name:en"], ["get", "name"]],
          ]);

          // Hide sensitive places
          const existingFilter = map.getFilter(layerId);
          const sensitiveConditions: FilterSpecification[] = [
            ["!in", "name:en", "Tel Aviv", "Tel Aviv-Yafo", "Tel Aviv-Jaffa"],
            ["!in", "name:ar", "تل أبيب"],
          ];

          const mergedFilter: FilterSpecification = existingFilter
            ? ([
              "all",
              existingFilter,
              ...sensitiveConditions,
            ] as FilterSpecification)
            : (["all", ...sensitiveConditions] as FilterSpecification);

          map.setFilter(layerId, mergedFilter);
        } catch {
          // Skip layers that don't support these property changes
        }
      }
    });
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
      <MapFilters
        locationName={locationName}
        points={pointsFilter}
        onPointsChange={(value) => setPointsFilter(value)}
      />
      <Map
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        attributionControl={false}
        renderWorldCopies={false}
        onClick={() => {
          setSelectedTaskIds([]);
          setActiveTaskIdInGroup(null);
        }}
        onLoad={handleMapLoad}
      >
        <NavigationControl position="bottom-right" />

        {groupedTasks.map((group: MapTaskItem[]) => {
          const firstTask = group[0];
          const isSelected = selectedTaskIds.includes(firstTask.taskId);

          return (
            <Marker
              key={`${firstTask.latitude}_${firstTask.longitude}`}
              longitude={firstTask.longitude}
              latitude={firstTask.latitude}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                const ids = group.map(t => t.taskId);
                setSelectedTaskIds((prev) =>
                  prev[0] === ids[0] && prev.length === ids.length ? [] : ids
                );
                setActiveTaskIdInGroup(null);
                setIsMobileCardExpanded(true);
              }}
            >
              <div className="relative group cursor-pointer transition-transform hover:scale-110 active:scale-95 duration-200">
                <svg
                  width="31.1"
                  height="34.77"
                  viewBox="0 0 31.1 34.77"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`drop-shadow-lg ${isSelected ? "text-brand-purple-dark text-opacity-80" : "text-brand-purple"}`}
                >
                  <path
                    d="M31.1 15.55C31.1 24.13 15.55 34.77 15.55 34.77C15.55 34.77 0 24.13 0 15.55C0 6.96 6.96 0 15.55 0C24.14 0 31.1 6.96 31.1 15.55Z"
                    fill="currentColor"
                  />
                </svg>

                <div className="absolute top-2 left-0 right-0 flex justify-center">
                  <span className="text-[14px] font-bold text-white leading-none">
                    {group.length > 1 ? group.length : firstTask.points}
                  </span>
                </div>
                {group.length > 1 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    +
                  </div>
                )}
              </div>
            </Marker>
          );
        })}
      </Map>

      {/* Group List Popup (Desktop) */}
      {selectedTasks.length > 1 && !activeTaskIdInGroup && (
        <div className="hidden md:block absolute bottom-4 left-4 z-20 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-80 max-h-96 overflow-y-auto animate-in slide-in-from-bottom-5 fade-in duration-300">
          <h3 className="text-lg font-bold mb-3 text-primary">Tasks at this location</h3>
          <div className="space-y-2">
            {selectedTasks.map(task => (
              <button
                key={task.taskId}
                onClick={() => setActiveTaskIdInGroup(task.taskId)}
                className="w-full text-left p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group"
              >
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-sm group-hover:text-brand-purple transition-colors">{task.taskTitle}</span>
                  <span className="text-xs font-bold bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded-full">{task.points} pts</span>
                </div>
                <p className="text-xs text-text-secondary mt-1 line-clamp-1">{task.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedTaskToShow && (
        <div
          className="hidden md:block absolute bottom-4 left-4 z-20 animate-in slide-in-from-bottom-5 fade-in duration-300"
          style={{ width: 420 }}
        >
          <div className="rounded-2xl shadow-2xl border border-white/20 bg-white relative">
            {selectedTasks.length > 1 && (
              <button
                onClick={() => setActiveTaskIdInGroup(null)}
                className="absolute top-4 right-4 z-30 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-white transition-colors text-text-secondary hover:text-primary"
              >
                <ChevronDown className="rotate-90" size={18} />
              </button>
            )}
            <TaskCardWithCreator
              taskId={selectedTaskToShow.taskId}
              creatorId={selectedTaskToShow.creatorId}
              fallbackName={selectedTaskToShow.fallbackName}
              fallbackRating={selectedTaskToShow.fallbackRating}
              taskTitle={selectedTaskToShow.taskTitle}
              description={selectedTaskToShow.description}
              categories={selectedTaskToShow.categories}
              location={selectedTaskToShow.location}
              duration={selectedTaskToShow.duration}
              points={selectedTaskToShow.points}
              imageUrl={selectedTaskToShow.imageUrl}
              likes={selectedTaskToShow.likes}
              comments={selectedTaskToShow.comments}
              postedTime={selectedTaskToShow.postedTime}
              priority={selectedTaskToShow.priority}
              isLiked={selectedTaskToShow.isLiked}
              isSaved={selectedTaskToShow.isSaved}
              compact
            />
          </div>
        </div>
      )}

      {/* Mobile Screen */}
      {selectedTasks.length > 1 && !activeTaskIdInGroup && (
        <div className={`md:hidden absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.12)] p-4 max-h-[75vh] overflow-y-auto`}>
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-3 text-primary">Tasks at this location</h3>
          <div className="space-y-3">
            {selectedTasks.map(task => (
              <button
                key={task.taskId}
                onClick={() => setActiveTaskIdInGroup(task.taskId)}
                className="w-full text-left p-4 rounded-xl bg-gray-50 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-primary">{task.taskTitle}</span>
                  <span className="text-xs font-bold bg-brand-purple text-white px-2 py-0.5 rounded-full">{task.points} pts</span>
                </div>
                <p className="text-sm text-text-secondary line-clamp-2">{task.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedTaskToShow && (
        <div
          className={`md:hidden absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.12)] transition-[max-height] duration-300 ease-in-out ${isMobileCardExpanded ? "max-h-[75vh]" : "max-h-16"
            }`}
        >
          <div className="flex items-center">
            {selectedTasks.length > 1 && isMobileCardExpanded && (
              <button
                onClick={() => setActiveTaskIdInGroup(null)}
                className="ml-4 mt-2 p-2 text-brand-purple flex items-center gap-1 font-semibold text-sm"
              >
                <ChevronDown className="rotate-90" size={16} />
                Back to list
              </button>
            )}
            <button
              onClick={() => setIsMobileCardExpanded((v) => !v)}
              className="flex-1 flex flex-col items-center pt-2 pb-1"
            >
              <div className="w-10 h-1 bg-gray-300 rounded-full mb-0.5" />
              {isMobileCardExpanded ? (
                <ChevronDown size={16} className="text-gray-400" />
              ) : (
                <ChevronUp size={16} className="text-gray-400" />
              )}
            </button>
          </div>

          {!isMobileCardExpanded && (
            <div className="px-4 pb-3">
              <p className="text-sm font-semibold text-primary truncate">
                {selectedTaskToShow.taskTitle}
              </p>
            </div>
          )}

          {isMobileCardExpanded && (
            <div className="overflow-y-auto max-h-[calc(75vh-60px)]">
              <TaskCardWithCreator
                taskId={selectedTaskToShow.taskId}
                creatorId={selectedTaskToShow.creatorId}
                fallbackName={selectedTaskToShow.fallbackName}
                fallbackRating={selectedTaskToShow.fallbackRating}
                taskTitle={selectedTaskToShow.taskTitle}
                description={selectedTaskToShow.description}
                categories={selectedTaskToShow.categories}
                location={selectedTaskToShow.location}
                duration={selectedTaskToShow.duration}
                points={selectedTaskToShow.points}
                imageUrl={selectedTaskToShow.imageUrl}
                likes={selectedTaskToShow.likes}
                comments={selectedTaskToShow.comments}
                postedTime={selectedTaskToShow.postedTime}
                priority={selectedTaskToShow.priority}
                isLiked={selectedTaskToShow.isLiked}
                isSaved={selectedTaskToShow.isSaved}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
