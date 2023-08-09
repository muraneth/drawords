export const containerID = "__mux-translator";
export const popupThumbID = "__mux-translator-inject-thumb";
export const popupCardID = "__mux-translator-inject-card";
function attachEventsToContainer($container: HTMLElement) {
  $container.addEventListener("mousedown", (event) => {
    event.stopPropagation();
  });
  $container.addEventListener("mouseup", (event) => {
    event.stopPropagation();
  });
  $container.addEventListener("touchstart", (event) => {
    event.stopPropagation();
  });
  $container.addEventListener("touchend", (event) => {
    event.stopPropagation();
  });
}

export async function getContainer(): Promise<HTMLElement> {
  let $container: HTMLElement | null = document.getElementById(containerID);
  if (!$container) {
    $container = document.createElement("div");
    $container.id = containerID;
    attachEventsToContainer($container);
    $container.style.zIndex = "9999";
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const $container_: HTMLElement | null =
          document.getElementById(containerID);
        if ($container_) {
          resolve($container_);
          return;
        }
        if (!$container) {
          reject(new Error("Failed to create container"));
          return;
        }
        const shadowRoot = $container.attachShadow({ mode: "open" });
        const $inner = document.createElement("div");
        shadowRoot.appendChild($inner);
        const $html = document.body.parentElement;
        if ($html) {
          $html.appendChild($container as HTMLElement);
        } else {
          document.appendChild($container as HTMLElement);
        }
        resolve($container);
      }, 100);
    });
  }
  return new Promise((resolve) => {
    resolve($container as HTMLElement);
  });
}

export async function queryInjectThumbElement(): Promise<HTMLDivElement | null> {
  const $container = await getContainer();
  return $container.shadowRoot?.querySelector(
    `#${popupThumbID}`
  ) as HTMLDivElement | null;
}

export async function queryInjectCardElement(): Promise<HTMLDivElement | null> {
  const $container = await getContainer();
  return $container.shadowRoot?.querySelector(
    `#${popupCardID}`
  ) as HTMLDivElement | null;
}
