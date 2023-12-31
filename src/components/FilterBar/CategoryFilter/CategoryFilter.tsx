import React, { useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { getAllCategoryAsync } from '../../../redux/thunks/categoryThunk';
import { getAllProductsByCategoryAsync } from '../../../redux/thunks/productThunk';
import { category } from '../../../types/category';

const CategoryFilter = () => {
  const { categories } = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategoryAsync());
  }, [dispatch]);

  const categoryHandeler = (event: SelectChangeEvent<unknown>) => {
    const id = event.target.value as number;
    dispatch(getAllProductsByCategoryAsync(id));
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Select Category</InputLabel>
      <Select variant="standard" onChange={categoryHandeler} defaultValue="">
        {categories.slice(0, 5).map((category: category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
