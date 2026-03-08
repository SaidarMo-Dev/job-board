export function getDaysSincePosted(datePosted: Date) {
  const dateP = new Date(datePosted);
  const currentDate = new Date();

  const deff = dateP.getTime() - currentDate.getTime();

  return Math.floor(deff / (1000 * 60 * 60 * 24));
}
