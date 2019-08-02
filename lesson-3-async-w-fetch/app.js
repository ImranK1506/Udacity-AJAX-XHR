(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

      // Fetch API method to handle response and receive the json object from the NYT
      fetch(`https://api.nytimes.com/svc/news/v3/content/all/all.json?q=${searchedForText}&api-key=IL6WzlQkWXfUkp3AtrqvMzG0FRLXWW5e`)
        .then(response => response.json())
        .then(addArticles)
        .catch(e => requestError(e, ' service'));

      // Fetch API method to handle response and receive the json object
      fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        {
          headers: {
            Authorization: 'Client-ID 6412894fa9683b43370a770c31135621ab516ba348302caa0725d7ec8fd94a1b'
          }
        })
        .then(response => response.json())
        .then(addImage)
        .catch(e => requestError(e, ' service'));

        // function addImage(data) {
        //   console.log(data);
        //   debugger;
        // }

      // Error returned if service is unavailable
      const requestError = (e, part) => {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Error while requesting ${part}</p>`)
      }
    });

    function addImage (data) {
      let htmlContent = '';
      const firstImage = data.results[1];

      if(firstImage) {
      htmlContent =
        `<h1>Unsplash Images</h1>
          <figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>       
        </figure>`;
      } else {
        // If no images available to be returned
        htmlContent = '<div class="no-data">No images to be found</div>'
      }
      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

  function addArticles(data) {
    let htmlContent = '';
    const articles = data.results;

    if(articles) {
    htmlContent = '<h1>NYT Articles</h1>\n' +
      '<ul>' + articles.map(article =>
        `<li class="article">
            <h2><a href="${article.slug_name}">${article.section} ${article.subsection}</a></h2>
            <p>${article.byline}</p>
        </li>`).join('') +
      '</ul>';
    } else {
      //  If no article available to be returned
      htmlContent = '<div class="no-data">No articles to be found</div>'
    }
    responseContainer.insertAdjacentHTML('beforeend', htmlContent);
  }
})();


