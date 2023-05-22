import { createSlice } from '@reduxjs/toolkit';
import { LINE_POINTS, POINT_LOCATIONS } from 'src/configs/constants';

export const initialStateSelectionSlice = {
  selectedLabel: null,
  selectedType: null,
  isHoveringPoint: false,
  isHoveringLine: false,
  currentMousePosition: null,
  currentMouseMovePosition: null,
  hoveringLineLabel: null,
  firstSelected: false,
  isSelectingFromMenu: false,
  pointPosition: null,
  isShowingQuickInformation: null,
  preSelectLine: null
} as ISelectionSlice;

export const selectionSlice = createSlice({
  name: 'mouseControls/selectionSlice@',
  initialState: initialStateSelectionSlice,
  reducers: {
    resetToInitialStatePointSelectionSlice(state) {
      state.selectedLabel = null;
      state.selectedType = null;
      state.isHoveringPoint = false;
      state.isHoveringLine = false;
      state.currentMouseMovePosition = null;
      state.currentMousePosition = null;
      state.hoveringLineLabel = null;
      state.firstSelected = false;
      state.isSelectingFromMenu = false;
      state.pointPosition = null;
      state.isShowingQuickInformation = null;
      state.preSelectLine = null;
    },

    setPointSelected(state, action) {
      state.firstSelected = false;
      state.isSelectingFromMenu = false;
      state.pointPosition = action.payload.pointPosition;
      state.selectedLabel = action.payload.selectedLabel;
      state.selectedType = 'point';
      state.preSelectLine = null;
    },

    setLineSelected(state, action) {
      //IDEA: Pass the list of points and select the line recorded the point closest to the cursor     
      const pointer = { ...state.currentMousePosition };

      if (Object.keys(pointer).length > 0) {
        let minDistance = 1000;
        let selectedLine = "";

        Object.keys(LINE_POINTS).forEach(meridian => {
          LINE_POINTS[meridian].forEach(linePoint => {
            // Only check if in the same side
            if (linePoint.z * pointer.z >= 0) {
              const distance = Math.sqrt(Math.pow(linePoint.x - pointer.x, 2) + Math.pow(linePoint.y - pointer.y, 2))
              if (distance < minDistance) {
                minDistance = distance
                selectedLine = meridian
              }
            }
          })
        })

        if (minDistance < 0.5) {
          state.selectedLabel = selectedLine;
          state.selectedType = 'line';
          state.isSelectingFromMenu = false;
          state.preSelectLine = null;
        }
      }
    },

    setIsHoveringPoint(state, action) {
      state.isHoveringPoint = action.payload.isHoveringPoint;
    },

    setIsHoveringLine(state, action) {
      state.isHoveringLine = action.payload.isHoveringLine;
    },

    setIsCurrentMousePosition(state, action) {
      state.currentMousePosition = action.payload.currentMousePosition;
    },

    setIsCurrentMouseMovePosition(state, action) {
      state.currentMouseMovePosition = action.payload.currentMouseMovePosition;
      let pointer = action.payload.currentMouseMovePosition
      if (pointer != null) {
        let minDistance = 1000;
        let selectedLine = "";

        Object.keys(LINE_POINTS).forEach(meridian => {
          LINE_POINTS[meridian].forEach(linePoint => {
            // Only check if in the same side
            if (linePoint.z * pointer.z >= 0) {
              const distance = Math.sqrt(Math.pow(linePoint.x - pointer.x, 2) + Math.pow(linePoint.y - pointer.y, 2))
              if (distance < minDistance) {
                minDistance = distance
                selectedLine = meridian
              }
            }
          })
        })

        if (minDistance < 0.5) {
          state.hoveringLineLabel = selectedLine;
        } else {
          state.hoveringLineLabel = null;
        }
      }
    },

    setLineHover(state, action) {
      const pointer = { ...state.currentMouseMovePosition };

      if (Object.keys(pointer).length > 0) {
        let minDistance = 1000;
        let selectedLine = "";

        Object.keys(LINE_POINTS).forEach(meridian => {
          LINE_POINTS[meridian].forEach(linePoint => {
            // Only check if in the same side
            if (linePoint.z * pointer.z >= 0) {
              const distance = Math.sqrt(Math.pow(linePoint.x - pointer.x, 2) + Math.pow(linePoint.y - pointer.y, 2))
              if (distance < minDistance) {
                minDistance = distance
                selectedLine = meridian
              }
            }
          })
        })

        if (minDistance < 0.5) {
          state.hoveringLineLabel = selectedLine;
        }
      }
    },

    setLineSelectedByLabel(state, action) {
      state.firstSelected = true;
      state.isSelectingFromMenu = true;
      state.selectedLabel = action.payload.selectedLine;
      state.selectedType = 'line';
      state.preSelectLine = null;
    },

    setLinePreSelectByLabel(state, action) {
      state.preSelectLine = action.payload.line;
    },

    setShowingQuickInformation(state, action) {
      state.isShowingQuickInformation = action.payload.quickInformation
    },

    setPointSelectedByLabel(state, action) {
      const pointPosition = POINT_LOCATIONS[action.payload.selectedPoint]["position"];
      state.pointPosition = {
        x: pointPosition[0],
        y: pointPosition[1],
        z: pointPosition[2],
        reverse: POINT_LOCATIONS[action.payload.selectedPoint]["reverse"],
        viewFromBottom: POINT_LOCATIONS[action.payload.selectedPoint]["viewFromBottom"]
      }
      state.firstSelected = true;
      state.isSelectingFromMenu = true;
      state.selectedLabel = action.payload.selectedPoint;
      state.selectedType = 'point';
    }
  },
});

const { actions, reducer } = selectionSlice;
export const { resetToInitialStatePointSelectionSlice, setPointSelected,
  setLineSelected, setIsHoveringPoint, setIsHoveringLine, setIsCurrentMousePosition,
  setIsCurrentMouseMovePosition, setLineHover, setLineSelectedByLabel,
  setShowingQuickInformation, setPointSelectedByLabel, setLinePreSelectByLabel } = actions;
export default reducer;
