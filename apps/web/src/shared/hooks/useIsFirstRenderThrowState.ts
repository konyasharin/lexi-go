import { useEffect, useState } from "react";

export const useIsFirstRenderThrowState = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return isFirstRender;
};
