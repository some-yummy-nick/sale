export default function preloader() {
  var doc = document,
    images = doc.images,
    images_total_count = images.length,
    images_loaded_count = 0,
    preloader = doc.getElementById('preloader'),
    percentage = doc.getElementById("percentage");


  for (var i = 0; i < images_total_count; i++) {
    var images_clone = new Image();
    images_clone.onload = image_loaded;
    images_clone.onerror = image_loaded;
    images_clone.src = images[i].src;
  }

  function image_loaded() {
    images_loaded_count++;
    percentage.innerHTML = (( (100 / images_total_count) * images_loaded_count) << 0) + '%';
    if (images_loaded_count >= images_total_count) {
      setTimeout(function () {
        if (!preloader.classList.contains("preloader--done")) {
          preloader.classList.add("preloader--done")
        }
      }, 1000);
    }
  }
}
