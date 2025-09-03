import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";

const initalState = {
  questions: [],

  //loading ,error ready active finished
  status: "loading",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "error":
      return {
        ...state,
        status: "dataFailed",
      };
    default:
      throw new Error("Unkonwn Request");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
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
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>; <p>Questions</p>
      </Main>
    </div>
  );
}
