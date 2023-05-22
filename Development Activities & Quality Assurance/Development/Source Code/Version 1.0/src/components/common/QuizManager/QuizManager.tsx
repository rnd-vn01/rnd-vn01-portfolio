import './QuizManager.scss';
import React, { useEffect, useRef, useState } from 'react';
import { AuthBar } from '../AuthBar/AuthBar';
import { useTranslation } from 'react-i18next';
import { QuizOptions } from './QuizOptions/QuizOptions';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { QuizButton } from './QuizButton/QuizButton';
import { useHistory } from 'react-router-dom';
import { QuizStatusBar } from './QuizStatusBar/QuizStatusBar';
import { QuizQuestion } from './QuizQuestion/QuizQuestion';
import { QUIZ_QUESTION_TYPE } from 'src/configs/constants';
import { QuizTimer } from './QuizTimer/QuizTimer';

import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';
import DEMO_DATA_MERIDIAN_VI from 'src/assets/test_data/meridians_vi.json';
import DEMO_DATA_MERIDIAN_EN from 'src/assets/test_data/meridians_en.json';

// Sounds
import mainSound from "src/assets/sounds/main.mp3"
import correctSound from "src/assets/sounds/right.mp3"
import wrongSound from "src/assets/sounds/wrong.mp3"
import { QuizSummary } from './QuizSummary/QuizSummary';

enum QUIZ_STATE {
  SELECT_OPTIONS = 0,
  IN_PROGRESS = 1,
  ENDED = 2
}

export const QuizManager: React.FC<IQuizManager> = ({ }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const [quizState, setQuizState] = useState<number>(QUIZ_STATE["SELECT_OPTIONS"]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [field, setField] = useState<number>(0);
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

  const usedPointIndexes = useRef<any>([]);
  const quizHistory = useRef<any>({});

  // Sounds
  const mainSoundPlayer = useRef<any>(new Audio(mainSound))
  const correctSoundPlayer = useRef<any>(new Audio(correctSound));
  const wrongSoundPlayer = useRef<any>(new Audio(wrongSound));

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
  const DEMO_QUESTION_COUNT_OPTIONS = [5, 10, 15, 20, 25, 30]

  const startQuiz = () => {
    usedPointIndexes.current = []
    quizHistory.current = {
      questions: [],
      options: {
        field: DEMO_FIELD_OPTIONS.filter(item => item.value === field),
        numberOfQuestions: numberOfQuestions
      }
    }
    generateQuestion();
    setCurrentQuestion(1);
    setQuizState(QUIZ_STATE["IN_PROGRESS"]);
    startTimer();
  }

  const endQuiz = () => {
    setQuizState(QUIZ_STATE["ENDED"])
  }

  useEffect(() => {
    if (selectedAnswer === correctAnswer) {
      setIsPlus(true);

      setTimeout(() => {
        setIsPlus(false);
      }, 2000)
    }
  }, [selectedAnswer, correctAnswer])

  const submitAnswer = (answer) => {
    quizHistory.current.questions.push({
      question: questionContent,
      options: answersList,
      answer: answer,
      correctAnswer: correctAnswer,
      time: Math.max(60 - currentTime.current, 0)
    })

    endAnswerTime()
    setSelectedAnswer(answer)
    mainSoundPlayer.current?.pause();
    if (answer === correctAnswer) {
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
  }

  const startTimer = () => {
    currentTime.current = 60;
    (mainSoundPlayer.current as HTMLAudioElement).currentTime = 0;
    mainSoundPlayer.current?.play();

    timer.current = setInterval(() => {
      if (currentTime.current - 1 === 0) {
        quizHistory.current.questions.push({
          question: questionContent,
          options: answersList,
          answer: null,
          correctAnswer: correctAnswer,
          time: 60
        })
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

  const generateQuestion = (option = null) => {
    let used = []
    const DEMO_DATA = currentLanguage === "EN" ? DEMO_DATA_EN : DEMO_DATA_VI

    while (used.length < 4) {
      const random = Math.floor(Math.random() * DEMO_DATA.length)
      if (!used.includes(random) && !usedPointIndexes.current.includes(random)) {
        used.push(random)
      }
    }

    const correct = Math.floor(Math.random() * used.length)
    usedPointIndexes.current.push(used[correct])

    let TEST_ANSWERS_LIST = [];
    used.forEach((point, index) => {
      TEST_ANSWERS_LIST.push({
        "index": index,
        "answer": `${DEMO_DATA[point].code} (${DEMO_DATA[point].name})`
      })
    })
    setAnswersList(TEST_ANSWERS_LIST)
    setQuestionContent(DEMO_DATA[used[correct]].description)
    setCorrectAnswer(correct)
  }

  return (
    <div
      role="div"
      aria-label="quiz-manager"
      className="quiz-manager">
      <div className="quiz-manager__section quiz-manager__section--top">
        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          <AuthBar /> : <QuizStatusBar
            currentQuest={currentQuestion}
            totalQuest={numberOfQuestions}
            isPlus={isPlus}
            totalCorrect={numberOfCorrectQuestions}
          />}
      </div>

      <div className="quiz-manager__section quiz-manager__section--main">
        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          <QuizOptions
            fieldOptionsList={DEMO_FIELD_OPTIONS}
            numberOfQuestionsOptionsList={DEMO_QUESTION_COUNT_OPTIONS}
            field={field}
            numberOfQuestions={numberOfQuestions}
            setField={setField}
            setNumberOfQuestion={setNumberOfQuestions}
          /> : quizState === QUIZ_STATE["IN_PROGRESS"] ?
            <QuizQuestion
              questionContent={questionContent}
              type={QUIZ_QUESTION_TYPE["MULTIPLE_CHOICE"]}
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

      <div className="quiz-manager__section quiz-manager__section--button">
        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          <QuizButton
            fallbackCaption="Start"
            translateKey="quiz_page.buttons.start"
            onClick={() => startQuiz()}
          /> :
          quizState === QUIZ_STATE["ENDED"] ?
            <QuizButton
              fallbackCaption="Close"
              translateKey="quiz_page.buttons.close"
              onClick={() => history.push("/")}
            />
            :
            currentQuestion !== numberOfQuestions ?
              <QuizButton
                fallbackCaption="Next"
                translateKey="quiz_page.buttons.next"
                onClick={() => {
                  reset();
                }}
                isDisabled={!isShowingAnswer}
              />
              :
              <QuizButton
                fallbackCaption="End"
                translateKey="quiz_page.buttons.end"
                onClick={() => {
                  //HANDLE END QUIZ
                  endQuiz()
                }}
                isDisabled={!isShowingAnswer}
              />}
      </div>

      <div className="quiz-manager__section quiz-manager__section--button quiz-manager__no-border">
        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          <QuizButton
            fallbackCaption="Close"
            translateKey="quiz_page.buttons.close"
            onClick={() => history.push("/")}
          /> :
          <QuizTimer
            data-render={renderTime}
            currentTime={currentTime.current}
            totalTime={60}
          />}
      </div>
    </div>
  );
};
