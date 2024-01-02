import FlipbookPDFViewer from "./Components/FlipbookPDFViewer";
import MyBook from "./Components/MyBook";
import SinglePage from "./Components/SinglePage";
import samplePDF from "./sample.pdf";
import FundamentalsofComputerStudies from "./FundamentalsofComputerStudies.pdf";
import { useState } from "react";


function App() {
  const pdfUrl = 'https://uat-new-ab-academy.s3.eu-west-2.amazonaws.com/65706ad64b9af3817301e9d1/1701866342549-Lesson%202.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2A5RWAERCREXCDOR%2F20240101%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240101T154143Z&X-Amz-Expires=86400&X-Amz-Signature=f3e445198e5127b38edbbc2f82b6500fff5199fcdb0705f6342c070ad3fba846&X-Amz-SignedHeaders=host';
  const [numOfPages, setNumOfPages] = useState(1);
  function handlePages(numPages){
    setNumOfPages(numPages);
    console.log(numPages,'numPages');
  }
  return (
    <div>
      <h1>Flipbook PDF Viewer</h1>
      {/* <FlipbookPDFViewer pdfUrl={samplePDF} /> */}
      {/* <SinglePage pdf={FundamentalsofComputerStudies} onLoadDoc={handlePages} pageNumber={3}></SinglePage> */}
      <MyBook></MyBook>
      
    </div>
  );
}

export default App;
