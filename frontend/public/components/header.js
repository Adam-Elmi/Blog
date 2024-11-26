import setStyle from "../utilities/setStyle.js";

function header() {
  const create = (tagName) => {
    return document.createElement(`${tagName}`);
  };
  // Create elements
  const nav = create("nav");
  const github_container = create("div");
  const github_account = create("a");
  const github_icon = create("span");

  // Values
  github_account.href = "https://github.com/Adam-Elmi";
  github_account.textContent = "Adam Elmi";
  github_account.target = "_blank";
  github_icon.className = "fa-brands fa-github";

  // Append
  github_container.append(github_icon, github_account);
  nav.append(github_container);

  // Styles
  setStyle(nav, true, {
    width: "100%",
    minHeight: "50px",
    borderBottom: "1.5px solid #000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10px",
  });

  setStyle(
    github_container,
    false,
    `
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background-color: #122;
        color: #fff;
        border-radius: 5px;
      `
  );
  setStyle(
    github_account,
    false,
    `
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        margin: 0;
        padding: 0;
      `
  );
  // Hover
  github_account.addEventListener("mouseover", () => {
    setStyle(github_account, false, `color: #fcddff;`);
  });
  github_account.addEventListener("mouseout", () => {
    setStyle(github_account, false, `color: #fff;`);
  });
  setStyle(github_icon, false, `color: #fff; font-size: 1.2rem;`);

  return nav;
}

export default header;
