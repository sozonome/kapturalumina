export const shuffleSet = (array: any[], pick?: number) => {
  // Modern Fisher-Yates Shuffle Algorithm

  let res = [...array];
  // arr remain unchanged
  let range = res.length;

  for (let i = 0; --range >= 0; i++) {
    //Randomly pick a number from current iteration range
    const randomIndex = Math.floor(Math.random() * range);
    //Pick the selected roll index
    const temp = res[randomIndex];
    //Switch the selected index with the last element
    res[randomIndex] = res[range];
    res[range] = temp;
  }

  return res.slice(0, pick);
};
