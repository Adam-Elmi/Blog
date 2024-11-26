import setStyle from "../utilities/setStyle.js";
import limitLength from "../utilities/limitLength.js";

function body() {
  const create = (tagName) => {
    return document.createElement(`${tagName}`);
  };

  // Create Elements
  const main = create("main");
  const blog_container = create("div");
  const quote_Section = create("section");
  const quoteText = create("blockquote");
  const authorName = create("cite");

  // Append
  main.append(quote_Section, blog_container);
  quote_Section.append(quoteText, authorName);

  // Values
  quoteText.textContent = "Programming is the art of problem-solving.";
  authorName.textContent = "— Unknown";

  // Styles
  setStyle(
    quote_Section,
    false,
    `
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 15px;
      background-color: #FCDDFF;
      width: 100%;
      min-height: 150px;
      padding: 10px;
      border-bottom: 1.5px solid #000;
    `
  );
  setStyle(
    quoteText,
    false,
    `
      font-size: 1.2rem;
      font-weight: 600;
      text-align: center;
      line-height: 2;
    `
  );
  setStyle(
    main,
    false,
    `
      min-height: 100vh;
    `
  );

  authorName.style.color = "#A58EA7";

  async function sendId(id) {
    try {
      const response = await fetch("/send-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      console.log("Sent Id:", data);
    } catch (error) {
      console.error("Failed to send Id:", error);
    }
  }

  async function fetchData() {
    try {
      const response = await fetch("/blogs");
      const data = await response.json();
      console.log(data);

      for (const blog of data) {
        const container = create("div");
        const wrapper = create("div");
        const header = create("div");
        const icon = create("span");
        const title = create("h2");
        const content = create("div");
        const footer = create("div");
        const date = create("span");
        const words = create("span");

        // Assign
        container.setAttribute("data-id", blog._id);

        // Append
        container.append(wrapper);
        wrapper.append(header, content, footer);
        header.append(title, icon);
        footer.append(date, words);
        blog_container.append(container);

        icon.className = "fa-solid fa-book";
        title.textContent = limitLength(blog.title);
        content.textContent = limitLength(blog.subtitle);
        date.textContent = blog.date;
        words.innerHTML = `Words: <span style='color: #B99DBC; margin: 0px 5px'>${
          blog.text.split(" ").length
        }</span>`;

        wrapper.addEventListener("click", (event) => {
          const blogId = event.currentTarget.parentNode.getAttribute("data-id");
          window.location.href = `/blog/${blogId}`; // Redirect to /blog/:id
        });

        setStyle(
          blog_container,
          false,
          `display:flex; gap: 10px; justify-content: center; align-items: center; flex-wrap: wrap;`
        );
        setStyle(
          container,
          false,
          `padding: 10px; width: 100%; max-width: 400px`
        );
        setStyle(
          wrapper,
          false,
          `
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 400px;
          height: auto;
          box-shadow: 2px 2px 5px #eee;
          border: 2px solid #eee;
        `
        );
        setStyle(
          header,
          false,
          `
          width: 100%;
          min-height: 50px;
          background-color: #DDE2FF;
          display: flex;
          align-items: center;
          padding: 10px;
        `
        );
        setStyle(
          icon,
          false,
          `max-width: 50px; font-size: 1.5rem; color: #112; opacity: 0.8;`
        );
        setStyle(title, false, `flex: 1;`);
        setStyle(content, false, `flex:1; padding: 10px;`);
        setStyle(
          footer,
          false,
          `
          width: 100%;
          min-height: 50px;
          background-color: #fff;
          display: flex;
          align-items: center;
          padding: 10px;
          border-top: 2px solid #DDE2FF;
        `
        );
        setStyle(
          date,
          false,
          `min-width: 100px; border-right: 2px solid #DDE2FF; color: #B99DBC`
        );
        setStyle(words, false, `flex: 1; display: flex; justify-content: end`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Fetch data on page load
  window.onload = () => {
    fetchData();
  };

  return main;
}

export default body;
