import { Routes, Route, Navigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';

import Home from './Home';
import Search from './Search';
import Houses from './Houses';

function App() {
  return (
    <>
      <Navbar className="bg-body ps-3">
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
      </Navbar>
      <main className="container py-4 d-flex flex-column justify-content-center">
        <Routes>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/houses" element={<Houses />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
