import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Document, Page } from 'react-pdf';

const HeatmapEditor = () => {
  const [pdfData, setPdfData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const arrayBuffer = event.target.result;
      PDFJS.getDocument(arrayBuffer).then((pdf) => {
        setPdfData(pdf);
        setNumPages(pdf.numPages);
      });
    };
    fileReader.readAsArrayBuffer(file);
  };

  const handlePrevious = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    setPageNumber(pageNumber + 1);
  };

  const onEdit = (event) => {
    // handle the edit here
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {pdfData && (
        <div>
          <Document file={pdfData}>
            <Page pageNumber={pageNumber} onRender={onEdit} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button disabled={pageNumber === 1} onClick={handlePrevious}>
            Previous
          </button>
          <button disabled={pageNumber === numPages} onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const ModalHeatmapEditor = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <Button color="primary" onClick={() => setModal(true)}>
        Open Heatmap Editor
      </Button>
      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <ModalHeader toggle={() => setModal(false)}>Heatmap Editor</ModalHeader>
        <ModalBody>
          <HeatmapEditor />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModal(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalHeatmapEditor;
