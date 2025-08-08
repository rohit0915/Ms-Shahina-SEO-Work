/** @format */

export const Mail = (mail) => {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${mail}`;
  window.location.href = gmailUrl;
};

/** @format */

export const Call = (number) => {
  window.location.href = `tel:${number}`;
};
