function loadNavigation() {
  const placeholder = document.getElementById('navbar');
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      placeholder.innerHTML = xhr.responseText;
    }
  };

  xhr.open('GET', 'navbar.html', true);
  xhr.send();
}

window.addEventListener('DOMContentLoaded', loadNavigation);
