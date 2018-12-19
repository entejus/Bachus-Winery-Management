const convertDatetimeForm = date => {
  let newDate = new Date(Number(date));
  let converted = newDate.toISOString();
  return converted.slice(0, -8);
};

export default convertDatetimeForm;
