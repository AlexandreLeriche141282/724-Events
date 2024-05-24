import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  // Récupère les données depuis le contexte DataContext
  const { data } = useData();
  // Utilise le hook useState pour gérer l'index de la carte affichée
  const [index, setIndex] = useState(0);

  // Trie les événements par date, du plus ancien au plus récent
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) =>
      new Date(evtA.date) - new Date(evtB.date)
  );

  // Fonction pour passer à la carte suivante
  const nextCard = () => {
    setIndex(index < (byDateDesc && byDateDesc.length - 1) ? index + 1 : 0);
  };
  // Incrémente l'index passer à la carte suivante, ou revient 1er carte si on atteint fin  liste

  // Utilise le hook useEffect pour mettre en place une minuterie
  useEffect(() => {
    const timeoutSlider = setTimeout(() => {
      nextCard();
    }, 5000);
    // Appelle nextCard toutes les 5 secondes

    return () => clearTimeout(timeoutSlider);
    // Nettoie la minuterie lorsque le composant est démonté ou que nextCard change
  }, [nextCard]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={Math.random()}>
          {/* Affiche la carte correspondant à l'index courant */}
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          {/* Affiche les boutons radio pour naviguer entre les cartes */}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={event.id}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;