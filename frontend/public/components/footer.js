import setStyle from "../utilities/setStyle.js";

function footer() {
  const create = (tagName) => {
    return document.createElement(`${tagName}`);
  };
  const footerElement = create("footer");
  const copyRight = create("p");
  // Values
  copyRight.innerHTML = `&copy; ${new Date().getFullYear()} Adam Elmi`;
  // Append
  footerElement.append(copyRight);
  // Styles
  setStyle(
    footerElement,
    false,
    `
        width: 100%;
        min-height: 50px;
        background-color: #112;
        color: #fff;
        display: flex;
        align-items: center;
        padding: 0 2rem;
        `
  );
  return footerElement;
}
export default footer;
