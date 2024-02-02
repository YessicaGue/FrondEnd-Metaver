import React, { useState } from 'react';

const Accordion = ({ panels }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const togglePanel = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-8xl mx-auto w-full ">
      <div className="accordion space-y-3">
        {panels.map((panel, index) => (
          <div key={index} className="accordion-item">
            <h2 className="accordion-header text-center text-gray-500 font-bold text-lg">
              <button
                className="accordion-button bg-white w-full rounded-xl border-2 border-orange-100 py-5 hover:bg-orange-100 transition duration-150 ease-in-out"
                type="button"
                onClick={() => togglePanel(index)}
              >
                {panel.title}
              </button>
            </h2>
            {activeIndex === index && (
              <div className="accordion-content p-2 bg-white shadow-2xl rounded-lg">{panel.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
