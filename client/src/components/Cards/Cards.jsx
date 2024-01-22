import Card from "../Card/Card";
import style from "./cards.module.css"
function Cards({drivers}) {
  

    return (
      <div className={style['cards-cont']}>
        {drivers?.map(driver => {
          return (
          <Card
            key={driver.id}
            id={driver.id}
            name={driver.name}
            image={driver.image}
            Teams={driver.Teams?.join(", ")}
          />
          )
        })}
      </div>
    )
  }
  
  export default Cards

