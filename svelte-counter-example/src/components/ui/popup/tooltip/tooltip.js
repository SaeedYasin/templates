import TooltipBody from "./TooltipBody.svelte";

export default function tooltip(element) {
  let title;
  let tooltipBody;

  const mouseOver = (event) => {
    // To prevent showing the default browser tooltip
    // remove the `title` attribute
    title = element.getAttribute("title");
    element.removeAttribute("title");

    tooltipBody = new TooltipBody({
      props: {
        title: title,
        x: event.pageX,
        y: event.pageY,
      },
      target: document.body,
    });
  };

  const mouseMove = (event) => {
    tooltipBody.$set({
      x: event.pageX,
      y: event.pageY,
    });
  };

  const mouseLeave = () => {
    tooltipBody.$destroy();
    // Restore the `title` attribute
    element.setAttribute("title", title);
  };

  element.addEventListener("mouseover", mouseOver);
  element.addEventListener("mouseleave", mouseLeave);
  element.addEventListener("mousemove", mouseMove);

  return {
    destroy() {
      element.removeEventListener("mouseover", mouseOver);
      element.removeEventListener("mouseleave", mouseLeave);
      element.removeEventListener("mousemove", mouseMove);
    },
  };
}
