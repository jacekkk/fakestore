import { useEffect, useState, useReducer } from 'react';
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import { getProductsByCategory, addProduct } from '../../services/products/products-service'

const columns = [
  { 
    field: 'id',
    headerName: 'ID',
    width: 100,
    renderCell: (params) => (
      <Link to={`/products/${params.value}`}>{params.value}</Link>
    )
  },
  { 
    field: 'title',
    headerName: 'Title',
    width: 200,
    resizable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
    resizable: true
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 100
  },
];

function reducer(state, action) {
  const hasError = action.payload ? false : true

  switch (action.type) {
    case 'setNameError':
      return {
        ...state,
        name: hasError
      };
    case 'setDescriptionError':
      return {
        ...state,
        description: hasError
      };
    case 'setImageError':
      return {
        ...state,
        image: hasError
      };
    case 'setPriceError':
      return {
        ...state,
        price: hasError
      };
    default:
      throw new Error();
  }
}

function ProductListPage() {
  let params = useParams();
  const [products, setProducts] = useState([])
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [image, setImage] = useState(null)
  const [price, setPrice] = useState(null)
  const [errors, dispatch] = useReducer(reducer, {
    name: false,
    description: false,
    image: false,
    price: false
  });
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProductsByCategory(params.categoryName);
        setProducts(products);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, [params.categoryName]);

  const handleClickOpen = () => {
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleSubmit = async () => {
    if (name && description && image && price) {
      const product = {
        name,
        description,
        image,
        price,
        category: params.categoryName
      };
      await addProduct(product);
      setShowDialog(false);
    } else {
      dispatch({type: 'setNameError', payload: name});
      dispatch({type: 'setDescriptionError', payload: description});
      dispatch({type: 'setImageError', payload: image});
      dispatch({type: 'setPriceError', payload: price});
    }
  };

  if (!products) {
    return <p>Fetching products...</p>
  }

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
      >
        Add product
      </Button>
      <Dialog open={showDialog} onClose={handleClose}>
        <DialogTitle>Add product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the product details.
          </DialogContentText>
          <TextField
            margin="dense"
            id="title-input"
            label="Title"
            variant="standard"
            autoFocus
            fullWidth
            required
            error={errors.name}
            value={name}
            onChange={(e) => {
              const name = e.target.value;
              dispatch({type: 'setNameError', payload: name});
              setName(name)
            }}
          />
          <TextField
            margin="dense"
            id="description-input"
            label="Description"
            variant="standard"
            autoFocus
            fullWidth
            required
            error={errors.description}
            value={description}
            onChange={(e) => {
              const description = e.target.value;
              dispatch({type: 'setDescriptionError', payload: description});
              setDescription(description)
            }}
          />
          <TextField
            margin="dense"
            id="image-input"
            label="Image"
            variant="standard"
            helperText="Should be a URL"
            autoFocus
            fullWidth
            required
            error={errors.image}
            value={image}
            onChange={(e) => {
              const image = e.target.value;
              dispatch({type: 'setImageError', payload: image});
              setImage(image)
            }}
          />
          <TextField
            margin="dense"
            id="price-input"
            label="Price"
            variant="standard"
            type="number"
            autoFocus
            fullWidth
            required
            error={errors.price}
            value={price}
            onChange={(e) => {
              const price = e.target.value;
              dispatch({type: 'setPriceError', payload: price});
              setPrice(price)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ProductListPage
