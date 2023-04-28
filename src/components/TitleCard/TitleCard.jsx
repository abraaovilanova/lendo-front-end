import "./TitleCard.css";
import {  useParams, useNavigate } from "react-router-dom";
import StatusBar from "../StatusBar/StatusBar";

function TitleCard(props) {
  const navigate = useNavigate();
  

  function handleSelectText(){
    navigate(`/text/${props.textId}`)
  }


  return (
    <div className="title-card" onClick={() => handleSelectText()}>
      <div className="title-card-img">
        <img src={require(`../../${props.imgUrl}`)}  alt="my img"/>
      </div>
      <div className="title-card-content">
        <span>{props.title}</span>
        <StatusBar status={props.status} />
      </div>
    </div>
  );
}

export default TitleCard;
