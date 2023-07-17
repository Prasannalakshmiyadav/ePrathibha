import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Questions.css";

const Questions = () => {
  const { examId } = useParams();
  console.log(examId);
  const [questions, setQuestions] = useState([]);
  const [myOptions, setMyOptions] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chooseOptions, setChooseOptions] = useState({});
  const navigate = useNavigate();
  const data1 = sessionStorage.getItem("user");
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      axios
        .get(`https://test.e-prathibha.com/apis/start_exam?examId=${examId}`, {
          headers: {
            id: user.Id,
            tokenu: user.Token,
            server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
          },
        })
        .then((response) => {
          console.log(response.data.data.exam);
          // Set the questions state with the received data
          setQuestions(response.data.data.exam);
        })
        .catch((error) => console.log(error));
    }
  }, [examId]);
  console.log(questions);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSaveAndNext = async () => {
    try {
      setChooseOptions((prevOptions) => ({
        ...prevOptions,
        [currentQuestion.ExamStat.ques_no]: myOptions,
      }));

      const data = {
        data: {
          Exam: {
            lang: "1",
            option_selected: myOptions,
          },
        },
        examId: examId,
        qId: currentQuestion.ExamStat.ques_no,
      };

      const response = await axios.post(
        "https://test.e-prathibha.com/apis/save_ques",
        data,
        {
          headers: {
            tokenu: data1.Token,
            id: data1.Id,
            server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
          },
          
        }
      );

      console.log(response);

      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setMyOptions("");
      } else {
        console.log("All questions answered");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinishExam = () => {
    const data = {
      examId: examId,
      qno: 1,
    };

    axios
      .post("https://test.e-prathibha.com/apis/finishExam", data, {
        headers: {
          id: data1.Id,
          server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
          tokenu: data1.Token,
        },
      })
      .then((response) => {
        // console.log(response.data);
        alert("successfully completed exam");
        navigate("/FinishExam");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    return <div className="loading">Please wait a moment..!</div>;
  }

  // const examResultId = currentQuestion.ExamStat.exam_result_id;
  // localStorage.setItem('examResultId', examResultId);

  return (
    <div>
      <h2>Questions for Exam ID: {examId}</h2>

      <span>{currentQuestion.ExamStat.q}.</span>
      <span>{currentQuestion.Question.question.above}</span>
      <div>
        <b>Options</b>
      </div>
      <div className="options">
        <div>
          <input
            type="radio"
            name="option"
            value={currentQuestion.Question.option1}
            checked={myOptions === currentQuestion.Question.option1}
            onChange={() => setMyOptions(currentQuestion.Question.option1)}
          />
          {currentQuestion.Question.option1}
        </div>
        <div>
          <input
            type="radio"
            name="option"
            value={currentQuestion.Question.option2}
            checked={myOptions === currentQuestion.Question.option2}
            onChange={() => setMyOptions(currentQuestion.Question.option2)}
          />
          {currentQuestion.Question.option2}
        </div>
        <div>
          <input
            type="radio"
            name="option"
            value={currentQuestion.Question.option3}
            checked={myOptions === currentQuestion.Question.option3}
            onChange={() => setMyOptions(currentQuestion.Question.option3)}
          />
          {currentQuestion.Question.option3}
        </div>
        <div>
          <input
            type="radio"
            name="option"
            value={currentQuestion.Question.option4}
            checked={myOptions === currentQuestion.Question.option4}
            onChange={() => setMyOptions(currentQuestion.Question.option4)}
          />
          {currentQuestion.Question.option4}
        </div>
      </div>
      <button onClick={handleSaveAndNext}>Save and Next</button>
      <button onClick={handleFinishExam}>submit</button>
    </div>
  );
};

export default Questions;
