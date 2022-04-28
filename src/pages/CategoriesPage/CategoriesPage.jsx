import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { getCategories } from '../../services/categories/categories-service'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function CategoriesPage() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCategories();
  }, []);

  if (!categories) {
    return <p>Fetching categories...</p>
  }

  return (
    <>
      <Box>
        <Stack spacing={2}>
          <nav>
            {categories.map(category =>
              <Link
                style={{ display: "block", margin: "1rem 0" }}
                to={`/categories/${category}`}
                key={category}
              >
                <Item>{category}</Item>
              </Link>
            )}
          </nav>
        </Stack>
      </Box>
      {/* <Outlet /> */}
    </>
  );
}

export default CategoriesPage
