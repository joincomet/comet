export const getMenuPosition = (rect, [x, y]) => {
  const menuStyles = {
    top: y,
    left: x
  };

  const { innerWidth, innerHeight } = window;

  if (y + rect.height > innerHeight) {
    menuStyles.top -= rect.height;
  }

  if (x + rect.width > innerWidth) {
    menuStyles.left -= rect.width;
  }

  if (menuStyles.top < 0) {
    menuStyles.top =
      rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
  }

  if (menuStyles.left < 0) {
    menuStyles.left =
      rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
  }

  return menuStyles;
};

export const getRTLMenuPosition = (rect, [x, y]) => {
  const menuStyles = {
    top: y,
    left: x
  };

  const { innerWidth, innerHeight } = window;

  // Try to position the menu on the left side of the cursor
  menuStyles.left = x - rect.width;

  if (y + rect.height > innerHeight) {
    menuStyles.top -= rect.height;
  }

  if (menuStyles.left < 0) {
    menuStyles.left += rect.width;
  }

  if (menuStyles.top < 0) {
    menuStyles.top =
      rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
  }

  if (menuStyles.left + rect.width > innerWidth) {
    menuStyles.left =
      rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
  }

  return menuStyles;
};

export const getCoords = (event, config) =>
  ["X", "Y"].map(
    axis =>
      (event[`client${axis}`] ||
        (event.touches && event.touches[0][`page${axis}`])) -
      config[`pos${axis}`]
  );
