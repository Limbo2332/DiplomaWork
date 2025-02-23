import React, { useCallback, useEffect, useState } from 'react';
import { Divider, IconButton, Input } from '@mui/joy';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface SearchProps {
  placeholder: string;
  doSearch: (query?: string) => void;
  initialValue?: string;
}

const Search = ({
  placeholder,
  doSearch,
  initialValue = '',
}: SearchProps) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = useCallback(() => {
    doSearch(inputValue);
  }, [doSearch, inputValue]);

  return (
    <Input
      endDecorator={
        <div>
          <Divider orientation="vertical" />
          <IconButton onClick={handleSearch} size="md">
            <FontAwesomeIcon icon={faSearch} />
          </IconButton>
        </div>
      }
      placeholder={placeholder}
      type="search"
      className="h-50px"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default Search;
