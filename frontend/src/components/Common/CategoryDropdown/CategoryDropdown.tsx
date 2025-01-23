import { Checkbox, ListItemText, Menu, MenuItem } from '@mui/material';
import { useCategoryDropdown } from './CategoryDropdown.logic.ts';
import { Button } from '@mui/joy';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

const ITEM_HEIGHT = 48;

const CategoryDropdown = () => {
  const {
    options,
    open,
    openDropdown,
    closeDropdown,
    selectedOptions,
    handleToggle,
    anchorEl,
  } = useCategoryDropdown();

  return (
    <div>
      <Button
        onClick={openDropdown}
        aria-haspopup="true"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-label="more"
        sx={{
          fontSize: '16px',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          minWidth: '200px',
        }}
      >
        Категорія
        {open ? (
          <ArrowDropUp sx={{ marginLeft: 1 }} />
        ) : (
          <ArrowDropDown sx={{ marginLeft: 1 }} />
        )}
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        onClose={closeDropdown}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              maxWidth: '400px',
              marginTop: '10px',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleToggle(option)}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Checkbox
              checked={selectedOptions.includes(option)}
              sx={{ marginRight: 1 }}
            />
            <ListItemText primary={option} className="text-truncate" title={option} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};


export default CategoryDropdown;