import React from "react";
import { render } from "@testing-library/react";

import KapturaLumina from "./KapturaLumina";

test("renders without crashing", () => {
  const { baseElement } = render(<KapturaLumina />);
  expect(baseElement).toBeDefined();
});
