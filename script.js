
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

 document.getElementById('downloadPdf').addEventListener('click', function() {
            const {jsPDF} = window.jspdf;
 const doc = new jsPDF();
            
            html2canvas(document.getElementById('dutySlip')).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
 const imgProps = doc.getImageProperties(imgData);
 const pdfWidth = doc.internal.pageSize.getWidth();
 const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

 doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
 doc.save('duty_slip.pdf');
            });
        });
