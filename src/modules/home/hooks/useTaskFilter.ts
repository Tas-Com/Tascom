import { useState } from "react";

export function useTaskFilter() {
  const [category, setCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [points, setPoints] = useState(200);
  const [distance, setDistance] = useState(2000);

  return {
    category,
    setCategory,
    priority,
    setPriority,
    points,
    setPoints,
    distance,
    setDistance,
  };
}
