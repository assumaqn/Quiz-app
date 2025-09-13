function Progress({ index, numberofQuestion, points, totalPoint, answer }) {
  return (
    <header className="progress">
      <progress
        max={numberofQuestion}
        value={`${answer !== null ? index + 1 : index}`}
      />
      <p>
        Question <strong>{index + 1}</strong>
        <strong>/{numberofQuestion}</strong>
      </p>
      <p>
        Result <strong>{points}</strong>
        <strong>/{totalPoint}</strong>
      </p>
    </header>
  );
}

export default Progress;
