import Wrapping from "./Wrapping";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import VerifyEmailPage from "./VerifyEmailPage";
import ExamsList from "./FreeExamList/ExamList";
import Questions from "../src/QuestionsList/Questions";
import FinishExam from "./FinishExam/FinishExam";
import ExamResults from "./ExamResults/ExamResults";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapping />} />
        <Route path="/FreeExamList" element={<ExamsList />} />
        <Route path="/VerifyEmailPage" element={<VerifyEmailPage />} />
        <Route path="/FinishExam" element={<FinishExam />} />
        <Route path="/Questions/:examId" element={<Questions />} />
        <Route path="/Examresults" element={<ExamResults />} />
      </Routes>
    </BrowserRouter>
  );
}
