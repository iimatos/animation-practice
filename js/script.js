/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */

// first animation

const carouselWrapper = document.querySelector('.carousel__wrapper');
const carouselTrack = document.querySelector('.carousel__track');
const carouselImages = document.querySelector('.carousel__track__images');

const overflowWidth = carouselTrack.scrollWidth - carouselTrack.clientWidth;

carouselWrapper.style.height = `${
  overflowWidth + carouselWrapper.clientHeight
}px`;

function handleScrollCarousel() {
  const transform = carouselWrapper.getBoundingClientRect().y;

  if (transform <= 0 && transform >= -overflowWidth) {
    carouselImages.style.transform = `translate(${transform}px)`;
  }
}

function addEventsCarousel(e) {
  if (e[0].isIntersecting) {
    window.addEventListener('scroll', handleScrollCarousel);
  } else {
    window.removeEventListener('scroll', handleScrollCarousel);
  }
}

// observer

const observer = new IntersectionObserver(addEventsCarousel, {
  root: null,
  rootMargin: '0px',
  threshold: 0.2,
});

observer.observe(carouselWrapper);

// second animation

function debounce(fn, delay) {
  let timer;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}

function throttle(fn, delay) {
  let timer;
  return () => {
    if (timer) return;
    timer = setTimeout(() => {
      fn();
      timer = false;
    }, delay);
  };
}

const message = document.querySelector('.message__wrapper');
const messageWrapper = document.querySelector('.block__two');
const onePercent = messageWrapper.offsetHeight / 100;
const value = 0;
let lastPercent = 0;
let o = 0;

function getDistanceBottom() {
  return messageWrapper.getBoundingClientRect().y + messageWrapper.offsetHeight;
}

function getPercentage() {
  return Math.floor(
    ((messageWrapper.offsetHeight - getDistanceBottom()) /
      messageWrapper.offsetHeight) *
      100
  );
}

// WORKING

function opacity(range, direction) {
  // const height = messageWrapper.offsetHeight * range;
  // const percent = height / 100;

  if (direction === 'up' && o > 0) {
    const res = o - (1 / range) * 2.5;
    const a = res < 0 ? 0 : res;
    o = a;
  }
  if (direction === 'down' && o <= 1) {
    const res = o + (1 / range) * 2.5;
    const a = res > 1 ? 1 : res;
    o = a;
  }

  return o.toFixed(1);
}

function handleScroll() {
  if (getPercentage() > -20 && getPercentage() < 10) {
    if (getPercentage() - lastPercent < 0) {
      message.style.opacity = opacity(30, 'up');
    } else if (getPercentage() - lastPercent > 0) {
      message.style.opacity = opacity(30, 'down');
    }
    lastPercent = getPercentage();
  }

  if (getPercentage() > 20) {
    message.classList.add('reveal');
  } else if (getPercentage() < 20) {
    message.classList.remove('reveal');
  }
}

const onScroll = throttle(handleScroll, 0);

window.addEventListener('scroll', onScroll);

// ANOTHER TRY VERSION

// function changeOpacity() {
//   const height = messageWrapper.offsetHeight * 0.3;
//   const proportion = height / 100;
//   return o;
// }

// function handleScroll() {
//   distanceTop = messageWrapper.getBoundingClientRect().y;
//   if (
//     distanceTop > -messageWrapper.offsetHeight * 0.1 &&
//     distanceTop < messageWrapper.offsetHeight * 0.2
//   ) {
//     messageWrapper.style.opacity = changeOpacity();
//   }
// }
