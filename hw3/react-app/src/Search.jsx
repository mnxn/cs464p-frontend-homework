import { useEffect, useState } from 'react';
import { Card, Container, Form } from 'react-bootstrap';

import './Search.css';

function Search({ characters }) {
  const [matchingCharacters, setMatchingCharacters] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const filterCharacters = function filterMatchingCharacters(search) {
    const lowerSearch = search.toLowerCase();
    const matching = characters.filter(
      ({ fullName, title }) => fullName.toLowerCase().includes(lowerSearch)
        || title.toLowerCase().includes(lowerSearch),
    );
    setMatchingCharacters(matching);
  };

  useEffect(() => {
    setMatchingCharacters(characters);
  }, [characters]);

  return (
    <>
      <Card className="p-4 mx-auto">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            filterCharacters(searchInput);
          }}
        >
          <h1 className="fs-3">Character Search</h1>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="search">Search Text</Form.Label>
            <Form.Control
              id="search"
              placeholder="Name or title"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="btn btn-primary w-50"
              type="submit"
              value="Submit"
            />
          </Form.Group>
        </Form>
      </Card>
      <Card className="my-3 px-3 py-2 text-center mx-auto">
        {matchingCharacters.length}
        {matchingCharacters.length === 1 ? ' result' : ' results'}
      </Card>
      <Container className="d-flex flex-row flex-wrap gap-3 justify-content-center">
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
      </Container>
    </>
  );
}

export default Search;
