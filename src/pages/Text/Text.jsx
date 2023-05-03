import { useEffect, useState } from "react";

import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useParams, useNavigate } from "react-router-dom";

import { similarityCheck } from "../../utils/levenshteinDistance";
import "./Text.css";

import { data } from "../../mock";

function Text(props) {
  const navigate = useNavigate();
  const { textId } = useParams();
  const [text, setText] = useState(data[textId - 1].text.split("."));
  const [count, setCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [similarityScore, setSimilarityScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [transcript, setTranscript] = useState("");

  let SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;

  let recognition = new SpeechRecognition();

  recognition.lang = "fr";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const renderSpeech = () => {
    recognition.start();
    setIsRecording(true);
    recognition.onresult = (event) => {
      //handle result in here
      let word = event.results[0][0].transcript;
      setTranscript(word);
      setIsRecording(false);
      setSimilarityScore(
        similarityCheck(text[count].toLowerCase().trim(), word)
      );
    };
  };

  function handleClickNext() {

    let totalScoreLocal = totalScore
    setTranscript("");
    if (similarityScore > 70) {
      setTotalScore((prev) => prev + 1);
      totalScoreLocal += 1
    }



    setSimilarityScore(0);
    setCount((prev) => prev + 1);


    let textStatusLocalStorage = localStorage.getItem("lendo");
    textStatusLocalStorage = JSON.parse(textStatusLocalStorage);
    let textStatus = textStatusLocalStorage.textStatus.filter(
      (obj) => obj.id == textId
    )[0];
    const status = Math.round((totalScore / text.length) * 5);
    textStatus = { ...textStatus, totalScore: totalScoreLocal, status, textPossition: count + 1 };

    const newArray = textStatusLocalStorage.textStatus.map((elem) => {
      if (elem.id === textStatus.id) {
        return { ...textStatus };
      }
      return elem;
    });

    localStorage.setItem("lendo", JSON.stringify({ textStatus: newArray }));
  }

  function handleClickOncontinue() {
    setTranscript("");
    let textStatusLocalStorage = localStorage.getItem("lendo");
    textStatusLocalStorage = JSON.parse(textStatusLocalStorage);
    let textStatus = textStatusLocalStorage.textStatus.filter(
      (obj) => obj.id == textId
    )[0];
    const status = Math.round((totalScore / text.length) * 5);
    textStatus = { ...textStatus, totalScore, status, textPossition: 0 };

    const newArray = textStatusLocalStorage.textStatus.map((elem) => {
      if (elem.id === textStatus.id) {
        return { ...textStatus };
      }
      return elem;
    });

    localStorage.setItem("lendo", JSON.stringify({ textStatus: newArray }));
    navigate("/");
  }

  async function handleListening(e) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text[count]);
    const selectedVoice = synth
      .getVoices()
      .filter((elem) => elem.lang === "fr-FR")[0];
    utterance.voice = selectedVoice;
    utterance.lang = "fr-FR";
    synth.speak(utterance);
  }

  // Components

  function TextDisplayContent() {
    if (text.length >= count + 1) {
      return (
        <div
          className="text-display"
          style={{
            color:
              similarityScore > 70
                ? "green"
                : similarityScore > 50
                ? "orange"
                : similarityScore > 0
                ? "red"
                : "black",
          }}
        >
          {text[count]}
          <div style={{ color: "gray", fontSize: "12px" }}>{transcript}</div>
        </div>
      );
    } else {
      return (
        <div className="text-display">
          <div>
            <p>
              Você acertou {Math.round((totalScore / text.length) * 100)} %{" "}
            </p>
          </div>
        </div>
      );
    }
  }

  function BtnGroup() {
    if (count >= text.length) {
      return (
        <button className="main-btn animation" onClick={(e) => handleClickOncontinue(e)}>
          Continuar
        </button>
      );
    } else if (similarityScore > 70) {
      return (
        <button className="main-btn animation" onClick={() => handleClickNext()}>
          Próxima
        </button>
      );
    } else {
      return (
        <div className="btn-group">
          <button
            className="main-btn"
            onClick={renderSpeech}
            disabled={isRecording}
            style={{ backgroundColor: "#65a4da" }}
          >
            {!isRecording ? "Falar" : "Gravando...."}
          </button>
          <button
            onClick={() => handleListening()}
            className="main-btn"
            style={{ backgroundColor: "#ffd451" }}
          >
            Ouvir
          </button>
          <button
            style={{ backgroundColor: "#eb5d76" }}
            className="main-btn"
            onClick={() => handleClickNext()}
          >
            Pular
          </button>
        </div>
      );
    }
  }

  useEffect(() => {
    let textStatusLocalStorage = localStorage.getItem("lendo");
    textStatusLocalStorage = JSON.parse(textStatusLocalStorage);
    const textStatus = textStatusLocalStorage.textStatus.filter(
      (obj) => obj.id == textId
    )[0];
    setCount(textStatus.textPossition);
    setTotalScore(textStatus.totalScore);
  }, []);

  return (
    <div className="text-page">
      <ProgressBar percent={((count + 1) / text.length) * 100} />
      <TextDisplayContent />
      <BtnGroup />
    </div>
  );
}

export default Text;
