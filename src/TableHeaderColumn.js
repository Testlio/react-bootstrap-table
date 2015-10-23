import React from 'react';
import classSet from 'classnames';
import Const from './Const';
import Util from './util';

class TableHeaderColumn extends React.Component{

  order: Const.SORT_DESC

  handleColumnClick(e){
    if(!this.props.dataSort)return;
    var dom = this.refs.innerDiv;
    this.order = this.order == Const.SORT_DESC?Const.SORT_ASC:Const.SORT_DESC;
    this.props.clearSortCaret(this.order, this.props.dataField);
    dom.appendChild(Util.renderSortCaret(this.order));
  }

  componentDidMount(){
    this.refs.innerDiv.setAttribute("data-field", this.props.dataField);
  }

  render(){
    var thStyle = {
      textAlign: this.props.dataAlign,
      display: this.props.hidden?"none":null,
      width: this.props.width
    };

    var dataSortClass = this.props.dataSort ? "sort-column" : '';
    var classes = classSet(this.props.className, dataSortClass);
    return(
      <th className={classes} style={thStyle}>
        <div ref="innerDiv" className="th-inner table-header-column"
          onClick={this.handleColumnClick.bind(this)}>{this.props.children}</div>
      </th>
    )
  }
}
TableHeaderColumn.propTypes = {
  dataField: React.PropTypes.string,
  dataAlign: React.PropTypes.string,
  dataSort: React.PropTypes.bool,
  clearSortCaret: React.PropTypes.func,
  dataFormat: React.PropTypes.func,
  isKey: React.PropTypes.bool,
  editable: React.PropTypes.any,
  hidden: React.PropTypes.bool,
  className:React.PropTypes.string,
  width: React.PropTypes.string,
  sortFunc: React.PropTypes.func,
  columnClassName: React.PropTypes.any
};

TableHeaderColumn.defaultProps = {
  dataAlign: "left",
  dataSort: false,
  dataFormat: undefined,
  isKey: false,
  editable: true,
  clearSortCaret: undefined,
  hidden: false,
  className: "",
  width: null,
  sortFunc: undefined,
  columnClassName: ''
};

export default TableHeaderColumn;
