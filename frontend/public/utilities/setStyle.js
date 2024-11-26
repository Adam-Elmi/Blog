function setStyle(element, supportObj = true, styles) {
  try {
    if (element && Array.isArray(element) === false) {
      if (supportObj) {
        Object.assign(element.style, styles);
      } else {
        element.style.cssText += styles;
      }
    }
    if (element && Array.isArray(element)) {
      if (supportObj) {
        element.forEach((el) => Object.assign(el.style, styles));
      } else {
        element.forEach((el) => (el.style.cssText += styles));
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export default setStyle;
