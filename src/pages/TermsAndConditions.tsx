import React from 'react'
import RootLayout from './layout';
import { useAxios } from '@/hooks/useAxios';
import { Box } from '@mui/material';

const TermsAndConditions = () => {

    const { data } = useAxios('TERMS_AND_CONDITIONS',true)
    console.log('ppppp data is',data);
    

  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
       <Box maxWidth={'80vw'} >
        <h1 dangerouslySetInnerHTML={{ __html: data && data?.result?.termsAndConditions }} />
    </Box>
    </Box>
  )
}

TermsAndConditions.getLayout = (page: React.ReactElement) => <RootLayout>{page}</RootLayout>;

export default TermsAndConditions