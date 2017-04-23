
export default function count() {
  $('#counter').countdown({
    timestamp: (new Date()).getTime() + 27 * 15 * 44 * 60 * 1000
  });
}
