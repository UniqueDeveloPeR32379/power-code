/*globals io*/
window.loading_screen = window.pleaseWait({
  logo: "https://fontmeme.com/permalink/190810/2be19dd8117b023c5fb8c73538a24af6.png",
  backgroundColor: '#000000',
  loadingHtml: "<p id='loading' class='loading-message'>Please wait...</p>"
});

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}