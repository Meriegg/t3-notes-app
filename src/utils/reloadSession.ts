export default () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};
