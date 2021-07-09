const root = document.querySelector(":root"),
  body = document.querySelector("body"),
  home = document.getElementById("home"),
  main = document.getElementById("main"),
  theme = document.getElementById("theme"),
  searchBar = document.getElementById("search-bar"),
  countryName = document.getElementsByClassName("country-name"),
  moon = document.getElementById("moon"),
  menu = document.getElementById("menu"),
  searchIcon = document.getElementById("search-icon"),
  search = document.getElementById("search"),
  filter = document.getElementById("filter"),
  countryContainer = document.getElementsByClassName("country"),
  options = document.querySelector(".options"),
  regions = document.getElementsByClassName("region"),
  countryPage = document.getElementById("country-page"),
  backBtn = document.getElementById("back-btn"),
  arrow = document.getElementById("arrow");

const bigFlag = document.getElementById("big-flag"),
  cn = document.getElementById("cn"),
  col1Span = document.getElementsByClassName("col-1-span"),
  col2Span = document.getElementsByClassName("col-2-span"),
  borderCountries = document.getElementById("border-countries");

let countries = [];

fetch("https://restcountries.eu/rest/v2/all")
  .then((res) => res.json())
  .then((data) => {
    countries = data;
    countries.forEach((country) => {
      main.innerHTML += `<div class="country"><div class="flag-container"><img class="flag" src=${country.flag}></div><div class="country-details"><h2 class="country-name">${country.name}</h2><span><strong>Population: </strong>${country.population}</span><br><span><strong>Region: </strong>${country.region}</span><br><span><strong>Capital: </strong>${country.capital}</span></div></div>`;
    });
    for (let i = 0; i < countryContainer.length; i++) {
      const item = countryContainer[i];
      let currencyString = "";
      countries[i].currencies.forEach((currency) => {
        currencyString += currency.name + " ";
      });
      let languageString = "";
      countries[i].languages.forEach((language) => {
        languageString += language.name + " ";
      });
      let borderCountriesString = [];
      countries[i].borders.forEach((border) => {
        borderCountriesString.push(
          countries.find((item) => item.alpha3Code === border).name
        );
      });
      item.addEventListener("click", displayCountry);
      function displayCountry() {
        countryPage.style.transform = "translateX(0)";
        body.style.overflowY = "hidden";
      
        bigFlag.src = countries[i].flag;
        cn.innerText = countries[i].name;
        col1Span[0].innerHTML = `<strong>Native Name: </strong>${countries[i].nativeName}`;
        col1Span[1].innerHTML = `<strong>Population: </strong>${countries[i].population}`;
        col1Span[2].innerHTML = `<strong>Region: </strong>${countries[i].region}`;
        col1Span[3].innerHTML = `<strong>Sub Region: </strong>${countries[i].subregion}`;
        col1Span[4].innerHTML = `<strong>Capital: </strong>${countries[i].capital}`;
      
        col2Span[0].innerHTML = `<strong>Top Level Domain: </strong>${countries[i].topLevelDomain}`;
        col2Span[1].innerHTML = `<strong>Currencies: </strong>${currencyString}`;
        col2Span[2].innerHTML = `<strong>Languages: </strong>${languageString}`;
      
        let border = "";
        borderCountriesString
          .forEach((item) => (border += `<span class="border">${item}</span>`));
        borderCountries.innerHTML = `<strong style="min-width: 15ch">Border Countries: </strong><div>${border}</div>`;
      }
    }


    search.addEventListener("input", () => {
      countries.forEach((country, j) => {
        if (!country.name.toLowerCase().includes(search.value.toLowerCase())) {
          countryContainer[j].style.display = "none";
        } else {
          countryContainer[j].style.display = "unset";
        }
      });
    });
    for (let i = 0; i < regions.length; i++) {
      const reg = regions[i];
      reg.addEventListener("click", () => {
        countries.forEach((country, j) => {
          if (reg.getAttribute("data-value").toLowerCase() === "all") {
            countries.forEach((country, j) => {
              countryContainer[j].style.display = "unset";
            });
          } else if (
            country.region.toLowerCase() !==
            reg.getAttribute("data-value").toLowerCase()
          ) {
            countryContainer[j].style.display = "none";
          } else {
            countryContainer[j].style.display = "unset";
          }
        });
      });
    }
  });

let mode = localStorage.getItem("mode");

theme.addEventListener("click", () => {
  if (mode === "dark") {
    localStorage.setItem("mode", "light");
  } else {
    localStorage.setItem("mode", "dark");
  }
  mode = localStorage.getItem("mode");
  changeTheme();
});

function changeTheme() {
  if (mode === "dark") {
    root.style.setProperty("--bg", "#202c37");
    root.style.setProperty("--text", "#ffffff");
    root.style.setProperty("--lbg", "#2b3945");
    moon.src = "icons/moon-regular.svg";
    searchIcon.src = "icons/search-regular.svg";
    arrow.src = "icons/arrow-left-regular.svg";
  } else {
    root.style.setProperty("--bg", "#fafafa");
    root.style.setProperty("--text", "#111517");
    root.style.setProperty("--lbg", "#ffffff");
    moon.src = "icons/moon-solid.svg";
    searchIcon.src = "icons/search-solid.svg";
    arrow.src = "icons/arrow-left-solid.svg";
  }
}

filter.addEventListener("click", () => {
  options.classList.toggle("options-opened");
});

backBtn.addEventListener("click", () => {
  body.style.overflowY = "scroll";
  countryPage.style.transform = "translateX(100%)";
});

changeTheme();

document.addEventListener(
  "mousedown",
  (e) => {
    if (e.detail > 1) {
      e.preventDefault();
    }
  },
  false
);

theme.addEventListener(
  "mousedown",
  (e) => {
    e.preventDefault();
  },
  false
);

filter.addEventListener(
  "mousedown",
  (e) => {
    e.preventDefault();
  },
  false
);
