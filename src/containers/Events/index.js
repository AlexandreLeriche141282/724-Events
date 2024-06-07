import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrer les événements par type
  let filteredEvents = type
    ? data?.events.filter((event) => event.type === type)
    : data?.events || [];

  // Trier les événements du plus récent au plus ancien
  filteredEvents = filteredEvents.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  // Pagination
  const startIndex = (currentPage - 1) * PER_PAGE;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + PER_PAGE);

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer" data-testid="listEvents">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;