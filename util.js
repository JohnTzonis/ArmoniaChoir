function smoothScroll(target, duration) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;

  const startPosition = window.pageYOffset;
  const targetPosition =
    targetElement.getBoundingClientRect().top + startPosition;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animateScroll(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsedTime = currentTime - startTime;
    const scrollPosition = easeInOut(
      elapsedTime,
      startPosition,
      distance,
      duration
    );
    window.scrollTo(0, scrollPosition);
    if (elapsedTime < duration) requestAnimationFrame(animateScroll);
  }

  function easeInOut(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animateScroll);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = this.getAttribute("href");
    const duration = 1500; // Adjust duration to control the speed of the scroll
    smoothScroll(target, duration);
  });
});



