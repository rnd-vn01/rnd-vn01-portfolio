import './QuizManager.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QuizOptions } from './QuizOptions/QuizOptions';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { QuizButton } from './QuizButton/QuizButton';
import { useHistory } from 'react-router-dom';
import { QuizStatusBar } from './QuizStatusBar/QuizStatusBar';
import { QuizQuestion } from './QuizQuestion/QuizQuestion';
import { MERIDIAN_POINTS, QUIZ_QUESTION_TYPE } from 'src/configs/constants';
import { QuizTimer } from './QuizTimer/QuizTimer';

// Sounds
import mainSound from "src/assets/sounds/main.mp3"
import correctSound from "src/assets/sounds/right.mp3"
import wrongSound from "src/assets/sounds/wrong.mp3"
import { QuizSummary } from './QuizSummary/QuizSummary';
import { QuizTitleBar } from './QuizTitleBar/QuizTitleBar';
import {
  highlightPoint,
  resetToInitialStatePointSelectionSlice,
  setAcupuncturePoints,
  setIsNavigateQuest,
  setIsShowing4Labels,
  setNavigateQuestSelectable,
  setNavigateQuestSelectedPoint,
  setQuizField,
  setShowingCorrectPoint,
  setShowingPoints,
  setStrictMode,
  unsetStrictMode
} from 'src/redux/slice';
import { useMediaQuery } from 'react-responsive';
import { getAcupuncturePoints } from 'src/helpers/api/items';
import { storeQuizResult } from 'src/helpers/api/quizRecords';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export enum QUIZ_STATE {
  SELECT_OPTIONS = 0,
  IN_PROGRESS = 1,
  ENDED = 2
}

export const QuizManager: React.FC<IQuizManager> = ({
  callbackSetQuestionType,
  callbackSetQuizStatus,
  callbackSetQuizState
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );
  const {
    selectedPoint
  } = useSelector(
    (state: RootState) => state.quizSlice,
  );
  const {
    acupuncturePoints
  } = useSelector(
    (state: RootState) => state.dataSlice,
  );
  const {
    user
  } = useSelector(
    (state: RootState) => state.authSlice,
  );
  const dispatch = useAppDispatch();

  const [quizState, setQuizState] = useState<number>(QUIZ_STATE["SELECT_OPTIONS"]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [field, setField] = useState<any>(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
  const [correctAnswer, setCorrectAnswer] = useState<number>(-1);
  const currentTime = useRef<number>(60);
  const timer = useRef<any>(null);
  const [renderTime, setRenderTime] = useState<number>(0);
  const [numberOfCorrectQuestions, setNumberOfCorrectQuestions] = useState<number>(0);
  const [isShowingAnswer, setIsShowingAnswer] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-2);
  const [isPlus, setIsPlus] = useState<boolean>(false);
  const [questionContent, setQuestionContent] = useState<string>("");
  const [answersList, setAnswersList] = useState<Array<any>>([]);
  const DEMO_QUESTION_COUNT_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
  const [numberOfQuestionsOptionsList, setNumberOfQuestionsOptionsList] = useState<Array<number>>(DEMO_QUESTION_COUNT_OPTIONS)
  const questionTypeRef = useRef<number>(QUIZ_QUESTION_TYPE.DESCRIPTION)
  const [fetchingData, setFetchingData] = useState<boolean>(true);

  const pointCurrentFieldIndexes = useRef<any>([]);
  const usedPointIndexes = useRef<any>([]);
  const quizHistory = useRef<any>({});
  const temporarilyStoredQuestionContent = useRef<any>({
    question: "",
    options: [],
    answer: null,
    correctAnswer: null,
    time: 60
  });
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const usedQuestionType = useRef<Array<number>>([]);
  const MySwal = withReactContent(Swal);

  // Sounds
  const mainSoundPlayer = useRef<any>(new Audio(mainSound))
  const correctSoundPlayer = useRef<any>(new Audio(correctSound));
  const wrongSoundPlayer = useRef<any>(new Audio(wrongSound));

  // RESPONSIVE
  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });

  const MERIDIANS = ["LU", "LI", "ST", "SP", "HT", "SI", "BL", "KI", "PC", "TE", "GB", "Liv", "Du", "Ren"]
  const DEMO_FIELD_OPTIONS = [
    {
      value: 0,
      caption: t('quiz_page.options.all_meridians')
    }
  ]
  MERIDIANS.forEach((meridian, index) => {
    DEMO_FIELD_OPTIONS.push({
      value: index + 1,
      caption: currentLanguage === "EN" ? `${meridian} ${t('quiz_page.options.meridian_only')}`
        : `${t('quiz_page.options.meridian_only')} ${meridian}`
    })
  })

  const startQuiz = () => {
    usedPointIndexes.current = []
    quizHistory.current = {
      questions: [],
      options: {
        field: DEMO_FIELD_OPTIONS.filter(item => item.value === parseInt(field)),
        numberOfQuestions: numberOfQuestions
      }
    }

    // Question types
    let questionTypes = [0, 1, 2, 3, 4];
    while (questionTypes.length < numberOfQuestions) {
      const randomQuestTypeGroup = Math.floor(Math.random() * 2)
      if (randomQuestTypeGroup === 0) {
        questionTypes.push(Math.floor(Math.random() * 2))
      } else {
        questionTypes.push(Math.floor(Math.random() * 3) + 2)
      }
    }
    usedQuestionType.current = questionTypes.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

    updatePointsCurrentField();
    generateQuestion();
    setCurrentQuestion(1);
    setQuizState(QUIZ_STATE["IN_PROGRESS"]);
    startTimer();
  }

  const endQuiz = async () => {
    setQuizState(QUIZ_STATE["ENDED"])

    // Call API to store quiz results
    const quiz = quizHistory.current;

    // Count number of correct answer
    let correctAnswers = 0;
    let quizDetails = []
    quiz?.questions?.forEach(detail => {
      if (detail !== null && detail.correctAnswer === detail.answer)
        correctAnswers += 1;

      quizDetails.push({
        question: detail.question,
        answer: detail.answer,
        correctAnswer: detail.correctAnswer,
        time: detail.time,
        isCorrect: detail !== null && detail.correctAnswer === detail.answer,
        options: detail.options
      })
    })

    const quizResult = {
      userFirebaseId: user.firebaseId,
      numberOfQuestions: quiz?.options?.numberOfQuestions,
      quizOption: quiz?.options?.field[0]?.value,
      correctAnswers,
      details: quizDetails,
      datetime: new Date().toISOString()
    }

    try {
      MySwal.fire({
        title: t('storing_quiz_result'),
        didOpen: () => {
          MySwal.showLoading(null);
        },
        didClose: () => {
          MySwal.hideLoading();
        },
        allowOutsideClick: false,
      })

      await storeQuizResult(quizResult)
      MySwal.close();
    } catch (e) {
      alert(t('login_page.messages.records_error'))
    }
  }

  useEffect(() => {
    if (selectedAnswer === correctAnswer) {
      setIsPlus(true);

      setTimeout(() => {
        setIsPlus(false);
      }, 2000)
    }
  }, [selectedAnswer, correctAnswer])

  useEffect(() => {
    callbackSetQuizStatus({
      currentQuest: currentQuestion,
      totalQuest: numberOfQuestions,
      totalCorrect: numberOfCorrectQuestions
    })
  }, [currentQuestion,
    numberOfQuestions,
    numberOfCorrectQuestions])

  const submitAnswer = (answer) => {
    let getAnswer = "" as any;
    let getCorrectAnswer = "" as any;

    if (questionTypeRef.current === QUIZ_QUESTION_TYPE.NAVIGATE) {
      if (selectedPoint === null || selectedPoint === undefined) {
        alert(t('quiz_page.alerts.select_one'))
        return;
      }

      getAnswer = selectedPoint
      getCorrectAnswer = answersList[correctAnswer].answer.substring(0, answersList[correctAnswer].answer.indexOf(" "))

      quizHistory.current.questions.push({
        question: questionContent,
        options: answersList,
        answer: getAnswer,
        correctAnswer: getCorrectAnswer,
        time: Math.max(60 - currentTime.current, 0)
      })

      dispatch(setNavigateQuestSelectable({
        selectable: false
      }))
    } else {
      quizHistory.current.questions.push({
        question: questionContent,
        options: answersList,
        answer: answer,
        correctAnswer: correctAnswer,
        time: Math.max(60 - currentTime.current, 0)
      })

      getAnswer = answer;
      getCorrectAnswer = correctAnswer;
    }

    endAnswerTime()
    setSelectedAnswer(answer)
    mainSoundPlayer.current?.pause();
    if (getAnswer === getCorrectAnswer) {
      setNumberOfCorrectQuestions(numberOfCorrectQuestions + 1);
      (correctSoundPlayer.current as HTMLAudioElement).currentTime = 0;
      correctSoundPlayer.current.play();
    } else {
      (wrongSoundPlayer.current as HTMLAudioElement).currentTime = 0;
      wrongSoundPlayer.current.play();
    }
  }

  const endAnswerTime = () => {
    clearInterval(timer.current)
    setIsShowingAnswer(true);
    timer.current = null
    if (currentQuestion === numberOfQuestions) {
      setIsFinished(true);
    }

    if (questionTypeRef.current === QUIZ_QUESTION_TYPE.NAVIGATE) {
      dispatch(setNavigateQuestSelectable({
        selectable: false
      }))
      dispatch(unsetStrictMode())
      dispatch(setShowingCorrectPoint({
        correctPoint: temporarilyStoredQuestionContent.current.correctAnswer
      }))
    } else if (questionTypeRef.current === QUIZ_QUESTION_TYPE.CHOOSE_FROM_LOCATION) {
      let correctAnswer = temporarilyStoredQuestionContent.current.options[temporarilyStoredQuestionContent.current.correctAnswer].answer
      let correctPointCode = correctAnswer.substring(0, correctAnswer.indexOf(" "))
      dispatch(setShowingCorrectPoint({
        correctPoint: correctPointCode
      }))
    } else if (questionTypeRef.current === QUIZ_QUESTION_TYPE.IDENTIFY_CORRECT_LOCATION) {
      let correctAnswer = temporarilyStoredQuestionContent.current.options[temporarilyStoredQuestionContent.current.correctAnswer].answer
      let correctPointCode = correctAnswer.substring(0, correctAnswer.indexOf(" "))
      dispatch(setShowingCorrectPoint({
        correctPoint: correctPointCode
      }))
      dispatch(setIsShowing4Labels({
        isShowingResults: true
      }))
    }
  }

  const startTimer = () => {
    currentTime.current = 60;
    (mainSoundPlayer.current as HTMLAudioElement).currentTime = 0;
    mainSoundPlayer.current?.play();

    timer.current = setInterval(() => {
      if (currentTime.current - 1 === 0) {
        temporarilyStoredQuestionContent.current = {
          ...temporarilyStoredQuestionContent.current,
          answer: null,
          time: -1
        }

        quizHistory.current.questions.push(temporarilyStoredQuestionContent.current)

        endAnswerTime();
      }

      currentTime.current -= 1
      setRenderTime(60 - currentTime.current + 1)
    }, 1000);
  }

  const reset = () => {
    setSelectedAnswer(-2);
    setCorrectAnswer(-1);
    setIsShowingAnswer(false);
    generateQuestion();
    setCurrentQuestion(currentQuestion + 1);
    startTimer();
  }

  const skip = () => {
    temporarilyStoredQuestionContent.current = {
      ...temporarilyStoredQuestionContent.current,
      answer: null,
      time: -1
    }

    quizHistory.current.questions.push(temporarilyStoredQuestionContent.current)

    endAnswerTime();
    mainSoundPlayer.current?.pause();
  }

  useEffect(() => {
    const updateInitial = async () => {
      setFetchingData(true);

      await getAcupuncturePoints(currentLanguage);

      setFetchingData(false);
    }

    updateInitial();
  }, [])

  //Maintain quiz contents
  const generateQuestion = (option = null) => {
    const DEMO_DATA = acupuncturePoints
    let used = []

    if (parseInt(field) === 0) {
      //Get the point for this question
      //Case all mode
      let random = -1;

      while (true) {
        random = Math.floor(Math.random() * DEMO_DATA.length)

        if (!usedPointIndexes.current.includes(random)) {
          used.push(random)
          usedPointIndexes.current.push(random)
          break;
        }
      }

      while (used.length < 4) {
        random = Math.floor(Math.random() * DEMO_DATA.length)
        if (!used.includes(random)) {
          used.push(random)
        }
      }
    } else {
      //Get the point for this question
      //Case 1 meridian
      let random = -1;
      const thisMeridianIndexes = pointCurrentFieldIndexes.current

      while (true) {
        random = Math.floor(Math.random() * thisMeridianIndexes.length)

        if (!usedPointIndexes.current.includes(thisMeridianIndexes[random])) {
          used.push(thisMeridianIndexes[random])
          usedPointIndexes.current.push(thisMeridianIndexes[random])
          break;
        }
      }

      while (used.length < 4) {
        random = Math.floor(Math.random() * thisMeridianIndexes.length)
        if (!used.includes(thisMeridianIndexes[random])) {
          used.push(thisMeridianIndexes[random])
        }
      }
    }

    let shuffleIndexes = [0, 1, 2, 3].sort((a, b) => 0.5 - Math.random()).sort((a, b) => 0.5 - Math.random());
    const correct = shuffleIndexes[0]

    let newUsed = [0, 0, 0, 0]
    shuffleIndexes.forEach((newIndex, oldIndex) => {
      newUsed[newIndex] = used[oldIndex]
    })
    used = newUsed;

    const questionType = usedQuestionType.current[currentQuestion]

    let questionContent = "";
    switch (questionType) {
      case QUIZ_QUESTION_TYPE.DESCRIPTION:
        questionContent = `${t('quiz_page.questions.description')}${DEMO_DATA[used[correct]].description}?`
        break
      case QUIZ_QUESTION_TYPE.FUNCTIONALITIES:
        questionContent = `${t('quiz_page.questions.functionalities')}`
        DEMO_DATA[used[correct]].functionalities.forEach((functionality, index) => {
          questionContent += `${functionality}`

          if (!(index === DEMO_DATA[used[correct]].functionalities.length - 1)) {
            questionContent += `, `
          } else {
            questionContent += "?"
          }
        })
        break
      case QUIZ_QUESTION_TYPE.CHOOSE_FROM_LOCATION:
        questionContent = `${t('quiz_page.questions.choose_from_location')}`
        break
      case QUIZ_QUESTION_TYPE.NAVIGATE:
        questionContent = `${t('quiz_page.questions.navigate')}`.replace("{POINT_NAME}",
          `${DEMO_DATA[used[correct]].name}`)
        break
      case QUIZ_QUESTION_TYPE.IDENTIFY_CORRECT_LOCATION:
        questionContent = `${t('quiz_page.questions.identify_location')}`.replace("{POINT_NAME}",
          `${DEMO_DATA[used[correct]].name}`)
        break
    }

    questionTypeRef.current = questionType;
    callbackSetQuestionType(questionType)

    if (questionType !== QUIZ_QUESTION_TYPE.CHOOSE_FROM_LOCATION) {
      dispatch(highlightPoint({
        markedPoint: undefined
      }))
    } else {
      dispatch(highlightPoint({
        markedPoint: DEMO_DATA[used[correct]].code
      }))
    }

    if (questionType === QUIZ_QUESTION_TYPE.NAVIGATE) {
      dispatch(setIsNavigateQuest({
        isNavigate: true
      }))
    } else {
      dispatch(setIsNavigateQuest({
        isNavigate: false
      }))
    }

    if (questionType === QUIZ_QUESTION_TYPE.IDENTIFY_CORRECT_LOCATION) {
      const points = used.map((index) => DEMO_DATA[index].code)
      dispatch(setShowingPoints({
        showingPoints: points
      }))
    } else {
      dispatch(setShowingPoints({
        showingPoints: []
      }))
    }

    let TEST_ANSWERS_LIST = [];
    used.forEach((point, index) => {
      TEST_ANSWERS_LIST.push({
        "index": index,
        "answer": `${DEMO_DATA[point].code} (${DEMO_DATA[point].name})`
      })
    })
    setAnswersList(TEST_ANSWERS_LIST)
    setQuestionContent(questionContent)
    setCorrectAnswer(correct)
    dispatch(setStrictMode())
    dispatch(setShowingCorrectPoint({
      correctPoint: null
    }))
    dispatch(setNavigateQuestSelectedPoint({
      selectedPoint: null
    }))
    dispatch(setIsShowing4Labels({
      isShowingResults: false
    }))
    dispatch(resetToInitialStatePointSelectionSlice())


    if (questionType === QUIZ_QUESTION_TYPE.NAVIGATE) {
      temporarilyStoredQuestionContent.current = {
        question: `${t('quiz_page.questions.navigate')}`.replace("{POINT_NAME}",
          `${DEMO_DATA[used[correct]].name}`),
        options: TEST_ANSWERS_LIST,
        answer: null,
        correctAnswer: TEST_ANSWERS_LIST[correct].answer.substring(0, TEST_ANSWERS_LIST[correct].answer.indexOf(" ")),
        time: 60
      }
    } else {
      temporarilyStoredQuestionContent.current = {
        question: `${t('quiz_page.questions.description')}${DEMO_DATA[used[correct]].description}?`,
        options: TEST_ANSWERS_LIST,
        answer: null,
        correctAnswer: correct,
        time: 60
      }
    }
  }

  useEffect(() => {
    if (parseInt(field) !== 0) {
      const numberOfPoints = MERIDIAN_POINTS[MERIDIANS[field - 1]].length;
      let options = []

      for (let i = 5; i < numberOfPoints; i += 5) {
        options.push(i)
      }
      if (options[options.length - 1] !== numberOfPoints) {
        options.push(numberOfPoints)
      }

      setNumberOfQuestionsOptionsList(options)
      updatePointsCurrentField();
    } else {
      setNumberOfQuestionsOptionsList(DEMO_QUESTION_COUNT_OPTIONS)
    }

    if (field !== null && field !== undefined && parseInt(field) >= 0) {
      dispatch(setQuizField({
        field: parseInt(field)
      }))
    }
  }, [field]);

  useEffect(() => {
    callbackSetQuizState(quizState)
  }, [quizState])

  const updatePointsCurrentField = () => {
    if (parseInt(field) !== 0) {
      const points = MERIDIAN_POINTS[MERIDIANS[field - 1]];
      let indexes = []
      const DEMO_DATA = acupuncturePoints

      points.forEach(point => {
        DEMO_DATA.forEach((item, index) => {
          if (item.code === point) {
            indexes.push(index)
          }
        })
      })

      pointCurrentFieldIndexes.current = indexes;
    }
  }

  return (
    <div
      role="div"
      aria-label="quiz-manager"
      className="quiz-manager">
      {isDesktop && <div className={`quiz-manager__section quiz-manager__section--top
        ${quizState === QUIZ_STATE["IN_PROGRESS"] ? "" : "quiz-manager__section--top--wide"}
      `}>
        {isDesktop && quizState === QUIZ_STATE["IN_PROGRESS"] && <QuizStatusBar
          currentQuest={currentQuestion}
          totalQuest={numberOfQuestions}
          isPlus={isPlus}
          totalCorrect={numberOfCorrectQuestions}
        />}

        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          <QuizTitleBar
            title={t('quiz_page.title')}
          /> :
          quizState === QUIZ_STATE["IN_PROGRESS"] ?
            <QuizTimer
              data-render={renderTime}
              currentTime={currentTime.current}
              totalTime={60}
            /> : <QuizTitleBar
              title={t('quiz_page.end')}
            />}
      </div>}

      <div className={`quiz-manager__section quiz-manager__section--main
        ${quizState === QUIZ_STATE["IN_PROGRESS"] ? "" : "quiz-manager__section--main--wide"}
        ${quizState === QUIZ_STATE["ENDED"] && "quiz-manager__section--main--wide--ended"}
      `}>
        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          (fetchingData ?
            <div className='flex-center h-full'>
              <div role="status" style={{
                textAlign: "center",
                width: "100%",
              }} className="flex-center">
                <svg aria-hidden="true" className="w-10 h-10 mt-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div> : <QuizOptions
              fieldOptionsList={DEMO_FIELD_OPTIONS}
              numberOfQuestionsOptionsList={numberOfQuestionsOptionsList}
              field={field}
              numberOfQuestions={numberOfQuestions}
              setField={setField}
              setNumberOfQuestion={setNumberOfQuestions}
            />) : quizState === QUIZ_STATE["IN_PROGRESS"] ?
            <QuizQuestion
              questionContent={questionContent}
              type={questionTypeRef.current}
              optionsList={answersList}
              correctAnswer={correctAnswer}
              isShowingAnswer={isShowingAnswer}
              selectedAnswer={selectedAnswer}
              onSubmitAnswer={submitAnswer}
              currentQuestion={currentQuestion}
            /> :
            <QuizSummary
              data={quizHistory.current}
            />}
      </div>

      <div className={`quiz-manager__button-section 
      ${quizState === QUIZ_STATE["IN_PROGRESS"] && "quiz-manager__button-section--flip"}`}>
        <div className="quiz-manager__section quiz-manager__section--button">
          {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
            <QuizButton
              fallbackCaption="Start"
              translateKey="quiz_page.buttons.start"
              onClick={() => startQuiz()}
            />
            :
            quizState === QUIZ_STATE["IN_PROGRESS"] ? (isDesktop ? (isFinished ?
              <QuizButton
                fallbackCaption="End"
                translateKey="quiz_page.buttons.end"
                onClick={() => {
                  //HANDLE END QUIZ
                  endQuiz()
                }}
                isDisabled={!isShowingAnswer}
              />
              :
              isShowingAnswer ? <QuizButton
                fallbackCaption="Next"
                translateKey="quiz_page.buttons.next"
                onClick={() => {
                  reset();
                }}
                isDisabled={!isShowingAnswer}
              /> : <QuizButton
                fallbackCaption="Skip"
                translateKey="quiz_page.buttons.skip"
                onClick={() => {
                  skip();
                }}
                isDisabled={isShowingAnswer}
              />) : <QuizTimer
              data-render={renderTime}
              currentTime={currentTime.current}
              totalTime={60}
            />) : <QuizButton
              fallbackCaption="New Quiz"
              translateKey="quiz_page.buttons.new_quiz"
              onClick={() => location.reload()}
            />}
        </div>

        <div className="quiz-manager__section quiz-manager__section--button quiz-manager__no-border">
          {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
            <QuizButton
              fallbackCaption="Close"
              translateKey="quiz_page.buttons.close"
              onClick={() => history.push("/", { isRedirect: true })}
            /> : quizState === QUIZ_STATE["ENDED"] ?
              <QuizButton
                fallbackCaption="Close"
                translateKey="quiz_page.buttons.close"
                onClick={() => history.push("/", { isRedirect: true })}
              />
              :
              isFinished ?
                <QuizButton
                  fallbackCaption="End"
                  translateKey="quiz_page.buttons.end"
                  onClick={() => {
                    //HANDLE END QUIZ
                    endQuiz()
                  }}
                  isDisabled={!isShowingAnswer}
                />
                :
                isShowingAnswer ? <QuizButton
                  fallbackCaption="Next"
                  translateKey="quiz_page.buttons.next"
                  onClick={() => {
                    reset();
                  }}
                  isDisabled={!isShowingAnswer}
                /> : <QuizButton
                  fallbackCaption="Skip"
                  translateKey="quiz_page.buttons.skip"
                  onClick={() => {
                    skip();
                  }}
                  isDisabled={isShowingAnswer}
                />
          }
        </div>
      </div>
    </div>
  );
};
