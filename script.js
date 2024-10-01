
 document.getElementById('rentalForm').addEventListener('submit', function(e) {
  e.preventDefault();
 const formData = new FormData(this);
 const formObject = { };
            formData.forEach((value, key) => {formObject[key] = value});
 localStorage.setItem('dutySlipData', JSON.stringify(formObject));
 alert('Data saved successfully!');
        });

 // Load saved data on page load
 window.addEventListener('load', function() {
            const savedData = JSON.parse(localStorage.getItem('dutySlipData'));
 if (savedData) {
  Object.keys(savedData).forEach(key => {
   const field = document.getElementById(key);
   if (field) {
    if (field.type === 'radio') {
     document.querySelector(`input[name="${key}"][value="${savedData[key]}"]`).checked = true;
    } else {
     field.value = savedData[key];
    }
   }
  });
            }
        });


document.getElementById('downloadPdf').addEventListener('click', function () {
 const statusMessage = document.getElementById('statusMessage');
 statusMessage.style.display = 'block';
 statusMessage.textContent = 'Generating PDF...';
 statusMessage.className = '';

 if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
  statusMessage.textContent = 'Error: Required libraries not loaded. Please check your internet connection and reload the page.';
  statusMessage.className = 'error';
  return;
 }

 const { jsPDF } = window.jspdf;
 const element = document.getElementById('dutySlip');

 html2canvas(element, {
  scrollY: -window.scrollY,
  scale: 2,
  useCORS: true,
  logging: true,
  allowTaint: true
 }).then(canvas => {
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'pt', 'a4');

  const imgWidth = 595.28;
  const pageHeight = 841.89;
  const imgHeight = canvas.height * imgWidth / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
   position = heightLeft - imgHeight;
   pdf.addPage();
   pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
   heightLeft -= pageHeight;
  }

  pdf.save('duty_slip.pdf');
  statusMessage.textContent = 'PDF downloaded successfully!';
  statusMessage.className = 'success';
 }).catch(error => {
  console.error('Error generating PDF:', error);
  statusMessage.textContent = 'Error generating PDF. Please try again.';
  statusMessage.className = 'error';
 });
});

 // document.getElementById('downloadPdf').addEventListener('click', function() {
 //            const {jsPDF} = window.jspdf;
 // const doc = new jsPDF();
            
 //            html2canvas(document.getElementById('dutySlip')).then(canvas => {
 //                const imgData = canvas.toDataURL('image/png');
 // const imgProps = doc.getImageProperties(imgData);
 // const pdfWidth = doc.internal.pageSize.getWidth();
 // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

 // doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
 // doc.save('duty_slip.pdf');
 //            });
 //        });
