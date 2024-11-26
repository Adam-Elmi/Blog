import header from "./header.js";
import body from "./body.js";
import footer from "./footer.js";

console.log("Layout");
const layout = () => {
  const structure = document.createElement("div");
  structure.append(header(), body(), footer());
  return structure;
};

export default layout;
