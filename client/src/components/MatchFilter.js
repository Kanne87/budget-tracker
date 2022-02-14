import React, { Fragment } from 'react';
import {
   Button,
   Input,
   InputGroup,
   ButtonDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
 } from "reactstrap";

export const MatchFilter = () => {
  return (
   <Fragment>
   <div className="inputRow">
               <InputGroup>
                 <ButtonDropdown
                   name="filterTwoToggle"
                   toggle={this.toggleFilter}
                   isOpen={this.state.filterTwoToggle}
                 >
                   <DropdownToggle name="filterTwo" onChange={this.onChange} caret>
                     {this.state.filterHeaderTwo}
                   </DropdownToggle>
                   <DropdownMenu>
                     <DropdownItem
                       onClick={this.onDropdownChange}
                       name="SourceTwo"
                       value="debit_source"
                     >
                       Source
                     </DropdownItem>
                     <DropdownItem
                       onClick={this.onDropdownChange}
                       name="Buchungstext"
                       value="debit_desc"
                     >
                       Buchungstext
                     </DropdownItem>

                     <DropdownItem
                       onClick={this.onDropdownChange}
                       name="Betrag"
                       value="debit_amount"
                     >
                       Betrag
                     </DropdownItem>
                   </DropdownMenu>
                 </ButtonDropdown>
                 <Input
                   onChange={this.onChange}
                   name="filterText"
                   disabled={
                     this.state.filterHeaderTwo === "Buchungstext" ? false : true
                   }
                 />
                 <Button name="yas" onClick={this.toggleSecondFilter}>-</Button>
               </InputGroup>
             </div>
             </Fragment>
  )
}
export default MatchFilter