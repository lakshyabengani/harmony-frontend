import Cards from './Cards';

function CarouselCards(props) {

     const renderCardList = () => 
     {
          const list = props.suggestionlist.map( (person,idx) => (
               <Cards profile={person} isMatch={false} />
          )) 
          // console.log(list);

          if(props.index < list.length)
               return list[props.index];
          else 
               props.handleList();
     }

     return (
          <>
               {renderCardList()}
          </>
     )
}

export default CarouselCards