import { Outlet, Link } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
        <Container maxWidth="md">
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/categories`}
          >
            View categories
          </Link>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
