import React from 'react';
import './footer.css';
import {FacebookFilled, GithubFilled, InstagramFilled, MailFilled} from '@ant-design/icons'

const Footer=(props)=>{

  const style={ fontSize: '2rem', margin: '1rem'};

  return (
    <div className='footer'>
      <h3>&copy;bhagwatgarg</h3>
      <div className='social'>
        <a target='_blank' href='https://www.facebook.com/gargbhagwat'><FacebookFilled style={style}  /></a>
        <a target='_blank' href='https://www.github.com/bhagwatgarg' ><GithubFilled style={style} /></a>
        <a target='_blank' href='https://www.instagram.com/bhagwatgarg' ><InstagramFilled style={style} /></a>
        <a target='_blank' href='mailto:b.garg2013@gmail.com' ><MailFilled style={style} /></a>
      </div>
    </div>
  );
};

export default Footer;