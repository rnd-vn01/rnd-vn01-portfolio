interface ICameraQuaternionSlice {
  x: number;
  y: number;
  z: number;
  w: number;
}

interface IUser {
  name?: string;
  email?: string;
  profileImage?: string;
  firebaseId?: string;
  isAdmin?: boolean;
}

interface IAuthSlice {
  isLoggedIn: boolean;
  user: IUser;
}

interface IQuickSearchResults {
  query: string;
  isShowing?: boolean;
  callbackIsReadyForSearch?: (boolean) => void;
}

interface ILanguageSlice {
  currentLanguage: "VI" | "EN";
}

interface IMeridian {
  code: string;
  name: string;
  description: string;
  diseases: string;
  points?: Array<IAcupuncturePointSimple>
}

interface IAcupuncturePointSimple {
  code: string;
  name: string;
}

interface IAcupuncturePoint extends IAcupuncturePointSimple {
  code: string;
  name: string;
  description: string;
  anatomy?: string;
  functionalities: Array<string>;
  technique?: string;
  caution?: string;
}

interface IInformationBlock {
  isPoint?: boolean;
  itemInformation?: IMeridian | IAcupuncturePoint;
  usingLanguage?: "EN" | "VI";
}

interface IModel {
  testGetPointInfo?: () => void;
}

interface IQuizManager {
  callbackSetQuestionType?: (number) => void;
  callbackSetQuizStatus?: (any) => void;
  callbackSetQuizState?: (number) => void;
}

interface IQuizOptions {
  fieldOptionsList?: Array<{
    value?: number;
    caption?: string;
  }>;
  numberOfQuestionsOptionsList?: Array<number>;
  field?: number;
  setField?: (number) => void;
  numberOfQuestions?: number;
  setNumberOfQuestion?: (number) => void;
}

interface IQuizProgressBar {

}

interface IQuizButton {
  fallbackCaption?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  translateKey?: string;
}

interface IQuizQuestion {
  questionContent?: string;
  type?: QUIZ_QUESTION_TYPE;
  optionsList?: Array<{
    index?: number;
    answer?: string;
  }>
  correctAnswer?: number | string;
  onSubmitAnswer?: (number) => void;
  isShowingAnswer?: boolean;
  selectedAnswer?: number;
  currentQuestion?: number;
}

interface IQuizStatusBar {
  currentQuest?: number;
  totalQuest?: number;
  isPlus?: boolean;
  totalCorrect?: number;
}

interface IQuizTimer {
  currentTime?: number;
  totalTime?: number;
}

interface IQuizSummary {
  data?: any
}

interface ISearchProcessor {
  query?: query;
  callbackSetResults?: (any) => void;
  callbackSetLoading?: (boolean) => void;
  callbackIsReadyForSearch?: (boolean) => void;
}

interface IAdvancedSearchPage {

}

interface IFullPageTitleBar {
  pageCode?: string;
  translateCode?: string;
}

interface ISearchBar {
  callbackSetResults?: (any) => void;
  callbackSetLoading?: (boolean) => void;
  callbackSetQuery?: (string) => void;
  numberOfMatchingResults?: number;
  isChoosingAlphabet?: boolean;
  passedQuery?: string;
  callbackIsFilter?: (boolean) => void;
  paramPassedIsFilter?: boolean;
}

interface ISearchResults {
  results?: Array<any>;
  query?: string;
  isLoading?: boolean;
  callbackSetNumberOfMatchingResults?: (any) => void;
  callbackSetChoosingAlphabet?: (boolean) => void;
  isFilter?: boolean;
  callbackSetIsFilter?: (boolean) => void;
  passedFilterOptions?: any;
}

interface ISearchResultItem {
  item?: any;
  isPoint?: boolean;
  usingLanguage?: "EN" | "VI";
  query?: Array<string>;
  filterOptions?: any;
}

interface ISearchResultsAlphabetFilters {
  results?: Array<any>;
  callbackSetAlphabetFilteringOption?: (number) => void;
}

interface IDetailPage {

}

interface IItemDetail {
  item?: any;
  isPoint?: boolean;
  usingLanguage?: "EN" | "VI";
  query?: string;
}

interface IItemDetailEdit extends IItemDetail {
  callbackUpdateDetail?: (any) => void;
  mobileCalledEditDetail?: number;
  resetItemDetail?: (any) => void;
}

interface IPersonalRecordsPage {

}

interface IRecordsChart {
  quizzesList?: any;
}

interface IRecordsProgressLog {
  quizzesList?: any;
}

interface IRecordsProgressLogDesktop {
  data?: any
}

interface IRecordsSummary {
  data?: any
}

interface IRecordsLog {
  logData?: any;
  index?: number;
}

interface IAboutPage {

}

interface IAboutPageSection {
  showContent?: any;
  isCollapsable?: boolean;
  sectionName?: string;
  information?: string;
  index?: number;
}

interface ISelectionSlice {
  selectedLabel?: string | null;
  selectedType?: 'point' | 'line' | null;
  isHoveringPoint?: boolean;
  isHoveringLine?: boolean;
  currentMousePosition?: {
    x?: number,
    y?: number,
    z?: number,
  } | null;
  currentMouseMovePosition?: {
    x?: number,
    y?: number,
    z?: number,
  } | null;
  hoveringLineLabel: string | null;
  firstSelected?: boolean;
  isSelectingFromMenu?: boolean;
  pointPosition?: any;
  isShowingQuickInformation?: {
    type?: string;
    content?: IMeridian | IAcupuncturePoint;
  } | null;
  preSelectLine?: null;
  showingNeighbors?: Array<string>;
  secondarySelectedMeridian?: string;
  backupSelectedPoint?: string;
  backupSelectedNeighbors?: Array<string>;
  loadingQuickInformation?: boolean;
}

interface IModelInteractionControl {
  callbackPanLeft?: () => void;
  callbackPanRight?: () => void;
  callbackPanUp?: () => void;
  callbackPanDown?: () => void;
  callbackPanCenter?: () => void;
  callbackZoomIn?: () => void;
  callbackZoomOut?: () => void;
}

interface IHomePageControl extends IModelInteractionControl {
  isQuizPage?: boolean;
}

interface IGlobalSlice {
  modelLoaded: boolean;
}

interface IQuizTitleBar {
  title?: string;
}

interface IQuizSlice {
  isShowingLabelOnHovering?: boolean;
  isHoverable?: boolean;
  showingPoints?: Array<string>;
  selectedPoint?: string | null;
  markedPoint?: string | null;
  isShowingLabelOnClick?: boolean;
  isQuizMode?: boolean;
  isNavigateQuest?: boolean;
  navigateQuestSelectable?: boolean;
  quizField?: number;
  showingCorrectPoint?: string | null;
  isShowing4Labels?: boolean;
}

interface IZoomControlSlice {
  isInCloseZoomMode: ZOOM_CONTROL_LEVEL;
  frustum: any;
  cameraZoom?: number;
}

interface ISideMenu {
  isShowing: boolean;
  callbackSetIsShowing: (boolean) => void;
}

interface IWithSideMenu {
  isShowingSideMenu: boolean;
  callbackSetIsShowingSideMenu: (boolean) => void;
}

interface IMenuBar extends IWithSideMenu {
  isShowingSearchBar: boolean;
  callbackSetIsShowingSearchBar: (boolean) => void;
}

interface IMobileTitleBar extends IWithSideMenu {
  translateCode?: string;
  isEdit?: boolean;
  isViewingDetail?: boolean;
  callbackTriggerEditDetail?: (any) => void;
  isQuiz?: boolean;
  currentQuest?: number;
  totalQuest?: number;
  totalCorrect?: number;
}

interface ISideCriteriaBox {
  isShowing: boolean;
  filters?: any;
  currentFilterOptions?: any;
  callbackSetCurrentFilterOptions?: (any) => void;
}

interface IDataSlice {
  acupuncturePoints: Array<IAcupuncturePoint>,
  meridians: Array<IMeridian>
}

interface INavigationSlice {
  quickSearchPersistQuery?: string;
  backFromInformationBlock?: boolean;
  viewDetailsLastPage?: ILastPagePersist;
  homeQueryPersistThroughNavigation?: string;
}

interface ILastPagePersist {
  path?: string;
  isRedirect?: boolean;
  query?: string;
  filterOptions?: any;
}
