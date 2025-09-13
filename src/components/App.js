import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question";
import NextButton from "./NextButton.js";
import Progress from "./Progress.js";
import FinishScreen from "./FinishScreen.js";
import Timer from "./Timer.js";
import Footer from "./Footer.js";

const initalState = {
  questions: [],

  //loading ,error ready active finished
  status: "loading",
  index: 0,
  points: 0,
  timer: 5,

  answer: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        timer: action.payload,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "next":
      return {
        ...state,

        index: action.payload,
        answer: null,
      };

    case "end":
      return { ...state, status: "finish" };
    case "restart":
      return { ...initalState, questions: state.questions, status: "ready" };

    default:
      throw new Error("Unkonwn Request");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, timer }, dispatch] =
    useReducer(reducer, initalState);

  useEffect(function () {
    async function question() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        // if (!Response.ok) throw new Error("Lost connection!!");
        console.log(res);
        const data = await res.json();
        dispatch({ type: "dataRecived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    question();
  }, []);

  const questionLength = questions.length;
  const totalPoint = questions.reduce((prev, cur) => prev + cur.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen length={questionLength} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numberofQuestion={questions.length}
              points={points}
              totalPoint={totalPoint}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer timer={timer} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                index={index}
                answer={answer}
                questions={questions}
              />
            </Footer>
          </>
        )}
        {status === "finish" ? (
          <FinishScreen
            points={points}
            totalPoint={totalPoint}
            dispatch={dispatch}
          />
        ) : (
          ""
        )}
      </Main>
    </div>
  );
}
