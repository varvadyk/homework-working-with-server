const BaseUrl = "https://swapi.co/api";
const home = document.querySelector('.btn_home')
const box = document.querySelector(".personage");
const formWrap = document.querySelector(".form__wrapper");
const formSearch = document.querySelector(".search__film");
const container = document.querySelector(".planets");
let page = 1;
let nextPages = 1;
let prevPages = 1;
const images = {
	'https://swapi.co/api/people/1/': './images/luke.webp',
	'https://swapi.co/api/people/2/': './images/c-3po.webp',
	'https://swapi.co/api/people/3/': './images/R2-D2.webp',
	'https://swapi.co/api/people/4/': './images/dartvader.webp',
	'https://swapi.co/api/people/5/': './images/Leia-Organa.webp',
	'https://swapi.co/api/people/6/': './images/OwenLars.webp',
	'https://swapi.co/api/people/7/': './images/BeruCard.webp',
	'https://swapi.co/api/people/8/': './images/R5d4.webp',
	'https://swapi.co/api/people/9/': './images/BiggsHS.webp',
	'https://swapi.co/api/people/10/': './images/Obi-Wan-Kenobi.webp',
	'https://swapi.co/api/people/11/': './images/Tarkin.webp',
	'https://swapi.co/api/people/12/': './images/Greedo.webp',
	'https://swapi.co/api/people/13/': './images/chewbaca.webp',
	'https://swapi.co/api/people/14/': './images/Han-Solo.webp',
	'https://swapi.co/api/people/15/': './images/Porkins.webp',
	'https://swapi.co/api/people/16/': './images/Jabba.webp',
	'https://swapi.co/api/people/17/': './images/Porkins.webp',
	'https://swapi.co/api/people/18/': './images/Raymus.webp',
};
home.addEventListener("click", function () {
	box.classList.add('none')
	container.classList.add('none')
	planetsPrev.classList.add('none')
	planetNext.classList.add('none')
})

function getImage(url) {
	if (images[url] == undefined) {
		return './images/starwarsicon.png';
	} else {
		return images[url];
	}
};


function getInfoPersonage(film) {
	const url = `${BaseUrl}/films/${film}`;

	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const userFetch = data.characters.map((url) =>
				fetch(url).then((res) => res.json())
			);
			Promise.all(userFetch).then((filmsData) => {

				box.innerHTML = "";
				filmsData.forEach((character) => {
					let filmsData = document.createElement("div");
					filmsData.classList.add("character");
					filmsData.innerHTML = `
		
					<div class="imagesContainer">
					<img src="${getImage(character.url)}" class="image"/>
				  </div>
					<div class="character-item">
					  
					  <h2 class="name">${character.name}</h2>
					  <p class="birth-year">Birth year: ${character.birth_year}</p>
					  `;
					box.append(filmsData);

				});
			});
		})
		.catch((eror) => {
			console.log("eror", eror);
		});
}



function renderPlanets(page) {
	fetch(`${BaseUrl}/planets/?page=${page}`)
		.then((response) => {
			return response.json();
		})
		.
	then((data) => {

		container.innerHTML = "";
		data.results.map((planet) => {
			let planetsDiv = document.createElement("div");
			planetsDiv.classList.add("planets_data");
			planetsDiv.innerHTML = `
               <p class="planets_name">Name:${planet.name}</p>
            <p class="planets_diameter">Diameter:${planet.diameter}</p>
            <p class="planets_climate">Climate:${planet.climate}</p>
            `;
			container.appendChild(planetsDiv);
		});
		if (data.next !== null) {
			planetNext.classList.remove("none");
		} else {
			planetNext.classList.add("none");
		}
		if (data.previous !== null) {
			planetsPrev.classList.remove("none");
		} else {
			planetsPrev.classList.add("none");
		}
	}).catch((eror) => {
		console.log("eror", eror);
	});
}
const button_planets = document
	.querySelector(".btn_planets")
	.addEventListener("click", () => {
		formWrap.classList.add("none");

		return renderPlanets(page);
	});
const planetsPrev = document.querySelector(".btn_prev");
const planetNext = document.querySelector(".btn_next");

planetNext.addEventListener("click", () => {
	if (nextPages) {
		page++;
		renderPlanets(page);
	}
});
planetsPrev.addEventListener("click", () => {
	if (prevPages) {
		page--;
		renderPlanets(page);
	}
});

const getPersonage = document.querySelector(".btn_personage");
const inputPersonage = document.querySelector(".input_personage");
getPersonage.addEventListener("click", () => {
	formWrap.classList.remove("none");

});
formSearch.addEventListener("submit", function (event) {
	event.preventDefault();
	let film = formSearch.querySelector("input").value;
	getInfoPersonage(film);
	this.classList.remove("none");
	formWrap.classList.add("none");
});
