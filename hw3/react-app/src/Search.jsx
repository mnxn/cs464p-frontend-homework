import { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';

import './Search.css';

const Search = function SearchComponent({ characters }) {
  const [matchingCharacters, setMatchingCharacters] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const matching = characters.filter(
      ({ fullName, title }) => fullName.toLowerCase().includes(lowerSearch)
        || title.toLowerCase().includes(lowerSearch),
    );
    setMatchingCharacters(matching);
  }, [characters, search]);

  return (
    <>
      <Card className="p-4 mx-auto">
        <h1 className="fs-3">Character Search</h1>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="search">Name or Title</Form.Label>
          <Form.Control
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
      </Card>
      <Card className="my-3 px-3 py-2 text-center mx-auto">
        {matchingCharacters.length}
        {matchingCharacters.length === 1 ? ' result' : ' results'}
      </Card>
      <div className="d-flex flex-row flex-wrap gap-3 justify-content-center">
        {matchingCharacters.map((c) => (
          <Card className="character-card" key={c.id}>
            <Card.Img
              className="object-fit-cover"
              variant="top"
              width={180}
              height={200}
              src={c.imageUrl}
              alt={`Picture of ${c.fullName}`}
            />
            <Card.Body>
              <Card.Title>{c.fullName}</Card.Title>
              <Card.Subtitle>{c.title}</Card.Subtitle>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Search;
