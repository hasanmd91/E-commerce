import React from 'react';
import { useForm } from 'react-hook-form';
import { CircularProgress } from '@mui/material';

import { updateUser, user } from '../types/user';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { yupResolver } from '@hookform/resolvers/yup';
import { userEditschema } from '../validation/userEditschema';
import { updateUserAsync } from '../redux/thunks/userThunk';
import ProfileComp from '../components/ProfileComp/ProfileComp';
import CenteredContainer from '../components/CenterContainer/CenterContainer';

const Profile: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<updateUser>({
    resolver: yupResolver(userEditschema),
  });

  const submitHandeler = (data: Partial<user>) => {
    if (currentUser?.id) {
      const id = parseInt(currentUser.id);
      dispatch(updateUserAsync({ data, id }));
    }
  };

  if (!currentUser) {
    return (
      <CenteredContainer>
        <CircularProgress color="error" size="5rem" />
      </CenteredContainer>
    );
  }

  return (
    <ProfileComp
      handleSubmit={handleSubmit}
      submitHandeler={submitHandeler}
      control={control}
      reset={reset}
      errors={errors}
    />
  );
};

export default Profile;
