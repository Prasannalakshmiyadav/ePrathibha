import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ExamList.css";

const ExamList = () => {
  const [examsData, setExamsData] = useState([]);
  

  useEffect(() => {
    const fetchExamsData = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));

        if (user) {
          const response = await axios.get(
            "https://test.e-prathibha.com/apis/test_free_exam",
            {
              headers: {
                id: user.Id,
                tokenu: user.Token,
                server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
              },
            }
          );
          console.log(response);
          setExamsData(response.data.data.exams);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchExamsData();
  }, []);

  return (
    <div className="container">
      <h1>Free Email Verification</h1>
      {examsData.map((question, index) => {
        const questionPaper = Object.keys(question)[0];
        return (
          <div className="card" key={index}>
            <h2 className="questionheaders">{questionPaper}</h2>
            {question[questionPaper].map((paperList, index) => {
              const { id, name, duration } = paperList["Exam"];
              return (
                <div className="card" key={index}>
                  <p>
                    <b>ID:</b> {id} ||
                    <b>Exam Year:</b> {name} ||
                    <b>Duration:</b> {duration}
                  </p>
                  <Link to={`/Questions/${id}`}>
                    <button>Start Exam</button>
                  </Link>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ExamList;
