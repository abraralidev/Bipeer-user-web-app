import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSession } from "next-auth/react";
import { useAxios } from "@/hooks/useAxios";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";

const montserrat = Montserrat({
  subsets: ["cyrillic"],
});

type Anchor = "right";

export default function NavbarMenu() {
  const { status } = useSession();
  const categories = useAxios("CATEGORIES", true);
  const [state, setState] = React.useState({
    right: false,
  });

  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    console.log("Category clicked:", categoryId);
    router.push({
      pathname: "/products/product-filter",
      query: {
        category: categoryId,
      },
    });
  };

  const handleSubCategoryClick = (subcategoryId: string) => {
    console.log("Subcategory clicked:", subcategoryId);
  };

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
      p={"20px"}
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {categories?.data?.result?.map((category) => (
          <React.Fragment key={category.id}>
            {category.SubCategory && category.SubCategory.length > 0 ? (
              <Accordion
                sx={{
                  boxShadow: "none",
                  "&:before": { display: "none" },
                  "& .MuiAccordionSummary-root": {
                    minHeight: 0,
                    padding: 0,
                  },
                  "& .MuiAccordionSummary-content": {
                    margin: 0,
                  },
                  "& .MuiAccordionDetails-root": {
                    padding: 0,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${category.id}-content`}
                  id={`panel-${category.id}-header`}
                >
                  <ListItemText
                    onClick={() => handleCategoryClick(category.id)}
                    primary={category.name}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <List component="div" disablePadding>
                    {category.SubCategory.map((subcategory) => (
                      <ListItem
                        className="cursor-pointer"
                        key={subcategory.id}
                        sx={{ pl: 4 }}
                        disablePadding
                        onClick={() => handleSubCategoryClick(subcategory.id)}
                      >
                        <ListItemText secondary={subcategory.name} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ) : (
              <ListItem
                className="cursor-pointer"
                disablePadding
                onClick={() => handleCategoryClick(category.id)}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            )}
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
      >
        <GiHamburgerMenu fontSize={"35px"} />
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
