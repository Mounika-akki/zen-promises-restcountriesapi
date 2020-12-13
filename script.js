function fetchApi(url, method = "GET") {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(xhr.responseText);
            }
            else if (this.readyState == 4 && this.status !== 200) {
                reject("Error , Try Again");
            }
        }
        xhr.send();
    });
}

let resturl = "https://restcountries.eu/rest/v2/all";
let method = "GET";

fetchApi(resturl, method)
    .then((data) => {
        CreateLayout(JSON.parse(data))
        console.log(JSON.parse(data));
    })
    .catch((err) => console.error(err));


function createCustomElement(elemName, elemClass = "", elemId = "") {
    var element = document.createElement(elemName);
    element.setAttribute("class", elemClass);
    element.setAttribute("id", elemId);
    return element;
}
function CreateLayout(data) {
    const total = createCustomElement("div", "container-fluid", "total");
    const row = createCustomElement("div", "row");
    const column = createCustomElement("div", "col-12 eachcol","");
    row.append(column);
    total.append(row);
    document.body.append(total);
    data.forEach(element => {
        const card = createCard(element);
        column.append(card);
    });
}

function createCard(country){
    let card = createCustomElement("div","card");

    let imageBlock = createCustomElement("div","card-body","imageBlock");

    let heading = createCustomElement("h5","card-title","heading");
    heading.innerHTML = country.name;

    let image = createCustomElement("img","card-img-top");
    image.setAttribute("src",country.flag);
    image.setAttribute("alt", country.name + " country flag");

    let cardBody = createCustomElement("div","card-contents");
    let capital = createCustomElement("div","capital","capitalId");
    let capitalKey = createCustomElement("span","key");
    capitalKey.innerHTML = "Capital : ";
    let capitalvalue = createCustomElement("span","value","capitalvalue");
    let capitalVal = "NA";
    if(country.capital){
        capitalVal = country.capital;
    }
    capitalvalue.innerHTML = capitalVal;
    capital.append(capitalKey,capitalvalue);

    let countryCode = createCustomElement("div","countryCode","countryCodeId");
    let countryCodeKey = createCustomElement("span","key");
    countryCodeKey.innerHTML = "Country Code : ";
    let countryCodevalue = createCustomElement("span","value");
    countryCodevalue.innerHTML = `${country.alpha2Code}, ${country.alpha3Code}`;
    countryCode.append(countryCodeKey,countryCodevalue);

    let region = createCustomElement("div","region","regionId");
    let regionKey = createCustomElement("span","key");
    regionKey.innerHTML = "Region : ";
    let regionvalue = createCustomElement("span","value");
    regionvalue.innerHTML = country.region;
    region.append(regionKey,regionvalue);

    let latLong = createCustomElement("div","latLong","latLongId");
    let latLongKey = createCustomElement("span","key");
    latLongKey.innerHTML = "Lat,Long : ";
    let latLongvalue = createCustomElement("span","value");
    latLongvalue.innerHTML = `${Math.round(country.latlng[0])} , ${Math.round(country.latlng[1])}`
    latLong.append(latLongKey,latLongvalue);

    imageBlock.append(heading,image);
    cardBody.append(capital,countryCode,region,latLong);
    card.append(imageBlock,cardBody);
    return card;
}
