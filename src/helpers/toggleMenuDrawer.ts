import { KeyboardEvent, MouseEvent } from "react";
import { toggleDrawerState } from "../components/header/headerSlice";

interface ToggleDrawerProps {
  event: KeyboardEvent | MouseEvent;
  dispatch: any;
}

const toggleMenuDrawer = ({ event, dispatch }: ToggleDrawerProps) => {
  if (
    event &&
    event.type === "keydown" &&
    ((event as KeyboardEvent).key === "Tab" ||
      (event as KeyboardEvent).key === "Shift")
  ) {
    return;
  }
  dispatch(toggleDrawerState());
};

export default toggleMenuDrawer;
