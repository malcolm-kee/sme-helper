import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import Card, { CardContent } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';

const decorate = withStyles(theme => {
  const container = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: `${theme.spacing.unit}px`,
    justifyContent: 'space-around',
    gridAutoRows: '50vw'
  };

  const card = {
    display: 'flex',
    flexFlow: 'column'
  };

  const cardContent = {
    height: '100%',
    display: 'flex',
    flexFlow: 'column'
  };

  const noteContent = {
    height: 'auto',
    overflowY: 'scroll'
  };

  const addButton = {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  };

  return {
    container,
    card,
    cardContent,
    noteContent,
    addButton
  };
});

export const GalleryView = decorate(
  ({ notes, showNoteDetails, detailedTitle, detailedContent, onClickNote, classes }) => (
    <div className={classes.container}>
      {notes.map(note => (
        <Card onClick={() => onClickNote(note.id)} key={note.id} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography type="headline">{note.title}</Typography>
            <Typography className={classes.noteContent}>{note.content}</Typography>
          </CardContent>
        </Card>
      ))}
      <Button
        component={Link}
        color="primary"
        fab
        raised
        to="/note/add"
        className={classes.addButton}
      >
        <Icon>note_add</Icon>
      </Button>
      <Dialog open={showNoteDetails} fullScreen={true}>
        <DialogTitle>{detailedTitle}</DialogTitle>
        <DialogContent>{detailedContent}</DialogContent>
      </Dialog>
    </div>
  )
);
