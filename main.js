let ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const NEWS_CONTENT = 'https://api.hnpwa.com/v0/item/@id.json';
const container = document.getElementById('root');
const store = {
  currentPage: 1,
};

function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  let newsList = [];

  let template = `
    <h1> HK news !!@ </h1>
    <ul>
      {{__news_feed__}}
    </ul>

    <div>
      <a href="#/page/{{__prev_page__}}">이전 페이지</a>
      <a href="#/page/{{__next_page__}}">다음 페이지</a>
    </div>
  `;

  for (i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
      <li>
        <a href="#/show/${newsFeed[i].id}">
          ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
      </li>
    `);
  };

  template = template.replace('{{__news_feed__}}', newsList.join(''));
  template = template.replace('{{__prev_page__}}', (store.currentPage > 1 ? store.currentPage - 1 : 1));
  template = template.replace('{{__next_page__}}', (store.currentPage < 3 ? store.currentPage + 1 : 3));

  container.innerHTML = template;
}

function newsDetail() {
  const id = location.hash.substr(7);
  const newsContent = getData(NEWS_CONTENT.replace('@id', id));

  let template = `
    <h1>{{__content_title__}}</h1>
    <div>${newsContent.content}</div>

    <a href="#/page/{{__current_page__}}">돌아가기</a>

    <div>
      {{__comments__}}
    </div>
  `;

  function makeComment(comments) {
    const commentString = [];

    for (let i = 0; i < comments.length; i++) {
      commentString.push(`
        <div>---------------------------------------------------------</div>
            <div${comments[i].content}</div>
            <div>user : ${comments[i].user} / ${comments[i].time_ago}</div>
        </div>
      `);
    }

    return commentString.join('');
  }

  template = template.replace('{{__content_title__}}', newsContent.title);
  template = template.replace('{{__current_page__}}', store.currentPage);
  template = template.replace('{{__comments__}}', makeComment(newsContent.comments));

  container.innerHTML = template;
}

function router() {
  const routePath = location.hash;

  if (routePath === '') {
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener('hashchange', router);

router();