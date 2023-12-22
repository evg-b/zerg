export const secondsToTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

// Пример использования
// const timeString = secondsToTime(155);
// console.log(timeString); // Выведет "2:35"
