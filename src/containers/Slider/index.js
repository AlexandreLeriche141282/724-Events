import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // Tri des événements dans l'ordre décroissant en fonction de la date
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(
      // Incrémentation de l'index avec une vérification pour éviter l'erreur "undefined"
      () => setIndex(index + 1 < byDateDesc?.length ? index + 1 : 0),
      5000
    );};
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Utilisation de la date comme clé unique pour chaque slide
        <div key={event.date}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`} >
         {/* Utilisation du titre de l'événement comme texte alternatif pour l'image */}
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // Utilisation de la date comme clé unique pour chaque bouton radio
                  key={_.date}
                  type="radio"
                  name="radio-button"
                  // Utilisation de l'index pour indiquer la slide en cours
                  checked={index === radioIdx}
                  // Ajout de l'attribut readOnly pour éviter les erreurs de console
                  readOnly
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