import "./TitleCard.css";
import {  useParams, useNavigate } from "react-router-dom";
import StatusBar from "../StatusBar/StatusBar";

function TitleCard(props) {
  const navigate = useNavigate();
  

  function handleSelectText(){
    navigate(`/text/${props.textId}`)
  }


  return (
    <div className="title-card" onClick={() => handleSelectText()} style={{backgroundColor: props.status > 2 & props.status < 4 ? '#fe7747' : props.status >= 4 ? '#4dc591': '#64a4da'  }}>
      <div className="title-card-img" style={{backgroundColor: props.status > 2 & props.status < 4 ? '#e76a40' : props.status >= 4 ? '#46b182': '#5a92c3'  }}>
        {/* <img src={require(`../../${props.imgUrl}`)}  alt="my img"/> */}
      </div>
      <div className="title-card-content">
        <span>{props.title}</span>
        <StatusBar status={props.status} />
      </div>
    </div>
  );
}

export default TitleCard;
