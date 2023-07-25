import { useEffect, useState } from "react";

import * as ComponentList from "./components";
import serverData from "./ssdu.json";
import DynamicElement, { Element } from "./components/DynamicElement";
import { useLocation } from "react-router-dom";

export type Pages = "/" | "/cancel";

function App() {
  const [elementJSON, setElementJSON] = useState<Element | null>(null);
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname as Pages;
    if (serverData[pathname]) {
      setElementJSON({ ...serverData[pathname] });
    } else {
      throw Error("잘못된 페이지 정보입니다.");
    }
  }, [location]);

  if (!elementJSON) {
    return <div>Loading...</div>;
  }

  return <DynamicElement element={elementJSON} componentsMap={ComponentList} />;
}

export default App;
