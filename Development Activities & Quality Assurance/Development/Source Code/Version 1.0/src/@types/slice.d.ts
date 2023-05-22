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
}

interface ISearchResults {
  results?: Array<any>;
  query?: string;
  isLoading?: boolean;
  callbackSetNumberOfMatchingResults?: (any) => void;
  callbackSetChoosingAlphabet?: (boolean) => void;
}

interface ISearchResultItem {
  item?: any;
  isPoint?: boolean;
  usingLanguage?: "EN" | "VI";
  query?: Array<string>;
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
}
