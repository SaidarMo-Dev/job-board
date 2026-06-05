export function getDaysSincePosted(datePosted: Date) {
  const dateP = new Date(datePosted);
  const currentDate = new Date();

  const deff = currentDate.getTime() - dateP.getTime();

  return Math.floor(deff / (1000 * 60 * 60 * 24));
}
