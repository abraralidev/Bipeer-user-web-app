import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton, Typography } from "@mui/material";
import { FaHamburger } from "react-icons/fa";
import { useSession } from "next-auth/react";
import NavLinks from "./NavLinks";
import { GiHamburgerMenu } from "react-icons/gi";
import CategoriesField from "./CategoriesField";
import { useAxios } from "@/hooks/useAxios";
import { Category } from "@/api/Category";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["cyrillic"],
});
type Anchor = "right";

export default function NavbarMenu({}) {
  const { status } = useSession();
  const categories = useAxios("CATEGORIES", true);
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
<List>
  <Typography pl={'20px'} pb={'5px'}>Categories</Typography>
  <Divider />
  {categories.data?.result?.map((category: Category) => (
    <React.Fragment key={category.id}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={category.name} />
          {/* <NavLinks redirectPath="/" title={category.name} /> */}
        </ListItemButton>
      </ListItem>
      {category.SubCategory.length > 0 && category.SubCategory.map((subCategory) => (
        <ListItem key={subCategory.id} disablePadding sx={{ pl: 4 }}>
          <ListItemButton>
            <ListItemText secondary={subCategory.name} />
            {/* <NavLinks redirectPath="/" title={subCategory.name} /> */}
          </ListItemButton>
        </ListItem>
      ))}
    </React.Fragment>
  ))}
</List>

      <Divider />
    </Box>
  );

  return (
    <React.Fragment>
      <IconButton
        className="lg:hidden block"
        onClick={toggleDrawer("right", true)}
        // size="large"
        
      >
        <GiHamburgerMenu fontSize={'35px'} />
      </IconButton>
      <Drawer
        className={montserrat.className}
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </React.Fragment>
  );
}
