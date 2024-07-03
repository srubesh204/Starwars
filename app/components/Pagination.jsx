// components/Pagination.js
import { Button, ButtonGroup } from '@chakra-ui/react';
import { GrNext,GrPrevious } from "react-icons/gr";

const Pagination = ({ nextPage, prevPage, fetchData }) => {
  return (
    <ButtonGroup spacing={4} mt={4} className='pageButton d-flex justify-content-center '>
      <Button disabled={!prevPage} onClick={() => fetchData(prevPage)}><GrPrevious /></Button>
      <Button disabled={!nextPage} onClick={() => fetchData(nextPage)}><GrNext /></Button>
    </ButtonGroup>
  );
};

export default Pagination;
