function Question({ question, dispatch, index }) {
  return (
    <div>
      <h4>
        <span>{index + 1})</span> {question[index].question}
      </h4>
      <div className="options">
        {question[index].options.map((option, index) => (
          <button className="btn btn-option" key={index}>
            {option}
          </button>
        ))}
      </div>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "next", payload: index + 1 })}
      >
        Next
      </button>
    </div>
  );
}

export default Question;
