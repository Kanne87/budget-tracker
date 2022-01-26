import React from 'react';
import {FiSettings} from 'react-icons/fi';

export default function Einstellungen() {
   return (
      <section className='einstellungen'>
         <header className="border">
            <FiSettings size="2rem" className="btnColor"/> Einstellungen
            <p className="subheader">Nimm Einstellungen vor</p>
            </header>
            <main className="border">
          <h4>Label</h4>
        </main>
      </section>
   )
}
