export function timestampToDate(timestamp) {

  const {seconds, nanoseconds} = timestamp;
  return new Date(seconds * 1000 + nanoseconds / 1000000);

} 