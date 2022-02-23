import React, { useCallback, useState } from 'react';
import { Box, Button, Grid, styled, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Label = styled(Box)({ textAlign: 'center' });

const Container = styled(Grid)({
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '10vh',
  marginLeft: '5vh',
  width: '80%',
  height: '80%',
});

const Row = styled(Grid)({
  justifyContent: 'center',
  alignItems: 'center',
});

const LabelGrid = ({ children }: any) => (
  <Grid item xs={2}>
    <Label>{children}</Label>
  </Grid>
);

interface IBoardCreateForm {
  title: string;
  content: string;
}

const BoardCreate = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardCreateForm>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickCancel = useCallback(() => {
    navigate('/board');
  }, [navigate]);

  const handleClickAdd = useCallback(
    (form: IBoardCreateForm) => {
      setLoading(true);
      console.info(form);
      navigate('/board');
    },
    [navigate],
  );

  return (
    <Container container spacing={2}>
      <Row item container spacing={2}>
        <LabelGrid>제목</LabelGrid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            required
            {...register('title', {
              required: {
                value: true,
                message: '제목을 입력해주세요.',
              },
              maxLength: {
                value: 50,
                message: '글자수는 50자 이내로 입력해주세요.',
              },
            })}
            error={!!errors?.title}
            helperText={errors?.title?.message}
            placeholder={'제목은 50자 이하로 입력해주세요.'}
            inputProps={{ maxLength: 50 }}
          />
        </Grid>
      </Row>
      <Row item container spacing={2}>
        <LabelGrid>내용</LabelGrid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            required
            multiline
            rows={20}
            {...register('content', {
              required: {
                value: true,
                message: '내용을 입력해주세요.',
              },
              maxLength: {
                value: 1000,
                message: '글자수는 1000자 이내로 입력해주세요.',
              },
            })}
            error={!!errors?.content}
            helperText={errors?.content?.message}
            placeholder={'내용은 1000자 이내로 입력해주세요.'}
            inputProps={{ maxLength: 1000 }}
          />
        </Grid>
      </Row>
      <Row item container spacing={2}>
        <Grid item>
          <Button color={'warning'} variant={'contained'} onClick={() => handleClickCancel()}>
            취소
          </Button>
        </Grid>
        <Grid item>
          <LoadingButton
            variant={'contained'}
            onClick={handleSubmit(handleClickAdd)}
            loading={loading}
            endIcon={<SendIcon />}
            loadingPosition={'end'}
          >
            등록
          </LoadingButton>
        </Grid>
      </Row>
    </Container>
  );
};

export default BoardCreate;