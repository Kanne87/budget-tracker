import React, {Component } from "react";
import Papa from "papaparse";
import file from "../../files/file.CSV";
import { importItems } from "../importActions";
import { connect } from "react-redux";

class ImportCsv extends Component {
   constructor(props) {
      super(props)
    
      this.state = {
         data: [],
         headings: []
      }
    }
   componentDidMount = () => {
      this.getCsvData();
      this.getData = this.getData.bind(this);
      
    }
  
    fetchCsv() {
      return fetch(file).then(function (response) {
        let reader = response.body.getReader();
        let decoder = new TextDecoder("utf-8");
        return reader.read().then(function (result) {
          return decoder.decode(result.value);
        });
      });
    }
  
    getData(result) {
      this.setState({ data: result.data });
      this.doStuff();
      
    }
  
    async getCsvData() {
      const csvData = await this.fetchCsv();
      Papa.parse(csvData, {
        complete: this.getData,
        header: true,
      });
    }
  
    doStuff() {
      importItems(this.state.data);
     
    }

  render() {
    return <>        </>;
  }
}
const mapStateToProps = (state) => ({
  import: state.import,
});
export default connect(mapStateToProps, {importItems})(ImportCsv);

