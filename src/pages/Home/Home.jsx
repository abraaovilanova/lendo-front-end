import { useEffect, useState } from "react";
import TitleCard from "../../components/TitleCard/TitleCard";

import { data } from "../../mock";


function Home() {
  const [textStatus, setTextStatus] = useState([])


  useEffect(() => {

    let textStatusLocalStorage = localStorage.getItem("lendo");

    textStatusLocalStorage = JSON.parse(textStatusLocalStorage);

    if (!textStatusLocalStorage) {
      textStatusLocalStorage = data.map((elem) => {
        return {
          title: elem.title,
          id: elem.id,
          totalScore: 0,
          textPossition: 0,
          status: 0,
          imgUrl:elem.imgUrl
        };
      });

      localStorage.setItem(
        "lendo",
        JSON.stringify({ textStatus: textStatusLocalStorage })
      );
    }

    setTextStatus(textStatusLocalStorage)

  }, []);

  return (
    <>
      <h1>Meus Textos</h1>
      {textStatus.textStatus?.map((item) => (
        <TitleCard
          key={item.id}
          title={item.title}
          textId={item.id}
          status={item.status}
          textPosition={item.textPosition}
          imgUrl={item.imgUrl}
        />
      ))}
    </>
  );
}

export default Home;
