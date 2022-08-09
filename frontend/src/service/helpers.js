export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  // console.log(payload)
  // console.log(JSON.parse(JSON.stringify(payload)))
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }
  console.log('result: ' , result)
  return result;
}

// export const applyDrag = (tasks, dragResult) => {
//   //        var currFilter = this.$store.getters.filterBy?this.$store.getters.filterBy:'';
//   // if(!(!currFilter || currFilter.title !== '' || currFilter.user !== '')) return tasks
//   // console.log('tasks', tasks);
//   const { removedIndex, addedIndex, payload } = dragResult;
//   if (removedIndex === null && addedIndex === null) return tasks;
//   let itemToAdd = payload;
//   if (removedIndex !== null) {
//     itemToAdd = tasks.splice(removedIndex, 1)[0];
//   }
//   if (addedIndex !== null) {
//     tasks.splice(addedIndex, 0, itemToAdd);
//   }
//   return tasks;
// }