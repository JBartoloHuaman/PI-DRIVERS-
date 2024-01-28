import Card from "../Card/Card";
function Cards({ drivers }) {
  return (
    <div className="lg:gap-x-16 lg:gap-y-8 sm:gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3">
      {drivers?.map((driver) => {
        return (
          <Card
            key={driver.id}
            id={driver.id}
            name={driver.name}
            image={driver.image}
            Teams={driver.Teams?.join(", ")}
          />
        );
      })}
    </div>
  );
}

export default Cards;
