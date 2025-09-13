function FinishScreen({ points, totalPoint, dispatch }) {
  function handleRestart() {
    dispatch({ type: "restart" });
  }
  return (
    <div>
      <p className="result">
        You finished the question. Score: {points}/{totalPoint}.
      </p>
      <button className="btn btn-ui" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
}

export default FinishScreen;
