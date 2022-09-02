import React, { useState, useEffect } from 'react';
import './Testimonials.scss';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';


const Testimonials = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setcurrentIndex] = useState(0);

  const handleClick = (index) => {
    setcurrentIndex(index);
  }

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const skillsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setBrands(data);
    });
  }, []);
  
  const tstm = testimonials[currentIndex];
  return (
    <>
      {testimonials.length && (
        <>
          <div className='app__testimonials-item app__flex'>
            <img src={urlFor(tstm.imgurl)} alt="testimonials" />
            <div className='app__testimonials-content'>
              <p className='p-text'>{tstm.feedback}</p>
              <div>
                <h4 
                className='bold-text'   
                >
                {tstm.name}
                </h4>
                <h5 
                className='p-text'   
                >
                {tstm.company}
                </h5>
              </div>
            </div>
          </div>

          <div className='app__testimonials-btns app__flex'>
            <div 
            className='app__flex'
            onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1 )}
            >
              <HiChevronLeft />
            </div>
            <div 
            className='app__flex'
            onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1 )}
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className='app__testimonials-brands app__flex'>
        {brands.map((brand) => (
          <motion.div
          whileInView={{ opcity: [0, 1]}}
          transition={{ duration: 0.5, type: 'tween' }}
          key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />

          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Testimonials, 'app__testimonials'),
  'testimonials',
  'app__primarybg',
);