import React from "react";
import { Modal, Box, Typography, List, ListItem, Divider } from "@mui/material";
import "./styles.css";

function CharacterModal({ character, onClose }) {
  if (!character) return null;

  return (
    <Modal open={!!character} onClose={onClose}>
      <Box className="character-modal-box">
        <Typography variant="h4" gutterBottom className="character-modal-title">
          {character.name}
        </Typography>
        <Box
          component="img"
          src={character.imageUrl}
          alt={character.name}
          className="character-modal-image"
        />
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" className="character-modal-subtitle">
          TV Shows:
        </Typography>
        <List>
          {character.tvShows.length > 0 ? (
            character.tvShows.map((show) => (
              <ListItem key={show} className="character-modal-list-item">
                {show}
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" className="character-modal-no-data">
              No TV shows available.
            </Typography>
          )}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" className="character-modal-subtitle">
          Video Games:
        </Typography>
        <List>
          {character.videoGames.length > 0 ? (
            character.videoGames.map((game) => (
              <ListItem key={game} className="character-modal-list-item">
                {game}
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" className="character-modal-no-data">
              No video games available.
            </Typography>
          )}
        </List>
      </Box>
    </Modal>
  );
}

export default CharacterModal;
