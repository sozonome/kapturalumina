export default function shuffleSet(array: any[]) {
  // Modern Fisher-Yates Shuffle Algorithm

  const arr:any[] = [...array];
  // Using spread operator so the 'array' variable remain unchanged
  // Note : const arr = array is not the same as const arr = [...array]

  const result: any[] = []; //Result initialization

  let arraySize: number = arr.length; //Range
  let rollIndex: number = 0; //Roll
  let temp: any = null; 

  // To see each iterations, turn on the console.log lines

  while (--arraySize >= 0) {
    //Range update every iteration
    // console.log(arraySize, 'a');

    //Randomly pick a number from current iteration range
    rollIndex = Math.floor(Math.random() * (arraySize + 1));
    // console.log(rollIndex, 'b');
    
    //Pick the selected roll index
    temp = arr[rollIndex];
    // console.log(temp);
    
    //Last element replace the picked index
    if(rollIndex < arraySize){
      arr[rollIndex] = arr[arraySize];
      arr.pop();
    }
    // console.log(arr)
    
    // Put the picked index to the result array
    result.push(temp);
  }

  return result;
}
