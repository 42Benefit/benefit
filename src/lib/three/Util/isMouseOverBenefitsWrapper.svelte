<script context="module">
  //@ts-nocheck
  
  export const isMouseOverBenefitsWrapper = (event) => {
    const benefitsWrapper = document.querySelector(".benefits-wrapper");
    const rect = benefitsWrapper.getBoundingClientRect();
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  };
</script>
