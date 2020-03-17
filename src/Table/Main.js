import React, { Component } from "react";

import ToggleButton from 'react-toggle-button';
import { CSVLink } from "react-csv";
import { FixedSizeList } from 'react-window';
import Select from 'react-select';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getColumns: {
        '1': true,
        '2': true,
        '3': true,
        '4': true,
        '5': true,
        '6': true,
        '7': true,
      },
      selectedColumns: [],

      reactWindow: false,
      toggleButton: false,
      prePositionInfo: ['Small', 'Average', 'High'].map((el) => {
        return { value: el, label: el };
      }),
      tableFilter: '',
      onSort: {
        country: 0,
        companyName: 0,
        productMaterial: 0,
        phoneNumberFormat: 0,
        boolean: 0,
        position: ['Small', 'Average', 'High'],
        price: 0,
      },
      order: [],
      searchList: ['0'],
    };
    this.resetonSort = {
      country: 0,
      companyName: 0,
      productMaterial: 0,
      phoneNumberFormat: 0,
      boolean: 0,
      position: ['Small', 'Average', 'High'],
      price: 0,
    };
    this.defaultsearchList = [ { value: 'country', label: 'country' } ];
    this.positionColumnRef = React.createRef();
    this.searchSelectRef = React.createRef();
    this.positionsSelectRef = React.createRef();
    this.searchInputRef = React.createRef();
  }

  getColumnsArr = () => {
    const arr = [];
    for (let key in this.state.onSort) {
      arr.push(key);
    }
    const options = arr.map((el, i) => {
      return { value: i, label: el };
    });
    return options;
  }

  componentWillMount() {
    this.props.setStaticsInfo();
  }

  sort = (column, e) => {
    const columnsArr = e.shiftKey ? this.state.onSort : this.resetonSort;
    if (e.ctrlKey) {
      e.target.classList.toggle('selected-column');
      let arr = this.state.selectedColumns;
      document.querySelectorAll('.selected-column').forEach((el) => (arr.push(+el.getAttribute('id').substr(7))));
      this.setState({
        selectedColumns: arr
      });

      return;
    } else {
      this.setState({
        selectedColumns: []
      });
      document.querySelectorAll('.selected-column').forEach((el) => {
        el.classList.toggle('selected-column');
      })
    }
    switch (column) {
      case 0:
        this.state.onSort.country === 2 ?
        this.setState((changeState) => {
          return {
            onSort: {
              ...columnsArr,
              country: 0,
            }
          }
        }) :
        this.state.onSort.country === 1 ?
        this.setState((changeState) => {
          return {
            onSort: {
              ...columnsArr,
              country: 2,
            }
          }
        }) :
        this.setState((changeState) => {
          return {
            onSort: {
              ...columnsArr,
              country: 1,
            }
          }
        });
        break;
        case 1:
          this.state.onSort.companyName === 2 ?
          this.setState((changeState) => {
            return {
              onSort: {
                ...columnsArr,
                companyName: 0,
              }
            }
          }) :
          this.state.onSort.companyName === 1 ?
          this.setState((changeState) => {
            return {
              onSort: {
                ...columnsArr,
                companyName: 2,
              }
            }
          }) :
          this.setState((changeState) => {
            return {
              onSort: {
                ...columnsArr,
                companyName: 1,
              }
            }
          });
          break;
        case 2:
          this.state.onSort.productMaterial === 2 ?
          this.setState((changeState) => {
            return {
              onSort: {
                ...columnsArr,
                productMaterial: 0,
              }
            }
          }) :
          this.state.onSort.productMaterial === 1 ?
          this.setState((changeState) => {
            return {
              onSort: {
                ...columnsArr,
                productMaterial: 2,
              }
            }
          }) :
          this.setState((changeState) => {
            return {
              onSort: {
                ...columnsArr,
                productMaterial: 1,
              }
            }
          });
          break;
        case 3:
          this.state.onSort.phoneNumberFormat === 2 ?
          this.setState((changeState) => {
            return {
              onSort: {
                ...columnsArr,
                phoneNumberFormat: 0,
              }
            }
          }) :
          this.state.onSort.phoneNumberFormat === 1 ?
          this.setState((changeState) => {
            return {
              onSort: {
                ...columnsArr,
                phoneNumberFormat: 2,
              }
            }
          }) :
          this.setState((changeState) => {
              return {
                onSort: {
                  ...columnsArr,
                  phoneNumberFormat: 1,
                }
              }
            });
            break;
          case 4:
            this.state.onSort.boolean === 2 ?
            this.setState((changeState) => {
              return {
                onSort: {
                  ...columnsArr,
                  boolean: 0,
                }
              }
            }) :
            this.state.onSort.boolean === 1 ?
            this.setState((changeState) => {
              return {
                onSort: {
                  ...columnsArr,
                  boolean: 2,
                }
              }
            }) :
            this.setState((changeState) => {
                return {
                  onSort: {
                    ...columnsArr,
                    boolean: 1,
                  }
                }
              });
              break;
          case 5:
            this.setState((changeState) => {
              return {
                onSort: {
                  ...columnsArr,
                  position: this.positionColumnRef.current.value,
                }
              }
            });
            break;
            case 6:
              this.state.onSort.price === 2 ?
              this.setState((changeState) => {
                return {
                  onSort: {
                    ...columnsArr,
                    price: 0,
                  }
                }
              }) :
              this.state.onSort.price === 1 ?
              this.setState((changeState) => {
                return {
                  onSort: {
                    ...columnsArr,
                    price: 2,
                  }
                }
              }) :
              this.setState((changeState) => {
                  return {
                    onSort: {
                      ...columnsArr,
                      price: 1,
                    }
                  }
                });
                break;
          default:
            return
    }
    const a = e.shiftKey;
    this.setState((changeState) => {
      return {
        order: a ? [...this.state.order, column] : [column]
      }
   }, function() { this.props.sortStaticsInfo(this.state.onSort, this.state.order, this.state.tableFilter, this.state.searchList, this.state.toggleButton); });
  }

  tableFilterChange = (event) => {
    this.setState({
      tableFilter: event.target.value,
   }, function() { this.props.sortStaticsInfo(this.state.onSort, this.state.order, this.state.tableFilter, this.state.searchList, this.state.toggleButton) });
  }

  isInputBlocked = (event) => {
    if (event === null) {
      this.setState({
        tableFilter: '',
        searchList: event
     }, function() { this.props.sortStaticsInfo(this.state.onSort, this.state.order, this.state.tableFilter, this.state.searchList, this.state.toggleButton) });
      this.searchInputRef.current.setAttribute('disabled', true);
      return;
    }
    this.searchInputRef.current.removeAttribute('disabled');
    this.setState({
      searchList: event.map((obj) => obj.value)
    }, function() { this.props.sortStaticsInfo(this.state.onSort, this.state.order, this.state.tableFilter, this.state.searchList, this.state.toggleButton) });
  }

  selectPositions = (event) => {
    if (event !== null) {
      this.resetonSort = {
        ...this.resetonSort,
        position: event.map((el) => el.value)
      }
      this.setState({
        prePositionInfo: event,
        onSort: {
          ...this.state.onSort,
          position: event.map((el) => el.value)
        },
      }, function() { this.props.sortStaticsInfo(this.state.onSort, this.state.order, this.state.tableFilter, this.state.searchList, this.state.toggleButton) });
    }
  }

  changeValue = (value) => {
    this.setState({
      getColumns: {
        ...this.state.getColumns,
        [value]: !this.state.getColumns[value],
      }
    });
  }

  render() {
    const rendStatics = (user, index) => {
      const staticsData = user.map((el, i) => this.state.getColumns[i+1] ? <td className={i === 0 ? "row-country" : "kekw"} key={i + 100 * 10}  >{el}</td> : null);
      return (
        <tr key={index}>
          <th className="row-index" scope="row">{index + 1}</th>
          {staticsData}
        </tr>
      );
    }

    const items = this.props.statics

    const Row = ({ index, style }) => (
        <tr key={index} style={style} className="tableRow">
          <th className="row-index" scope="row">{index + 1}</th>
          {items[index].map((el, i) => this.state.getColumns[i+1] ? <td className={i === 0 ? "row-country" : "kekw"} key={i + 100 * 10}  >{el}</td> : null)}
        </tr>
    );

    const ListComponent = () => (
      <FixedSizeList
        height={700}
        width={1100}
        itemSize={40}
        itemCount={items.length}
      >
        {Row}
      </FixedSizeList>
    );

    const TableContent = () => {
      return !this.state.reactWindow ?
      <table >
        <thead>
          <tr >
            <th >ID</th>
            {this.state.getColumns['1'] ? <th  onClick={this.sort.bind(this, 0)}>
              Country {(this.state.onSort.country === 1) || (this.state.onSort.country === 2 )}
            </th> : null}
            {this.state.getColumns['2'] ? <th   onClick={this.sort.bind(this, 1)}>
              Country Code {(this.state.onSort.companyName === 1) || (this.state.onSort.companyName === 2 )}
            </th> : null}
            {this.state.getColumns['3'] ? <th   onClick={this.sort.bind(this, 2)}>
              Product Material {(this.state.onSort.productMaterial === 1) || (this.state.onSort.productMaterial === 2 )}
            </th> : null }
            {this.state.getColumns['4'] ? <th   onClick={this.sort.bind(this, 3)}>
              Phone Number Format {(this.state.onSort.phoneNumberFormat === 1) || (this.state.onSort.phoneNumberFormat === 2 )}
            </th> : null }
            {this.state.getColumns['5'] ? <th   onClick={this.state.toggleButton ? null : this.sort.bind(this, 4)}>
              Boolean{(this.state.onSort.boolean === 1) || (this.state.onSort.boolean === 2 )}
            </th> : null }
            {this.state.getColumns['6'] ? <th   onClick={this.sort.bind(this, 999)}>
              Position
            </th> : null }
            {this.state.getColumns['7'] ? <th  onClick={this.sort.bind(this, 6)}>
              Price {(this.state.onSort.price === 1) || (this.state.onSort.price === 2 )}
            </th> : null }
            <th><input type='checkbox'/></th>
          </tr>
        </thead>
        <tbody>
          {!this.props.statics ? null
            : this.props.statics.map((user, i) => rendStatics(user, i))}
        </tbody>
      </table>
      :
      <>
      <table >
        <thead>
          <tr>
            <th>ID</th>
            {this.state.getColumns['1'] ? <th  onClick={this.sort.bind(this, 0)}>
              Country {(this.state.onSort.country === 1) || (this.state.onSort.country === 2 )}
            </th> : null}
            {this.state.getColumns['2'] ? <th  onClick={this.sort.bind(this, 1)}>
              Country Code {(this.state.onSort.companyName === 1) || (this.state.onSort.companyName === 2 )}
            </th> : null}
            {this.state.getColumns['3'] ? <th onClick={this.sort.bind(this, 2)}>
              Product Material {(this.state.onSort.productMaterial === 1) || (this.state.onSort.productMaterial === 2 )}
            </th> : null }
            {this.state.getColumns['4'] ? <th onClick={this.sort.bind(this, 3)}>
              Phone Number Format {(this.state.onSort.phoneNumberFormat === 1) || (this.state.onSort.phoneNumberFormat === 2 )}
            </th> : null }
            {this.state.getColumns['5'] ? <th  onClick={this.state.toggleButton ? null : this.sort.bind(this, 4)}>
              Boolean {(this.state.onSort.boolean === 1) || (this.state.onSort.boolean === 2 )}
            </th> : null }
            {this.state.getColumns['6'] ? <th  onClick={this.sort.bind(this, 999)}>
              Position
            </th> : null }
            {this.state.getColumns['7'] ? <th  onClick={this.sort.bind(this, 6)}>
              Price {(this.state.onSort.price === 1) || (this.state.onSort.price === 2 )}
            </th> : null }
            <th><input type='checkbox'/></th>
          </tr>
        </thead>
      </table>
      <table>
        <tbody>
          <ListComponent />
        </tbody>
      </table>
      </>
    }
    return (
      <div>
      <div className='main-block'>
        <div className='seacrh-item'>
          <label>
            Search:
          <input
            ref={this.searchInputRef}
            type="text"
            value={this.state.tableFilter}
            onChange={this.tableFilterChange}
          />
          </label>
          <Select
            ref={this.searchSelectRef}
            isMulti
            defaultValue={[this.getColumnsArr()[0]]}
            name="columns"
            options={this.getColumnsArr()}
            className="select"
            classNamePrefix="select"
            onChange={this.isInputBlocked}
          />
        </div>
        <div className='seacrh-item'>
      <Select
        ref={this.positionsSelectRef}
        isMulti
        name="position"
        options={['Small', 'Average', 'High'].map((el) => {
          return { value: el, label: el };
        })}
        value={this.state.prePositionInfo}
        className="select"
        classNamePrefix="select"
        onChange={this.selectPositions}
      />
      </div>
      <div className='input-container'>
      <form>
        <input type="checkbox" name="position"  onChange={this.changeValue.bind(this, '6')} checked={this.state.getColumns['6']} />
        <label htmlFor="position">Position</label>
      </form>
      <form>
        <input type="checkbox" name="country"  onChange={this.changeValue.bind(this, '1')} checked={this.state.getColumns['1']} />
        <label htmlFor="country">Country</label>
      </form>
      <form>
        <input type="checkbox" name="companyName"  onChange={this.changeValue.bind(this, '2')} checked={this.state.getColumns['2']} />
        <label htmlFor="companyName">Country Code</label>
      </form>
      <form>
        <input type="checkbox" name="phoneNumberFormat"  onChange={this.changeValue.bind(this, '4')} checked={this.state.getColumns['4']} />
        <label htmlFor="phoneNumberFormat">Phone Number Format</label>
      </form>
      <form>
        <input type="checkbox" name="boolean" onChange={this.changeValue.bind(this, '5')} checked={this.state.getColumns['5']} />
        <label htmlFor="boolean">Boolean</label>
      </form>
      <form>
        <input type="checkbox" name="price" onChange={this.changeValue.bind(this, '7')} checked={this.state.getColumns['7']} />
        <label htmlFor="price">Price</label>
      </form>
      </div>
        <div className='seacrh-item'>
        <ToggleButton
          inactiveLabel={'OFF'}
          activeLabel={'ON'}
          value={this.state.toggleButton}
          onToggle={(value) => {
            this.setState({
              toggleButton: !this.state.toggleButton,
              onSort: {
                ...this.state.onSort,
                boolean: 0,
              }
            }, function() { this.props.sortStaticsInfo(this.state.onSort, this.state.order, this.state.tableFilter, this.state.searchList, this.state.toggleButton) });
          }} />
          Boolean
          </div>
          <div className='seacrh-item'>
          <ToggleButton
            inactiveLabel={'OFF'}
            activeLabel={'ON'}
            value={this.state.reactWindow}
            onToggle={(value) => {
              this.setState({
                reactWindow: !this.state.reactWindow,
              });
            }} />
            React-window
            </div>
             </div>
             <CSVLink className='downloadButton' data={this.props.statics} >
                Download table
           </CSVLink>
          <TableContent />
      </div>
    );
  }
}

export default Table;
