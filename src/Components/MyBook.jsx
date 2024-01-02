import HTMLFlipBook from 'react-pageflip';
import React, { useState } from "react";
import samplePDF from "../sample.pdf";
import SinglePage from './SinglePage';
import FundamentalsofComputerStudies from '../FundamentalsofComputerStudies.pdf';
import DSML from "../DSML.pdf";
import samplePDF2 from "../sample2.pdf";
import samplePDF3 from "../sample3.pdf";
import samplePDF4 from "../sample4.pdf";
import samplePDF5 from "../sample5.pdf";
import samplePDF6 from "../sample6.pdf";

const Page = React.forwardRef((props, ref) => {
    return (
      <div className="demoPage" ref={ref}>
        {/* <h1>Page Header</h1> */}
        {props.children}
        <p>Page number: {props.number}</p>
      </div>
    );
  });

function MyBook(props) {
    const pdfUrl = 'https://uat-new-ab-academy.s3.eu-west-2.amazonaws.com/65706ad64b9af3817301e9d1/1701866342549-Lesson%202.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2A5RWAERCREXCDOR%2F20240101%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240101T154143Z&X-Amz-Expires=86400&X-Amz-Signature=f3e445198e5127b38edbbc2f82b6500fff5199fcdb0705f6342c070ad3fba846&X-Amz-SignedHeaders=host';
    const pdfUrl2= 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    const [numOfPages, setNumOfPages] = useState(1);
    function handlePages(numPages) {
        setNumOfPages(prevNumPages => {
          if (prevNumPages !== numPages) {
            console.log(numPages, 'numPages');
            return numPages;
          }
          return prevNumPages;
        });
      }
  
    return (
        <HTMLFlipBook width={300} height={500} size="stretch"  minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        className="demo-book"
        >
      {/* <Page number="1"><SinglePage pdf={FundamentalsofComputerStudies} onLoadDoc={handlePages} pageNumber={1}></SinglePage></Page>
      <Page number="2"><SinglePage pdf={FundamentalsofComputerStudies} onLoadDoc={handlePages} pageNumber={2}></SinglePage></Page>
      <Page number="3"><SinglePage pdf={FundamentalsofComputerStudies} onLoadDoc={handlePages} pageNumber={3}></SinglePage></Page>
      <Page number="4"><SinglePage pdf={FundamentalsofComputerStudies} onLoadDoc={handlePages} pageNumber={4}></SinglePage></Page> */}
      {Array.from(new Array(numOfPages), (el, index) => (
        //   <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        <Page key={`page_${index + 1}`} number={index + 1}><SinglePage pdf={samplePDF} onLoadDoc={numPages => index === 0 ? handlePages(numPages) : null} pageNumber={index + 1}></SinglePage></Page>
        ))}
        </HTMLFlipBook>
    );
}

export default MyBook;