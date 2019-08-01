/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

      // New York Times API
      // const articleRequest = new XMLHttpRequest();
      // articleRequest.onload = addArticles;
      // articleRequest.open('GET', `https://api.nytimes.com/svc/news/v3/content/all/all.json?q=${searchedForText}&api-key=IL6WzlQkWXfUkp3AtrqvMzG0FRLXWW5e`);
      // articleRequest.send();

      $.ajax({
        url: `https://api.nytimes.com/svc/news/v3/content/all/all.json?query=${searchedForText}&api-key=IL6WzlQkWXfUkp3AtrqvMzG0FRLXWW5e`
      }).done(addArticles);
    });

  function addArticles(data) {
    let htmlContent = '';
    const articles = data.results;
    htmlContent = '<h1>NYT Articles</h1>\n' +
      '<ul>' + articles.map(article =>
        `<li class="article">
            <h2><a href="${article.slug_name}">${article.section} ${article.subsection}</a></h2>
            <p>${article.byline}</p>
        </li>`).join('') +
      '</ul>';
    responseContainer.insertAdjacentHTML('beforeend', htmlContent);
  }

})();
