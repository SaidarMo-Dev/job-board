export function getDaysSincePosted(datePosted: Date) {
  const dateP = new Date(datePosted);
  const currentDate = new Date();

  const deff = currentDate.getTime() - dateP.getTime();

  console.log("Dates :", dateP, currentDate);
  
  return Math.floor(deff / (1000 * 60 * 60 * 24));
}
