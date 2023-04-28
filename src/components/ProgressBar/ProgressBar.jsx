import { RiCloseLine } from "react-icons/ri";
import "./ProgressBar.css";
import { useNavigate } from "react-router-dom";

function ProgressBar(props) {
  const navigate = useNavigate();
  return (
    <div className="navegation">
      <div onClick={() => navigate("/")} className="navegation-btn">
        <RiCloseLine />
      </div>
       <div className="progress-bar">
        <div className="bar" style={{ width: `${props.percent <=  100 ? props.percent: 100}%` }}></div>
      </div> 
    </div>
  );
}

export default ProgressBar;
