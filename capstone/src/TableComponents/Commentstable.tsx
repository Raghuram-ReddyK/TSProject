import { useState } from 'react';
import { Box } from '@mui/material';
import useFetchComments from '../use-fetch-hooks/use-fetch-comments';
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid';

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
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const sortField = sortModel[0]?.field || 'title';
  const sortOrder = sortModel[0]?.sort || 'asc';

  const { data, error, isLoading } = useFetchComments(sortField, sortOrder as 'asc' | 'desc', page + 1);

  const rows = data?.products?.map((product: any) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    brand: product.brand,
    category: product.category,
    price: product.price,
    rating: product.rating,
    stock: product.stock
  })) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load data</div>;

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={headers}
        rowCount={data?.total || 0}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={({ page, pageSize }) => {
          setPage(page);
          setPageSize(pageSize);
        }}
        sortModel={sortModel}
        onSortModelChange={(model) => {
          setSortModel(model);
          setPage(0);
        }}
        checkboxSelection
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
