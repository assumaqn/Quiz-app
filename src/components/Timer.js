import { useEffect } from "react";

function Timer({ timer, dispatch }) {
  useEffect(
    function () {
      let time = timer * 60;
      // if (time === 0) return dispatch({ type: "restart" });
      setInterval(function () {
        const munite = Math.trunc(time / 60);
        const second = time % 60;
        dispatch({
          type: "start",
          payload: {
            timer: time--,
            munite,
            second,
          },
        });
        // console.log(`${munite}:${second}`);
      }, 1000);
    },
    [dispatch, timer]
  );
  return <div className="timer">{`${5}:${"00"}`}</div>;
}

export default Timer;
