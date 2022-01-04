import React from 'react';
import BudgetList from '../components/BudgetList';
import BudgetModal from '../components/BudgetModal'

function Home() {
   return (
      <div className='home'>
         <BudgetModal />
         <div className='budgetList'>
            <BudgetList />
         </div>
      </div>
   )
}

export default Home
