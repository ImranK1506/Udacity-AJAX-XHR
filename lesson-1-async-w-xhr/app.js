(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    const responseContainer = document.querySelector('#response-container');
    let searchedForText;

  form.addEventListener('submit', function (e) {
      e.preventDefault();
      responseContainer.innerHTML = '';
      searchedForText = searchField.value;

      // Unsplash API
      const unsplashRequest = new XMLHttpRequest();

      unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
      unsplashRequest.onload = addImage;
      unsplashRequest.setRequestHeader('Authorization', 'Client-ID 6412894fa9683b43370a770c31135621ab516ba348302caa0725d7ec8fd94a1b');
      unsplashRequest.send();

      // New York Times API
      const articleRequest = new XMLHttpRequest();
      articleRequest.onload = addArticles;
      // articleRequest.open('GET', `https://api.nytimes.com/svc/topstories/v2/science.json?q=${searchedForText}&api-key=IL6WzlQkWXfUkp3AtrqvMzG0FRLXWW5e`);
      articleRequest.open('GET', `https://api.nytimes.com/svc/news/v3/content/all/all.json?q=${searchedForText}&api-key=IL6WzlQkWXfUkp3AtrqvMzG0FRLXWW5e`);
      articleRequest.send();
    });

  function addImage () {
    let htmlContent = '';
    const data = JSON.parse(this.responseText);
    const firstImage = data.results[0];

    htmlContent =
        `<h1>Unsplash Images</h1>
          <figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>       
        </figure>`;
   responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
  }

  function addArticles() {
    let htmlContent = '';
    const data = JSON.parse(this.responseText);

    htmlContent =
    '<h1>NYT Articles</h1>\n' +
      '<ul>' + data.results.map(article =>
        `<li class="article">
            <h2><a href="${article.slug_name}">${article.section} ${article.subsection}</a></h2>
            <p>${article.byline}</p>
        </li>`).join('') +
    '</ul>';
    responseContainer.insertAdjacentHTML('beforeend', htmlContent);
  }

})();
