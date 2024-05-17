document.addEventListener('DOMContentLoaded', () => {
  fetch('./travel.json')
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Ensure data is fetched correctly

      const searchButton = document.getElementById('searchButton');
      searchButton.addEventListener('click', () => {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const results = searchDestinations(data, searchInput);
        console.log(results);
        displayResults(results);
      });
    })
    .catch((error) => console.error('Error fetching data:', error));
});

function searchDestinations(data, keyword) {
  const results = {
    countries: [],
    temples: [],
    beaches: [],
  };

  // Search through countries and cities
  data.countries.forEach((country) => {
    if (country.name.toLowerCase().includes(keyword)) {
      results.countries.push(country);
    } else {
      country.cities.forEach((city) => {
        if (city.name.toLowerCase().includes(keyword)) {
          results.countries.push(country);
        }
      });
    }
  });

  // Search through temples
  data.temples.forEach((temple) => {
    if (temple.name.toLowerCase().includes(keyword)) {
      results.temples.push(temple);
    }
  });

  // Search through beaches
  data.beaches.forEach((beach) => {
    if (beach.name.toLowerCase().includes(keyword)) {
      results.beaches.push(beach);
    }
  });

  return results;
}

function displayResults(results) {
  const contentSection = document.getElementById('content');
  contentSection.innerHTML = ''; // Clear previous results

  if (results.countries.length > 0) {
    results.countries.forEach((country) => {
      const countryDiv = document.createElement('div');
      countryDiv.className = 'country';

      const countryTitle = document.createElement('h3');
      countryTitle.textContent = country.name;
      countryDiv.appendChild(countryTitle);

      country.cities.forEach((city) => {
        const cityDiv = document.createElement('div');
        cityDiv.className = 'city';

        const cityImage = document.createElement('img');
        cityImage.src = city.imageUrl;
        cityImage.alt = city.name;
        cityDiv.appendChild(cityImage);

        const cityName = document.createElement('h4');
        cityName.textContent = city.name;
        cityDiv.appendChild(cityName);

        const cityDescription = document.createElement('p');
        cityDescription.textContent = city.description;
        cityDiv.appendChild(cityDescription);

        countryDiv.appendChild(cityDiv);
      });

      contentSection.appendChild(countryDiv);
    });
  }

  if (results.temples.length > 0) {
    results.temples.forEach((temple) => {
      const templeDiv = document.createElement('div');
      templeDiv.className = 'temple';

      const templeImage = document.createElement('img');
      templeImage.src = temple.imageUrl;
      templeImage.alt = temple.name;
      templeDiv.appendChild(templeImage);

      const templeName = document.createElement('h4');
      templeName.textContent = temple.name;
      templeDiv.appendChild(templeName);

      const templeDescription = document.createElement('p');
      templeDescription.textContent = temple.description;
      templeDiv.appendChild(templeDescription);

      contentSection.appendChild(templeDiv);
    });
  }

  if (results.beaches.length > 0) {
    results.beaches.forEach((beach) => {
      const beachDiv = document.createElement('div');
      beachDiv.className = 'beach';

      const beachImage = document.createElement('img');
      beachImage.src = beach.imageUrl;
      beachImage.alt = beach.name;
      beachDiv.appendChild(beachImage);

      const beachName = document.createElement('h4');
      beachName.textContent = beach.name;
      beachDiv.appendChild(beachName);

      const beachDescription = document.createElement('p');
      beachDescription.textContent = beach.description;
      beachDiv.appendChild(beachDescription);

      contentSection.appendChild(beachDiv);
    });
  }

  if (results.countries.length === 0 && results.temples.length === 0 && results.beaches.length === 0) {
    const noResults = document.createElement('p');
    noResults.textContent = 'No results found.';
    contentSection.appendChild(noResults);
  }
}
