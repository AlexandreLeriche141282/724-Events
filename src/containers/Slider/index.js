import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(true); // État pour contrôler le défilement

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // Tri des événements du plus ancien au plus récent
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    setTimeout(
      // Incrémentation de l'index avec une vérification pour éviter l'erreur "undefined"
      () => setIndex(index + 1 < byDateDesc?.length ? index + 1 : 0),
      5000
    );
  };

  useEffect(() => {
    if (isScrolling) {
      nextCard();
    }
  }, [index, isScrolling]);

  useEffect(() => {
    // Fonction de gestion de l'événement
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Empêche le défilement de la page
        setIsScrolling((prev) => !prev); // Inverse l'état de défilement
      }
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener('keydown', handleKeyDown);

    // Nettoyer l'écouteur d'événement au démontage du composant
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Utilisation de la date comme clé unique pour chaque slide
        <div key={event.date}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
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