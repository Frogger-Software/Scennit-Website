// let photoCount = document.getElementById('photo-count');

// function makeCard(cardTitle, cardUrl) {
//   let oldHTML = document.getElementById('grid-container').innerHTML;
//   let grid = document.getElementById('grid-container');
//   photoCount.innerText++;
//   grid.innerHTML = oldHTML + `<div class="flex-container grid-item" onclick="fade(this)">
//     <div class="flex-title" id="title${photoCount.innerText}">${cardTitle}</div>
//     <div class="flex-picture" id="picture${photoCount.innerText}" ><img src=${cardUrl}></div>
//     </div>`
// }


// fetch('https://jsonplaceholder.typicode.com/albums/2/photos')
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//     for (var k in data) {
//       let cardTitle = data[k].title;
//       let cardUrl = data[k].thumbnailUrl;
//       makeCard(cardTitle, cardUrl);
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// function fade(e) {
//   e.style.opacity = 1;
//   (function fade() { (e.style.opacity -= .1) < 0 ? e.remove() : setTimeout(fade, 90) })();
//   //photoCount.innerText--;
//   photoCount.innerHTML = document.getElementById('grid-container').childElementCount - 1;
// }