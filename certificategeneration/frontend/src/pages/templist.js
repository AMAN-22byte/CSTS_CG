import React, { useState } from 'react';

function TemplateList() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [generateType, setGenerateType] = useState('single');

  const handleFileChange = (event) => {
    setSelectedOption({ type: 'file', value: event.target.files[0] });
  };

  const handleTemplateChange = (templateId) => {
    setSelectedOption({ type: 'template', value: templateId });
  };

  const handleGenerateTypeChange = (event) => {
    setGenerateType(event.target.value);
  };

  const generateCertificate = () => {
    if (selectedOption) {
      const url = generateType === 'single'
        ? `certgen?type=single&template_id=${selectedOption.value}`
        : `certgen?type=multiple&template_id=${selectedOption.value}`;

      // Redirect to the next page with the selected option
      window.location.href = url;
    } else {
      alert("Please select a file or a template first.");
    }
  };

  return (
    <div className='template-list'>
      <h1>Choose a Template</h1>

      <div className='cert-image'>
        <label htmlFor='user-temp' style={{ cursor: 'pointer', color: 'black' }}>Upload Certificate Image</label>
        <input 
          type='file' 
          id='user-temp' 
          onChange={handleFileChange} 
          accept='image/*' 
          disabled={selectedOption && selectedOption.type === 'template'} 
        />
      </div>

      <div className="template-options">
        {[1, 2, 3, 4, 5].map(templateId => (
          <div key={templateId}>
            <input 
              type='radio' 
              id={`temp${templateId}`} 
              name='template' 
              className="template-radio" 
              onChange={() => handleTemplateChange(templateId)} 
              disabled={selectedOption && selectedOption.type === 'file'} 
            />
            <label htmlFor={`temp${templateId}`} className="template-label">
              <img 
                src={`https://i.pinimg.com/474x/${
                  templateId === 1 ? '5d/b7/97/5db797d2bff4e37422a5f1aa439b4a58.jpg' 
                  : templateId === 2 ? 'f3/91/2c/f3912cfafe632fa92f36850077a94613.jpg' 
                  : templateId === 3 ? 'e6/6e/06/e66e063aa9e835abb01e81eb8fe7f5ad.jpg'
                  : templateId === 4 ? 'b9/24/01/b92401d7d7851ea4ee59c6aaed11c5c5.jpg'
                  : '71/16/2c/71162cc15ffb53edacd50a99751cd7b1.jpg'
                }`} 
                alt={`Template ${templateId}`} 
              />
            </label>
          </div>
        ))}
      </div>

      <div className="generate-options">
        <label>
          <input 
            type="radio" 
            name="generate-type" 
            value="single" 
            checked={generateType === 'single'} 
            onChange={handleGenerateTypeChange} 
          />
          Generate single certificate
        </label>
        <label>
          <input 
            type="radio" 
            name="generate-type" 
            value="multiple" 
            checked={generateType === 'multiple'} 
            onChange={handleGenerateTypeChange} 
          />
          Generate multiple certificates
        </label>
      </div>

      <div className="button-container">
        <button className="generate-button" onClick={generateCertificate}>
          Generate Certificate
        </button>
      </div>
    </div>
  );
}

export default TemplateList;
