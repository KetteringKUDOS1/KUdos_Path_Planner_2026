import React from "react";
import { LayoutProvider, LayoutType } from "@core/Layout";
import { observer } from "mobx-react-lite";
import { getAppStores } from "@core/MainApp";
import { ClassisLayout } from "./classic.blocks/_index";
import { ExclusiveLayout } from "./exclusive.blocks/_index";
import { MobileLayout } from "./mobile.blocks/_index";
import { ScoreCalculator } from "./components/ScoreCalculator";

/**
 * The Layout component renders the corresponding layout based on the given layout type.
 * All overlays will also be pre-rendered.
 * @param props.targetLayout - The layout type to render.
 * @returns The rendered layout component.
 */
export const Layout = observer((props: { targetLayout: LayoutType }) => {
  const { targetLayout } = props;
  const { ui } = getAppStores();

  return (
    <LayoutProvider value={targetLayout}>
      {targetLayout === LayoutType.Classic && (
        <>
          <ClassisLayout />
          <div 
            className="kudos-score-calculator-wrapper"
            style={{
              position: "absolute",
              top: "70px",
              right: "20px",
              zIndex: 1000,
              maxHeight: "calc(100vh - 90px)",
              overflowY: "auto",
              backgroundColor: "rgba(20, 20, 20, 0.95)",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              padding: "12px"
            }}
          >
            <ScoreCalculator />
          </div>
        </>
      )}
      {targetLayout === LayoutType.Exclusive && <ExclusiveLayout />}
      {targetLayout === LayoutType.Mobile && <MobileLayout />}
      {ui.getAllOverlays().map(obj => (
        <React.Fragment key={obj.uid}>{obj.builder()}</React.Fragment>
      ))}
    </LayoutProvider>
  );
});
