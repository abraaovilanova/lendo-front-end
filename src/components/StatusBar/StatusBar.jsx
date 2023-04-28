import "./StatusBar.css";

function StatusBar(props) {

  const arrOfCircles = [...Array(5)];

  return (
    <div className="status-bar">
      {arrOfCircles.map((elem, idx) => <div className={`circle ${idx < props.status ? 'green' : 'gray'}`}></div>)
    }
    </div>
  );
}

export default StatusBar;
