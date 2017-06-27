export function getSomething(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 0) {
        resolve('something');
      } else {
        reject('ERROR');
      }
    }, 1000);
  });
}