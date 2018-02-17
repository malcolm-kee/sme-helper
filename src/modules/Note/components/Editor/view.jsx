import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Input from 'material-ui/Input';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { StackedPage } from '../../../../components/StackedPage';
import { reduce } from '../../../../utils/fp';
import { fileToUrl } from '../../../../utils/promise-helper';

const decorate = withStyles(theme => {
  const root = {
    display: 'flex',
    flexFlow: 'column',
    height: '100%'
  };

  const content = {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  };

  const contentWrapper = {
    flex: 1
  };

  const button = {
    margin: theme.spacing.unit
  };

  const title = {
    fontSize: theme.typography.title.fontSize,
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

  const focusedImageContainer = {
    maxWidth: '100vw',
    maxHeight: '100vh'
  };

  const focusedImage = {
    width: '100%',
    height: 'auto'
  };

  return {
    content,
    contentWrapper,
    root,
    button,
    title,
    btmToolbar,
    fileInput,
    fileList,
    listItemText,
    focusedImageContainer,
    focusedImage
  };
});

export const EditorView = decorate(
  ({
    isNew,
    menuAnchor,
    images,
    attachments,
    title,
    content,
    focusedImage,
    openMenu,
    closeMenu,
    onContentChange,
    onImageSelected,
    onImageRemove,
    onFileSelected,
    onFileRemove,
    onImageOpen,
    onImageClose,
    onSave,
    onDelete,
    classes
  }) => (
    <StackedPage
      navTitle={isNew ? 'Add Note' : 'Edit Note'}
      rightButton={true}
      rightButtonIcon="delete"
      onRightButtonClick={onDelete}
    >
      <div className={`Note--Editor ${classes.root}`}>
        <FormControl fullWidth>
          <Input
            placeholder="Title"
            name="title"
            value={title}
            onChange={onContentChange}
            className={classes.title}
          />
        </FormControl>
        <div className={classes.contentWrapper}>
          <FormControl fullWidth>
            <Input
              placeholder="Write your note here."
              name="content"
              value={content}
              onChange={onContentChange}
              className={classes.content}
              multiline
              disableUnderline
            />
          </FormControl>
        </div>
        <List className={classes.fileList}>
          {images && images.length > 0
            ? reduce(
                images,
                (acc, image, index) => [
                  ...acc,
                  <Divider key={`imageDivi-${image.id}`} />,
                  <ListItem
                    button
                    onClick={() => onImageOpen(index)}
                    key={`imageItem-${image.id}`}
                  >
                    <ListItemIcon>
                      <Avatar src={fileToUrl(image)} />
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
                  <Divider key={`divi-${attachment.id}`} />,
                  <ListItem key={`item-${attachment.id}`}>
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
        <Dialog open={focusedImage !== null} onClose={onImageClose}>
          <div className={classes.focusedImageContainer}>
            {focusedImage !== null ? (
              <img
                alt={images[focusedImage].name}
                src={fileToUrl(images[focusedImage])}
                className={classes.focusedImage}
              />
            ) : null}
          </div>
        </Dialog>
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
            <IconButton onClick={onSave} color="primary" className={classes.button}>
              <Icon>save</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    </StackedPage>
  )
);
