import { useEffect } from "react";

function Timer({ timer, dispatch }) {
  const munite = Math.trunc(timer / 60);
  const second = timer % 60;
  // useEffect(
  //   function () {
  //     let time = timer * 60;
  //     // if (time === 0) return dispatch({ type: "restart" });
  //     setInterval(function () {
  //
  //       dispatch({
  //         type: "start",
  //         payload: {
  //           timer: time--,
  //           munite,
  //           second,
  //         },
  //       });
  //       console.log(`${munite}:${second}`);
  //     }, 1000);
  //   },
  //   [dispatch, timer]
  // );

  useEffect(
    function () {
      const id = setInterval(() => dispatch({ type: "tick" }), 1000);
      return () => {
        clearInterval(id);
      };
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {munite < 10 && "0"}
      {munite}:{second < 10 && "0"}
      {second}
    </div>
  );
}

export default Timer;
