const textCapitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const toMonthYear = (date) => {
  if(!date) return "";
  if (date === "Present") return date;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.toLocaleString("en-US", { month: "long" });
  return month + " " + year;
};

const isMobile = () => {
  return window.innerWidth < 768;
};

const timeAgo = (dateString) => {
  if(!dateString) return "";
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds <= 20) {
    return "just now";
  }

  const units = [
    { name: "yr", seconds: 31536000 },
    { name: "mon", seconds: 2592000 },
    { name: "wk", seconds: 604800 },
    { name: "day", seconds: 86400 },
    { name: "hr", seconds: 3600 },
    { name: "min", seconds: 60 },
    { name: "sec", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return interval === 1
        ? `1 ${unit.name} ago`
        : `${interval} ${unit.name}s ago`;
    }
  }

  return "just now";
};

const trimText = (text, length) => {
  if(!text) return "";
  return text.length > length ? text.slice(0, length)+ "..." : text;
};

export { textCapitalize, toMonthYear, isMobile, timeAgo,trimText };
