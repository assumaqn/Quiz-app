function NextButton({ dispatch, index, answer, questions }) {
  // console.log(questions.find((qus) => qus[16]));

  if (answer === null) return null;

  function handleClick() {
    dispatch({ type: "next", payload: index + 1 });
  }
  function handleSubmit() {
    if (index + 1 === questions.length) {
      dispatch({ type: "end" });
    }
  }
  if (index < questions.length - 1)
    return (
      <div>
        <button className="btn btn-ui" onClick={handleClick}>
          Next
        </button>
      </div>
    );
  if (index === questions.length - 1)
    return (
      <div>
        <button className="btn btn-ui" onClick={handleSubmit}>
          submit
        </button>
      </div>
    );
}

export default NextButton;
