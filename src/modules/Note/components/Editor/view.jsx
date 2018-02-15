import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List';

import Menu, { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import './style.css';

// import { constants } from './constants';
// const { SUPPORTS_MEDIA_DEVICES } = constants;

import { StackedPage } from '../../../../components/StackedPage';
import { ContentEditable } from '../../../../components/ContentEditable';
import { reduce } from '../../../../utils/fp';

const decorate = withStyles(theme => {
  const root = {
    display: 'flex',
    flexFlow: 'column',
    height: '100%'
  };

  const content = {
    flex: 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  };

  const button = {
    margin: theme.spacing.unit
  };

  const title = {
    fontSize: theme.typography.title.fontSize,
    borderBottom: `1px solid ${theme.palette.grey['300']}`,
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  };

  const btmToolbar = {
    padding: 0,
    justifyContent: 'space-between'
  };

  const fileInput = {
    display: 'none'
  };

  const listItemText = {
    fontSize: theme.typography.subheading.fontSize,
    padding: `0 ${theme.spacing.unit * 2}px`
  };

  const fileList = {
    flex: 0
  };

  return {
    content,
    root,
    button,
    title,
    btmToolbar,
    fileInput,
    fileList,
    listItemText
  };
});

export const EditorView = decorate(
  ({
    menuAnchor,
    images,
    attachments,
    title,
    content,
    openMenu,
    closeMenu,
    onContentChange,
    onImageSelected,
    onImageRemove,
    onFileSelected,
    onFileRemove,
    classes
  }) => (
    <StackedPage navTitle="Edit Note">
      <div className={`Note--Editor ${classes.root}`}>
        <ContentEditable
          className={`title ${classes.title}`}
          name="title"
          html={title}
          onChange={onContentChange}
        />
        <ContentEditable
          className={`content ${classes.content}`}
          name="content"
          html={content}
          onChange={onContentChange}
        />
        <List className={classes.fileList}>
          {images && images.length > 0
            ? reduce(
                images,
                (acc, image, index) => [
                  ...acc,
                  <Divider key={`imageDivi-${index}`} />,
                  <ListItem key={`imageItem-${index}`}>
                    <ListItemIcon>
                      <Icon>image</Icon>
                    </ListItemIcon>
                    <ListItemText primary={image.name} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => onImageRemove(index)} color="primary">
                        <Icon>delete</Icon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ],
                []
              )
            : null}
          {attachments && attachments.length > 0
            ? reduce(
                attachments,
                (acc, attachment, index) => [
                  ...acc,
                  <Divider key={`divi-${index}`} />,
                  <ListItem key={`item-${index}`}>
                    <ListItemIcon>
                      <Icon>attach_file</Icon>
                    </ListItemIcon>
                    <ListItemText primary={attachment.name} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => onFileRemove(index)} color="primary">
                        <Icon>delete</Icon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ],
                []
              )
            : null}
        </List>
        <input
          type="file"
          name="photo"
          accept="image/*"
          capture
          onChange={onImageSelected}
          id="Note--photo"
          className={classes.fileInput}
        />
        <input
          type="file"
          name="attachment"
          onChange={onFileSelected}
          multiple
          id="Note--attachment"
          className={classes.fileInput}
        />
        <AppBar position="static" color="default">
          <Toolbar className={classes.btmToolbar}>
            <IconButton color="primary" onClick={openMenu} className={classes.button}>
              <Icon>add_box</Icon>
            </IconButton>
            <Menu
              open={Boolean(menuAnchor)}
              anchorEl={menuAnchor}
              onClose={closeMenu}
              transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <MenuItem onClick={closeMenu}>
                <ListItemIcon color="primary" className={classes.button}>
                  <Icon>image</Icon>
                </ListItemIcon>
                <Typography
                  component="label"
                  htmlFor="Note--photo"
                  className={classes.listItemText}
                >
                  Add Image
                </Typography>
              </MenuItem>
              <MenuItem onClick={closeMenu}>
                <ListItemIcon color="primary" className={classes.button}>
                  <Icon>attach_file</Icon>
                </ListItemIcon>
                <Typography
                  component="label"
                  htmlFor="Note--attachment"
                  className={classes.listItemText}
                >
                  Attach File
                </Typography>
              </MenuItem>
            </Menu>
            <IconButton color="primary" className={classes.button}>
              <Icon>save</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    </StackedPage>
  )
);
