import {
  highlightPoint,
  resetToInitialStateQuizSlice,
  resetToInitialStateSceneQuiz,
  setIsNavigateQuest,
  setIsQuizMode,
  setIsShowing4Labels,
  setIsShowingLabelOnClick,
  setNavigateQuestSelectable,
  setNavigateQuestSelectedPoint,
  setShowingCorrectPoint,
  setShowingPoints,
  setStrictMode,
  unsetStrictMode
} from "src/redux/slice"
import store from "src/redux/store"

describe("quizSlice", () => {
  afterEach(() => {
    store.dispatch(resetToInitialStateQuizSlice())
  })

  it("should reset the quiz to initial state if called", async () => {
    store.dispatch(resetToInitialStateQuizSlice())

    expect(store.getState().quizSlice).toStrictEqual({
      isShowingLabelOnHovering: true,
      isHoverable: true,
      showingPoints: [],
      selectedPoint: null,
      markedPoint: null,
      isShowingLabelOnClick: true,
      isQuizMode: false,
      isNavigateQuest: false,
      navigateQuestSelectable: false,
      quizField: 0,
      showingCorrectPoint: null,
      isShowing4Labels: false
    })
  })

  it("should reset the slice state to be in ready state for scene quiz in quiz page", async () => {
    store.dispatch(resetToInitialStateSceneQuiz())

    expect(store.getState().quizSlice).toStrictEqual({
      isShowingLabelOnHovering: true,
      isHoverable: true,
      showingPoints: [],
      selectedPoint: null,
      markedPoint: null,
      isShowingLabelOnClick: false,
      isQuizMode: true,
      isNavigateQuest: false,
      navigateQuestSelectable: false,
      quizField: 0,
      showingCorrectPoint: null,
      isShowing4Labels: false
    })
  })

  it("should update strict mode if called", async () => {
    store.dispatch(setStrictMode())

    expect(store.getState().quizSlice.isShowingLabelOnHovering).toBe(false)
    expect(store.getState().quizSlice.isHoverable).toBe(false)
  })

  it("should unset strict mode if called", async () => {
    store.dispatch(unsetStrictMode())

    expect(store.getState().quizSlice.isShowingLabelOnHovering).toBe(true)
    expect(store.getState().quizSlice.isHoverable).toBe(true)
  })

  it("should highlight a point in quiz page if called", async () => {
    store.dispatch(highlightPoint({
      markedPoint: "LU-10"
    }))

    expect(store.getState().quizSlice.markedPoint).toBe("LU-10")
  })

  it("should update is showing label on click if called", async () => {
    store.dispatch(setIsShowingLabelOnClick({
      isShowingLabelOnClick: true
    }))

    expect(store.getState().quizSlice.isShowingLabelOnClick).toBeTruthy()
  })

  it("should update to quiz mode if called", async () => {
    store.dispatch(setIsQuizMode({
      isQuizMode: true
    }))

    expect(store.getState().quizSlice.isQuizMode).toBeTruthy()
  })

  it("should update to is navigate mode of quiz question if called", async () => {
    store.dispatch(setIsNavigateQuest({
      isNavigate: true
    }))

    expect(store.getState().quizSlice.isNavigateQuest).toBeTruthy()
    expect(store.getState().quizSlice.navigateQuestSelectable).toBeTruthy()
  })

  it("should update to default mode for not navigate quiz question if called", async () => {
    store.dispatch(setIsNavigateQuest({
      isNavigate: false
    }))

    expect(store.getState().quizSlice.isNavigateQuest).not.toBeTruthy()
    expect(store.getState().quizSlice.navigateQuestSelectable).not.toBeTruthy()
  })

  it("should update the selected point if triggered for navigate question in quiz", async () => {
    store.dispatch(setNavigateQuestSelectedPoint({
      selectedPoint: "BL-15"
    }))

    expect(store.getState().quizSlice.selectedPoint).toBe("BL-15")
  })

  it("should update is navigate question allow selection or not in quiz", async () => {
    store.dispatch(setNavigateQuestSelectable({
      selectable: true
    }))

    expect(store.getState().quizSlice.navigateQuestSelectable).toBeTruthy()
  })

  it("should update is showing correct point or not for questions in quiz", async () => {
    store.dispatch(setShowingCorrectPoint({
      correctPoint: "BL-20"
    }))

    expect(store.getState().quizSlice.showingCorrectPoint).toBe("BL-20")
  })

  it("should hide correct point if set to null in quiz", async () => {
    store.dispatch(setShowingCorrectPoint({
      correctPoint: null
    }))

    expect(store.getState().quizSlice.showingCorrectPoint).toBeNull()
  })

  it("should update list of showing points for arrange question type", async () => {
    store.dispatch(setShowingPoints({
      showingPoints: ["LI-1", "LI-3", "LI-6", "LI-10"]
    }))

    expect(store.getState().quizSlice.showingPoints).toStrictEqual(["LI-1", "LI-3", "LI-6", "LI-10"])
  })

  it("should update whether is showing labels of 4 points or not if updated from quiz page", async () => {
    store.dispatch(setIsShowing4Labels({
      isShowingResults: true
    }))

    expect(store.getState().quizSlice.isShowing4Labels).toBeTruthy()
  })
})
