
async function search(event: Event){
  event.preventDefault();
  const add = document.getElementById("address")! as HTMLInputElement;
  const city=add.value;
  let cit=city.split(' ')
  const geocoapi='a4da2e8ba70ee7066901c31049b19366';
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(cit[0])}&limit=1&appid=${geocoapi}`
  ).then((response) => {
    if (!response.ok || response==undefined) {
      alert("No cordinates found.");
      throw new Error("No cordinates found.");
      }
      return response.json();
    }).then((data) => {
      if(data.length==0){
        alert("No city found.");
        throw new Error("No city found.");
      }
      else{
        displayWeather(data)
      }
    });


    const displayWeather = (dat:any)=>{
      console.log(dat[0])
      const latitude = dat[0].lat;
      const longitude = dat[0].lon;
      const cord = {
        lat: latitude,
        lon: longitude,
      };
      console.log(cord);
      searchAddressHandler(cord)
    }
}

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
declare var ol: any;

function searchAddressHandler(cord:any) {

  const coordinates =cord

  document.getElementById("map")!.innerHTML = "";
  new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([coordinates.lon, coordinates.lat]),
      zoom: 16,
    }),
  });
}

form.addEventListener("submit", search);
