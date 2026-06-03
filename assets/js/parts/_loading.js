// ローディングアニメーション
function loadedPage() {
  const loadingID = document.getElementById("js-loading");
  loadingID.classList.add("js-loaded");
}

document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("visited")) {
    //セッションにvisitedがない場合(つまり初回訪問時)
    //セッションストレージ visited
    sessionStorage.setItem("visited", "first");
    //loadedPageの関数を4秒したら消す
    setTimeout(loadedPage, 4000);
  } else {
    // 2回目以降のページ訪問
    setTimeout(loadedPage, 0);
  }
});
