import React, { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Container } from '@mui/material';
import { Link } from 'react-router-dom';

import MediaCard from '../components/Card/Card';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { usePagination } from '../hooks/usePagination';
import FilterBar from '../components/FilterBar/FilterBar';
import Pagination from '../components/Pagination/Pagination';
import CenteredContainer from '../components/CenterContainer/CenterContainer';
import SearchBar from '../components/InputSearch/SearchBar';
import useDebounce from '../hooks/useDebounce';
import {
  getAllProductsAsync,
  getProductByTitleAsync,
} from '../redux/thunks/productThunk';

const ProductList = () => {
  const { products, loading, error } = useAppSelector((state) => state.product);
  const [search, setSearch] = useState('');
  const { debouncedValue } = useDebounce(search);

  const { currentPage, pageLimit, currentProducts, setPage } = usePagination(
    products,
    30
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductByTitleAsync(debouncedValue));
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <CenteredContainer>
        <CircularProgress color="error" size="5rem" />
      </CenteredContainer>
    );
  }

  if (error) {
    return (
      <CenteredContainer>
        <Alert security="error">{error}</Alert>;
      </CenteredContainer>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SearchBar search={search} setSearch={setSearch} />
        <FilterBar />
        {currentProducts.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <MediaCard product={product} />
          </Link>
        ))}
      </Box>

      <Pagination
        count={pageLimit}
        currentPage={currentPage}
        setPage={setPage}
      />
    </Container>
  );
};

export default ProductList;
