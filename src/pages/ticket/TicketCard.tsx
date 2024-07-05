import { Ticket } from "@/api/ticket";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface ticketCardPorps {
  tickets: Ticket[];
}

const TicketCard = ({ tickets }: ticketCardPorps) => {
  return (
    <>
      {tickets?.length &&
        tickets.map((item) => (
          <Card
            variant="outlined"
            sx={{ width: 600, my: "20px" }}
            key={item.id}
          >
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography
                color="primary"
                sx={{ display: "block", marginBottom: 1 }}
              >
                {item.status}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </>
  );
};

export default TicketCard;
