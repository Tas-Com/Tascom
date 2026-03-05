import { useMemo, useState, useEffect } from "react";
import Map, { NavigationControl, Marker } from "@vis.gl/react-maplibre";
import maplibregl from "maplibre-gl";
import type { FilterSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapFilters } from "./components/MapFilters";
import { TaskCardWithCreator } from "@/shared/components/cards/TaskCardWithCreator";
import { useCurrentUser } from "@/modules/profile/hooks/useCurrentUser";
import { useMapTasks } from "@/modules/tasks/hooks/useTasks";
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
  const { data: mapTasksResponse, isLoading: isTasksLoading } = useMapTasks();
  console.log(mapTasksResponse);

  // Transform API tasks to card-ready data with coordinates
  const mapTasks = useMemo(() => {
    let rawTasks: TaskResponse[] = [];
    if (mapTasksResponse?.data) {
      if (Array.isArray(mapTasksResponse.data)) {
        rawTasks = mapTasksResponse.data;
      } else if (Array.isArray((mapTasksResponse.data as any).data)) {
        rawTasks = (mapTasksResponse.data as any).data;
      }
    }

    console.log(rawTasks, "Raw");

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
      };
    });
  }, [mapTasksResponse]);

  // Default value if user location is not available
  const initialViewState = useMemo(
    () => ({
      longitude: user?.longitude || 50,
      latitude: user?.latitude || 50,
      zoom: user?.longitude && user?.latitude ? 11 : 1,
    }),
    [user?.longitude, user?.latitude],
  );

  const [locationName, setLocationName] = useState("");
  const [pointsFilter, setPointsFilter] = useState(15);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isMobileCardExpanded, setIsMobileCardExpanded] = useState(true);

  // Reverse geocode user coordinates to a readable city name
  useEffect(() => {
    if (user?.latitude && user?.longitude) {
      reverseGeocode(user.latitude, user.longitude)
        .then((city) => setLocationName(city))
        .catch(() => setLocationName("Unknown Location"));
    }
  }, [user?.latitude, user?.longitude]);

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

  const selectedTask = useMemo(() => {
    return filteredTasks.find((t: MapTaskItem) => t.taskId === selectedTaskId);
  }, [filteredTasks, selectedTaskId]);

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
        onClick={() => setSelectedTaskId(null)}
        onLoad={handleMapLoad}
      >
        <NavigationControl position="bottom-right" />

        {filteredTasks.map((task: MapTaskItem) => (
          <Marker
            key={task.taskId}
            longitude={task.longitude}
            latitude={task.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedTaskId((prev) =>
                prev === task.taskId ? null : task.taskId,
              );
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
                className="drop-shadow-lg text-brand-purple"
              >
                <path
                  d="M31.1 15.55C31.1 24.13 15.55 34.77 15.55 34.77C15.55 34.77 0 24.13 0 15.55C0 6.96 6.96 0 15.55 0C24.14 0 31.1 6.96 31.1 15.55Z"
                  fill="currentColor"
                />
              </svg>

              <div className="absolute top-2 left-0 right-0 flex justify-center">
                <span className="text-[14px] font-bold text-white leading-none">
                  {task.points}
                </span>
              </div>
            </div>
          </Marker>
        ))}
      </Map>
      {selectedTask && (
        <div
          className="hidden md:block absolute bottom-4 left-4 z-20 animate-in slide-in-from-bottom-5 fade-in duration-300"
          style={{ width: 420 }}
        >
          <div className="rounded-2xl shadow-2xl border border-white/20 bg-white">
            <TaskCardWithCreator
              taskId={selectedTask.taskId}
              creatorId={selectedTask.creatorId}
              fallbackName={selectedTask.fallbackName}
              fallbackRating={selectedTask.fallbackRating}
              taskTitle={selectedTask.taskTitle}
              description={selectedTask.description}
              categories={selectedTask.categories}
              location={selectedTask.location}
              duration={selectedTask.duration}
              points={selectedTask.points}
              imageUrl={selectedTask.imageUrl}
              likes={selectedTask.likes}
              comments={selectedTask.comments}
              postedTime={selectedTask.postedTime}
              priority={selectedTask.priority}
              isLiked={selectedTask.isLiked}
              isSaved={selectedTask.isSaved}
              compact
            />
          </div>
        </div>
      )}
      {/* Mobile Screen */}
      {selectedTask && (
        <div
          className={`md:hidden absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.12)] transition-[max-height] duration-300 ease-in-out ${
            isMobileCardExpanded ? "max-h-[75vh]" : "max-h-16"
          }`}
        >
          <button
            onClick={() => setIsMobileCardExpanded((v) => !v)}
            className="w-full flex flex-col items-center pt-2 pb-1"
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mb-0.5" />
            {isMobileCardExpanded ? (
              <ChevronDown size={16} className="text-gray-400" />
            ) : (
              <ChevronUp size={16} className="text-gray-400" />
            )}
          </button>

          {!isMobileCardExpanded && (
            <div className="px-4 pb-3">
              <p className="text-sm font-semibold text-primary truncate">
                {selectedTask.taskTitle}
              </p>
            </div>
          )}

          {isMobileCardExpanded && (
            <div className="overflow-y-auto max-h-[calc(75vh-40px)]">
              <TaskCardWithCreator
                taskId={selectedTask.taskId}
                creatorId={selectedTask.creatorId}
                fallbackName={selectedTask.fallbackName}
                fallbackRating={selectedTask.fallbackRating}
                taskTitle={selectedTask.taskTitle}
                description={selectedTask.description}
                categories={selectedTask.categories}
                location={selectedTask.location}
                duration={selectedTask.duration}
                points={selectedTask.points}
                imageUrl={selectedTask.imageUrl}
                likes={selectedTask.likes}
                comments={selectedTask.comments}
                postedTime={selectedTask.postedTime}
                priority={selectedTask.priority}
                isLiked={selectedTask.isLiked}
                isSaved={selectedTask.isSaved}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
