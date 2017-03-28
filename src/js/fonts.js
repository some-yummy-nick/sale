var FontFaceObserver = require('fontfaceobserver');

export default function fonts() {
  var font = new FontFaceObserver('Oswald');

  font.load().then(function () {
    console.log('My Family has loaded');
    document.documentElement.className += " fontOneLoad";
  });
}



