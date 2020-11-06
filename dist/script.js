function App() {
  const [score, setScore] = React.useState(0);
  const [attempts, setAttempts] = React.useState(0);
  const [currentProblem, setCurrentProblem] = React.useState(generateProblem());
  const [userAnswer, setUserAnswer] = React.useState('');
  const [showError, setShowError] = React.useState(false);
  const answerField = React.useRef(null);
  const resetButton = React.useRef(null);

  React.useEffect(() => {
    if (score == 10 || attempts == 3) {
      setTimeout(() => resetButton.current.focus(), 331);
    }
  }, [score, attempts]);

  function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  function generateProblem() {
    return {
      numberOne: generateNumber(10),
      numberTwo: generateNumber(10),
      operator: ['+', '-', 'x'][generateNumber(2)] };

  }

  function handleSubmit(e) {
    e.preventDefault();
    answerField.current.focus();

    let correctAnswer;

    if (currentProblem.operator == "+") correctAnswer = currentProblem.numberOne + currentProblem.numberTwo;
    if (currentProblem.operator == "-") correctAnswer = currentProblem.numberOne - currentProblem.numberTwo;
    if (currentProblem.operator == "x") correctAnswer = currentProblem.numberOne * currentProblem.numberTwo;

    if (correctAnswer == parseInt(userAnswer, 10)) {
      setScore(prev => prev + 1);
      setCurrentProblem(generateProblem());
      setUserAnswer('');
    } else {
      setAttempts(prev => prev + 1);
      setUserAnswer("");
      setShowError(true);
      setTimeout(() => setShowError(false), 401);
    }

  }
  function resetGame() {
    setScore(0);
    setAttempts(0);
    setUserAnswer("");
    setCurrentProblem(generateProblem());
    answerField.current.focus();
  }

  return (
    React.createElement(React.Fragment, null,
    React.createElement("div", { className: "main-ui" + (attempts == 3 || score == 10 ? " blurred" : "") },
    React.createElement("p", { className: "problem" + (showError ? " animate-wrong" : "") }, currentProblem.numberOne, " ", currentProblem.operator, " ", currentProblem.numberTwo, " "),

    React.createElement("form", { onSubmit: handleSubmit, action: "", className: "our-form" },
    React.createElement("input", { ref: answerField, value: userAnswer, onChange: e => setUserAnswer(e.target.value), type: "text", className: "our-field", autoComplete: "off" }),
    React.createElement("button", null, "Submit")),


    React.createElement("p", { className: "status" }, "You need ", 10 - score, " more points, and are allowed to make ", 2 - attempts, " more mistakes."),

    React.createElement(ProgressBar, { score: score })),



    React.createElement("div", { className: "overlay" + (attempts == 3 || score == 10 ? ' overlay--visible' : "") },
    React.createElement("div", { className: "overlay-inner" },
    React.createElement("p", { className: "end-message" }, score == 10 ? "Congrats you won" : "Sorry you lost"),
    React.createElement("button", { ref: resetButton, onClick: resetGame, className: "reset-button" }, "Start Over")))));




}

function ProgressBar(props) {
  return (
    React.createElement("div", { className: "progress" },
    React.createElement("div", { className: "boxes" },
    React.createElement("div", { className: "box" }),
    React.createElement("div", { className: "box" }),
    React.createElement("div", { className: "box" }),
    React.createElement("div", { className: "box" }),
    React.createElement("div", { className: "box" }),
    React.createElement("div", { className: "box" }),
    React.createElement("div", { className: "box" }),
    React.createElement("div", { className: "box" }),
    React.createElement("div", { className: "box" }),
    React.createElement("div", { className: "box" })),

    React.createElement("div", { className: "progress-inner", style: { transform: `scaleX(${props.score / 10})` } })));


}


ReactDOM.render(React.createElement(App, null), document.getElementById("test"));