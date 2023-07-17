import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

function FinishExam() {
  // const navigate=useNavigate();

  return (
    <div className="text-center">
      <p>
        <b>FinishExam.</b>
      </p>
      <br />
      <Link to={`/Examresults`}>
        <button>goto another Exam</button>
      </Link>
    </div>
  );
}

export default FinishExam;
