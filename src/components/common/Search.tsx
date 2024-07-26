import React, { useState, FC, ChangeEvent, FormEvent } from 'react';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

interface SearchProps {
  onSearch: (term: string, minPrice?: number, maxPrice?: number, wireless?: boolean, wired?: boolean) => void;
}

const Search: FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [wireless, setWireless] = useState(true);
  const [wired, setWired] = useState(true);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined);
  };

  const handleWirelessChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWireless(e.target.checked);
  };

  const handleWiredChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWired(e.target.checked);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, minPrice, maxPrice, wireless, wired);
  };

  return (
    <Form className="mb-4" onSubmit={handleSubmit}>
      <Row className="align-items-center">
        <Col md={4}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search products by name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </InputGroup>
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            placeholder="Min price"
            value={minPrice !== undefined ? minPrice : ''}
            onChange={handleMinPriceChange}
            className="search-input"
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            placeholder="Max price"
            value={maxPrice !== undefined ? maxPrice : ''}
            onChange={handleMaxPriceChange}
            className="search-input"
          />
        </Col>
        <Col md={2}>
          <Button type="submit" variant="outline-secondary">
            <FaSearch />
          </Button>
        </Col>
      </Row>
      <Row className="align-items-center mt-3">
        <Col md={2}>
          <Form.Check 
            type="checkbox"
            label="Wireless"
            checked={wireless}
            defaultChecked={false}
            onChange={handleWirelessChange}
          />
        </Col>
        <Col md={2}>
          <Form.Check 
            type="checkbox"
            label="Wired"
            checked={wired}
            defaultChecked={false}
            onChange={handleWiredChange}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
