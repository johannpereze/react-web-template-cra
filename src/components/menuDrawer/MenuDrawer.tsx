import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import { KeyboardEvent, MouseEvent, useState } from "react";

export default function SwipeableTemporaryDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => (event: KeyboardEvent | MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as KeyboardEvent).key === "Tab" ||
        (event as KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setShowDrawer(!showDrawer);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
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
        <Button onClick={toggleDrawer()}>Left</Button>
        <SwipeableDrawer
          anchor="left"
          open={showDrawer}
          onClose={toggleDrawer()}
          onOpen={toggleDrawer()}
        >
          {list()}
        </SwipeableDrawer>
      </Box>
    </div>
  );
}
