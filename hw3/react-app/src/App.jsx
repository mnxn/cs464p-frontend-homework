import { Routes, Route, Navigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar } from 'react-bootstrap';

import Home from './Home';
import Houses from './Houses';

function App() {
  return (
    <>
      <Navbar className="bg-body">
        <Container>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/search">
                <Nav.Link>Search</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/houses">
                <Nav.Link>Houses</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="container py-4 d-flex justify-content-center">
        <Routes>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/houses" element={<Houses />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
