import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import { KeyboardEvent, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import toggleMenuDrawer from "../../helpers/toggleMenuDrawer";

export default function SwipeableTemporaryDrawer() {
  const { showDrawer } = useAppSelector((state: RootState) => state.header);
  const dispatch = useAppDispatch();

  const toggleDrawer = (event: KeyboardEvent | MouseEvent) => {
    toggleMenuDrawer({ event, dispatch });
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Box>
        <SwipeableDrawer
          anchor="left"
          open={showDrawer}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          {list()}
        </SwipeableDrawer>
      </Box>
    </div>
  );
}
