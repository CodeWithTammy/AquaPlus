// components/LoadingComponent/RouteChangeLoader.jsx
import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { LoadingContext } from "../../App"; // Adjust the import path as necessary

export default function RouteChangeLoader() {
  const location = useLocation();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    // Show loader immediately when route changes
    setLoading(true);

    // Small timeout to allow the new page to render
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // adjust delay if needed

    return () => clearTimeout(timeout);
  }, [location, setLoading]);

  return null;
}
