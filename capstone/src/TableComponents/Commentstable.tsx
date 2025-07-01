import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import useSWR from 'swr';
import { Box } from '@mui/material';

const fetcher = (url: string) =>
  axios.get(url).then(res => res.data).catch(err => err);

const api = `https://dummyjson.com/products`;

const headers: GridColDef[] = [
  { field: 'title', headerName: 'Product Name', width: 200 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'brand', headerName: 'Brand', width: 150 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'price', headerName: 'Price ($)', width: 100, type: 'number' },
  { field: 'rating', headerName: 'Rating', width: 100, type: 'number' },
  { field: 'stock', headerName: 'Stock', width: 100, type: 'number' }
];

export default function Commentstable() {
  const { data, error, isLoading } = useSWR(api, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load data</div>;

  const rows = data?.products?.map((product: { id: any; title: any; description: any; brand: any; category: any; price: any; rating: any; stock: any; thumbnail: any; }) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    brand: product.brand,
    category: product.category,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    thumbnail: product.thumbnail
  })) || [];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={headers}
        // pageSize={10}
        // rowsPerPageOptions={[10, 20, 50]}
        checkboxSelection={true}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
