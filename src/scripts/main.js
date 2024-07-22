'use strict';

const slider = document.querySelector('.galary__slider--img-container');
const slide = document.querySelector('.galary__slider--photo');
const buttons = document.querySelector('.galary__slider--buttons');

let currentIndex = 0;
const sliderData = [];
let [slideWidth, translateValue, slidesOfScreen, gapValue, visibleButtons]
  = sliderData;

const getTranslate = (index, slidesCount) => {
  let translateXValue;

  if (slidesCount === 1 && index === 3) {
    translateXValue = index * (slideWidth + gapValue) - translateValue;
  } else if ((slidesCount === 2 && index >= 2)
    || (slidesCount === 3 && index >= 1)
  ) {
    translateXValue = 3 * (slideWidth + gapValue) - translateValue;
  } else {
    translateXValue = index * (slideWidth + gapValue);
  }

  slider.style.transform = `translateX(-${translateXValue}px)`;
};

const getSliderButtons = (slidesCount, buttonsCount) => {
  switch (slidesCount) {
    case 1:
      [...buttons.children].forEach(btn => (btn.style.display = 'block'));
      break;
    case 2:
      if (buttonsCount < 3) {
        buttons.lastElementChild.style.display = 'block';
      } else if (buttonsCount > 3) {
        buttons.lastElementChild.style.display = 'none';
      }
      break;
    case 3:
      if (buttonsCount !== 2) {
        [...buttons.children]
          .slice(-2).forEach(btn => (btn.style.display = 'none'));
      }
      break;
  }
};

const resize = () => {
  const buttonsCount = [...buttons.children].reduce((count, button) => {
    return window.getComputedStyle(button).display === 'block'
      ? count + 1
      : count;
  }, 0);

  if (slider && slide) {
    sliderData.splice(
      0,
      5,
      slide.clientWidth,
      slider.clientWidth - slide.clientWidth,
      Math.floor(slider.clientWidth / slide.clientWidth),
      parseInt(window.getComputedStyle(slider).gap),
      buttonsCount,
    );

    [slideWidth, translateValue, slidesOfScreen, gapValue, visibleButtons]
      = sliderData;
    getTranslate(currentIndex, slidesOfScreen);
    getSliderButtons(slidesOfScreen, visibleButtons);
  }
};

resize();

[...buttons.children].forEach((button, index) => {
  button.addEventListener('click', () => {
    slider.style.transition = 'transform .5s';
    currentIndex = index;
    getTranslate(index, slidesOfScreen);
  });
});

window.addEventListener('resize', resize);
