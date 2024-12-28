import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
  const {data: {numberOfPages, currentPage}} = useAllJobsContext();
  const pages = Array.from ({length: numberOfPages }, (_,index) => {
    return index + 1
  });
  const {search, pathname} = useLocation()
  const navigate = useNavigate();
  // console.log(search, pathname);
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
    console.log(pageNumber);
  }

  const addPageButtons = ({pageNumber, activeClass}) =>{
    return (
        <button className={`btn page-btn ${activeClass && 'active'}`} 
                key={pageNumber} onClick={()=> handlePageChange(pageNumber)}>
            {pageNumber}
        </button>
        )
  }

  const renderPageButtons = () =>{
    const pageButtons = [];
    pageButtons.push(addPageButtons({pageNumber:1, activeClass:currentPage === 1}));
    // Dots
    if(currentPage > 3){
        pageButtons.push(<span className='page-btn dots shadow-small' key='dots'>...</span>)
    }
    // First Page
    if(currentPage !== 1 && currentPage !== 2){
        pageButtons.push(addPageButtons({pageNumber:currentPage-1, activeClass: false }));
    }
    // Current page
    if(currentPage !== 1 && currentPage !== numberOfPages){
        pageButtons.push(addPageButtons({pageNumber:currentPage, activeClass: true }));
    }
    // One after current page
    if(currentPage !== numberOfPages && currentPage !== numberOfPages-1){
        pageButtons.push(addPageButtons({pageNumber:currentPage + 1, activeClass: false }));
    }
    // Dots
    if(currentPage < numberOfPages - 2){
        pageButtons.push(<span className='page-btn dots shadow-small' key='dots-1'>...</span>)
    }
    // Last Page
    pageButtons.push(addPageButtons({pageNumber:numberOfPages, activeClass:currentPage === numberOfPages}));
    return pageButtons;
  }

  return (
    <Wrapper>
      <button className="btn prev-btn" onClick={() =>{
        let prevPage = currentPage -1;
        if(prevPage < 1) prevPage = numberOfPages;
        handlePageChange(prevPage);
      }}>
        <HiChevronDoubleLeft/>
        Prev
      </button>
      <div className="btn-container">
        {renderPageButtons()}
      </div>
      <button className="btn prev-btn" onClick={() =>{
        let nextPage = currentPage +1;
        if(nextPage > numberOfPages) nextPage = 1;
        handlePageChange(nextPage);
      }}>
        <HiChevronDoubleRight/>
        Next
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer;
