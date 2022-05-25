const server = "./data.json";

build()

async function build(){
  const chartContainer = document.getElementById('chart');
  const weekSpendings = await FetchServer();
  let array = [];
  weekSpendings.forEach(object => array.push(Number(object.amount)))
  const maxAmount = Math.max(...array)
  for(daySpending of weekSpendings){
    
  }
}

async function FetchServer(){
  try {
    const response = await fetch(server);
    if(!response.ok) { return console.error("Les données n'ont pas pu être récupérée. Voici l'erreur : " + response.status) }
    const json = await response.json()
    return json;
  }
  catch(error) {
    console.error('Impossible to fetch data. Something went wrong... obviously. here to see what happened : ' + error)
  }
}

function createThatChart(element, type, attributeName, object){
  let a = document.createElement(String(element))
  a.setAttribute(String(type), String(attributeName))

}
/**
 * <article>
 *  <div class="chart">
 *    <div class="chart__bar"> Here the bar           // Need to find for the height
 *      
 *    </div> 
 *    <p class="chart__text"> Here is the day </p>
 *  </div>
 * </article>
 */