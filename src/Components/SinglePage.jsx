import React, { useState, useEffect  } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import TextToSpeech from './TextToSpeech';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function SinglePage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(props.pageNumber); 
  const { pdf } = props;
  const [extractedText, setExtractedText] = useState("");


  useEffect(() => {
    async function fetchAndConvertPDF() {
      try {
        const response = await fetch(pdf);
        const arrayBuffer = await response.arrayBuffer();
        const pdfData = new Uint8Array(arrayBuffer);

        const extractedText = await extractTextFromLocalPDFPage(pdfData, pageNumber);
        setExtractedText(extractedText);
        console.log(extractedText,'extracted text');
      } catch (error) {
        console.error("Error fetching or converting PDF:", error);
      }
    }

    fetchAndConvertPDF();
  }, [pdf, pageNumber]); // Include 'pdf' in dependencies to trigger updates when 'pdf' prop changes

  async function extractTextFromLocalPDFPage(pdfFile, pageNumber) {
    try {
      const loadingTask = pdfjs.getDocument({ data: pdfFile });
      const pdfDocument = await loadingTask.promise;

      if (pageNumber < 1 || pageNumber > pdfDocument.numPages) {
        throw new Error("Invalid page number");
      }

      const page = await pdfDocument.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const textItems = textContent.items.map((item) => item.str);
      const pageText = textItems.join(" ");

      return pageText;
    } catch (error) {
      console.error("Error extracting text:", error);
      return ""; // Return empty string in case of error
    }
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    if (props.pageNumber === 1) {
      props.onLoadDoc(numPages);
    }
    setPageNumber(props.pageNumber);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  

  return (
    <>
      <Document
        file={pdf}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} renderAnnotationLayer={false}/>
      </Document>
      {/* <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div> */}
      <div>
      <TextToSpeech text={extractedText}></TextToSpeech>
      </div>
    </>
  );
}
