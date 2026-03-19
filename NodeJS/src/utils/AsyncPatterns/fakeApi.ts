export const fakeAPi = new Promise((resolve) => {
  setTimeout(() => {
    resolve("This is response from FakeAPI.");
  }, 2000);
});
