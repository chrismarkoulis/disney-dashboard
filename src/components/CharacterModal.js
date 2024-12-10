import React from "react";
import { Modal, Box, Typography, List, ListItem, Divider } from "@mui/material";

function CharacterModal({ character, onClose }) {
  if (!character) return null;

  return (
    <Modal open={!!character} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: "white",
          margin: "30px auto",
          maxWidth: "600px",
          maxHeight: "80vh",
          overflowY: "auto",
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", color: "#333" }}
        >
          {character.name}
        </Typography>
        <Box
          component="img"
          src={character.imageUrl}
          alt={character.name}
          sx={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "300px",
            margin: "10px auto",
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ color: "#1976d2", mb: 1 }}>
          TV Shows:
        </Typography>
        <List>
          {character.tvShows.length > 0 ? (
            character.tvShows.map((show) => (
              <ListItem key={show} sx={{ paddingLeft: 0 }}>
                {show}
              </ListItem>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "#757575" }}
            >
              No TV shows available.
            </Typography>
          )}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ color: "#1976d2", mb: 1 }}>
          Video Games:
        </Typography>
        <List>
          {character.videoGames.length > 0 ? (
            character.videoGames.map((game) => (
              <ListItem key={game} sx={{ paddingLeft: 0 }}>
                {game}
              </ListItem>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "#757575" }}
            >
              No video games available.
            </Typography>
          )}
        </List>
      </Box>
    </Modal>
  );
}

export default CharacterModal;
