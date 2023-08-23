export const isMouseOverBenefitsWrapper = (event: MouseEvent) => {
  const benefitsWrapper = document.querySelector(".benefits-wrapper")!;
  const rect = benefitsWrapper.getBoundingClientRect();
  return (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  );
};
