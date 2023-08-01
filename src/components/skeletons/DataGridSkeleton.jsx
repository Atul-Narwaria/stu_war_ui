import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function DataGridSkeleton() {
  return (
   
        <Box sx={{ width: 1}} className=" bg-gray-800">
          <Skeleton animation="wave" variant="circular" sx={{ background:"gray" }} width={40} height={40} />
        </Box>
     
  );
}
