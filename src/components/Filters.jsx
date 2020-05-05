import React from "react";

import FilterButton from "./FiltterButton";

const filters = [
  { type: "name", label: "Nome" },
  { type: "country", label: "País" },
  { type: "company", label: "Empresa" },
  { type: "department", label: "Departamento" },
  { type: "admissionDate", label: "Data de admissão" },
];

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.inputFilter = React.createRef();

    this.state = {
      selected: "name",
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleFilter(e) {
    const { filter } = this.props;
    const value = this.inputFilter.current.value.trim().toLocaleLowerCase();

    filter(value);
  }

  handleSort(type) {
    const { sortBy } = this.props;
    this.setState({ selected: type });
    sortBy(type);
  }

  render() {
    const { selected } = this.state;
    return (
      <div className="container" data-testid="filters">
        <section className="filters">
          <div className="filters__search">
            <input
              ref={this.inputFilter}
              onChange={this.handleFilter}
              type="text"
              className="filters__search__input"
              placeholder="Pesquisar"
            />

            <button
              onClick={() => this.handleFilter}
              className="filters__search__icon"
            >
              <i className="fa fa-search" />
            </button>
          </div>

          {filters.map((f) => (
            <FilterButton
              key={`filter-button-${f.type}`}
              label={f.label}
              type={f.type}
              selected={selected}
              action={this.handleSort}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default Filters;
