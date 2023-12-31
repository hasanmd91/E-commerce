import React, { useState } from 'react';
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';
import TextField from '../TextField/TextField';
import { registerUser } from '../../types/user';
import useAppSelector from '../../hooks/useAppSelector';
import Button from '../Button/Button';

type UserRegisterFormType = {
  handleSubmit: UseFormHandleSubmit<registerUser>;
  submitHandeler: SubmitHandler<registerUser>;
  reset: UseFormReset<registerUser>;
  control: Control<registerUser>;
  errors: FieldErrors<registerUser>;
};

const UserRegisterForm: React.FC<UserRegisterFormType> = ({
  handleSubmit,
  submitHandeler,
  control,
  errors,
  reset,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { error } = useAppSelector((state) => state.user);


  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={1}
        sx={{
          width: '90%',
          maxWidth: '600px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2rem 0',
        }}
      >
        <Typography variant="h5"> Welcome!!</Typography>

        <form onSubmit={handleSubmit(submitHandeler)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                helperText={errors.name?.message}
                error={errors.name ? true : false}
                label="Name"
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                helperText={errors.email?.message}
                error={errors.email ? true : false}
                label="Email"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? 'text' : 'password'}
                helperText={errors.password?.message}
                error={errors.password ? true : false}
                label="Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                helperText={errors.confirmPassword?.message}
                error={errors.confirmPassword ? true : false}
                label="ConfirmPassword"
              />
            )}
          />
          <Controller
            name="avatar"
            control={control}
            defaultValue=""
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                {...field}
                helperText={errors.avatar?.message}
                error={errors.avatar ? true : false}
                label="Avatar"
              />
            )}
          />

          <Button type="submit" sx={{ marginRight: '1rem' }}>
            Submit
          </Button>
          <Button type="reset" onClick={() => reset()}>
            Reset
          </Button>
        </form>
        {error && (
          <Alert severity="error" sx={{ marginTop: '10px' }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default UserRegisterForm;
