export const htmlToText = (text) => {
  let temp = document.createElement("div");
  temp.innerHTML = text;
  return temp.textContent || temp.innerText || "";
};

export const getContentSnippet = (content) => {
  if (content) {
    // we are getting 90 characters snip length
    if (content.length > 90) {
      return htmlToText(content.slice(0, 90).trim() + "...");
    } else {
      return htmlToText(content);
    }
  }
};

export const formatDate = (date) => {
  if (date) {
    const splitted = date.split(" ");
    return `${splitted[2]} ${splitted[1]}`;
  }
};

//  get and format updated date
export const getFormattedDate = (date) => {
  const theDate = new Date(date);
  return (
    "Last edited on " +
    theDate.toLocaleDateString("en-CA", {
      dateStyle: "medium",
    })
  );
};

export const isEmpty = (obj) => {
  // return true if empty, return false if obj contains things
  if (!obj) return;
  for (let item in obj) {
    // if (Array.isArray(item) && item.length === 0) continue;
    return false;
  }
  return true;
};

export const getPageCount = (obj) => {
  let numPages = Object.values(obj).length;
  // get proper ending based on length
  if (numPages === 1) return `${numPages} page`;
  else return `${numPages} pages`;
};

// deprecated in this app but useful to remember for future when using useLocation()
const returnProperLocation = (nbId, pId) => {
  return {
    pathname: `/${nbId}`,
    state: { pageId: pId },
  };
};

//  get and format long date
export const getToday = () => {
  const today = new Date();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    weekdays[today.getDay()] +
    ", " +
    today.toLocaleDateString("en-CA", {
      dateStyle: "long",
    })
  );
};
