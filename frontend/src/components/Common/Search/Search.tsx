import React from 'react';

import { Divider, IconButton, Input } from '@mui/joy';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface SearchProps {
  placeholder: string;
  doSearch: () => void;
}

const Search = ({
  placeholder,
  doSearch,
}: SearchProps) => (
  <Input
    endDecorator={
      <div>
        <Divider orientation="vertical" />
        <IconButton onClick={doSearch} size="md">
          <FontAwesomeIcon icon={faSearch} />
        </IconButton>
      </div>
    }
    placeholder={placeholder}
    type="search"
    className="h-50px"
  />
);

export default Search;