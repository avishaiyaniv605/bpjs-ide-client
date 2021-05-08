import React, { useContext } from "react";
import styled from "styled-components";
import BPConsole from "../../console/console";
import EnvSelector from "../../../components/var-table/EnvSelector";
import LayoutCtx from "../../../pages/IDE/LayoutCtx";
import { BOTTOM_PANELS } from "../../../pages/IDE/ide";
import _ from "lodash";
import { Divider, Space, Tag } from "antd";
import { DelayedToolTip } from "../../debug-buttons/common/tooltip";
import TopDebugButtons from "../../debug-buttons/top-debug-buttons/TopDebugButtons";
import LeftDebugButtons from "../../debug-buttons/left-debug-buttons/LeftDebugButtons";
import { useConsoleText } from "../../console/useConsoleText";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ProgramStateCTX from "../../state-context/StateContext";
import "../../../animations.scss";

const StyledBottomControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  bottom: 38px;
  padding: 10px 30px 508px 20px;
  height: 400px;
  width: 100%;
  background-color: #353d45;
  border-top: 5px solid orange;

  .sync-state-on {
    opacity: 1;
    transition: opacity 0.4s;
  }

  .sync-state-off {
    opacity: 0;
    transition: opacity 0.4s;
  }
`;

const PanelsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
`;

export const DEBUG_BUTTON = "Debug-Button";
export const RUN_BUTTON = "Run-Button";
export const STEP_INTO_BUTTON = "Step-Into-Button";
export const STEP_OUT_BUTTON = "Step-Out-Button";
export const STEP_OVER_BUTTON = "Step-Over-Button";
export const STOP_BUTTON = "Stop-Button";
export const CONTINUE_BUTTON  = "Continue-Button";
export const NEXT_SYNC_BUTTON  = "Next-Sync-Button";

export const TOGGLE_SYNC_BUTTON  = "Toggle-Sync-Button";
export const TOGGLE_BP_BUTTON  = "Toggle-Bp-Button";
export const TOGGLE_EXTERNALS_BUTTON  = "Toggle-Externals-Button";
const TOGGLES = [TOGGLE_SYNC_BUTTON, TOGGLE_BP_BUTTON, TOGGLE_EXTERNALS_BUTTON];

export const statusToActiveButtonsMap = {
    "RUN": [STOP_BUTTON, TOGGLE_EXTERNALS_BUTTON],
    "DEBUG": [STOP_BUTTON, ...TOGGLES],
    "SYNCSTATE": [NEXT_SYNC_BUTTON, STOP_BUTTON, ...TOGGLES],
    "BREAKPOINT": [CONTINUE_BUTTON, STOP_BUTTON, STEP_INTO_BUTTON, STEP_OUT_BUTTON, STEP_OVER_BUTTON, ...TOGGLES],
    "STOP": [DEBUG_BUTTON, RUN_BUTTON, ...TOGGLES]
}

const BottomControlPanel = () => {

    const layoutCtx = useContext(LayoutCtx);
    const {status} = useContext(ProgramStateCTX);

    const {activeBottomPanels} = layoutCtx;

    const isActive = (panel) => _.includes(activeBottomPanels, panel);

    return (
        activeBottomPanels.length !== 0 &&
        <StyledBottomControlPanel>
            <Space size={50}>
                <TopDebugButtons/>
                { <DelayedToolTip placement="top" 
                title='When B-Prgram is in Sync-State use "Manual Selection" to watch variables '>
                  <Tag className={`sync-state-${status === "SYNCSTATE" ? "on" : "off"}`}
                      icon={<ExclamationCircleOutlined/>}
                      color="warning">
                    In Sync State
                </Tag>
                </DelayedToolTip>}
            </Space>
            <PanelsContainer>
                <LeftDebugButtons/>
                {<EnvSelector/>}
                {isActive(BOTTOM_PANELS.DEBUG) && isActive(BOTTOM_PANELS.CONSOLE) &&
                <Divider style={{
                    height: "300px",
                    width: "2px",
                    marginRight: "12px",
                    marginLeft: "12px",
                    backgroundColor: "#ff9b42",
                    marginTop: "40px"
                }} type="vertical"/>}
                <BPConsole/>
            </PanelsContainer>
        </StyledBottomControlPanel>
    );
};

export default BottomControlPanel;
