const server = "./data.json";

build()

/**
 * Find the highest value from data.json, and store it inside the variable maxAmount 
 * 
 * If the element to be build is the one with the highest value, it will be blue, else it will be orange
*/
async function build(){
  const chartContainer = document.getElementById('chart');
  chartContainer.innerHTML = ""
  const weekSpendings = await FetchServer();
  const maxAmount = findMaxAmount(weekSpendings);
  for(daySpending of weekSpendings){
    console.log(daySpending)
    if(daySpending.amount === maxAmount) {
      let thatChart = createThatChart(daySpending, "div","class", "chart__container", "p", "class", "chart__amount", "div", "class", "chart__bar--special", "p", "class", "chart__day")
      chartContainer.appendChild(thatChart)
    } else {
      let barHeight = Math.floor((daySpending.amount / maxAmount)*150)
      console.log(barHeight)
      let thisChart = createThatChart(daySpending, "div","class", "chart__container", "p", "class", "chart__amount", "div", "class", "chart__bar", "p", "class", "chart__day", barHeight);
      chartContainer.appendChild(thisChart)
    }
     
  }
}

/**
 * Create each chart element, the bar, the hidden text, and the day text
 * @param {Object} day - the day Object, containing a String with the day, and a Number with the amount.
 * @param {String} container - the chart bar container element.
 * @param {String} type - The type of the element to be created (same for type2, 3, 4).
 * @param {String} attribute - The attribute name (id, class, etc.), same for attribute2, 3, 4.
 * @param {String} ele2 - The element name to be create (same for ele3, and ele4)
 * ==========
 * HTML MODEL
 * ==========
 * <div class="chart__container">
 *   <p class="chart__amount">$9.99</p>
 *   <div class="chart__bar"></div>  || <div class="chart__bar--special"></div>
 *   <p class="chart__day">wed</p>
 * </div>  */
function createThatChart(day, container, type, attribute, ele2, type2, attribute2, ele3, type3, attribute3, ele4, type4, attribute4, barHeight){
  let containerElement = document.createElement(String(container))
  containerElement.setAttribute(String(type), String(attribute))
  let element2 = document.createElement(String(ele2))
  element2.setAttribute(String(type2), String(attribute2))
  containerElement.appendChild(element2)
  let element3 = document.createElement(String(ele3))
  element3.setAttribute(String(type3), String(attribute3))
  containerElement.appendChild(element3)
  let element4 = document.createElement(String(ele4))
  element4.setAttribute(String(type4), String(attribute4))
  containerElement.appendChild(element4)
  element2.innerText = day.amount;
  element4.innerText = day.day;
  element3.setAttribute('style', "height: " + barHeight + "px;")
  return containerElement
}
/**
 * Create an array from the array of object received in argument, then find the highest value from the storage array
 * @param {Array} arrayOfObject - The server datan composed of an array of object [{...},{...}, ...]
 * @param {Array} storageArray - A storage for the value to be treated 
 * @returns a number (the highest value)
 */
function findMaxAmount(arrayOfObject, storageArray = []){
  arrayOfObject.forEach(object => storageArray.push(Number(object.amount)))
  const maxAmount = Math.max(...storageArray)
  return maxAmount
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
