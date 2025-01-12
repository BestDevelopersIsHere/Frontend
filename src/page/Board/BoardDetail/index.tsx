import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { IBoardDetail } from '../BoardTypes';
import { BoardBox, BoardPaper } from '../BoardList';
import { getPostDetail } from '../../../api';

const BoardDetail = () => {
  const param = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [board, setBoard] = useState<IBoardDetail>({} as IBoardDetail);

  const handleClickBack = useCallback(() => {
    navigate('/board');
  }, [navigate]);

  const handleClickUpdate = useCallback(
    (id: number) => {
      navigate(`/board/${id}/update`);
    },
    [navigate],
  );

  const fetchPostDetail = async (id: string) => {
    return await getPostDetail(id);
  };

  useEffect(() => {
    if (param.id === undefined) return;
    fetchPostDetail(param.id).then((result) => {
      console.info(result.data.data);
      setBoard(result.data.data);
    });
    setLoading(false);
  }, [param]);

  return (
    <>
      <BoardPaper>
        {loading ? (
          <CircularProgress size={100} sx={{ margin: '10vh 0 10vh' }} />
        ) : (
          <BoardBox>
            <Box>
              <Grid container justifyContent={'flex-start'} sx={{ marginTop: '1vh' }}>
                <Grid item xs={10}>
                  <Typography variant={'h4'}>{board.title}</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent={'flex-start'}
                alignItems={'center'}
                spacing={2}
                sx={{ paddingBottom: '1vh' }}
              >
                <Grid item>
                  <Typography variant={'subtitle1'}>{board.writer}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant={'subtitle2'}>{board.createdDate}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box>
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: '1vh',
                  marginBottom: '1vh',
                  height: '800px',
                  overflow: 'scroll',
                }}
              >
                <Grid item xs={10}>
                  <Typography variant={'body1'}>{board.content}</Typography>
                </Grid>
              </Grid>
            </Box>
          </BoardBox>
        )}
      </BoardPaper>
      <Grid container justifyContent={'center'} spacing={2}>
        <Grid item>
          <Button variant={'contained'} onClick={handleClickBack}>
            목록
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={'contained'}
            color={'secondary'}
            onClick={() => handleClickUpdate(board.id)}
          >
            수정
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BoardDetail;
