import React from 'react';

import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import Card, { CardContent } from 'material-ui/Card';
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

  return {
    container,
    card,
    cardContent,
    noteContent
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
      <Dialog open={showNoteDetails} fullScreen={true}>
        <DialogTitle>{detailedTitle}</DialogTitle>
        <DialogContent>{detailedContent}</DialogContent>
      </Dialog>
    </div>
  )
);
